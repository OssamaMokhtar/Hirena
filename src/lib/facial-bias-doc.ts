// Hirena — Facial Analysis Bias Documentation & Ethical Transparency
//
// This module provides the full bias documentation that must be shown to users
// BEFORE they enable facial analysis. It explains what facial analysis is,
// its limitations, known bias risks, and ethical guidelines for use.
//
// POSITION:
//   Facial analysis is an OPTIONAL, EXPERIMENTAL feature. It is OFF by default.
//   Users must explicitly opt in. We provide full transparency about what it
//   does, what it doesn't do, and the known risks.
//
// BACKGROUND:
//   - HireVue dropped facial analysis in 2021 after criticism from ethicists,
//     lawmakers, and civil rights groups.
//   - The EU AI Act (2024) classifies AI used for hiring/promotion as "high-risk."
//   - NYC Local Law 144 (2023) requires bias audits for automated employment
//     decision tools — facial analysis would likely fall under this.
//   - Colorado AI Act (2026) extends similar protections.
//   - TestGorilla and Criteria Corp avoid facial analysis entirely — they use
//     only transcript/audio analysis.
//
// HIRENA'S APPROACH:
//   We offer facial analysis as a VOLUNTARY coaching tool — not a scoring or
//   ranking mechanism. It provides supplementary feedback on non-verbal
//   communication (eye contact, expressiveness, smile warmth) for self-
//   improvement purposes only. It does NOT contribute to any assessment score.
//
//   If you're uncomfortable with facial analysis, you can disable it and still
//   receive full interview feedback from transcript and audio analysis.

export const FACIAL_ANALYSIS_BIAS_DOCUMENTATION = {
  featureName: "Facial Analysis (Experimental)",
  version: "1.0",
  lastUpdated: "2026-09-17",
  status: "optional-experimental",
  defaultEnabled: false,

  purpose: "Supplementary coaching feedback on non-verbal communication signals during video interview practice. NOT used for scoring, ranking, or employment decisions.",

  howItWorks: [
    "When you enable facial analysis, Hirena analyzes key frames from your video interview response using computer vision techniques.",
    "We measure: eye contact with the camera, facial expressiveness, smile warmth, and stress indicators (brow furrow, blink rate).",
    "Results are presented as coaching feedback — not scores or rankings.",
    "No facial embeddings or biometric data are stored. Analysis is performed on the frames extracted from your video, and results are transient.",
  ],

  whatItMeasures: [
    {
      dimension: "Eye Contact",
      description: "How often you look at the camera during your response. Good eye contact is generally seen as engaging and confident.",
      caveat: "Eye contact norms vary across cultures. In some cultures, looking away is respectful or normal. Our metric may not reflect this cultural variation.",
    },
    {
      dimension: "Expressiveness",
      description: "How much facial expression you show — smiles, eyebrow movements, head movements. Expressiveness can signal engagement and communication skill.",
      caveat: "Expressiveness varies widely by personality, culture, and neurotype. Neurodivergent individuals (e.g., autism, ADHD) may have different natural expressiveness levels, which doesn't reflect communication capability.",
    },
    {
      dimension: "Smile Warmth",
      description: "The degree of positive facial expression — smiles, warm expressions. Can indicate approachability and positive affect.",
      caveat: "Smile norms vary by context and culture. A neutral or serious expression may be entirely appropriate for certain questions or roles. Our metric may penalize neutral expressions that are contextually appropriate.",
    },
    {
      dimension: "Stress Indicators",
      description: "Signals that may indicate stress or nervousness — increased brow furrowing, rapid blinking, facial tension.",
      caveat: "Stress indicators are ambiguous. Brow furrowing can mean concentration, thought, or stress. Blinking varies naturally. These signals are weak and should not be over-interpreted.",
    },
  ],

  limitations: [
    {
      risk: "Cultural variation in eye contact norms",
      description: "Direct eye contact is interpreted differently across cultures. In some cultures it signals respect and engagement; in others, looking away is normal or even preferred. Our eye contact metric may penalize candidates from cultures with different norms.",
      impact: "Candidates from certain cultural backgrounds may receive lower eye contact scores without any deficiency in communication skill.",
    },
    {
      risk: "Expression style varies by neurotype and personality",
      description: "Neurodivergent individuals (autism, ADHD, etc.) may have naturally different facial expressiveness, eye contact patterns, or smiling tendencies. These differences don't reflect communication ability or job fit.",
      impact: "Facial analysis scores may not accurately reflect the communication capabilities of neurodivergent users.",
    },
    {
      risk: "Smile and warmth are context-dependent",
      description: "A neutral or serious expression may be entirely appropriate for technical, serious, or analytical questions. Our model may interpret neutrality as lower warmth, even when the candidate is appropriately focused.",
      impact: "Smile warmth scores may be misleading for roles or questions where neutrality is expected or preferred.",
    },
    {
      risk: "Computer vision models have demographic biases",
      description: "Facial analysis models, like many computer vision systems, have been shown to have varying accuracy across skin tones, facial structures, and demographic groups. This is a well-documented limitation of the underlying technology.",
      impact: "Measurement accuracy may vary across users, potentially leading to unfair or inconsistent feedback across demographic groups.",
    },
    {
      risk: "Stress indicators are weak and ambiguous signals",
      description: "Brow furrow, blink rate, and other stress signals can indicate stress — but also concentration, thinking, fatigue, lighting conditions, camera angle, or simply natural variation. They are not reliable diagnostic signals for stress or anxiety.",
      impact: "Stress scores should be treated as weak, suggestive signals at best — not definitive indicators of stress, anxiety, or inability to handle pressure.",
    },
    {
      risk: "Frame extraction and quality limitations",
      description: "We extract key frames from your video at intervals. The quality of analysis depends on video resolution, lighting, camera angle, frame rate, and other technical factors. Poor video quality can lead to inaccurate or missing analysis.",
      impact: "Results may be less accurate or unavailable for videos with poor lighting, low resolution, unusual camera angles, or technical issues.",
    },
    {
      risk: "Not validated for hiring decisions",
      description: "Facial analysis has NOT been validated as a predictor of job performance, communication skill, or any employment-relevant outcome. Major providers like HireVue have dropped it for this reason.",
      impact: "Facial analysis should NEVER be used as a factor in hiring or promotion decisions. It is a coaching aid only. Using it for employment decisions could be unfair and may violate emerging regulations.",
    },
  ],

  ethicalGuidelines: [
    "Facial analysis is OFF by default. You must explicitly opt in to use it.",
    "Facial analysis results do NOT contribute to your assessment score or any ranking.",
    "Facial analysis is provided for self-improvement and coaching purposes only.",
    "No facial biometric data is stored. Analysis is performed on extracted frames and results are transient.",
    "You can disable facial analysis at any time in settings.",
    "If you find facial analysis uncomfortable or unhelpful, you can turn it off and still receive full interview feedback from transcript and audio analysis.",
    "We recommend using transcript + audio analysis as the primary feedback channel, with facial analysis as an optional supplement.",
    "Do not use facial analysis results as the basis for hiring, promotion, or any employment decision.",
    "Be aware that facial analysis may reflect cultural, neurodiversity, and demographic biases inherent in computer vision technology.",
  ],

  regulatoryContext: [
    {
      regulation: "EU AI Act (2024)",
      relevance: "AI used for hiring and promotion is classified as high-risk. If facial analysis were used for employment decisions, it would face significant regulatory requirements including transparency, human oversight, and bias testing.",
    },
    {
      regulation: "NYC Local Law 144 (2023)",
      relevance: "Requires bias audits for automated employment decision tools. If facial analysis were used for hiring decisions, it would likely require annual bias auditing and notification to candidates.",
    },
    {
      regulation: "Colorado AI Act (2026)",
      relevance: "Extends algorithmic discrimination protections to Colorado residents. Facial analysis in employment decisions would require impact assessments and consumer notice.",
    },
    {
      precedent: "HireVue (2021)",
      relevance: "HireVue, a major hiring platform, dropped facial analysis from their platform in 2021 after public criticism and regulatory scrutiny, citing concerns about bias and the lack of validation for hiring decisions.",
    },
    {
      precedent: "TestGorilla / Criteria Corp",
      relevance: "Major assessment platforms TestGorilla and Criteria Corp do not offer facial video analysis. They use only audio transcript analysis for interview assessment, avoiding the bias and privacy concerns of facial analysis.",
    },
  ],

  disclaimer: `Facial Analysis is an experimental coaching feature. It is NOT used for scoring, ranking, or employment decisions.

The signals it provides (eye contact, expressiveness, smile warmth, stress indicators) are generated by computer vision analysis of video frames and may be affected by:

- Cultural differences in eye contact and expression norms
- Neurodiversity and individual personality differences
- Technical factors: lighting, camera quality, resolution, angle
- Demographic variations in computer vision model accuracy
- Contextual appropriateness of expression (a neutral face may be correct for serious questions)

Use these insights for self-awareness and coaching — not as definitive measures of your communication ability or interview performance.

You can disable facial analysis at any time. Transcript and audio analysis remain available as the primary feedback channel.`,

  providerApproaches: [
    { provider: "HireVue", approach: "Dropped facial analysis in 2021. Now uses only transcript/audio analysis." },
    { provider: "TestGorilla", approach: "No facial video analysis. Uses transcript analysis only." },
    { provider: "Criteria Corp", approach: "No facial video analysis. Uses transcription and structured scoring." },
    { provider: "Hirena", approach: "Optional, experimental facial analysis for coaching only. OFF by default. Does not affect scores. Full bias disclosure provided. Users can opt out at any time." },
  ],

  recommendation: "For most users, we recommend keeping facial analysis disabled and relying on transcript + audio analysis for interview feedback. Enable facial analysis only if you want supplementary non-verbal coaching and understand the limitations described above.",
} as const;

export type FacialBiasInfo = typeof FACIAL_ANALYSIS_BIAS_DOCUMENTATION;
