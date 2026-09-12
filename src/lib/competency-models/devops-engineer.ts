// Hirena — DevOps Engineer Competency Model
// 24 skills across 5 pillars, proficiency levels 0-7, career ladder.

import type { Skill, ProficiencyLevel, CompetencyArea, CareerLadderStep, RoleCompetencyModel, CompetencyPillar } from '@/types';

export const DEVOPS_ENGINEER_SKILLS: Record<string, Skill> = {
  // Cloud Platforms (5 skills)
  "aws-devops": {
    id: "aws-devops",
    name: "AWS",
    description: "AWS services for DevOps: EC2, S3, RDS, Lambda, ECS/EKS, CloudFront, CloudWatch, IAM, VPC, Route 53, SNS/SQS, Secrets Manager",
    category: "cloud-infrastructure",
    level: 0,
  },
  "gcp-devops": {
    id: "gcp-devops",
    name: "Google Cloud Platform (GCP)",
    description: "GCP services: Compute Engine, Cloud Run, GKE, Cloud Functions, Cloud Storage, BigQuery, IAM, VPC, Cloud Monitoring, Cloud Build",
    category: "cloud-infrastructure",
    level: 0,
  },
  "azure-devops": {
    id: "azure-devops",
    name: "Microsoft Azure",
    description: "Azure services: VMs, App Service, AKS, Functions, Blob Storage, SQL Database, IAM, VNet, Monitor, Azure DevOps",
    category: "cloud-infrastructure",
    level: 0,
  },
  "multi-cloud": {
    id: "multi-cloud",
    name: "Multi-Cloud Strategy",
    description: "Designing multi-cloud architectures: provider comparison, workload placement, cloud-agnostic patterns, cost optimization, vendor lock-in avoidance",
    category: "cloud-infrastructure",
    level: 0,
  },
  "cloud-cost": {
    id: "cloud-cost",
    name: "Cloud Cost Optimization",
    description: "Optimizing cloud costs: right-sizing, reserved instances, spot instances, auto-scaling, cost monitoring, FinOps practices",
    category: "cloud-infrastructure",
    level: 0,
  },

  // CI/CD & Automation (5 skills)
  "ci-cd-devops": {
    id: "ci-cd-devops",
    name: "CI/CD Pipeline Design",
    description: "Designing CI/CD pipelines: build, test, security scan, deploy; tools (GitHub Actions, GitLab CI, Jenkins, CircleCI, ArgoCD); pipeline optimization",
    category: "ci-cd",
    level: 0,
  },
  "deployment-strategies": {
    id: "deployment-strategies",
    name: "Deployment Strategies",
    description: "Deployment patterns: blue-green, canary, rolling, recreate; feature flags; approval gates; rollback strategies; zero-downtime deployments",
    category: "ci-cd",
    level: 0,
  },
  "iac-terraform": {
    id: "iac-terraform",
    name: "Infrastructure as Code (Terraform)",
    description: "Terraform: providers, resources, modules, state management (local, remote, locking), workspaces, plan/apply, best practices",
    category: "ci-cd",
    level: 0,
  },
  "automation-scripting": {
    id: "automation-scripting",
    name: "Automation Scripting",
    description: "Scripting for automation: Bash, Python, PowerShell; automating repetitive tasks; cron jobs; configuration management",
    category: "ci-cd",
    level: 0,
  },
  "gitops": {
    id: "gitops",
    name: "GitOps",
    description: "GitOps practices: ArgoCD, Flux; declarative infrastructure; git as source of truth; sync strategies; rollback via git revert",
    category: "ci-cd",
    level: 0,
  },

  // Containers & Orchestration (5 skills)
  "docker-devops": {
    id: "docker-devops",
    name: "Docker",
    description: "Docker: image building (multi-stage, optimization), container lifecycle, Dockerfile best practices, container security, Docker Compose",
    category: "containerization",
    level: 0,
  },
  "kubernetes-devops": {
    id: "kubernetes-devops",
    name: "Kubernetes",
    description: "Kubernetes: pods, deployments, services, ingress, configmaps, secrets, volumes, HPA, PDB, RBAC, networking, troubleshooting",
    category: "containerization",
    level: 0,
  },
  " Helm": {
    id: "helm",
    name: "Helm",
    description: "Helm: chart development, templating, values management, repositories, releases, hooks, library charts, best practices",
    category: "containerization",
    level: 0,
  },
  "service-mesh": {
    id: "service-mesh",
    name: "Service Mesh (Istio/Linkerd)",
    description: "Service mesh: traffic management, observability, security (mTLS), fault injection, canary deployments, mesh architecture",
    category: "containerization",
    level: 0,
  },
  "serverless-containers": {
    id: "serverless-containers",
    name: "Serverless Containers (Cloud Run / Fargate)",
    description: "Serverless containers: AWS Fargate, Google Cloud Run; cold start optimization, concurrency, scaling, cost, limitations",
    category: "containerization",
    level: 0,
  },

  // Monitoring & Observability (5 skills)
  "monitoring-tools": {
    id: "monitoring-tools",
    name: "Monitoring Tools (Prometheus/Grafana)",
    description: "Prometheus: metrics collection, exporters, alerting rules, recording rules; Grafana: dashboards, panels, variables, alerting",
    category: "observability",
    level: 0,
  },
  "logging": {
    id: "logging",
    name: "Logging Infrastructure",
    description: "Logging: structured logging, log aggregation (ELK, Loki, CloudWatch Logs), log levels, log retention, log analysis, cost management",
    category: "observability",
    level: 0,
  },
  "tracing": {
    id: "tracing",
    name: "Distributed Tracing",
    description: "Distributed tracing: OpenTelemetry, Jaeger, Zipkin; trace context propagation, span attributes, sampling, tracing in microservices",
    category: "observability",
    level: 0,
  },
  "alerting": {
    id: "alerting",
    name: "Alerting & Incident Response",
    description: "Alerting: alert rules, notification channels (PagerDuty, Slack), alert routing, escalation policies, on-call rotation, incident response",
    category: "observability",
    level: 0,
  },
  "slo-sli": {
    id: "slo-sli",
    name: "SLOs, SLIs, SLAs",
    description: "Service level objectives: defining SLIs/SLOs/SLAs, error budgets, burn rate alerts, reliability targets, reporting",
    category: "observability",
    level: 0,
  },

  // Security & Compliance (3 skills)
  "secrets-management": {
    id: "secrets-management",
    name: "Secrets Management",
    description: "Secrets management: HashiCorp Vault, AWS Secrets Manager, Azure Key Vault, GCP Secret Manager; secret rotation, access control, auditing",
    category: "security",
    level: 0,
  },
  "infrastructure-security": {
    id: "infrastructure-security",
    name: "Infrastructure Security",
    description: "Securing infrastructure: network security (VPC, security groups, NACLs), IAM policies, encryption (at rest, in transit), security groups, WAF",
    category: "security",
    level: 0,
  },
  "compliance-devops": {
    id: "compliance-devops",
    name: "Compliance & Governance",
    description: "Compliance: SOC 2, ISO 27001, GDPR; infrastructure compliance as code; audit logging; policy as code (OPA, Sentinel); compliance monitoring",
    category: "security",
    level: 0,
  },

  // Collaboration & Soft Skills (2 skills)
  "devops-culture": {
    id: "devops-culture",
    name: "DevOps Culture & Practices",
    description: "DevOps culture: collaboration between dev and ops, shared responsibility, blameless postmortems, continuous improvement, psychological safety",
    category: "collaboration",
    level: 0,
  },
  "developer-experience": {
    id: "developer-experience",
    name: "Developer Experience (DevEx)",
    description: "Improving developer experience: reducing friction, self-service tools, documentation, onboarding, feedback loops, inner source",
    category: "collaboration",
    level: 0,
  },
};

export const DEVOPS_ENGINEER_PILLARS: CompetencyPillar[] = [
  {
    id: "cloud",
    name: "Cloud Platforms",
    description: "AWS, GCP, Azure, multi-cloud strategy, cloud cost optimization",
    weight: 20,
    categories: ["cloud-infrastructure", "cloud-platforms"],
  },
  {
    id: "cicd",
    name: "CI/CD & Automation",
    description: "CI/CD pipeline design, deployment strategies, infrastructure as code, automation scripting, GitOps",
    weight: 25,
    categories: ["ci-cd", "containerization"],
  },
  {
    id: "containers",
    name: "Containers & Orchestration",
    description: "Docker, Kubernetes, Helm, service mesh, serverless containers",
    weight: 25,
    categories: ["containerization"],
  },
  {
    id: "observability",
    name: "Monitoring & Observability",
    description: "Monitoring tools, logging, distributed tracing, alerting & incident response, SLOs/SLIs/SLAs",
    weight: 20,
    categories: ["observability"],
  },
  {
    id: "security",
    name: "Security & Compliance",
    description: "Secrets management, infrastructure security, compliance & governance",
    weight: 10,
    categories: ["security"],
  },
];

export const DEVOPS_ENGINEER_LEVELS = [
  { level: 0 as ProficiencyLevel, name: "No Experience", description: "No practical experience with this skill" },
  { level: 1 as ProficiencyLevel, name: "Basic", description: "Can understand and use the skill with guidance" },
  { level: 2 as ProficiencyLevel, name: "Intermediate", description: "Can use the skill independently on routine tasks" },
  { level: 3 as ProficiencyLevel, name: "Competent", description: "Can use the skill independently on complex tasks; can troubleshoot" },
  { level: 4 as ProficiencyLevel, name: "Advanced", description: "Can apply the skill to novel problems; can teach others; deep understanding" },
  { level: 5 as ProficiencyLevel, name: "Expert", description: "Recognized expert; can design systems using this skill; can drive best practices" },
  { level: 6 as ProficiencyLevel, name: "Master", description: "Industry-level expertise; can contribute to the field; extensive real-world experience" },
  { level: 7 as ProficiencyLevel, name: "Authority", description: "Thought leader; has shaped the practice; extensive publications, talks, or open-source contributions" },
];

export const DEVOPS_ENGINEER_CAREER_LADDER: CareerLadderStep[] = [
  {
    title: "Junior DevOps Engineer",
    minLevel: 0,
    maxLevel: 2,
    expectedProficiency: {
      "cloud": 1,
      "cicd": 1,
      "containers": 1,
      "observability": 1,
      "security": 1,
    },
    description: "Entry-level DevOps engineer. Learns cloud basics, CI/CD pipelines, and containerization. Works under guidance on routine tasks.",
    typicalYearsOfExperience: "0-2 years",
  },
  {
    title: "DevOps Engineer",
    minLevel: 2,
    maxLevel: 3,
    expectedProficiency: {
      "cloud": 2,
      "cicd": 3,
      "containers": 2,
      "observability": 2,
      "security": 2,
    },
    description: "Mid-level DevOps engineer. Builds and maintains CI/CD pipelines. Manages cloud infrastructure. Deploys and monitors applications. Handles incidents.",
    typicalYearsOfExperience: "2-5 years",
  },
  {
    title: "Senior DevOps Engineer",
    minLevel: 3,
    maxLevel: 4,
    expectedProficiency: {
      "cloud": 3,
      "cicd": 4,
      "containers": 3,
      "observability": 3,
      "security": 3,
    },
    description: "Senior DevOps engineer. Designs infrastructure and pipelines. Optimizes cloud costs. Implements monitoring and alerting. Handles complex incidents. Mentors juniors.",
    typicalYearsOfExperience: "5-8 years",
  },
  {
    title: "Lead DevOps Engineer",
    minLevel: 4,
    maxLevel: 5,
    expectedProficiency: {
      "cloud": 4,
      "cicd": 5,
      "containers": 4,
      "observability": 4,
      "security": 4,
    },
    description: "Lead DevOps engineer. Sets infrastructure strategy and standards. Makes architectural decisions. Drives DevOps culture. Ensures reliability and security. Mentors team.",
    typicalYearsOfExperience: "8-12 years",
  },
  {
    title: "Principal DevOps Engineer",
    minLevel: 5,
    maxLevel: 7,
    expectedProficiency: {
      "cloud": 5,
      "cicd": 5,
      "containers": 5,
      "observability": 5,
      "security": 5,
    },
    description: "Principal DevOps engineer. Technical authority for infrastructure and DevOps across the organization. Solves the hardest infrastructure problems. Drives innovation. Recognized expert.",
    typicalYearsOfExperience: "12+ years",
  },
];

export const DEVOPS_ENGINEER_MODEL: RoleCompetencyModel = {
  role: "devops-engineer",
  roleName: "DevOps Engineer",
  track: "engineering",
  description: "DevOps engineer focused on building and maintaining reliable, scalable, secure infrastructure and CI/CD pipelines. Bridges development and operations to enable rapid, safe software delivery.",
  skills: DEVOPS_ENGINEER_SKILLS,
  pillars: DEVOPS_ENGINEER_PILLARS,
  levels: DEVOPS_ENGINEER_LEVELS,
  careerLadder: DEVOPS_ENGINEER_CAREER_LADDER,
  expectedLevels: {
    junior: 2,
    "devops-engineer": 3,
    senior: 4,
    lead: 5,
    principal: 6,
  },
  region: "MENAC",
  totalSkills: Object.keys(DEVOPS_ENGINEER_SKILLS).length,
};
