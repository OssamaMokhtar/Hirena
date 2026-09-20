// Hirena — Facial Analysis Bias Documentation & Ethical Transparency
// This module provides the full bias documentation text shown to users BEFORE
// they enable facial analysis. It explains what facial analysis is, its
// limitations, known bias risks, and ethical guidelines for use.
//
// POSITION: Facial analysis is an OPTIONAL, EXPERIMENTAL feature. It is OFF
// by default. Users must explicitly opt in. We provide full transparency.

export const FacialBiasDoc = `FACIAL ANALYSIS BIAS & ETHICS DOCUMENTATION
============================================

WHAT IS FACIAL ANALYSIS?
-------------------------
Facial analysis uses computer vision to assess facial expressions, eye contact,
head pose, and emotional indicators from video. In Hirena, it is used during
interview practice sessions to provide coaching feedback on non-verbal
communication signals.

WHAT IT MEASURES:
- Eye contact percentage (looking at camera vs. away)
- Dominant emotion distribution (neutral, focused, confused, happy, surprised)
- Smile intensity and warmth indicators
- Brow furrow / stress indicators
- Expressiveness score
- Head pose variation (pitch, yaw, roll)

WHAT IT DOES NOT DO:
- Make pass/fail or hire/no-hire decisions
- Evaluate technical competency
- Replace human judgment in hiring
- Guarantee accurate emotion detection (emotion AI is scientifically contested)

KNOWN BIAS RISKS:
------------------
Facial analysis technology has documented biases across multiple dimensions:

1. RACE & ETHNICITY
   - Studies show facial recognition/analysis systems have higher error rates
     for people with darker skin tones (Buolamwini & Gebru, 2018 "Gender Shades")
   - Emotion classification accuracy varies by racial group in multiple studies
   - Reference datasets have historically been skewed toward light-skinned faces

2. GENDER
   - Gender classification errors are higher for women, especially women with
     darker skin (up to 34% error in some systems per Gender Shades study)
   - Expression interpretation can be gendered (e.g., "assertive" vs "aggressive")

3. AGE
   - Accuracy degrades for children and older adults
   - Wrinkles, facial structure changes, and skin texture variations affect
     feature detection reliability

4. DISABILITY
   - People with facial differences, paralysis (e.g., Bell's palsy, cerebral palsy),
     or conditions affecting facial movement (e.g., Parkinson's) may receive
     inaccurate or misleading scores
   - Eye contact norms vary for some neurodivergent people (e.g., Autistic individuals
     may avoid eye contact as a communication preference, not disengagement)
   - The technology may misinterpret natural facial resting positions

5. NEURODIVERSITY
   - Autism, ADHD, social anxiety, and other neurodivergent conditions can affect
     eye contact patterns, facial expressiveness, and movement in ways that
     differ from neurotypical norms
   - "Expected" facial behaviors in interviews are based on neurotypical norms
   - High-stress interviews may amplify differences for neurodivergent candidates

6. NON-NATIVE SPEAKERS & CULTURAL DIFFERENCES
   - Eye contact norms vary significantly across cultures (direct eye contact is
     considered respectful in some cultures, confrontational in others)
   - Facial expressiveness norms vary by culture
   - Emotion expression and reading are culturally learned skills
   - Language processing load in non-native speakers may reduce apparent
     facial engagement (cognitive load competes with expression)

REGULATORY CONTEXT:
-------------------
- EU AI Act (2024): Classifies AI used for hiring/promotion decisions as "high-risk"
  requiring conformity assessments, risk management, data governance, transparency,
  human oversight, and accuracy/robustness requirements
- NYC Local Law 144 (2023): Requires bias audits for automated employment decision
  tools (AEDTs) used in hiring/promotion — facial analysis tools would likely fall
  under this regulation
- Colorado AI Act (2026): Extends similar protections for high-risk AI systems
- Several other US states and cities considering similar legislation
- HireVue dropped facial analysis in 2021 after sustained criticism from ethicists,
  lawmakers, civil rights groups, and the public

WHY HIREVA DROPPED FACIAL ANALYSIS (2021):
-------------------------------------------
HireVue, one of the largest video interview platforms, removed facial analysis
from their hiring products in 2021. Their stated reasons included:
- Evolving legal landscape around AI in hiring
- Public and expert criticism of bias risks
- Lack of scientific consensus on emotion AI validity
- Commitment to focus on language-based analysis instead

This decision by a major industry player signals that even well-resourced
companies found the bias risks and legal exposure unacceptable.

HIRENA'S ETHICAL SAFEGUARDS:
-----------------------------
1. VOLUNTARY OPT-IN ONLY
   Facial analysis is OFF by default. Users must explicitly enable it.
   It can be disabled at any time from Settings.

2. NEVER USED FOR REJECTION DECISIONS
   Facial analysis results are coaching suggestions only.
   Hirena does NOT use facial analysis scores for:
   - Pass/fail decisions
   - Hiring recommendations
   - Ranking or shortlisting candidates
   - Any employment decision

3. CLEAR LABELING
   All facial analysis outputs are clearly labeled as "coaching feedback"
   and "experimental." Results show the limitations and should not be
   interpreted as accurate emotion detection.

4. BIAS DISCLAIMER SHOWN BEFORE ENABLING
   Users see this documentation and an explicit warning before enabling
   facial analysis. The warning explains known bias risks.

5. REGULAR AUDITS RECOMMENDED
   We recommend periodic bias audits of facial analysis output across
   demographic groups, especially as the technology evolves.
   Hirena will implement audit processes as the feature matures.

6. ALTERNATIVE PATH ALWAYS AVAILABLE
   Users who do not want facial analysis can use all Hirena features
   (including interview practice) without it. No functionality is locked
   behind the facial analysis toggle.

RECOMMENDATION FOR USERS:
--------------------------
- Use facial analysis as ONE signal among many in your self-assessment
- Do not over-interpret emotion scores — the technology is imperfect
- Be aware that your facial expression patterns may be read differently
  than intended due to the biases listed above
- Disable facial analysis if you have:
  * A condition affecting facial movement or expression
  * Cultural/communication preferences around eye contact
  * Privacy concerns about video analysis
- Provide feedback on inaccurate assessments so we can improve

QUESTIONS OR CONCERNS?
-----------------------
If you have questions about facial analysis, bias concerns, or want to
report inaccurate/biased results, contact us at the Hirena support channel.

Last updated: 2026
Next review: Every 6 months or when significant regulatory/technology changes occur.`;

export function getFacialBiasSummary(): string {
  return "Facial analysis is experimental and may reflect biases across race, gender, age, disability, neurodiversity, and culture. It is used for coaching feedback only — never for hiring decisions. Opt-in only. See full documentation for details.";
}
