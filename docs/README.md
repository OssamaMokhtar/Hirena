# Hirena — Architecture docs

> Status: AUTHORED · Updated 2026-09-23 · Owner: Ossama Mokhtar

Hirena is a **text-only** skills self-assessment for product managers. These docs describe the code as it is. Earlier designs (video interview, voice and facial analysis) are in [`archive/`](archive/README.md) and are no longer part of the product.

| # | Doc | What it answers |
|---|---|---|
| 00 | [Status](00-status.md) | What is built, what is not, deployment |
| 01 | [System architecture](01-system-architecture.md) | Components and request flow |
| 02 | [Data model](02-data-model.md) | Competency model, assessment result, stored data |
| 03 | [API](03-api.md) | Routes, including the removed ones |
| 04 | [AI architecture](04-ai-architecture.md) | Where GPT-4o is used, fallback, labelling |
| 05 | [Scoring engine](05-scoring-engine.md) | How a score is computed |
| 07 | [Evaluation](07-evaluation.md) | What is tested and what is not validated |
| 08 | [Security and compliance](08-security-and-compliance.md) | Threats, the key leak, EU AI Act position |
| 10 | [Decision log](10-decision-log.md) | ADRs with reversal triggers |
| — | [Gaps](GAPS.md) | Ranked open issues |
| — | [STOP SHIP log](STOP-SHIP.md) | Compliance and security fixes, 23 Sep 2026 |
| — | [PRD](PRD.md) · [Competency models](competency-models.md) · [Roadmap](roadmap.md) | Planning docs; sections on video/voice/facial analysis are superseded |
