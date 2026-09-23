# Hirena — Security and compliance

> Status: AUTHORED · Updated 2026-09-23 · Owner: Ossama Mokhtar

| Issue | Severity | Status |
|---|---|---|
| `/api/verify-env` and `/api/test-env` returned the first characters of the OpenAI key | Critical | Fixed (410) and guarded by a test. **Rotate the key if it was ever deployed** |
| Emotion inference from voice and face in interviews (EU AI Act Art. 5(1)(f)) | Critical (regulatory) | Removed: endpoints, UI, fusion engine and preference toggle |
| Rule-based results shown as AI | High (honesty) | Labelled |
| No rate limit on `/api/assess` (cost abuse once credit exists) | Medium | Open (GAPS #3) |
| Free-text evidence sent to OpenAI | Medium (privacy) | Needs an in-product disclosure (GAPS #5) |

## Regulatory position

- **EU AI Act:** the product must not infer emotions (Art. 5(1)(f)). If Hirena were ever sold to employers to assess candidates or staff, it would become a high-risk system under Annex III, with conformity obligations. The current decision is to stay a B2C self-development tool (ADR-002).
- **UAE PDPL / GDPR:** accounts hold email and assessment text. Export and delete are needed before a public launch.
