import type { Skill, CompetencyArea, ProficiencyLevel, CareerLadderStep } from "@/types";

/**
 * DevOps Engineer Competency Model
 * Covers CI/CD, infrastructure-as-code, containers, cloud platforms, monitoring, deployment automation.
 * 28 skills across 7 competency areas.
 */

export const SKILLS: Record<string, Skill> = {
  // Technical foundation
  "linux-unix-admin": {
    id: "linux-unix-admin",
    name: "Linux/Unix Administration",
    description: "Shell scripting (Bash), package management, systemd services, users/permissions, cron jobs, NFS/SMB, disk management, kernel basics.",
    category: "technical-foundation",
    level: 0,
  },
  "networking-fundamentals": {
    id: "networking-fundamentals",
    name: "Networking Fundamentals",
    description: "TCP/IP, DNS, HTTP/HTTPS, load balancing, firewalls, subnets, routing, VPN, CDN, NAT, proxy servers, SSL/TLS certificates.",
    category: "technical-foundation",
    level: 0,
  },
  "security-fundamentals": {
    id: "security-fundamentals",
    name: "Security Fundamentals",
    description: "Principles of least privilege, attack vectors (XSS, CSRF, injection, MITM), cryptography basics, certificate management, secrets management, secure configuration, vulnerability scanning.",
    category: "security",
    level: 0,
  },

  // Infrastructure as Code
  "terraform": {
    id: "terraform",
    name: "Terraform (Infrastructure as Code)",
    description: "Authoring Terraform configurations: providers, resources, modules, state management (remote state, locking), workspaces, import, plan/apply workflows, Terraform Cloud, best practices for modular infrastructure.",
    category: "iac",
    level: 0,
  },
  "ansible": {
    id: "ansible",
    name: "Ansible (Configuration Management)",
    description: "Writing Ansible playbooks and roles: inventory management, modules, variables, templates (Jinja2), handlers, roles, vault for secrets, best practices for idempotent configuration.",
    category: "iac",
    level: 0,
  },
  "cloudformation": {
    id: "cloudformation",
    name: "CloudFormation / ARM Templates",
    description: "AWS CloudFormation or Azure ARM/Bicep templates: declarative infrastructure, stacks, change sets, drift detection, nested stacks, parameterization, outputs.",
    category: "iac",
    level: 0,
  },

  // Containers & Orchestration
  "docker": {
    id: "docker",
    name: "Docker",
    description: "Containerization: images, containers, Dockerfile best practices (multi-stage builds, layer caching, minimal images), Docker Compose, networking, volumes, registry, security scanning.",
    category: "containers",
    level: 0,
  },
  "kubernetes": {
    id: "kubernetes",
    name: "Kubernetes",
    description: "Container orchestration: pods, deployments, services, ingress, configmaps, secrets, statefulsets, HPA/VPA, jobs/cronjobs, RBAC, Helm charts, operators, cluster administration, troubleshooting.",
    category: "containers",
    level: 0,
  },
  "container-security": {
    id: "container-security",
    name: "Container Security",
    description: "Image scanning (Trivy, Docker Scout), signed images (Cosign), runtime security (Falco), pod security standards, network policies, read-only root filesystems, least-privilege containers, secrets management in K8s.",
    category: "security",
    level: 0,
  },

  // CI/CD
  "github-actions": {
    id: "github-actions",
    name: "GitHub Actions",
    description: "CI/CD with GitHub Actions: workflows, jobs, steps, runners (shared vs self-hosted), secrets, matrix builds, caching, environment protection, reusable workflows, marketplace actions, best practices.",
    category: "cicd",
    level: 0,
  },
  "gitlab-ci": {
    id: "gitlab-ci",
    name: "GitLab CI/CD",
    description: "GitLab CI/CD: .gitlab-ci.yml, pipelines, jobs, stages, artifacts, caching, runners, environments, deployment strategies, DevOps pipeline integration, security scanning integration.",
    category: "cicd",
    level: 0,
  },
  "jenkins": {
    id: "jenkins",
    name: "Jenkins",
    description: "Jenkins pipelines (declarative + scripted Groovy), shared libraries, agents/nodes, plugins, credentials management, build triggers, Blue Ocean, scaling with Kubernetes, pipeline best practices.",
    category: "cicd",
    level: 0,
  },

  // Cloud platforms
  "aws": {
    id: "aws",
    name: "AWS",
    description: "Core AWS services: EC2, S3, VPC, IAM, RDS, Lambda, CloudWatch, ECS/EKS, CloudFormation, Route 53, CloudFront, SNS/SQS, security groups, AWS best practices, cost optimization.",
    category: "cloud-platforms",
    level: 0,
  },
  "azure": {
    id: "azure",
    name: "Azure",
    description: "Core Azure services: VMs, Blob Storage, VNet, Entra ID (Azure AD), Azure SQL, App Service, AKS, Functions, Monitor, ARM templates/Bicep, networking, Azure policy, cost management.",
    category: "cloud-platforms",
    level: 0,
  },
  "gcp": {
    id: "gcp",
    name: "Google Cloud Platform (GCP)",
    description: "Core GCP services: Compute Engine, Cloud Storage, VPC, IAM, Cloud SQL, Cloud Run, GKE, Cloud Functions, Cloud Build, Monitoring, networking, Anthos, cost optimization.",
    category: "cloud-platforms",
    level: 0,
  },

  // Monitoring & Observability
  "monitoring-tools": {
    id: "monitoring-tools",
    name: "Monitoring Tools (Prometheus, Grafana, Datadog)",
    description: "Metrics collection and alerting: Prometheus metrics, Grafana dashboards, Datadog/New Relic CloudWatch. Setting up alerts, dashboards, SLOs/SLIs, notification channels.",
    category: "observability",
    level: 0,
  },
  "logging-infrastructure": {
    id: "logging-infrastructure",
    name: "Logging Infrastructure (ELK, Loki, Splunk)",
    description: "Centralized logging: ELK Stack (Elasticsearch, Logstash, Kibana), OpenSearch, Loki + Grafana, Fluentd/Fluent Bit, log aggregation, structured logging, log retention policies.",
    category: "observability",
    level: 0,
  },
  "distributed-tracing": {
    id: "distributed-tracing",
    name: "Distributed Tracing (OpenTelemetry, Jaeger)",
    description: "Request tracing across microservices: OpenTelemetry, Jaeger, Zipkin, tracing context propagation, span attributes, service maps, latency analysis, tracing best practices.",
    category: "observability",
    level: 0,
  },
  "sre-principles": {
    id: "sre-principles",
    name: "SRE Principles (SLOs, Error Budgets, Toil)",
    description: "Site Reliability Engineering: Service Level Objectives (SLOs), error budgets, toil reduction, automation mindset, postmortems, incident response, release engineering, capacity planning.",
    category: "operations",
    level: 0,
  },

  // Scripting & Automation
  "bash-scripting": {
    id: "bash-scripting",
    name: "Bash Scripting",
    description: "Advanced Bash: functions, arrays, conditionals, loops, traps, here-documents, exit codes, set -euo pipefail, portable scripts, shellcheck, automation scripts for system tasks.",
    category: "scripting",
    level: 0,
  },
  "python-automation": {
    id: "python-automation",
    name: "Python Automation",
    description: "Automating operations tasks with Python: boto3 (AWS SDK), Azure SDK, GCP SDK, automation scripts, infrastructure manipulation, Lambda/Function handlers, CLI tools.",
    category: "scripting",
    level: 0,
  },

  // Git & Version Control
  "git-advanced": {
    id: "git-advanced",
    name: "Git (Advanced)",
    description: "Advanced Git: branching strategies (GitFlow, trunk-based), rebasing, cherry-picking, bisect, submodules, hooks, Gerrit/for-slip workflows, large repo management, Git internals.",
    category: "development-tools",
    level: 0,
  },

  // Soft skills for DevOps
  "incident-response": {
    id: "incident-response",
    name: "Incident Response & On-Call",
    description: "Responding to production incidents: triage, severity classification, escalation procedures, communication during incidents, postmortems (blameless), runbooks, on-call rotation management, stress management.",
    category: "operations",
    level: 0,
  },
  "documentation": {
    id: "documentation",
    name: "Documentation & Runbooks",
    description: "Creating and maintaining operational documentation: runbooks, playbooks, architecture diagrams, deployment guides, incident response procedures, knowledge base maintenance.",
    category: "process",
    level: 0,
  },
  "collaboration": {
    id: "collaboration",
    name: "Cross-team Collaboration",
    description: "Working effectively with development, security, and business teams: bridging operations and development (DevOps culture), communication, empathy, negotiating priorities, teaching ops practices to developers.",
    category: "collaboration",
    level: 0,
  },
};

export const COMPETENCY_AREAS: CompetencyArea[] = [
  {
    id: "technical-foundation",
    name: "Technical Foundation",
    description: "Linux, networking, and security fundamentals that underpin all DevOps work.",
    skills: ["linux-unix-admin", "networking-fundamentals", "security-fundamentals"],
    weight: 15,
  },
  {
    id: "iac",
    name: "Infrastructure as Code",
    description: "Defining and managing infrastructure declaratively with Terraform, Ansible, and cloud-native tools.",
    skills: ["terraform", "ansible", "cloudformation"],
    weight: 20,
  },
  {
    id: "containers",
    name: "Containers & Orchestration",
    description: "Docker and Kubernetes for containerized application deployment and management.",
    skills: ["docker", "kubernetes", "container-security"],
    weight: 22,
  },
  {
    id: "cicd",
    name: "CI/CD Pipelines",
    description: "Automated build, test, and deployment pipelines across GitHub Actions, GitLab CI, and Jenkins.",
    skills: ["github-actions", "gitlab-ci", "jenkins"],
    weight: 20,
  },
  {
    id: "cloud-platforms",
    name: "Cloud Platforms",
    description: "Multi-cloud proficiency across AWS, Azure, and GCP — compute, storage, networking, serverless, and cost.",
    skills: ["aws", "azure", "gcp"],
    weight: 18,
  },
  {
    id: "observability",
    name: "Observability & SRE",
    description: "Monitoring, logging, tracing, and SRE principles to keep systems healthy and reliable.",
    skills: ["monitoring-tools", "logging-infrastructure", "distributed-tracing", "sre-principles"],
    weight: 25,
  },
  {
    id: "scripting",
    name: "Scripting & Automation",
    description: "Bash and Python for automating operational tasks, integrating cloud SDKs, and building tooling.",
    skills: ["bash-scripting", "python-automation"],
    weight: 15,
  },
  {
    id: "process",
    name: "Process & Collaboration",
    description: "Incident response, documentation, Git mastery, and cross-team collaboration for effective DevOps.",
    skills: ["incident-response", "documentation", "git-advanced", "collaboration"],
    weight: 20,
  },
];

export const LEVELS: ProficiencyLevel[] = [0, 1, 2, 3, 4, 5, 6, 7];

export const CAREER_LADDER: CareerLadderStep[] = [
  {
    title: "Junior DevOps Engineer",
    minLevel: 0,
    typicalYearsOfExperience: "0-2 years",
    description: "Entry-level DevOps. Learning CI/CD pipelines, basic containers, cloud fundamentals. Works under supervision on deployment and monitoring tasks.",
  },
  {
    title: "DevOps Engineer",
    minLevel: 2,
    typicalYearsOfExperience: "2-4 years",
    description: "Core DevOps role. Builds and maintains CI/CD pipelines, manages containers, configures cloud infrastructure. Works independently on deployment automation and monitoring.",
  },
  {
    title: "Senior DevOps Engineer",
    minLevel: 3,
    typicalYearsOfExperience: "4-7 years",
    description: "Senior DevOps. Designs infrastructure, leads complex migrations, mentors juniors. Strong depth in cloud, containers, IaC, and CI/CD. Handles production incidents independently.",
  },
  {
    title: "Lead DevOps Engineer",
    minLevel: 4,
    typicalYearsOfExperience: "6-8 years",
    description: "Technical lead for infrastructure/operations. Sets DevOps standards, drives automation strategy, leads migrations, manages on-call rotations, and mentors a team of DevOps engineers.",
  },
  {
    title: "Principal DevOps Engineer",
    minLevel: 5,
    typicalYearsOfExperience: "8+ years",
    description: "Principal-level DevOps. Sets architectural direction across multiple teams. Designs multi-cloud strategies, drives org-wide automation, and is the go-to expert for complex infrastructure problems.",
  },
  {
    title: "DevOps Architect",
    minLevel: 5,
    typicalYearsOfExperience: "8+ years",
    description: "Architect-level DevOps. Designs entire infrastructure landscapes, evaluates tools/platforms strategically, and provides long-term infrastructure vision for the organization.",
  },
  {
    title: "Engineering Manager (DevOps)",
    minLevel: 3,
    typicalYearsOfExperience: "8+ years",
    description: "People manager for DevOps/Infrastructure teams. Hires, develops, and manages engineers. Balances people leadership with technical oversight and strategic planning.",
  },
  {
    title: "Director of Infrastructure",
    minLevel: 2,
    typicalYearsOfExperience: "10+ years",
    description: "Leads multiple infrastructure/operations teams. Sets organization-wide infrastructure strategy and budgets. Manages managers. Focuses on organizational effectiveness and alignment with business goals.",
  },
];

export const SKILL_COUNT = Object.keys(SKILLS).length;
export const PILLAR_COUNT = COMPETENCY_AREAS.length;
