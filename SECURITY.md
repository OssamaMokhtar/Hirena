# Security

**Status:** Prototype — not production hardened.

## Architecture Security Model

- The Gemini API key is held server-side only.
- A build-time check asserts the key cannot appear in the client bundle.
- The key is never exposed to the browser.
- CV parsing: uploaded CVs are processed server-side and not persisted by default.

## Data Classification

| Data Type | Classification | Notes |
|-----------|---------------|-------|
| CV/resume data | Sensitive (PII) | Uploaded resumes, extracted skills, experience |
| Cognitive assessment data | Sensitive | Assessment results, reasoning baselines |
| Market insights data | Internal | Aggregated market demand data |

## Known Security Gaps

| Gap | Severity | Roadmap |
|-----|----------|---------|
| No encryption at rest for CV data | High | Pre-production |
| No RBAC | High | Pre-production |
| No SSO | High | Pre-production |
| No penetration test | High | Pre-production |
| No dependency vulnerability scanning | Medium | CI (this PR) |
| Tailwind CSS loaded from CDN (known production issue) | Medium | Move to PostCSS plugin |

## Reporting a Vulnerability

Contact the maintainer directly. Do not open a public issue for security vulnerabilities.

---

*See [Improvement Plan — Hirena](../../Obsidian/Portfolio-Due-Diligence/06-Improvement-Plan-Hirena.md) for the full security hardening roadmap.*
