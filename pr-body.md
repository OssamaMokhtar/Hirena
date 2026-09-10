## Summary
- Add Step 4 (AI Skill Analysis) to assessment wizard: describe experience for rated skills, AI infers proficiency level independently of self-rating
- Add Step 5 (Review & Submit): previews AI analysis inputs before submit
- Scoring engine merges AI-inferred levels over self-assessment; marks isAiInferred=true with confidence and evidence from AI reasoning
- API route calls inferAllSkills() when aiInferenceInputs provided, passes results to computeAssessmentResult
- Wizard POST body builds aiInferenceInputs from non-empty descriptions
- Add debug details/stack to API error response in dev mode for diagnosis

## Test plan
- [ ] Restart dev server, verify `/api/verify-env` returns hasKey: true
- [ ] Run assessment without aiInferenceInputs — should return full AssessmentResult (self-assessment only)
- [ ] Run assessment with aiInferenceInputs — should return AI-inferred levels with confidence + reasoning (requires OpenAI credits)
- [ ] Walk through wizard: Profile → Goal → Self-rate → AI Skill Analysis (describe experience) → Review & Submit → results dashboard shows AI tag on inferred skills
- [ ] Verify results dashboard renders isAiInferred skills with evidence text

## Notes
- OpenAI key must be set in `.env.local` (gitignored)
- AI inference path returns 429 if OpenAI account has no credits — self-assessment path works without credits
- 5 files changed: 3 new API routes, modified wizard, modified scoring engine
