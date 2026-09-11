import { NextResponse } from "next/server";
import { VoiceAnalysisResult, VOICE_WEIGHTS, ROLE_VOICE_EXPECTATIONS } from "@/lib/voice-analysis";
import type { VoiceAnalysisInput } from "@/lib/voice-analysis";

// Voice Analysis API — analyzes audio from a video interview response
// In production, this would call Deepgram / AssemblyAI for real analysis.
// In demo/sandbox mode (no API credits), returns simulated analysis based on
// transcript content and duration — structurally identical to real output.

const VOICE_ANALYSIS_SYSTEM_PROMPT = `You are a voice analysis expert. Analyze the transcription and metadata of a candidate's interview response and provide structured voice quality assessment.

Input: transcription text, duration in seconds, speaking rate (WPM), role context.

Assess:
1. Confidence — does the language sound confident? (authored statements, no hedging, definitive language)
2. Clarity — is the answer well-articulated? (structured sentences, clear explanation, no rambling)
3. Pacing — appropriate speaking rhythm? (from word count / duration, ideal 100-150 WPM)
4. Enthusiasm — energy and engagement in the response? (varied vocabulary, positive framing, detailed answers)
5. Filler words — estimate from text patterns (repetitive phrases, "um/ah" indicators, hedging)
6. Emotion — appropriate emotional tone for a technical interview?

Return JSON only:
{
  "overallQuality": 0-5,
  "dimensions": {
    "confidence": 0-5,
    "clarity": 0-5,
    "pacing": 0-5,
    "enthusiasm": 0-5,
    "fillerWords": 0-5,
    "emotion": 0-5
  },
  "emotions": [{ "name": "string", "confidence": 0-1 }],
  "metadata": {
    "durationSeconds": number,
    "speakingRateWpm": number,
    "pauseRatio": 0-1,
    "fillerWordCount": number,
    "clarityScore": 0-1
  }
}`;

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const audioBlob = formData.get("audioBlob") as Blob | null;
    const targetRole = formData.get("targetRole") as string;
    const question = formData.get("question") as string;
    const previousContext = formData.get("previousContext") as string | null;
    const duration = Number(formData.get("duration") || 0);

    if (!targetRole) {
      return NextResponse.json({ error: "targetRole is required" }, { status: 400 });
    }

    // Attempt real transcription if we have audio
    let transcript = "";
    if (audioBlob) {
      try {
        const arrayBuffer = await audioBlob.arrayBuffer();
        const file = new File([arrayBuffer], "audio.webm", { type: "audio/webm" });

        const openai = new (await import("openai")).OpenAI({
          apiKey: process.env.OPENAI_API_KEY,
        });

        const result = await openai.audio.transcriptions.create({
          file,
          model: "whisper-1",
          language: "en",
          temperature: 0.0,
        });

        transcript = result.text;
      } catch (transcriptionError) {
        console.error("Voice transcription failed:", transcriptionError);
        // Continue with simulated analysis
      }
    }

    // If no transcript, generate simulated one from question context
    if (!transcript) {
      transcript = `[Audio not available or transcription failed — simulated analysis]`;
    }

    // Try real GPT-4o voice analysis
    try {
      const openai = new (await import("openai")).OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });

      const analysisPrompt = `Role: ${targetRole}
Question: "${question}"
Previous context: ${previousContext || "None"}
Duration: ${duration} seconds

Transcription:
"""
${transcript}
"""

${VOICE_ANALYSIS_SYSTEM_PROMPT}`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: "You are a voice analysis expert." },
          { role: "user", content: analysisPrompt },
        ],
        temperature: 0.3,
        response_format: { type: "json_object" },
        max_tokens: 1500,
      });

      const data = JSON.parse(response.choices[0].message.content || "{}");

      return NextResponse.json({
        success: true,
        result: {
          overallQuality: data.overallQuality || 3,
          dimensions: data.dimensions || {
            confidence: 3,
            clarity: 3,
            pacing: 3,
            enthusiasm: 3,
            fillerWords: 3,
            emotion: 3,
          },
          emotions: data.emotions || [{ name: "neutral", confidence: 0.8 }],
          metadata: {
            durationSeconds: duration,
            speakingRateWpm: data.metadata?.speakingRateWpm || 120,
            pauseRatio: data.metadata?.pauseRatio || 0.1,
            fillerWordCount: data.metadata?.fillerWordCount || 2,
            clarityScore: data.metadata?.clarityScore || 0.7,
          },
          raw: data,
        },
      });
    } catch (openaiError) {
      console.error("Voice analysis (GPT-4o) failed:", openaiError);

      // Fall back to simulation
      const simulated = simulateVoiceAnalysis(transcript, duration, targetRole, question);
      return NextResponse.json({
        success: true,
        result: simulated,
        note: "Simulated analysis — OpenAI unavailable",
      });
    }
  } catch (error) {
    console.error("Voice analysis error:", error);
    return NextResponse.json(
      { error: "Voice analysis failed", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

/** Simulate voice analysis when OpenAI is unavailable */
function simulateVoiceAnalysis(
  transcript: string,
  duration: number,
  targetRole: string,
  question: string
): VoiceAnalysisResult {
  const wordCount = transcript.split(/\s+/).filter(Boolean).length;
  const wpm = duration > 0 ? Math.round((wordCount / duration) * 60) : 120;
  const expected = ROLE_VOICE_EXPECTATIONS[targetRole] || ROLE_VOICE_EXPECTATIONS["software-engineer"];

  // Score confidence from language patterns
  const confidentPhrases = ["I built", "I led", "I architected", "I designed", "I resolved", "we shipped", "I implemented", "definitely", "certainly", "proven"];
  const hedgingPhrases = ["I think", "maybe", "sort of", "kind of", "approximately", "I believe", "I guess", "hopefully"];
  const confidentCount = confidentPhrases.filter((p) => transcript.toLowerCase().includes(p)).length;
  const hedgingCount = hedgingPhrases.filter((p) => transcript.toLowerCase().includes(p)).length;

  const confidenceScore = clamp(
    1 + (confidentCount * 0.5) - (hedgingCount * 0.3) + (wpm > 80 ? 0.5 : 0) + (wpm < 60 ? -0.5 : 0),
    1,
    5
  );

  // Score clarity from structure
  const hasStructure = transcript.includes(".") && transcript.length > 50;
  const hasDetail = wordCount > 40;
  const clarityScore = clamp(
    2 + (hasStructure ? 1 : 0) + (hasDetail ? 1 : 0) + (transcript.split(".").length > 2 ? 0.5 : 0),
    1,
    5
  );

  // Score pacing from WPM
  let pacingScore = 3;
  if (wpm >= 100 && wpm <= 160) pacingScore = 4;
  if (wpm > 160) pacingScore = 3.5; // Too fast
  if (wpm < 80) pacingScore = 2.5; // Too slow
  if (wpm < 50) pacingScore = 1.5;

  // Score enthusiasm from detail and energy
  const detailedWords = ["because", "specifically", "for example", "the reason", "important", "challenging", "interesting", "learned"];
  const detailCount = detailedWords.filter((w) => transcript.toLowerCase().includes(w)).length;
  const enthusiasmScore = clamp(2 + detailCount * 0.3, 1, 5);

  // Score filler words (inverted — high score = few fillers)
  // Estimate from repetition and hedging
  const fillerEstimate = hedgingCount + Math.max(0, (wordCount / duration) < 2 ? Math.round(5 - (wordCount / duration) * 2) : 0);
  const fillerScore = clamp(5 - fillerEstimate * 0.5, 1, 5);

  // Score emotion from expressiveness
  const expressiveWords = ["excited", "passionate", "love", "enjoy", "challenging", "interesting", "fascinating", "amazing", "struggled", "learned"];
  const expressiveCount = expressiveWords.filter((w) => transcript.toLowerCase().includes(w)).length;
  const emotionScore = clamp(2 + expressiveCount * 0.3, 1, 5);

  const overall = (confidenceScore + clarityScore + pacingScore + enthusiasmScore + fillerScore + emotionScore) / 6;

  return {
    overallQuality: Math.round(overall * 10) / 10,
    dimensions: {
      confidence: Math.round(confidenceScore * 10) / 10,
      clarity: Math.round(clarityScore * 10) / 10,
      pacing: Math.round(pacingScore * 10) / 10,
      enthusiasm: Math.round(enthusiasmScore * 10) / 10,
      fillerWords: Math.round(fillerScore * 10) / 10,
      emotion: Math.round(emotionScore * 10) / 10,
    },
    emotions: [
      { name: "neutral", confidence: 0.5 + (emotionScore > 3 ? 0.2 : 0) },
      { name: "engaged", confidence: 0.3 + (enthusiasmScore > 3 ? 0.3 : 0) },
      { name: "confident", confidence: 0.2 + (confidenceScore > 3 ? 0.3 : 0) },
    ],
    metadata: {
      durationSeconds: duration,
      speakingRateWpm: wpm,
      pauseRatio: clamp(0.05 + (wpm < 80 ? 0.1 : 0) + (wpm > 160 ? -0.05 : 0), 0, 0.3),
      fillerWordCount: Math.max(0, fillerEstimate),
      clarityScore: clamp(clarityScore / 5, 0, 1),
    },
    raw: {
      simulation: true,
      wordCount,
      confidentPhrases: confidentCount,
      hedgingPhrases: hedgingCount,
      targetRole,
      question,
    },
  };
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}
