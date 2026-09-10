"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AvatarMentor } from "@/components/avatar-mentor";
import { VideoInterview } from "@/components/video-interview";
import { cn } from "@/lib/utils";
import { getRoleSkills, SOFTWARE_ROLES } from "@/lib/software-competency-model";

// Interview questions per role (curated set)
const INTERVIEW_QUESTIONS: Record<string, string[]> = {
  "software-engineer": [
    "Tell me about a challenging technical problem you solved. What was the problem, how did you approach it, and what was the outcome?",
    "Describe a time when you had to make a trade-off between code quality and delivery speed. How did you decide?",
    "How do you approach designing a new feature from scratch? Walk me through your process.",
    "Tell me about a bug that was particularly difficult to track down. How did you find the root cause?",
    "Describe a situation where you had to learn a new technology quickly to complete a project.",
  ],
  "full-stack-engineer": [
    "Walk me through a full-stack feature you built from frontend to backend. What were the key decisions?",
    "Describe a time when you had to optimize the performance of a web application. What did you do?",
    "How do you approach API design? What makes a good API?",
    "Tell me about a deployment issue you faced and how you resolved it.",
    "Describe your approach to testing a full-stack application.",
  ],
  "frontend-engineer": [
    "Tell me about a complex UI component you built. What were the challenges?",
    "How do you approach making a web application accessible? Give specific examples.",
    "Describe a performance issue you identified and fixed in a frontend application.",
    "Tell me about a time you had to work closely with designers to implement a design system.",
    "How do you manage state in a complex React application?",
  ],
  "backend-engineer": [
    "Describe a complex API you designed and built. What were the key design decisions?",
    "Tell me about a database performance issue you solved. How did you identify and fix it?",
    "How do you approach security in your backend services? Give specific examples.",
    "Describe a situation where you had to scale a backend service. What did you do?",
    "Tell me about a messaging or event-driven system you implemented.",
  ],
  "qa-engineer": [
    "Describe your approach to testing a new feature from requirements to release.",
    "Tell me about a particularly tricky bug you found. How did you discover it?",
    "How do you decide what to automate vs what to test manually?",
    "Describe a time when you improved the quality of a product through your testing efforts.",
    "Tell me about a situation where you had to advocate for quality with developers or stakeholders.",
  ],
  "data-analyst": [
    "Describe a data analysis project that had a significant business impact. What was your approach?",
    "Tell me about a time when you had to work with messy or incomplete data. How did you handle it?",
    "How do you decide which visualization to use for a particular dataset?",
    "Describe a situation where your analysis changed a business decision.",
    "Tell me about a time you had to explain complex data findings to a non-technical audience.",
  ],
  "devops-engineer": [
    "Describe a CI/CD pipeline you designed or significantly improved. What were the key features?",
    "Tell me about a production incident you handled. What went wrong and how did you resolve it?",
    "How do you approach infrastructure as code? Describe your experience with Terraform or similar.",
    "Describe a situation where you had to balance developer velocity with infrastructure stability.",
    "Tell me about your experience with container orchestration at scale.",
  ],
  "business-analyst": [
    "Describe a complex requirement you had to elicit from stakeholders. How did you approach it?",
    "Tell me about a time when you had to say 'no' to a stakeholder request. How did you handle it?",
    "Describe your approach to documenting requirements. What makes good documentation?",
    "Tell me about a situation where you identified a process improvement that saved time or money.",
    "How do you handle conflicting requirements from different stakeholders?",
  ],
};

interface InterviewWizardProps {
  targetRole: string;
  onComplete: (analysis: InterviewAnalysisResult) => void;
  onCancel: () => void;
}

interface InterviewAnalysisResult {
  analysis: {
    overallAssessment: OverallAssessment;
    strengths: string[];
    gaps: string[];
    skillInference: Record<string, SkillInference>;
    followUpQuestion: string | null;
  };
  transcription: string;
  questionsAnswered: number;
}

interface OverallAssessment {
  technicalAccuracy: number;
  depthOfKnowledge: number;
  communicationClarity: number;
  problemSolvingApproach: number;
  confidenceSignals: number;
  engagement: number;
  overallImpression: string;
}

interface SkillInference {
  level: number;
  confidence: number;
  reasoning: string;
}

export function InterviewWizard({ targetRole, onComplete, onCancel }: InterviewWizardProps) {
  const [step, setStep] = useState<"intro" | "question" | "recording" | "analyzing" | "result">("intro");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<string[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [recording, setRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [capturedVideos, setCapturedVideos] = useState<{ video: Blob; audio: Blob; question: string }[]>([]);
  const [analysisResults, setAnalysisResults] = useState<InterviewAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [videoError, setVideoError] = useState<string | null>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  const roleName = SOFTWARE_ROLES[targetRole]?.name || targetRole;
  const roleSkills = getRoleSkills(targetRole);

  // Initialize questions for the role
  useEffect(() => {
    const roleQuestions = INTERVIEW_QUESTIONS[targetRole] || INTERVIEW_QUESTIONS["software-engineer"];
    setQuestions(roleQuestions);
    setCurrentQuestion(roleQuestions[0]);
  }, [targetRole]);

  const handleVideoCapture = useCallback((videoBlob: Blob, audioBlob: Blob) => {
    setRecording(false);
    setRecordingDuration(0);
    setCapturedVideos((prev) => [...prev, { video: videoBlob, audio: audioBlob, question: currentQuestion }]);
    setStep("analyzing");
    setIsAnalyzing(true);
    setAnalysisError(null);

    // Send to analysis API
    analyzeInterview(videoBlob, audioBlob, currentQuestion);
  }, [currentQuestion]);

  const analyzeInterview = async (videoBlob: Blob, audioBlob: Blob, question: string) => {
    try {
      const formData = new FormData();
      formData.append("videoBlob", new File([videoBlob], "video.webm", { type: "video/webm" }));
      formData.append("audioBlob", new File([audioBlob], "audio.webm", { type: "audio/webm" }));
      formData.append("targetRole", targetRole);
      formData.append("question", question);
      formData.append("previousContext", analysisResults?.transcription || "");

      const response = await fetch("/api/interview/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Analysis failed");
      }

      // Update analysis results
      setAnalysisResults((prev) => {
        if (!prev) {
          return {
            analysis: data.analysis,
            transcription: data.transcription,
            questionsAnswered: 1,
          };
        }

        // Merge skill inferences
        const mergedSkillInference = { ...prev.analysis.skillInference };
        for (const [skillId, inference] of Object.entries(data.analysis.skillInference)) {
          const inf = inference as { level: number; confidence: number; reasoning: string } | undefined;
          if (!inf) continue;
          if (!mergedSkillInference[skillId] || inf.confidence > mergedSkillInference[skillId].confidence) {
            mergedSkillInference[skillId] = inf;
          }
        }

        // Average the assessment scores
        const prevAssess = prev.analysis.overallAssessment;
        const newAssess = data.analysis.overallAssessment;
        const avgAssess = {
          technicalAccuracy: Math.round((prevAssess.technicalAccuracy + newAssess.technicalAccuracy) / 2),
          depthOfKnowledge: Math.round((prevAssess.depthOfKnowledge + newAssess.depthOfKnowledge) / 2),
          communicationClarity: Math.round((prevAssess.communicationClarity + newAssess.communicationClarity) / 2),
          problemSolvingApproach: Math.round((prevAssess.problemSolvingApproach + newAssess.problemSolvingApproach) / 2),
          confidenceSignals: Math.round((prevAssess.confidenceSignals + newAssess.confidenceSignals) / 2),
          engagement: Math.round((prevAssess.engagement + newAssess.engagement) / 2),
          overallImpression: prevAssess.overallImpression + " " + newAssess.overallImpression,
        };

        return {
          ...prev,
          analysis: {
            overallAssessment: avgAssess,
            strengths: [...new Set([...prev.analysis.strengths, ...data.analysis.strengths])],
            gaps: [...new Set([...prev.analysis.gaps, ...data.analysis.gaps])],
            skillInference: mergedSkillInference,
            followUpQuestion: data.analysis.followUpQuestion,
          },
          transcription: prev.transcription + "\n\n" + data.transcription,
          questionsAnswered: prev.questionsAnswered + 1,
        };
      });
    } catch (error) {
      console.error("Analysis error:", error);
      setAnalysisError(error instanceof Error ? error.message : "Analysis failed");
      setIsAnalyzing(false);
      setStep("question");

      // Still advance to next question even if analysis failed
      if (currentQuestionIndex < questions.length - 1) {
        setTimeout(() => {
          setCurrentQuestionIndex((i) => i + 1);
          setCurrentQuestion(questions[currentQuestionIndex + 1]);
          setStep("question");
        }, 2000);
      } else {
        // Done with all questions
        setTimeout(() => {
          setStep("result");
        }, 2000);
      }
      return;
    }

    setIsAnalyzing(false);

    // Move to next question or finish
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((i) => i + 1);
      setCurrentQuestion(questions[currentQuestionIndex + 1]);
      setStep("question");
    } else {
      setStep("result");
    }
  };

  const handleSkipQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((i) => i + 1);
      setCurrentQuestion(questions[currentQuestionIndex + 1]);
    } else {
      setStep("result");
    }
  };

  const handleRestart = () => {
    setStep("intro");
    setCurrentQuestionIndex(0);
    setCapturedVideos([]);
    setAnalysisResults(null);
    setAnalysisError(null);
  };

  // Intro step
  if (step === "intro") {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Video Interview with {roleName}</h2>
        <p className="text-foreground-muted">
          You'll be asked {questions.length} questions about your experience as a {roleName}.
          For each question, record a short video response (1-3 minutes).
          Our AI mentor will analyze your responses and provide feedback.
        </p>

        <div className="space-y-4 rounded-lg border border-border bg-surface p-4">
          <h3 className="font-medium text-foreground">What to expect:</h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-foreground-muted">
            <li>An AI avatar mentor will ask each question via voice and text</li>
            <li>You'll record your video response using your webcam</li>
            <li>AI will analyze your technical accuracy, depth, communication, and more</li>
            <li>At the end, you'll get a detailed assessment with strengths, gaps, and skill inferences</li>
          </ul>
        </div>

        <div className="flex items-center gap-3">
          <Button onClick={() => setStep("question")} className="flex-1">
            Start Interview
          </Button>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  // Question display step
  if (step === "question") {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="secondary">Question {currentQuestionIndex + 1} of {questions.length}</Badge>
            <Progress value={((currentQuestionIndex + 1) / questions.length) * 100} className="w-32" />
          </div>
          <Button variant="ghost" onClick={onCancel}>
            Exit
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <AvatarMentor
            question={currentQuestion}
            isSpeaking={isSpeaking}
            onStop={() => setIsSpeaking(false)}
            avatarStyle="minimal"
          />
        </div>

        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-lg">Ready to answer?</CardTitle>
            <CardDescription>
              When you're ready, start recording your video response.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <Button
                onClick={() => {
                  setIsSpeaking(true);
                  setStep("recording");
                }}
                className="flex-1"
              >
                I'm Ready
              </Button>
              <Button variant="outline" onClick={handleSkipQuestion}>
                Skip
              </Button>
            </div>
            <p className="mt-3 text-xs text-foreground-muted">
              Take your time. There's no rush. The avatar will wait for you.
            </p>
          </CardContent>
        </Card>

        {/* Previous answers */}
        {capturedVideos.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-foreground-muted">Previous answers: {capturedVideos.length}</h4>
            {capturedVideos.map((cap, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-foreground-muted">
                <span className="h-2 w-2 rounded-full bg-teal-500" />
                {cap.question.slice(0, 60)}...
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Recording step
  if (step === "recording") {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="bg-red-500 text-white">Recording</Badge>
          <Button variant="ghost" onClick={() => {
            setStep("question");
            setIsSpeaking(false);
          }}>
            Back
          </Button>
        </div>

        <VideoInterview
          onVideoCapture={handleVideoCapture}
          onCancel={() => {
            setIsSpeaking(false);
            setStep("question");
          }}
          question={currentQuestion}
          isRecording={recording}
          recordingDuration={recordingDuration}
        />
      </div>
    );
  }

  // Analyzing step
  if (step === "analyzing" || isAnalyzing) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Badge variant="secondary">Analyzing</Badge>
          <Button variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <AvatarMentor
            question="Analyzing your response..."
            isSpeaking={true}
            onStop={() => {}}
            avatarStyle="minimal"
          />
        </div>

        <Card className="text-center py-12">
          <div className="mx-auto h-12 w-12 animate-pulse rounded-full bg-teal-500 flex items-center justify-center">
            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="mt-4 text-lg font-medium text-foreground">Analyzing your response...</h3>
          <p className="mt-1 text-sm text-foreground-muted">
            Our AI is examining your technical accuracy, communication, and problem-solving approach.
          </p>
          {analysisError && (
            <p className="mt-3 text-sm text-red-500">{analysisError}</p>
          )}
        </Card>
      </div>
    );
  }

  // Result step
  if (step === "result" && analysisResults) {
    const assessment = analysisResults.analysis.overallAssessment;
    const avgScore = Math.round(
      (assessment.technicalAccuracy +
        assessment.depthOfKnowledge +
        assessment.communicationClarity +
        assessment.problemSolvingApproach +
        assessment.confidenceSignals +
        assessment.engagement) / 6
    );

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Badge variant="secondary">Assessment Complete</Badge>
          <Button variant="outline" onClick={() => setStep("intro")}>
            New Interview
          </Button>
        </div>

        {/* Overall score */}
        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-2xl">Interview Assessment</CardTitle>
            <CardDescription>
              Based on {analysisResults.questionsAnswered} question{analysisResults.questionsAnswered > 1 ? "s" : ""}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center gap-4">
              <div className="text-5xl font-bold text-teal-500">{avgScore}/5</div>
              <div className="text-left">
                <p className="text-sm text-foreground-muted">Overall score based on AI analysis</p>
                <p className="text-xs text-foreground-muted mt-2">
                  {avgScore >= 4 ? "Strong candidate" : avgScore >= 3 ? "Solid performer" : avgScore >= 2 ? "Developing" : "Needs improvement"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Assessment breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Detailed Assessment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { label: "Technical Accuracy", value: assessment.technicalAccuracy, description: "How correct and relevant was the technical content?" },
                { label: "Depth of Knowledge", value: assessment.depthOfKnowledge, description: "Did they demonstrate surface or deep understanding?" },
                { label: "Communication Clarity", value: assessment.communicationClarity, description: "How well was the answer articulated?" },
                { label: "Problem-Solving Approach", value: assessment.problemSolvingApproach, description: "Was the thinking structured and logical?" },
                { label: "Confidence Signals", value: assessment.confidenceSignals, description: "Did the candidate sound confident and certain?" },
                { label: "Engagement", value: assessment.engagement, description: "Level of enthusiasm and interest shown" },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">{item.label}</span>
                    <span className="text-sm text-foreground-muted">{item.value}/5</span>
                  </div>
                  <Progress value={(item.value / 5) * 100} className="mt-1" />
                  <p className="text-xs text-foreground-muted mt-1">{item.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Strengths & Gaps */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-green-600">Strengths</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {analysisResults.analysis.strengths.length > 0 ? (
                  analysisResults.analysis.strengths.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <svg className="h-4 w-4 shrink-0 mt-0.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {s}
                    </li>
                  ))
                ) : (
                  <li className="text-sm text-foreground-muted">No specific strengths identified</li>
                )}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-amber-600">Areas for Improvement</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {analysisResults.analysis.gaps.length > 0 ? (
                  analysisResults.analysis.gaps.map((g, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <svg className="h-4 w-4 shrink-0 mt-0.5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {g}
                    </li>
                  ))
                ) : (
                  <li className="text-sm text-foreground-muted">No specific gaps identified</li>
                )}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Skill inferences */}
        {Object.keys(analysisResults.analysis.skillInference).length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Skills Inferred from Interview</CardTitle>
              <CardDescription>
                AI inferred the following proficiency levels based on your responses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(analysisResults.analysis.skillInference)
                  .sort((a, b) => b[1].confidence - a[1].confidence)
                  .slice(0, 8)
                  .map(([skillId, inference]) => {
                    const skill = roleSkills?.[skillId];
                    return (
                      <div key={skillId} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {skill?.name || skillId}
                          </p>
                          <p className="text-xs text-foreground-muted">{inference.reasoning}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={inference.level >= 3 ? "default" : inference.level >= 2 ? "secondary" : "outline"}>
                            Level {inference.level}
                          </Badge>
                          <span className="text-xs text-foreground-muted">
                            {Math.round(inference.confidence * 100)}%
                          </span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Follow-up question */}
        {analysisResults.analysis.followUpQuestion && (
          <Card className="border-teal-500 bg-teal-50">
            <CardHeader>
              <CardTitle className="text-lg">Suggested Follow-up</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground-muted">
                If you want to explore this further, consider preparing for this question:
              </p>
              <p className="mt-2 text-sm font-medium text-foreground">
                &quot;{analysisResults.analysis.followUpQuestion}&quot;
              </p>
            </CardContent>
          </Card>
        )}

        {/* Navigate */}
        <div className="flex items-center gap-3">
          <Button onClick={() => onComplete(analysisResults)} className="flex-1">
            Use This Assessment
          </Button>
          <Button variant="outline" onClick={handleRestart}>
            Start Over
          </Button>
        </div>
      </div>
    );
  }

  return null;
}
