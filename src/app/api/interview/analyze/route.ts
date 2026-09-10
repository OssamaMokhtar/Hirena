import { NextResponse } from "next/server";
import OpenAI from "openai";
import { getRoleSkills, SOFTWARE_ROLES } from "@/lib/software-competency-model";
import { PM_SKILLS } from "@/lib/competency-model";
import type { AssessmentInput } from "@/types";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: false,
});

// System prompt for interview analysis
const INTERVIEW_ANALYSIS_PROMPT = `You are Hirena's interview analysis engine. Analyze a candidate's video interview response and provide structured feedback.

Analyze the transcribed response for:
1. Technical accuracy - is the content correct and relevant?
2. Depth of knowledge - surface-level or deep understanding?
3. Communication clarity - how well articulated?
4. Problem-solving approach - structured thinking?
5. Confidence signals - certainty in answers (from wording, not audio)
6. Engagement - enthusiasm, interest level
7. Key strengths demonstrated
8. Key gaps or areas for improvement
9. Suggested proficiency level (0-5) for relevant skills

Proficiency Scale (0-5):
0 = No exposure / couldn't answer
1 = Aware - basic concepts, missing details
2 = Basic - can handle simple cases, often needs guidance
3 = Intermediate - handles common cases independently, solid work
4 = Advanced - handles complex cases, guides others, consistent quality
5 = Expert - sets strategy, teaches others, org-level impact

Return JSON only:
{
  "overallAssessment": {
    "technicalAccuracy": 0-5,
    "depthOfKnowledge": 0-5,
    "communicationClarity": 0-5,
    "problemSolvingApproach": 0-5,
    "confidenceSignals": 0-5,
    "engagement": 0-5,
    "overallImpression": "Brief summary of the candidate based on this answer"
  },
  "strengths": ["string"],
  "gaps": ["string"],
  "skillInference": {
    "skillId": { "level": 0-5, "confidence": 0-1, "reasoning": "string" }
  },
  "followUpQuestion": "string or null - relevant follow-up if you want to dig deeper"
}`;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { videoBlob, audioBlob, transcription, targetRole, question, previousContext } = body;

    if (!targetRole) {
      return NextResponse.json({ error: "targetRole is required" }, { status: 400 });
    }

    // Get the skills for this role
    const roleSkills = getRoleSkills(targetRole);
    if (!roleSkills) {
      return NextResponse.json({ error: `Unknown role: ${targetRole}` }, { status: 400 });
    }

    // Step 1: Transcribe audio if we have it and no transcription was provided
    let finalTranscription = transcription;
    if (!finalTranscription && audioBlob) {
      try {
        const audioArrayBuffer = await audioBlob.arrayBuffer();
        const audioBlobFile = new File([audioArrayBuffer], "audio.webm", { type: "audio/webm" });

        const transcriptionResult = await openai.audio.transcriptions.create({
          file: audioBlobFile,
          model: "whisper-1",
          language: "en",
          temperature: 0.0,
        });

        finalTranscription = transcriptionResult.text;
      } catch (transcriptionError) {
        console.error("Transcription error:", transcriptionError);
        // Continue with what we have - might be empty
      }
    }

    // If no transcription at all, use a placeholder
    if (!finalTranscription) {
      finalTranscription = "[No audio transcription available - candidate may not have spoken]";
    }

    // Step 2: Analyze the response with GPT-4o
    const analysisPrompt = `Role: ${targetRole}
Question asked: "${question}"
Previous context: ${previousContext || "None - first question"}

Candidate's response (transcribed from video):
"""
${finalTranscription}
"""

${INTERVIEW_ANALYSIS_PROMPT}`;

    const analysisResult = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are an expert technical interviewer and career coach. Analyze responses objectively." },
        { role: "user", content: analysisPrompt },
      ],
      temperature: 0.3,
      response_format: { type: "json_object" },
      max_tokens: 2000,
    });

    const analysis = JSON.parse(analysisResult.choices[0].message.content || "{}");

    // Merge skill inferences with existing skills
    const skillInference: Record<string, { level: number; confidence: number; reasoning: string }> = {};

    // Infer skills based on the analysis
    const inferredSkills = analysis.skillInference || {};

    // Map inferred skills to actual role skills
    for (const [skillId, inference] of Object.entries(inferredSkills)) {
      const inferenceTyped = inference as { level: number; confidence: number; reasoning: string } | undefined;
      if (!inferenceTyped) continue;

      // Check if this skillId matches any role skill (fuzzy match)
      const matchingSkill = Object.keys(roleSkills).find(
        (id) => id.toLowerCase().includes(skillId.toLowerCase()) ||
                 skillId.toLowerCase().includes(id.toLowerCase())
      );

      if (matchingSkill) {
        skillInference[matchingSkill] = {
          level: Math.max(0, Math.min(5, inferenceTyped.level || 0)),
          confidence: Math.max(0, Math.min(1, inferenceTyped.confidence || 0)),
          reasoning: inferenceTyped.reasoning || "AI-inferred from interview response",
        };
      }
    }

    // If no specific skills were inferred, infer from the overall response
    if (Object.keys(skillInference).length === 0) {
      // Try to infer from the response content
      const responseLower = finalTranscription.toLowerCase();

      // Simple keyword-based inference as fallback
      if (targetRole === "software-engineer" || targetRole === "full-stack-engineer") {
        if (responseLower.includes("data structure") || responseLower.includes("algorithm")) {
          skillInference["data-structures"] = { level: 3, confidence: 0.6, reasoning: "Candidate discussed data structures" };
          skillInference["algorithms"] = { level: 3, confidence: 0.6, reasoning: "Candidate discussed algorithms" };
        }
        if (responseLower.includes("test") || responseLower.includes("unit")) {
          skillInference["testing-unit"] = { level: 2, confidence: 0.5, reasoning: "Candidate mentioned testing" };
        }
        if (responseLower.includes("api") || responseLower.includes("rest")) {
          skillInference["api-design"] = { level: 2, confidence: 0.5, reasoning: "Candidate discussed APIs" };
        }
        if (responseLower.includes("deploy") || responseLower.includes("docker") || responseLower.includes("kubernetes")) {
          skillInference["containers"] = { level: 2, confidence: 0.5, reasoning: "Candidate discussed containers/deployment" };
        }
      }

      if (targetRole === "qa-engineer") {
        if (responseLower.includes("test case") || responseLower.includes("test plan")) {
          skillInference["test-design"] = { level: 3, confidence: 0.6, reasoning: "Candidate discussed test design" };
          skillInference["test-planning"] = { level: 3, confidence: 0.6, reasoning: "Candidate discussed test planning" };
        }
        if (responseLower.includes("automation") || responseLower.includes("selenium") || responseLower.includes("cypress")) {
          skillInference["selenium"] = { level: 2, confidence: 0.5, reasoning: "Candidate discussed test automation" };
        }
      }

      if (targetRole === "data-analyst") {
        if (responseLower.includes("sql")) {
          skillInference["sql-advanced"] = { level: 2, confidence: 0.6, reasoning: "Candidate discussed SQL" };
        }
        if (responseLower.includes("visualization") || responseLower.includes("dashboard") || responseLower.includes("chart")) {
          skillInference["data-visualization"] = { level: 2, confidence: 0.5, reasoning: "Candidate discussed data visualization" };
        }
        if (responseLower.includes("python") || responseLower.includes("pandas")) {
          skillInference["python-data"] = { level: 2, confidence: 0.5, reasoning: "Candidate discussed Python for data" };
        }
      }

      if (targetRole === "business-analyst") {
        if (responseLower.includes("requirement") || responseLower.includes("stakeholder")) {
          skillInference["requirements-gathering"] = { level: 2, confidence: 0.5, reasoning: "Candidate discussed requirements" };
          skillInference["stakeholder-management"] = { level: 2, confidence: 0.5, reasoning: "Candidate discussed stakeholders" };
        }
        if (responseLower.includes("process") || responseLower.includes("workflow")) {
          skillInference["process-modeling"] = { level: 2, confidence: 0.5, reasoning: "Candidate discussed process modeling" };
        }
      }

      if (targetRole === "devops-engineer") {
        if (responseLower.includes("docker") || responseLower.includes("kubernetes") || responseLower.includes("container")) {
          skillInference["docker"] = { level: 2, confidence: 0.6, reasoning: "Candidate discussed containers" };
          skillInference["kubernetes"] = { level: 2, confidence: 0.5, reasoning: "Candidate discussed orchestration" };
        }
        if (responseLower.includes("ci") || responseLower.includes("cd") || responseLower.includes("pipeline")) {
          skillInference["ci-cd-devops"] = { level: 2, confidence: 0.6, reasoning: "Candidate discussed CI/CD" };
        }
        if (responseLower.includes("aws") || responseLower.includes("cloud") || responseLower.includes("azure") || responseLower.includes("gcp")) {
          skillInference["cloud-devops"] = { level: 2, confidence: 0.5, reasoning: "Candidate discussed cloud platforms" };
        }
      }

      if (targetRole === "frontend-engineer") {
        if (responseLower.includes("react") || responseLower.includes("component")) {
          skillInference["react-fe"] = { level: 2, confidence: 0.5, reasoning: "Candidate discussed React/components" };
        }
        if (responseLower.includes("css") || responseLower.includes("responsive")) {
          skillInference["html-css-fe"] = { level: 2, confidence: 0.5, reasoning: "Candidate discussed CSS/responsive design" };
        }
        if (responseLower.includes("performance") || responseLower.includes("bundle") || responseLower.includes("lazy")) {
          skillInference["performance-fe"] = { level: 2, confidence: 0.5, reasoning: "Candidate discussed frontend performance" };
        }
      }

      if (targetRole === "backend-engineer") {
        if (responseLower.includes("api") || responseLower.includes("rest") || responseLower.includes("graphql")) {
          skillInference["api-design-be"] = { level: 2, confidence: 0.6, reasoning: "Candidate discussed API design" };
        }
        if (responseLower.includes("database") || responseLower.includes("sql") || responseLower.includes("query")) {
          skillInference["database-advanced"] = { level: 2, confidence: 0.5, reasoning: "Candidate discussed databases" };
        }
        if (responseLower.includes("security") || responseLower.includes("auth") || responseLower.includes("oauth")) {
          skillInference["authentication-be"] = { level: 2, confidence: 0.5, reasoning: "Candidate discussed authentication/security" };
        }
      }
    }

    // Build the response
    return NextResponse.json({
      success: true,
      analysis: {
        overallAssessment: analysis.overallAssessment || {
          technicalAccuracy: 0,
          depthOfKnowledge: 0,
          communicationClarity: 0,
          problemSolvingApproach: 0,
          confidenceSignals: 0,
          engagement: 0,
          overallImpression: "No assessment available",
        },
        strengths: analysis.strengths || [],
        gaps: analysis.gaps || [],
        skillInference,
        followUpQuestion: analysis.followUpQuestion || null,
      },
      transcription: finalTranscription,
      duration: body.duration || 0,
    });
  } catch (error) {
    console.error("Interview analysis error:", error);
    const message = error instanceof Error ? error.message : String(error);
    const isDev = process.env.NODE_ENV !== "production";
    return NextResponse.json(
      {
        error: "Failed to analyze interview response",
        ...(isDev && { details: message }),
      },
      { status: 500 }
    );
  }
}
