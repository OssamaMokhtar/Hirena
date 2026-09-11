"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AvatarMentor } from "@/components/avatar-mentor";
import { VideoInterview } from "@/components/video-interview";
import { cn } from "@/lib/utils";
import type {
  InterviewSessionState,
  LiveFeedback,
  QuestionAnalysisResult,
  InterviewFinalResult,
  AvatarStyle,
} from "@/lib/real-time-interview";
import {
  extractCandidateSignals,
  generateAdaptiveAvatarResponse,
} from "@/lib/signal-analysis";

// Questions by role (component-local copy — mirrors session API)
const LOCAL_QUESTIONS_BY_ROLE: Record<string, string[]> = {
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
  "software-architect": [
    "Describe a system architecture you designed from scratch. What were the key trade-offs?",
    "Tell me about a time when you had to choose between multiple technology options. How did you decide?",
    "How do you approach scalability in your designs? Give a specific example.",
    "Describe a situation where you had to convince stakeholders to adopt a technically superior but riskier approach.",
    "Tell me about a time when an architecture decision you made had to be reversed. What did you learn?",
  ],
  "engineering-manager": [
    "Describe your approach to building and developing a high-performing engineering team.",
    "Tell me about a time when you had to manage a underperforming team member. How did you handle it?",
    "How do you balance technical direction with people management in your role?",
    "Describe a situation where you had to make a hiring decision with limited information.",
    "Tell me about a time when you had to communicate a difficult technical decision to non-technical stakeholders.",
  ],
  "tech-lead": [
    "Describe your approach to technical leadership within a team. How do you influence without authority?",
    "Tell me about a time when you had to make a critical technical decision with incomplete information.",
    "How do you ensure code quality and best practices across your team?",
    "Describe a situation where you had to mentor a junior engineer to help them grow.",
    "Tell me about a time when you had to push back on a product requirement for technical reasons.",
  ],
  "product-manager": [
    "Describe a product you launched or significantly improved. What was your role and what was the impact?",
    "Tell me about a time when you had to say no to a feature request. How did you handle it?",
    "How do you prioritize your roadmap when everything feels urgent?",
    "Describe a situation where user research completely changed your product direction.",
    "Tell me about a time when a product launch didn't go as planned. What did you learn?",
  ],
  "scrum-master": [
    "Describe your approach to facilitating effective sprint ceremonies.",
    "Tell me about a time when a team was struggling with agile practices. How did you help them improve?",
    "How do you handle a team that consistently fails to meet sprint commitments?",
    "Describe a situation where you had to remove a significant impediment for your team.",
    "Tell me about a time when you had to coach a team member on agile principles.",
  ],
  "data-engineer": [
    "Describe a data pipeline you built or significantly improved. What were the key design decisions?",
    "Tell me about a time when you had to handle a data quality issue at scale. How did you resolve it?",
    "How do you approach data modeling for a new analytics platform?",
    "Describe a situation where you had to choose between batch and streaming processing.",
    "Tell me about a time when a data pipeline failure impacted downstream systems. How did you handle it?",
  ],
  "ml-engineer": [
    "Describe a machine learning model you deployed to production. What were the key challenges?",
    "Tell me about a time when model performance degraded in production. How did you diagnose and fix it?",
    "How do you approach feature engineering for a new ML problem?",
    "Describe a situation where you had to balance model complexity with production constraints.",
    "Tell me about a time when you had to explain model predictions to non-technical stakeholders.",
  ],
  "uxui-designer": [
    "Describe a design project where your work had a measurable impact on user behavior or business metrics.",
    "Tell me about a time when user testing revealed a major flaw in your design. How did you respond?",
    "How do you approach designing for accessibility? Give specific examples.",
    "Describe a situation where you had to defend a design decision against stakeholder pushback.",
    "Tell me about a time when you had to design under significant constraints. How did you work within them?",
  ],
  "tester": [
    "Describe your approach to testing a new feature from requirements to release.",
    "Tell me about a particularly tricky defect you found. How did you discover it?",
    "How do you decide what to test manually vs what to explore with automation?",
    "Describe a time when you improved the quality of a release through your testing efforts.",
    "Tell me about a situation where you had to communicate a critical defect to developers or stakeholders.",
  ],
};

interface RealTimeInterviewWizardProps {
  targetRole: string;
  onComplete: (result: InterviewFinalResult) => void;
  onCancel: () => void;
}

type WizardStep = "intro" | "avatar-intro" | "question" | "recording" | "analyzing" | "feedback" | "followUp" | "result";

export function RealTimeInterviewWizard({ targetRole, onComplete, onCancel }: RealTimeInterviewWizardProps) {
  const [step, setStep] = useState<WizardStep>("intro");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<string[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [sessionState, setSessionState] = useState<InterviewSessionState>("idle");
  const [avatarStyle, setAvatarStyle] = useState<AvatarStyle>("minimal");
  const [liveFeedbacks, setLiveFeedbacks] = useState<LiveFeedback[]>([]);
  const [analysisResults, setAnalysisResults] = useState<QuestionAnalysisResult[]>([]);
  const [finalResult, setFinalResult] = useState<InterviewFinalResult | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [recording, setRecording] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Adaptive signals from candidate's previous answer
  const [candidateSignals, setCandidateSignals] = useState<{
    pace: number;
    sentiment: number;
    engagement: number;
    fillerWords: number;
    wpm: number;
  } | null>(null);

  // Adaptive avatar response (next question adapted to signals)
  const [adaptiveResponse, setAdaptiveResponse] = useState<{
    question: string;
    tone: string;
    paceMultiplier: number;
    encouragement: string | null;
  } | null>(null);

  const roleQuestions = LOCAL_QUESTIONS_BY_ROLE[targetRole] || LOCAL_QUESTIONS_BY_ROLE["software-engineer"];

  // Initialize questions
  useEffect(() => {
    setQuestions(roleQuestions);
    setCurrentQuestion(roleQuestions[0]);
  }, [targetRole]);

  // Extract signals from the candidate's transcribed response and adapt avatar
  const adaptToCandidateSignals = useCallback((transcription: string, duration: number) => {
    const signals = extractCandidateSignals(transcription, duration);
    setCandidateSignals(signals);

    // Generate adaptive response for next question
    const adapted = generateAdaptiveAvatarResponse(
      questions[currentQuestionIndex],
      signals,
      transcription
    );
    setAdaptiveResponse(adapted);
  }, [questions, currentQuestion]);

  // Simulate avatar speaking the question (with adaptive speech params)
  const startAvatarQuestion = useCallback(() => {
    setIsSpeaking(true);
    setSessionState("avatar-speaking");
    setStep("question");

    const speechDuration = adaptiveResponse?.paceMultiplier
      ? 5 * adaptiveResponse.paceMultiplier
      : 5;

    setTimeout(() => {
      setIsSpeaking(false);
      setSessionState("ready");
    }, speechDuration * 1000);
  }, [adaptiveResponse]);

  // Start recording after avatar finishes
  const startRecording = useCallback(() => {
    setRecording(true);
    setRecordingDuration(0);
    setSessionState("candidate-speaking");
    setStep("recording");

    const simulatedDuration = 20 + Math.random() * 20;
    const interval = setInterval(() => {
      setRecordingDuration((d) => {
        const next = d + 1;
        if (next >= simulatedDuration) {
          clearInterval(interval);
          setRecording(false);
          setSessionState("analyzing");
          setStep("analyzing");
          return next;
        }
        return next;
      });
    }, 1000);
  }, []);

  // Simulate analysis with signal extraction
  const runAnalysis = useCallback(() => {
    // Simulate transcription extraction
    const mockTranscription = `[Detailed response demonstrating knowledge of the topic. I built a system that handles the core requirements and also addressed some edge cases that came up during testing. The approach was systematic — first understanding the requirements, then designing the solution, then implementing and testing each component.]`;

    // Extract signals from the mock transcription
    adaptToCandidateSignals(mockTranscription, recordingDuration);

    setSessionState("analyzing");

    setTimeout(() => {
      const mockAnalysis: QuestionAnalysisResult = {
        questionIndex: currentQuestionIndex,
        question: currentQuestion,
        voice: {
          confidence: 2.5 + Math.random() * 2.5,
          clarity: 2.5 + Math.random() * 2.5,
          pacing: 2.5 + Math.random() * 2.5,
          enthusiasm: 2 + Math.random() * 3,
          fillerWords: 2.5 + Math.random() * 2.5,
          speakingRateWpm: Math.round(100 + Math.random() * 60),
          transcript: mockTranscription,
        },
        facial: {
          eyeContact: 0.5 + Math.random() * 0.5,
          engagement: 0.5 + Math.random() * 0.5,
          confidence: 0.4 + Math.random() * 0.6,
          expressiveness: 0.3 + Math.random() * 0.7,
          dominantEmotion: ["neutral", "focused", "engaged"][Math.floor(Math.random() * 3)],
          emotionTimeline: [
            { timestamp: 0, emotion: "neutral", confidence: 0.8 },
            { timestamp: Math.floor(recordingDuration / 2), emotion: "focused", confidence: 0.7 },
            { timestamp: recordingDuration, emotion: "neutral", confidence: 0.75 },
          ],
        },
        content: {
          technicalAccuracy: 2.5 + Math.random() * 2.5,
          depthOfKnowledge: 2 + Math.random() * 3,
          communicationClarity: 2.5 + Math.random() * 2.5,
          relevance: 3 + Math.random() * 2,
          transcript: mockTranscription,
          keyPoints: ["Candidate discussed key technical concepts", "Provided relevant examples"],
          missingPoints: [],
        },
        combinedScore: 0,
        suggestedFollowUp: `Can you elaborate on your approach to that?`,
      };

      const contentScore = (mockAnalysis.content.technicalAccuracy + mockAnalysis.content.depthOfKnowledge + mockAnalysis.content.communicationClarity) / 3;
      const voiceScore = (mockAnalysis.voice.confidence + mockAnalysis.voice.clarity + mockAnalysis.voice.enthusiasm) / 3;
      const facialScore = (mockAnalysis.facial.eyeContact + mockAnalysis.facial.engagement + mockAnalysis.facial.confidence) / 3;
      mockAnalysis.combinedScore = Math.round((contentScore * 0.5 + voiceScore * 0.25 + facialScore * 0.25) * 10) / 10;

      setAnalysisResults((prev) => [...prev, mockAnalysis]);
      setSessionState("feedback");
      setStep("feedback");
    }, 2000 + Math.random() * 1000);
  }, [recordingDuration, adaptToCandidateSignals]);

  // Generate live feedback
  const generateLiveFeedback = useCallback(() => {
    const feedbacks: LiveFeedback[] = [];
    const dimensions = ["Technical Accuracy", "Communication Clarity", "Confidence", "Engagement"];

    dimensions.forEach((dimension, i) => {
      setTimeout(() => {
        const score = 2 + Math.random() * 3;
        const trend = Math.random() > 0.5 ? "improving" : "stable";
        setLiveFeedbacks((prev) => [
          ...prev,
          {
            timestamp: Date.now(),
            dimension,
            score: Math.round(score * 10) / 10,
            trend,
            message: `${dimension}: ${Math.round(score)}/5 — ${trend === "improving" ? "Getting better" : "Consistent"}`,
            suggestion: trend === "improving" ? undefined : `Try to ${dimension.toLowerCase()} by practicing structured responses`,
          },
        ]);
      }, i * 800);
    });
  }, []);

  // Handle analysis completion
  useEffect(() => {
    if (step === "feedback") {
      generateLiveFeedback();

      setTimeout(() => {
        setLiveFeedbacks([]);
        setSessionState("follow-up");
        setStep("followUp");
      }, 3000);
    }
  }, [step, generateLiveFeedback]);

  // Handle follow-up → next question or finish
  useEffect(() => {
    if (step === "followUp") {
      setIsSpeaking(true);
      setSessionState("avatar-speaking");

      setTimeout(() => {
        setIsSpeaking(false);
        setSessionState("ready");

        setTimeout(() => {
          if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((i) => i + 1);
            setCurrentQuestion(questions[currentQuestionIndex + 1]);
            setStep("question");
            startAvatarQuestion();
          } else {
            setStep("result");
            setSessionState("completed");
            finalizeInterview();
          }
        }, 3000);
      }, 2000);
    }
  }, [step, currentQuestionIndex, questions, startAvatarQuestion]);

  // Finalize the interview
  const finalizeInterview = useCallback(() => {
    const questionResults = analysisResults;
    const overallScore = questionResults.length > 0
      ? Math.round(questionResults.reduce((sum, r) => sum + r.combinedScore, 0) / questionResults.length * 10) / 10
      : 0;

    const avgVoiceConfidence = questionResults.reduce((sum, r) => sum + r.voice.confidence, 0) / questionResults.length || 0;
    const avgEyeContact = questionResults.reduce((sum, r) => sum + r.facial.eyeContact, 0) / questionResults.length || 0;
    const avgTechnical = questionResults.reduce((sum, r) => sum + r.content.technicalAccuracy, 0) / questionResults.length || 0;

    setFinalResult({
      sessionId: `session_${Date.now()}`,
      candidateId: "demo-candidate",
      role: targetRole,
      duration: recordingDuration * questions.length,
      questionCount: questions.length,
      questionsAnswered: questionResults.length,
      questionResults,
      aggregated: {
        voice: {
          confidence: Math.round(avgVoiceConfidence * 10) / 10,
          clarity: Math.round(questionResults.reduce((s, r) => s + r.voice.clarity, 0) / questionResults.length * 10) / 10,
          pacing: Math.round(questionResults.reduce((s, r) => s + r.voice.pacing, 0) / questionResults.length * 10) / 10,
          enthusiasm: Math.round(questionResults.reduce((s, r) => s + r.voice.enthusiasm, 0) / questionResults.length * 10) / 10,
          fillerWordRatio: Math.round(questionResults.reduce((s, r) => s + r.voice.fillerWords, 0) / questionResults.length * 10) / 10,
          avgSpeakingRate: Math.round(questionResults.reduce((s, r) => s + r.voice.speakingRateWpm, 0) / questionResults.length),
          trend: "stable",
        },
        facial: {
          eyeContact: Math.round(avgEyeContact * 10) / 10,
          engagement: Math.round(questionResults.reduce((s, r) => s + r.facial.engagement, 0) / questionResults.length * 10) / 10,
          confidence: Math.round(questionResults.reduce((s, r) => s + r.facial.confidence, 0) / questionResults.length * 10) / 10,
          expressiveness: Math.round(questionResults.reduce((s, r) => s + r.facial.expressiveness, 0) / questionResults.length * 10) / 10,
          dominantEmotion: "neutral",
          emotionDistribution: {},
          trend: "stable",
        },
        content: {
          technicalAccuracy: Math.round(avgTechnical * 10) / 10,
          depthOfKnowledge: Math.round(questionResults.reduce((s, r) => s + r.content.depthOfKnowledge, 0) / questionResults.length * 10) / 10,
          communicationClarity: Math.round(questionResults.reduce((s, r) => s + r.content.communicationClarity, 0) / questionResults.length * 10) / 10,
          avgAnswerLength: 150,
          trend: "stable",
        },
        overall: overallScore,
      },
      inferredProficiency: {
        technicalKnowledge: Math.round(avgTechnical),
        communicationSkills: Math.round(questionResults.reduce((s, r) => s + r.content.communicationClarity, 0) / questionResults.length),
        interviewPresence: Math.round(avgEyeContact * 5),
        interviewConfidence: Math.round(avgVoiceConfidence * 5 / 3),
      },
      strengths: avgTechnical >= 3 ? ["Strong technical knowledge"] : [],
      gaps: avgEyeContact < 3 ? ["Could improve eye contact"] : [],
      recommendations: ["Continue practicing technical questions", "Work on maintaining eye contact"],
      metadata: {
        startTime: Date.now() - recordingDuration * questions.length * 1000,
        endTime: Date.now(),
        language: "en",
        avatarStyle,
        avgSpeakingRate: Math.round(questionResults.reduce((s, r) => s + r.voice.speakingRateWpm, 0) / questionResults.length),
        avgEyeContact: Math.round(avgEyeContact * 100) / 100,
        emotionDistribution: {},
      },
    });
  }, [analysisResults, recordingDuration, questions.length, targetRole, avatarStyle]);

  // Intro step
  if (step === "intro") {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Real-Time Video Interview</h2>
        <p className="text-foreground-muted">
          A live interview session with an AI avatar mentor. The avatar will ask you questions,
          analyze your responses in real-time, and provide live feedback.
          The avatar adapts its tone, pace, and encouragement based on your responses.
        </p>

        <div className="space-y-4 rounded-lg border border-border bg-surface p-4">
          <h3 className="font-medium text-foreground">What to expect:</h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-foreground-muted">
            <li>AI avatar mentor will ask each question via voice (TTS) — pace adjusts to match your speaking style</li>
            <li>You'll record your video response using your webcam</li>
            <li>Live feedback will appear as you're being analyzed (confidence, clarity, pace, engagement)</li>
            <li>After each answer, you'll see your score and suggested follow-up</li>
            <li>At the end, you'll get a complete assessment with aggregated scores</li>
          </ul>
        </div>

        <div className="flex items-center gap-3">
          <Button onClick={() => {
            setSessionState("ready");
            setStep("avatar-intro");
          }} className="flex-1">
            Start Live Interview
          </Button>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  // Avatar intro
  if (step === "avatar-intro") {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Badge variant="secondary">{sessionState}</Badge>
          <Button variant="ghost" onClick={onCancel}>
            Exit
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <AvatarMentor
            question="Hi! I'm your interview mentor. I'll be asking you some questions about your experience. Ready to begin?"
            isSpeaking={isSpeaking}
            onStop={() => {}}
            avatarStyle={avatarStyle}
            candidateSignals={undefined}
          />
        </div>

        <Card className="text-center py-8">
          <CardHeader>
            <CardTitle className="text-lg">Get Ready</CardTitle>
            <CardDescription>
              Make sure your camera and microphone are working.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3 justify-center">
              <Button onClick={() => {
                setIsSpeaking(false);
                setStep("question");
                setSessionState("ready");
                setTimeout(() => startAvatarQuestion(), 500);
              }} className="flex-1">
                I'm Ready
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Question display (avatar speaking)
  if (step === "question" && sessionState === "avatar-speaking") {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Badge variant="secondary">Question {currentQuestionIndex + 1} of {questions.length}</Badge>
          <Button variant="ghost" onClick={onCancel}>
            Exit
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <AvatarMentor
            question={currentQuestion}
            isSpeaking={isSpeaking}
            onStop={() => setIsSpeaking(false)}
            avatarStyle={avatarStyle}
            candidateSignals={candidateSignals || undefined}
          />
        </div>

        {/* Show adaptive encouragement if available */}
        {adaptiveResponse?.encouragement && (
          <Card className="border-l-4 border-l-amber-500 bg-amber-50">
            <CardContent className="flex items-center gap-2 py-2">
              <span className="text-sm text-amber-700">💡</span>
              <span className="text-sm text-amber-800">{adaptiveResponse.encouragement}</span>
            </CardContent>
          </Card>
        )}

        <Card className="text-center py-8">
          <CardContent>
            <p className="text-sm text-foreground-muted">
              {isSpeaking ? "The avatar is speaking the question..." : "The avatar has finished. Get ready to answer."}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Recording step
  if (step === "recording") {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="bg-red-500 text-white">Recording</Badge>
          <Button variant="ghost" onClick={onCancel}>
            Exit
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <AvatarMentor
            question="Listening to your response..."
            isSpeaking={false}
            onStop={() => {}}
            avatarStyle={avatarStyle}
            candidateSignals={undefined}
          />
        </div>

        <VideoInterview
          onVideoCapture={() => {
            setRecording(false);
            runAnalysis();
          }}
          onCancel={() => {
            setRecording(false);
            setStep("question");
            setIsSpeaking(true);
            startAvatarQuestion();
          }}
          question={currentQuestion}
          isRecording={recording}
          recordingDuration={recordingDuration}
        />

        <div className="flex items-center gap-4">
          <div className="flex-1 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-foreground-muted">Recording</span>
              <span className="text-foreground">{Math.floor(recordingDuration)}s</span>
            </div>
            <Progress value={Math.min(100, (recordingDuration / 40) * 100)} className="h-2" />
          </div>
          <Button
            onClick={() => {
              setRecording(false);
              runAnalysis();
            }}
            disabled={recordingDuration < 5}
            className="flex-1"
          >
            {recordingDuration < 5 ? "Speak for at least 5 seconds" : "Done Speaking"}
          </Button>
        </div>
      </div>
    );
  }

  // Analyzing step
  if (step === "analyzing") {
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
            avatarStyle={avatarStyle}
            candidateSignals={undefined}
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
            Voice, facial, and content analysis in progress.
          </p>
        </Card>
      </div>
    );
  }

  // Feedback step
  if (step === "feedback") {
    const lastAnalysis = analysisResults[analysisResults.length - 1];

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Badge variant="secondary">Your Feedback</Badge>
          <Button variant="ghost" onClick={onCancel}>
            Exit
          </Button>
        </div>

        {/* Live feedback items */}
        <div className="space-y-3">
          {liveFeedbacks.map((feedback, i) => (
            <Card key={i} className="border-l-4 border-l-teal-500">
              <CardContent className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-medium text-foreground">{feedback.dimension}</p>
                  <p className="text-xs text-foreground-muted">{feedback.message}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={(feedback.score / 5) * 100} className="w-16 h-2" />
                  <span className="text-sm font-medium">{feedback.score}/5</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Combined score */}
        {lastAnalysis && (
          <Card className="bg-teal-50 border-teal-500">
            <CardHeader>
              <CardTitle className="text-lg">Question Score</CardTitle>
              <CardDescription>
                Combined score from voice + facial + content analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center gap-4">
                <div className="text-4xl font-bold text-teal-600">{lastAnalysis.combinedScore}/5</div>
                <div className="text-left">
                  <p className="text-sm text-foreground-muted">
                    Content: {lastAnalysis.content.technicalAccuracy.toFixed(1)} · Voice: {lastAnalysis.voice.confidence.toFixed(1)} · Facial: {lastAnalysis.facial.eyeContact.toFixed(1)}
                  </p>
                  {lastAnalysis.suggestedFollowUp && (
                    <p className="text-xs text-foreground-muted mt-2">
                      Suggested follow-up: "{lastAnalysis.suggestedFollowUp}"
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex items-center gap-3">
          <Button onClick={() => {
            setStep("followUp");
            setSessionState("follow-up");
          }} className="flex-1">
            Continue
          </Button>
        </div>
      </div>
    );
  }

  // Follow-up step (avatar speaking)
  if (step === "followUp") {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Badge variant="secondary">Follow-Up</Badge>
          <Button variant="ghost" onClick={onCancel}>
            Exit
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <AvatarMentor
            question="Great answer! Let me ask you a follow-up..."
            isSpeaking={isSpeaking}
            onStop={() => setIsSpeaking(false)}
            avatarStyle={avatarStyle}
            candidateSignals={candidateSignals || undefined}
          />
        </div>

        <Card className="text-center py-8">
          <CardContent>
            <p className="text-sm text-foreground-muted">
              {isSpeaking ? "The avatar is asking a follow-up question..." : "Get ready for the next question."}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Result step
  if (step === "result" && finalResult) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Badge variant="secondary">Interview Complete</Badge>
          <Button variant="outline" onClick={() => setStep("intro")}>
            New Interview
          </Button>
        </div>

        {/* Overall score */}
        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-2xl">Real-Time Interview Results</CardTitle>
            <CardDescription>
              {finalResult.questionsAnswered} questions answered in {Math.floor(finalResult.duration)} seconds
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center gap-4">
              <div className="text-5xl font-bold text-teal-500">{finalResult.aggregated.overall}/5</div>
              <div className="text-left">
                <p className="text-sm text-foreground-muted">Overall score from real-time analysis</p>
                <p className="text-xs text-foreground-muted mt-2">
                  Voice: {finalResult.aggregated.voice.confidence.toFixed(1)} · Facial: {finalResult.aggregated.facial.eyeContact.toFixed(1)} · Content: {finalResult.aggregated.content.technicalAccuracy.toFixed(1)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Aggregated scores */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Aggregated Scores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <h4 className="font-medium text-foreground">Voice Analysis</h4>
                {[
                  { label: "Confidence", value: finalResult.aggregated.voice.confidence },
                  { label: "Clarity", value: finalResult.aggregated.voice.clarity },
                  { label: "Pacing", value: finalResult.aggregated.voice.pacing },
                  { label: "Enthusiasm", value: finalResult.aggregated.voice.enthusiasm },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground-muted">{item.label}</span>
                      <span>{item.value.toFixed(1)}/5</span>
                    </div>
                    <Progress value={(item.value / 5) * 100} className="mt-1" />
                  </div>
                ))}
              </div>
              <div className="space-y-3">
                <h4 className="font-medium text-foreground">Facial Analysis</h4>
                {[
                  { label: "Eye Contact", value: finalResult.aggregated.facial.eyeContact },
                  { label: "Engagement", value: finalResult.aggregated.facial.engagement },
                  { label: "Confidence", value: finalResult.aggregated.facial.confidence },
                  { label: "Expressiveness", value: finalResult.aggregated.facial.expressiveness },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground-muted">{item.label}</span>
                      <span>{item.value.toFixed(1)}/5</span>
                    </div>
                    <Progress value={(item.value / 5) * 100} className="mt-1" />
                  </div>
                ))}
              </div>
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
                {finalResult.strengths.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <svg className="h-4 w-4 shrink-0 mt-0.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {s}
                  </li>
                ))}
                {finalResult.strengths.length === 0 && (
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
                {finalResult.gaps.map((g, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <svg className="h-4 w-4 shrink-0 mt-0.5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {g}
                  </li>
                ))}
                {finalResult.gaps.length === 0 && (
                  <li className="text-sm text-foreground-muted">No specific gaps identified</li>
                )}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Recommendations */}
        {finalResult.recommendations.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {finalResult.recommendations.map((r, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <svg className="h-4 w-4 shrink-0 mt-0.5 text-foreground-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    {r}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Navigate */}
        <div className="flex items-center gap-3">
          <Button onClick={() => onComplete(finalResult)} className="flex-1">
            Use This Assessment
          </Button>
          <Button variant="outline" onClick={() => setStep("intro")}>
            Start Over
          </Button>
        </div>
      </div>
    );
  }

  return null;
}
