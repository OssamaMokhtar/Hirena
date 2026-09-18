import type { Skill, ProficiencyLevel, CompetencyArea, CareerLadderStep } from '@/types';

export const SKILLS: Record<string, Skill> = {
  // Security Fundamentals
  'security-fundamentals': {
    id: 'security-fundamentals', name: 'Security Fundamentals',
    description: 'Core security concepts: CIA triad (confidentiality, integrity, availability), defense in depth, least privilege, zero trust, security principles, security vs. usability tradeoffs, security mindset.',
    category: 'security-fundamentals', level: 0,
  },
  'threat-modeling': {
    id: 'threat-modeling', name: 'Threat Modeling',
    description: 'Threat modeling methodologies (STRIDE, PASTA, attack trees), identifying threats, risk assessment, mitigation strategies, threat modeling in design phase, continuous threat modeling, integrating with SDLC.',
    category: 'security-fundamentals', level: 0,
  },
  'security-architecture': {
    id: 'security-architecture', name: 'Security Architecture',
    description: 'Designing secure systems: security architecture patterns, secure by design, security controls, network security architecture, application security architecture, cloud security architecture, security reference architectures.',
    category: 'security-fundamentals', level: 0,
  },
  // Application Security
  'secure-coding-practices': {
    id: 'secure-coding-practices', name: 'Secure Coding Practices',
    description: 'Secure coding guidelines, input validation, output encoding, parameterized queries, avoiding common vulnerabilities, secure code review, secure coding standards (OWASP, CERT), language-specific security considerations.',
    category: 'application-security', level: 0,
  },
  'owasp-top-10': {
    id: 'owasp-top-10', name: 'OWASP Top 10 & Web Vulnerabilities',
    description: 'Deep knowledge of OWASP Top 10: injection, broken auth, sensitive data exposure, XML external entities, broken access control, security misconfiguration, XSS, insecure deserialization, vulnerable components, insufficient logging.',
    category: 'application-security', level: 0,
  },
  'authentication-authorization': {
    id: 'authentication-authorization', name: 'Authentication & Authorization',
    description: 'AuthN/AuthZ systems: OAuth 2.0, OIDC, SAML, JWT, session management, password storage (bcrypt, Argon2), MFA, RBAC, ABAC, policy engines (OPA), API keys, token management.',
    category: 'application-security', level: 0,
  },
  'api-security': {
    id: 'api-security', name: 'API Security',
    description: 'Securing APIs: REST/GraphQL/gRPC security, API gateways, rate limiting, input validation, authentication/authorization for APIs, API security testing, OWASP API Security Top 10, API versioning security.',
    category: 'application-security', level: 0,
  },
  // Cryptography
  'cryptography-basics': {
    id: 'cryptography-basics', name: 'Cryptography Basics',
    description: 'Symmetric vs asymmetric encryption, hashing (SHA-256, bcrypt), digital signatures, TLS/SSL, certificate management, encrypting data at rest and in transit, key management basics, cryptographic protocols.',
    category: 'cryptography-privacy', level: 0,
  },
  'encryption-data-protection': {
    id: 'encryption-data-protection', name: 'Encryption & Data Protection',
    description: 'Data encryption strategies, encryption at rest and in transit, key management (KMS, HSM), secrets management (Vault, AWS Secrets Manager), data masking, tokenization, data lifecycle protection.',
    category: 'cryptography-privacy', level: 0,
  },
  'privacy-engineering': {
    id: 'privacy-engineering', name: 'Privacy Engineering',
    description: 'Privacy by design, GDPR/CCPA compliance, data minimization, purpose limitation, consent management, privacy impact assessments (PIA), data subject rights, privacy-preserving technologies (differential privacy, federated learning).',
    category: 'cryptography-privacy', level: 0,
  },
  // Infrastructure Security
  'network-security': {
    id: 'network-security', name: 'Network Security',
    description: 'Network security: firewalls, IDS/IPS, network segmentation, VPN, zero trust networking, DDoS protection, secure network architecture, cloud network security (VPC, security groups, NACLs), WAF.',
    category: 'infrastructure-security', level: 0,
  },
  'cloud-security': {
    id: 'cloud-security', name: 'Cloud Security',
    description: 'Cloud security: AWS/Azure/GCP security services, IAM, security groups, KMS, cloud security best practices, shared responsibility model, serverless security, container security, cloud security posture management.',
    category: 'infrastructure-security', level: 0,
  },
  'container-kubernetes-security': {
    id: 'container-kubernetes-security', name: 'Container & Kubernetes Security',
    description: 'Container security: image scanning, minimal base images, container isolation, Kubernetes security (RBAC, network policies, pod security standards, secrets management), runtime security, supply chain security.',
    category: 'infrastructure-security', level: 0,
  },
  'infrastructure-as-code-security': {
    id: 'infrastructure-as-code-security', name: 'Infrastructure as Code Security',
    description: 'Securing IaC: Terraform security, CloudFormation security, policy as code (Sentinel, Open Policy Agent), IaC scanning, secure defaults, drift detection, securing CI/CD for infrastructure.',
    category: 'infrastructure-security', level: 0,
  },
  // Security Testing
  'vulnerability-assessment': {
    id: 'vulnerability-assessment', name: 'Vulnerability Assessment & Scanning',
    description: 'Vulnerability scanning, SAST, DAST, dependency scanning (SCA), container scanning, infrastructure scanning, vulnerability management process, prioritization, remediation tracking, scan interpretation.',
    category: 'security-testing', level: 0,
  },
  'penetration-testing-basics': {
    id: 'penetration-testing-basics', name: 'Penetration Testing Basics',
    description: 'Penetration testing methodologies, reconnaissance, scanning, exploitation basics, post-exploitation, reporting, scope definition, rules of engagement, safe exploitation, remediation verification.',
    category: 'security-testing', level: 0,
  },
  'security-testing-strategy': {
    id: 'security-testing-strategy', name: 'Security Testing Strategy',
    description: 'Building security testing programs: security testing pyramid, when to use SAST/DAST/SARIF/IAST, integrating security testing into CI/CD, threat-driven testing, red team vs. blue team, chaos engineering for security.',
    category: 'security-testing', level: 0,
  },
  // Incident Response
  'incident-response-basics': {
    id: 'incident-response-basics', name: 'Incident Response Basics',
    description: 'Incident response lifecycle (NIST SP 800-61): preparation, detection, containment, investigation, eradication, recovery, lessons learned. Incident response planning, tabletop exercises, incident classification.',
    category: 'incident-response-forensics', level: 0,
  },
  'monitoring-detection': {
    id: 'monitoring-detection', name: 'Security Monitoring & Detection',
    description: 'Security monitoring: SIEM, log analysis, alerting, anomaly detection, threat hunting, detecting indicators of compromise (IOCs), security dashboards, effective alerting, reducing false positives.',
    category: 'incident-response-forensics', level: 0,
  },
  'digital-forensics-basics': {
    id: 'digital-forensics-basics', name: 'Digital Forensics Basics',
    description: 'Digital forensics: evidence collection, chain of custody, disk forensics, memory forensics, network forensics, log analysis for forensics, forensic tools, legal and regulatory considerations.',
    category: 'incident-response-forensics', level: 0,
  },
  // Compliance & Governance
  'security-compliance': {
    id: 'security-compliance', name: 'Security Compliance & Governance',
    description: 'Security compliance frameworks: SOC 2, ISO 27001, PCI DSS, HIPAA, GDPR, FedRAMP. Compliance mapping, control implementation, audit preparation, compliance automation, security policies and standards.',
    category: 'compliance-governance', level: 0,
  },
  'security-governance-risk': {
    id: 'security-governance-risk', name: 'Security Governance & Risk Management',
    description: 'Security governance: security strategy, security policies, risk management frameworks (NIST RMF, ISO 27005), risk assessment methodologies, risk treatment, security metrics and reporting, board-level communication.',
    category: 'compliance-governance', level: 0,
  },
  // DevSecOps
  'devsecops': {
    id: 'devsecops', name: 'DevSecOps',
    description: 'Integrating security into DevOps: shifting left, security in CI/CD, automated security testing, security champions program, culture of shared responsibility, DevSecOps tools and pipelines, security as code.',
    category: 'devsecops-automation', level: 0,
  },
  'security-automation': {
    id: 'security-automation', name: 'Security Automation',
    description: 'Automating security tasks: automated vulnerability remediation, auto-remediation, security policy automation, security bot development, security workflow automation, SOAR concepts, scriptable security.',
    category: 'devsecops-automation', level: 0,
  },
  // Advanced
  'secure-software-supply-chain': {
    id: 'secure-software-supply-chain', name: 'Secure Software Supply Chain',
    description: 'Software supply chain security: dependency management, package verification, code signing, SBOM (SPDX, CycloneDX), SLSA framework, Sigstore/Cosign, attestation, build integrity, provenance.',
    category: 'advanced-specializations', level: 0,
  },
  'zero-trust-architecture': {
    id: 'zero-trust-architecture', name: 'Zero Trust Architecture',
    description: 'Zero trust principles: never trust, always verify, identity as perimeter, micro-segmentation, least privilege access, continuous verification, zero trust network access (ZTNA), implementing zero trust.',
    category: 'advanced-specializations', level: 0,
  },
  'security-program-management': {
    id: 'security-program-management', name: 'Security Program Management',
    description: 'Building and managing security programs: security roadmap, security budgeting, security team building, security vendor management, security awareness training, stakeholder management, security metrics and OKRs.',
    category: 'advanced-specializations', level: 0,
  },
};

export const COMPETENCY_AREAS: CompetencyArea[] = [
  { id: 'security-fundamentals', name: 'Security Fundamentals', description: 'Core security concepts, threat modeling, security architecture', skills: ['security-fundamentals', 'threat-modeling', 'security-architecture'], weight: 18 },
  { id: 'application-security', name: 'Application Security', description: 'Secure coding, OWASP Top 10, authn/authz, API security', skills: ['secure-coding-practices', 'owasp-top-10', 'authentication-authorization', 'api-security'], weight: 22 },
  { id: 'cryptography-privacy', name: 'Cryptography & Privacy', description: 'Cryptography basics, data encryption, privacy engineering, data protection', skills: ['cryptography-basics', 'encryption-data-protection', 'privacy-engineering'], weight: 14 },
  { id: 'infrastructure-security', name: 'Infrastructure Security', description: 'Network security, cloud security, container/K8s security, IaC security', skills: ['network-security', 'cloud-security', 'container-kubernetes-security', 'infrastructure-as-code-security'], weight: 16 },
  { id: 'security-testing', name: 'Security Testing', description: 'Vulnerability assessment, penetration testing, security testing strategy', skills: ['vulnerability-assessment', 'penetration-testing-basics', 'security-testing-strategy'], weight: 14 },
  { id: 'incident-response-forensics', name: 'Incident Response & Forensics', description: 'Incident response, security monitoring, digital forensics basics', skills: ['incident-response-basics', 'monitoring-detection', 'digital-forensics-basics'], weight: 10 },
  { id: 'compliance-governance', name: 'Compliance & Governance', description: 'Security compliance, governance, risk management', skills: ['security-compliance', 'security-governance-risk'], weight: 8 },
  { id: 'devsecops-automation', name: 'DevSecOps & Automation', description: 'DevSecOps, security automation, CI/CD security integration', skills: ['devsecops', 'security-automation'], weight: 8 },
  { id: 'advanced-specializations', name: 'Advanced Specializations', description: 'Supply chain security, zero trust, security program management', skills: ['secure-software-supply-chain', 'zero-trust-architecture', 'security-program-management'], weight: 4 },
];

export const LEVELS: ProficiencyLevel[] = [0, 1, 2, 3, 4, 5, 6, 7];

export const CAREER_LADDER: CareerLadderStep[] = [
  { title: 'Junior Security Engineer', minLevel: 0, expected: { 'security-fundamentals': 1, 'application-security': 1, 'cryptography-privacy': 1, 'infrastructure-security': 1, 'security-testing': 1, 'incident-response-forensics': 1, 'compliance-governance': 0, 'devsecops-automation': 1, 'advanced-specializations': 0 }, description: 'Entry-level. Learning security fundamentals and secure coding. Assisting with vulnerability scanning. Supporting security operations. Focusing on OWASP Top 10 and basic security tools.' },
  { title: 'Security Engineer', minLevel: 2, expected: { 'security-fundamentals': 2, 'application-security': 2, 'cryptography-privacy': 2, 'infrastructure-security': 2, 'security-testing': 2, 'incident-response-forensics': 2, 'compliance-governance': 1, 'devsecops-automation': 2, 'advanced-specializations': 0 }, description: 'Core role. Implementing security controls and practices. Conducting vulnerability assessments. Integrating security into development workflows. Understanding compliance frameworks.' },
  { title: 'Senior Security Engineer', minLevel: 3, expected: { 'security-fundamentals': 3, 'application-security': 3, 'cryptography-privacy': 3, 'infrastructure-security': 3, 'security-testing': 3, 'incident-response-forensics': 3, 'compliance-governance': 2, 'devsecops-automation': 3, 'advanced-specializations': 1 }, description: 'Operates independently. Designing security solutions. Leading security assessments. Building security automation. Mentoring juniors. Driving security initiatives across teams.' },
  { title: 'Lead Security Engineer / Security Lead', minLevel: 4, expected: { 'security-fundamentals': 3, 'application-security': 4, 'cryptography-privacy': 3, 'infrastructure-security': 4, 'security-testing': 4, 'incident-response-forensics': 3, 'compliance-governance': 3, 'devsecops-automation': 4, 'advanced-specializations': 2 }, description: 'Leading security for a domain/product area. Setting security standards. Driving security architecture decisions. Coordinating security initiatives. Stakeholder management.' },
  { title: 'Principal Security Engineer', minLevel: 5, expected: { 'security-fundamentals': 4, 'application-security': 5, 'cryptography-privacy': 4, 'infrastructure-security': 5, 'security-testing': 4, 'incident-response-forensics': 4, 'compliance-governance': 3, 'devsecops-automation': 4, 'advanced-specializations': 3 }, description: 'Senior security leader across organization. Solving highest-complexity security problems. Setting security technical direction. Recognized expert in application and infrastructure security.' },
  { title: 'Security Engineering Manager / Security Manager', minLevel: 5, expected: { 'security-fundamentals': 3, 'application-security': 4, 'cryptography-privacy': 3, 'infrastructure-security': 4, 'security-testing': 3, 'incident-response-forensics': 3, 'compliance-governance': 4, 'devsecops-automation': 3, 'advanced-specializations': 3 }, description: 'Managing security team. Hiring and developing security engineers. Setting security roadmap. Managing stakeholder expectations. Balancing technical work with people leadership.' },
  { title: 'Director of Security / Head of Security', minLevel: 6, expected: { 'security-fundamentals': 3, 'application-security': 4, 'cryptography-privacy': 3, 'infrastructure-security': 4, 'security-testing': 3, 'incident-response-forensics': 3, 'compliance-governance': 5, 'devsecops-automation': 3, 'advanced-specializations': 3 }, description: 'Leading security organization. Setting security strategy aligned with business goals. Managing security teams and budgets. Executive stakeholder relationships. Building security culture.' },
  { title: 'VP of Security / CISO', minLevel: 6, expected: { 'security-fundamentals': 2, 'application-security': 3, 'cryptography-privacy': 2, 'infrastructure-security': 3, 'security-testing': 2, 'incident-response-forensics': 2, 'compliance-governance': 6, 'devsecops-automation': 2, 'advanced-specializations': 4 }, description: 'Executive leadership for security. Enterprise-wide security vision and strategy. Building security capabilities across organization. Board-level strategic support. Managing security risk at enterprise level.' },
];

export const SKILL_COUNT = Object.keys(SKILLS).length;
export const PILLAR_COUNT = COMPETENCY_AREAS.length;
