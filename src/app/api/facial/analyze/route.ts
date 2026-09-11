import { NextResponse } from "next/server";
import { FacialAnalysisResult, FACIAL_WEIGHTS, ROLE_FACIAL_EXPECTATIONS, FACIAL_EMOTIONS } from "@/lib/facial-analysis";
import type { FacialAnalysisInput } from "@/lib/facial-analysis";

// Facial Analysis API — analyzes video frames from a video interview response
// In production, this would call OpenAI Vision / AWS Rekognition / DeepFace.
// In demo/sandbox mode, returns simulated analysis based on video duration and
// content context — structurally identical to real output.

const FACIAL_ANALYSIS_SYSTEM_PROMPT = `You are a facial expression analysis expert. Analyze the video frames from a candidate's interview response and provide structured facial analysis.

Input: video duration, number of frames, role context, question context, and frame descriptions.

Assess per key frame:
1. Eye contact — is the candidate looking at the camera? (0-1 per frame)
2. Dominant emotion — what facial emotion is showing? (happy, neutral, surprised, sad, angry, fearful, disgusted, contempt, confused, focused)
3. Facial expression metrics — smile intensity, brow furrow, eyebrow raise, blink rate
4. Head pose — pitch, yaw, roll angles

Aggregate across all frames:
- Eye contact percentage
- Dominant emotion distribution
- Average smile intensity
- Stress indicator (from brow furrow, avoidance, nervous expressions)
- Expressiveness score

Return JSON only:
{
  "overallEngagement": 0-5,
  "dimensions": {
    "eyeContact": 0-5,
    "engagement": 0-5,
    "confidence": 0-5,
    "stress": 0-5,
    "expressiveness": 0-5,
    "smileWarmth": 0-5
  },
  "frames": [
    {
      "timestamp": number,
      "dominantEmotion": string,
      "emotionConfidence": 0-1,
      "eyeContactScore": 0-1,
      "facialExpression": { "smile": 0-1, "browFurrow": 0-1, "eyebrowRaise": 0-1, "blinkRate": number },
      "headPose": { "pitch": -90-90, "yaw": -90-90, "roll": -90-90 }
    }
  ],
  "emotionDistribution": [{ "name": string, "percentage": 0-100 }],
  "metadata": {
    "totalFramesAnalyzed": number,
    "eyeContactPercentage": 0-1,
    "avgSmileIntensity": 0-1,
    "stressIndicator": 0-1,
    "expressivenessScore": 0-1
  }
}`;

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const videoBlob = formData.get("videoBlob") as Blob | null;
    const targetRole = formData.get("targetRole") as string;
    const totalDuration = Number(formData.get("totalDuration") || 0);
    const keyFrameInterval = Number(formData.get("keyFrameInterval") || 5);

    if (!targetRole) {
      return NextResponse.json({ error: "targetRole is required" }, { status: 400 });
    }

    // Determine number of frames to simulate
    const frameCount = totalDuration > 0
      ? Math.max(1, Math.floor(totalDuration / Math.max(1, keyFrameInterval)))
      : 6; // Default: 6 frames for a typical 30-second response

    // Try real analysis via GPT-4o Vision if we have video and credits
    if (videoBlob && process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.startsWith("sk-")) {
      try {
        const arrayBuffer = await videoBlob.arrayBuffer();
        const file = new File([arrayBuffer], "video.webm", { type: "video/webm" });

        // In a real implementation, we'd extract frames from the video
        // and send them to GPT-4o Vision. For now, we simulate.
        // GPT-4o Vision can analyze video by extracting key frames.

        const openai = new (await import("openai")).OpenAI({
          apiKey: process.env.OPENAI_API_KEY,
        });

        // Generate simulated frame data based on role and duration
        const simulated = simulateFacialAnalysis(targetRole, totalDuration, frameCount);
        return NextResponse.json({
          success: true,
          result: simulated,
          note: "Simulated facial analysis — frame extraction + GPT-4o Vision not available",
        });
      } catch (visionError) {
        console.error("Facial analysis (GPT-4o Vision) failed:", visionError);
        const simulated = simulateFacialAnalysis(targetRole, totalDuration, frameCount);
        return NextResponse.json({
          success: true,
          result: simulated,
          note: "Simulated analysis — OpenAI unavailable",
        });
      }
    }

    // Fall back to simulation
    const simulated = simulateFacialAnalysis(targetRole, totalDuration, frameCount);
    return NextResponse.json({
      success: true,
      result: simulated,
      note: "Simulated analysis",
    });
  } catch (error) {
    console.error("Facial analysis error:", error);
    return NextResponse.json(
      { error: "Facial analysis failed", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

/** Simulate facial analysis when vision API is unavailable */
function simulateFacialAnalysis(
  targetRole: string,
  totalDuration: number,
  frameCount: number
): FacialAnalysisResult {
  const expected = ROLE_FACIAL_EXPECTATIONS[targetRole] || ROLE_FACIAL_EXPECTATIONS["software-engineer"];
  const duration = totalDuration || (frameCount * 5); // Default 5 seconds per frame

  // Generate frames with realistic variation
  const frames: FacialAnalysisResult["frames"] = [];
  const emotionCounts: Record<string, number> = {};

  for (let i = 0; i < frameCount; i++) {
    const timestamp = Math.round((i + 1) * (duration / frameCount));

    // Simulate natural variation: start neutral, become more engaged in middle, slight fatigue at end
    const progress = i / frameCount;
    const engagementFactor = 1 - Math.abs(progress - 0.4) * 0.5; // Peak at 40% through

    // Role-based eye contact baseline
    const baseEyeContact = expected.expectedEyeContact * engagementFactor + (0.1 * (Math.random() - 0.5));
    const eyeContactScore = clamp0to1(baseEyeContact);

    // Determine emotion for this frame
    const emotionRoll = Math.random();
    let dominantEmotion: string;
    let emotionConfidence: number;

    if (emotionRoll < 0.4) {
      dominantEmotion = "neutral";
      emotionConfidence = 0.7 + Math.random() * 0.25;
    } else if (emotionRoll < 0.65) {
      dominantEmotion = "focused";
      emotionConfidence = 0.6 + Math.random() * 0.3;
    } else if (emotionRoll < 0.8) {
      dominantEmotion = "confused";
      emotionConfidence = 0.5 + Math.random() * 0.2;
    } else if (emotionRoll < 0.9) {
      dominantEmotion = "happy";
      emotionConfidence = 0.5 + Math.random() * 0.25;
    } else {
      dominantEmotion = "surprised";
      emotionConfidence = 0.4 + Math.random() * 0.2;
    }

    // Track emotion distribution
    emotionCounts[dominantEmotion] = (emotionCounts[dominantEmotion] || 0) + 1;

    // Facial expression metrics
    const smileIntensity = dominantEmotion === "happy" ? 0.3 + Math.random() * 0.5 : 0.05 + Math.random() * 0.15;
    const browFurrow = dominantEmotion === "confused" ? 0.4 + Math.random() * 0.4 : 0.05 + Math.random() * 0.15;
    const eyebrowRaise = dominantEmotion === "surprised" ? 0.3 + Math.random() * 0.5 : 0.05 + Math.random() * 0.1;
    const blinkRate = 10 + Math.random() * 15; // blinks per minute

    // Head pose — slight natural variation
    const pitch = (Math.random() - 0.5) * 15;
    const yaw = (Math.random() - 0.5) * 20;
    const roll = (Math.random() - 0.5) * 10;

    frames.push({
      timestamp,
      dominantEmotion,
      emotionConfidence: Math.round(emotionConfidence * 100) / 100,
      eyeContactScore: Math.round(eyeContactScore * 100) / 100,
      facialExpression: {
        smile: Math.round(smileIntensity * 100) / 100,
        browFurrow: Math.round(browFurrow * 100) / 100,
        eyebrowRaise: Math.round(eyebrowRaise * 100) / 100,
        blinkRate: Math.round(blinkRate),
      },
      headPose: {
        pitch: Math.round(pitch),
        yaw: Math.round(yaw),
        roll: Math.round(roll),
      },
    });
  }

  // Compute emotion distribution
  const totalFrames = frames.length;
  const emotionDistribution = Object.entries(emotionCounts)
    .map(([name, count]) => ({
      name,
      percentage: Math.round((count / totalFrames) * 100),
    }))
    .sort((a, b) => b.percentage - a.percentage);

  // Aggregate metrics
  const avgEyeContact = frames.reduce((sum, f) => sum + f.eyeContactScore, 0) / totalFrames;
  const avgSmile = frames.reduce((sum, f) => sum + f.facialExpression.smile, 0) / totalFrames;
  const avgBrowFurrow = frames.reduce((sum, f) => sum + f.facialExpression.browFurrow, 0) / totalFrames;
  const stressIndicator = clamp0to1(avgBrowFurrow * 0.8 + (1 - avgEyeContact) * 0.2);
  const expressivenessScore = clamp0to1(
    avgSmile * 0.5 +
    frames.filter((f) => f.dominantEmotion !== "neutral").length / totalFrames * 0.3 +
    frames.reduce((sum, f) => sum + Math.abs(f.headPose.yaw), 0) / totalFrames * 0.2
  );

  // Dimension scores (0-5) from metadata
  const eyeContactScore = avgEyeContact * 5;
  const engagementScore = (avgEyeContact * 0.4 + expressivenessScore * 0.3 + avgSmile * 0.2 + (1 - stressIndicator) * 0.1) * 5;
  const confidenceScore = (avgEyeContact * 0.5 + (1 - stressIndicator) * 0.3 + expressivenessScore * 0.2) * 5;
  const stressScore = (1 - stressIndicator) * 5; // Inverted: high score = low stress
  const expressivenessDimension = expressivenessScore * 5;
  const smileWarmthScore = avgSmile * 5;

  const overallEngagement = (eyeContactScore + engagementScore + confidenceScore + stressScore + expressivenessDimension + smileWarmthScore) / 6;

  return {
    overallEngagement: Math.round(overallEngagement * 10) / 10,
    dimensions: {
      eyeContact: Math.round(eyeContactScore * 10) / 10,
      engagement: Math.round(engagementScore * 10) / 10,
      confidence: Math.round(confidenceScore * 10) / 10,
      stress: Math.round(stressScore * 10) / 10,
      expressiveness: Math.round(expressivenessDimension * 10) / 10,
      smileWarmth: Math.round(smileWarmthScore * 10) / 10,
    },
    frames,
    emotionDistribution,
    metadata: {
      totalFramesAnalyzed: totalFrames,
      eyeContactPercentage: Math.round(avgEyeContact * 100) / 100,
      avgSmileIntensity: Math.round(avgSmile * 100) / 100,
      stressIndicator: Math.round(stressIndicator * 100) / 100,
      expressivenessScore: Math.round(expressivenessScore * 100) / 100,
    },
    raw: {
      simulation: true,
      targetRole,
      frameCount: totalFrames,
      duration,
      expectedEyeContact: expected.expectedEyeContact,
    },
  };
}

function clamp0to1(value: number): number {
  return Math.max(0, Math.min(1, value));
}
