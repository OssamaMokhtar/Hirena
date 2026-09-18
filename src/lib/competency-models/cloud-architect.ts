import type { Skill, ProficiencyLevel, CompetencyArea, CareerLadderStep } from '@/types';

export const SKILLS: Record<string, Skill> = {
  // Cloud Fundamentals & Architecture
  'cloud-computing-fundamentals': {
    id: 'cloud-computing-fundamentals', name: 'Cloud Computing Fundamentals',
    description: 'Core cloud concepts: IaaS/PaaS/SaaS, public/private/hybrid cloud, cloud service models, cloud economics, cloud adoption drivers, cloud-native vs. cloud-enabled, cloud migration fundamentals.',
    category: 'cloud-architecture', level: 0,
  },
  'cloud-architecture-design': {
    id: 'cloud-architecture-design', name: 'Cloud Architecture Design',
    description: 'Designing cloud architectures: architectural patterns (microservices, serverless, event-driven, service-oriented), well-architected frameworks (AWS, Azure, GCP), architecture decision records, design for availability, scalability, reliability, cost optimization.',
    category: 'cloud-architecture', level: 0,
  },
  'multi-cloud-hybrid-strategy': {
    id: 'multi-cloud-hybrid-strategy', name: 'Multi-Cloud & Hybrid Strategy',
    description: 'Multi-cloud and hybrid cloud architectures: cloud selection criteria, multi-cloud patterns, hybrid cloud design, cloud interoperability, vendor lock-in considerations, cloud arbitrage, cloud management platforms.',
    category: 'cloud-architecture', level: 0,
  },
  'cloud-governance-fundamentals': {
    id: 'cloud-governance-fundamentals', name: 'Cloud Governance & Organization',
    description: 'Cloud governance: organizational structure for cloud, cloud center of excellence, cloud policies and standards, tagging strategies, cost allocation, cloud accountability, cloud operating models, cloud team structures.',
    category: 'cloud-architecture', level: 0,
  },
  // AWS
  'aws-core-services': {
    id: 'aws-core-services', name: 'AWS Core Services',
    description: 'Core AWS services: EC2, S3, RDS, Lambda, VPC, IAM, CloudFormation, CloudFront, Route 53, SQS, SNS, DynamoDB, Elastic Beanstalk, CloudWatch. Deep understanding of AWS service offerings and use cases.',
    category: 'cloud-platform-aws', level: 0,
  },
  'aws-networking': {
    id: 'aws-networking', name: 'AWS Networking',
    description: 'AWS networking: VPC design, subnets, route tables, NAT gateways, internet gateways, VPC peering, AWS Transit Gateway, Direct Connect, VPN, load balancers (ALB, NLB), CloudFront, Route 53, AWS Network Firewall.',
    category: 'cloud-platform-aws', level: 0,
  },
  'aws-security': {
    id: 'aws-security', name: 'AWS Security',
    description: 'AWS security: IAM (users, groups, roles, policies), security groups, NACLs, KMS, Secrets Manager, WAF, Shield, GuardDuty, Security Hub, Config, CloudTrail, audit and compliance on AWS.',
    category: 'cloud-platform-aws', level: 0,
  },
  'aws-serverless': {
    id: 'aws-serverless', name: 'AWS Serverless',
    description: 'AWS serverless: Lambda, API Gateway, EventBridge, DynamoDB, S3 events, Step Functions, SAM, AppSync, serverless patterns, serverless architecture design, serverless cost optimization, cold starts.',
    category: 'cloud-platform-aws', level: 0,
  },
  // Azure
  'azure-core-services': {
    id: 'azure-core-services', name: 'Azure Core Services',
    description: 'Core Azure services: VMs, VNet, Blob Storage, Azure SQL, Cosmos DB, Functions, AKS, App Service, Azure Active Directory, Azure Monitor, Load Balancer, Application Gateway, Azure DNS, Azure Policy.',
    category: 'cloud-platform-azure', level: 0,
  },
  'azure-networking': {
    id: 'azure-networking', name: 'Azure Networking',
    description: 'Azure networking: VNet design, subnets, NSGs, Azure Firewall, VNet peering, VPN Gateway, ExpressRoute, Load Balancer, Application Gateway, Azure Front Door, Traffic Manager, Private Link, Azure DNS.',
    category: 'cloud-platform-azure', level: 0,
  },
  'azure-security': {
    id: 'azure-security', name: 'Azure Security',
    description: 'Azure security: Azure AD, Azure Policy, Azure Firewall, Key Vault, Security Center, Defender for Cloud, Sentinel, NSGs, managed identities, role-based access control, security best practices on Azure.',
    category: 'cloud-platform-azure', level: 0,
  },
  'azure-serverless-paaS': {
    id: 'azure-serverless-paas', name: 'Azure Serverless & PaaS',
    description: 'Azure serverless and PaaS: Azure Functions, Logic Apps, Event Grid, Service Bus, Cosmos DB serverless, Azure Container Apps, Azure API Management, PaaS architecture design, PaaS cost management.',
    category: 'cloud-platform-azure', level: 0,
  },
  // GCP
  'gcp-core-services': {
    id: 'gcp-core-services', name: 'GCP Core Services',
    description: 'Core GCP services: Compute Engine, Cloud Storage, Cloud SQL, BigQuery, Cloud Functions, GKE, Cloud Run, Cloud CDN, Cloud Load Balancing, Pub/Sub, Vertex AI, Cloud IAM, Cloud Monitoring, Cloud Logging.',
    category: 'cloud-platform-gcp', level: 0,
  },
  'gcp-networking': {
    id: 'gcp-networking', name: 'GCP Networking',
    description: 'GCP networking: VPC design, subnets, firewall rules, Cloud NAT, VPC peering, Cloud VPN, Cloud Interconnect, Cloud Load Balancing, Cloud CDN, Cloud DNS, Cloud HTTP(S) Load Balancer, cloud Armor.',
    category: 'cloud-platform-gcp', level: 0,
  },
  'gcp-security': {
    id: 'gcp-security', name: 'GCP Security',
    description: 'GCP security: Cloud IAM, Cloud KMS, Secret Manager, VPC Service Controls, Security Command Center, Cloud Monitoring for security, audit logging, binary authorization, workload identity, security best practices on GCP.',
    category: 'cloud-platform-gcp', level: 0,
  },
  'gcp-data-analytics': {
    id: 'gcp-data-analytics', name: 'GCP Data & Analytics Services',
    description: 'GCP data services: BigQuery, Dataflow, Pub/Sub, Dataproc, Cloud Storage, Data Fusion, Looker, Vertex AI, ML ops on GCP, data pipeline architecture on GCP, real-time analytics on GCP.',
    category: 'cloud-platform-gcp', level: 0,
  },
  // Containers & Orchestration
  'docker-advanced': {
    id: 'docker-advanced', name: 'Docker & Container Fundamentals',
    description: 'Advanced Docker: multi-stage builds, image optimization, Dockerfile best practices, Docker Compose, container networking, volumes, secrets management, container security, image signing, container lifecycle management.',
    category: 'containers-orchestration', level: 0,
  },
  'kubernetes-architecture': {
    id: 'kubernetes-architecture', name: 'Kubernetes Architecture & Operations',
    description: 'Kubernetes architecture: control plane, worker nodes, etcd, kube-apiserver, scheduler, controller manager, kubelet, kube-proxy. Cluster operations, upgrades, backups, troubleshooting, performance tuning, cluster sizing.',
    category: 'containers-orchestration', level: 0,
  },
  'kubernetes-services-networking': {
    id: 'kubernetes-services-networking', name: 'Kubernetes Services & Networking',
    description: 'Kubernetes networking: Services (ClusterIP, NodePort, LoadBalancer), Ingress, Ingress controllers, network policies, CNI plugins, service mesh concepts (Istio, Linkerd), DNS in Kubernetes, pod-to-pod communication, external access.',
    category: 'containers-orchestration', level: 0,
  },
  'kubernetes-security': {
    id: 'kubernetes-security', name: 'Kubernetes Security',
    description: 'Kubernetes security: RBAC, service accounts, pod security standards, secrets management (external secrets, Vault integration), security contexts, network policies, image security, runtime security (Falco), CIS benchmarks for K8s.',
    category: 'containers-orchestration', level: 0,
  },
  'service-mesh-istio': {
    id: 'service-mesh-istio', name: 'Service Mesh (Istio/Linkerd)',
    description: 'Service mesh concepts: traffic management, observability, security (mTLS), policy enforcement. Istio or Linkerd: deployment, configuration, traffic splitting, circuit breaking, retries, timeouts, distributed tracing integration.',
    category: 'containers-orchestration', level: 0,
  },
  // Infrastructure as Code
  'terraform-advanced': {
    id: 'terraform-advanced', name: 'Terraform Advanced',
    description: 'Advanced Terraform: modules, workspaces, state management (remote state, locking, state migration), Terraform Cloud/Enterprise, providers, provisioners, Terraform best practices, testing Terraform, Terraform pipelines.',
    category: 'infrastructure-as-code', level: 0,
  },
  'iac-pulumi-cdk': {
    id: 'iac-pulumi-cdk', name: 'IaC with Pulumi or CDK',
    description: 'Alternative IaC tools: Pulumi (using real programming languages), AWS CDK, Terraform vs. Pulumi vs. CDK comparison, choosing the right IaC tool, multi-language IaC, testing IaC, IaC in CI/CD.',
    category: 'infrastructure-as-code', level: 0,
  },
  'configuration-management': {
    id: 'configuration-management', name: 'Configuration Management & Immutable Infrastructure',
    description: 'Configuration management: Ansible, Chef, Puppet, SaltStack. Immutable infrastructure patterns, golden images, image building (Packer), configuration vs. infrastructure provisioning, drift management.',
    category: 'infrastructure-as-code', level: 0,
  },
  // Cloud Operations & DevOps
  'cloud-monitoring-observability': {
    id: 'cloud-monitoring-observability', name: 'Cloud Monitoring & Observability',
    description: 'Cloud observability: CloudWatch, Azure Monitor, Cloud Monitoring/Logging, metrics, logs, traces, dashboards, alerts, SLOs/SLIs/SLAs, distributed tracing (X-Ray, Jaeger, OpenTelemetry), observability best practices.',
    category: 'cloud-ops-devops', level: 0,
  },
  'cloud-disaster-recovery': {
    id: 'cloud-disaster-recovery', name: 'Cloud Disaster Recovery & Business Continuity',
    description: 'Cloud DR: backup strategies, disaster recovery planning, RTO/RPO, pilot light, warm standby, multi-region active-active, failover/failback, testing DR plans, backup automation, data protection in cloud.',
    category: 'cloud-ops-devops', level: 0,
  },
  'cloud-cost-optimization': {
    id: 'cloud-cost-optimization', name: 'Cloud Cost Management & Optimization',
    description: 'Cloud cost management: cost analysis, budget alerts, cost allocation tags, rightsizing, reserved instances/savings plans, spot instances, cost optimization strategies, FinOps practices, cost accountability.',
    category: 'cloud-ops-devops', level: 0,
  },
  'cloud-cicd': {
    id: 'cloud-cicd', name: 'Cloud CI/CD & DevOps',
    description: 'CI/CD on cloud: GitHub Actions, GitLab CI, Jenkins on cloud, AWS CodePipeline/CodeBuild/CodeDeploy, Azure DevOps, GCP Cloud Build, deployment strategies (blue-green, canary, rolling), cloud-native CI/CD patterns.',
    category: 'cloud-ops-devops', level: 0,
  },
  // Advanced
  'cloud-native-design-patterns': {
    id: 'cloud-native-design-patterns', name: 'Cloud-Native Design Patterns',
    description: 'Cloud-native patterns: 12-factor app, stateless services, event-driven architecture, CQRS, event sourcing, saga pattern, strangler fig pattern, anti-corruption layer, API gateway pattern, backends for frontends.',
    category: 'advanced-cloud-strategy', level: 0,
  },
  'cloud-for-ai-ml': {
    id: 'cloud-for-ai-ml', name: 'Cloud for AI/ML Workloads',
    description: 'Cloud AI/ML services and infrastructure: SageMaker, Vertex AI, Azure ML, GPU/TPU provisioning, ML compute optimization, AI service integration, MLOps on cloud, building ML platforms on cloud infrastructure.',
    category: 'advanced-cloud-strategy', level: 0,
  },
  'cloud-strategy-transformation': {
    id: 'cloud-strategy-transformation', name: 'Cloud Strategy & Transformation',
    description: 'Cloud strategy: cloud adoption framework, cloud migration strategy, migration assessment, migration planning, migration execution, cloud operating model design, cloud business case, cloud transformation leadership.',
    category: 'advanced-cloud-strategy', level: 0,
  },
};

export const COMPETENCY_AREAS: CompetencyArea[] = [
  { id: 'cloud-architecture', name: 'Cloud Architecture & Strategy', description: 'Cloud fundamentals, architecture design, multi-cloud strategy, cloud governance', skills: ['cloud-computing-fundamentals', 'cloud-architecture-design', 'multi-cloud-hybrid-strategy', 'cloud-governance-fundamentals'], weight: 20 },
  { id: 'cloud-platform-aws', name: 'AWS Platform', description: 'AWS core services, networking, security, serverless', skills: ['aws-core-services', 'aws-networking', 'aws-security', 'aws-serverless'], weight: 14 },
  { id: 'cloud-platform-azure', name: 'Azure Platform', description: 'Azure core services, networking, security, serverless/PaaS', skills: ['azure-core-services', 'azure-networking', 'azure-security', 'azure-serverless-paas'], weight: 14 },
  { id: 'cloud-platform-gcp', name: 'GCP Platform', description: 'GCP core services, networking, security, data/analytics', skills: ['gcp-core-services', 'gcp-networking', 'gcp-security', 'gcp-data-analytics'], weight: 14 },
  { id: 'containers-orchestration', name: 'Containers & Kubernetes', description: 'Docker, K8s architecture, services/networking, security, service mesh', skills: ['docker-advanced', 'kubernetes-architecture', 'kubernetes-services-networking', 'kubernetes-security', 'service-mesh-istio'], weight: 16 },
  { id: 'infrastructure-as-code', name: 'Infrastructure as Code', description: 'Terraform advanced, Pulumi/CDK, configuration management', skills: ['terraform-advanced', 'iac-pulumi-cdk', 'configuration-management'], weight: 12 },
  { id: 'cloud-ops-devops', name: 'Cloud Operations & DevOps', description: 'Monitoring/observability, DR/BC, cost optimization, CI/CD on cloud', skills: ['cloud-monitoring-observability', 'cloud-disaster-recovery', 'cloud-cost-optimization', 'cloud-cicd'], weight: 16 },
  { id: 'advanced-cloud-strategy', name: 'Advanced Cloud Strategy', description: 'Cloud-native design patterns, cloud for AI/ML, cloud strategy & transformation', skills: ['cloud-native-design-patterns', 'cloud-for-ai-ml', 'cloud-strategy-transformation'], weight: 8 },
];

export const LEVELS: ProficiencyLevel[] = [0, 1, 2, 3, 4, 5, 6, 7];

export const CAREER_LADDER: CareerLadderStep[] = [
  { title: 'Junior Cloud Architect / Cloud Engineer', minLevel: 0, expected: { 'cloud-architecture': 1, 'cloud-platform-aws': 1, 'cloud-platform-azure': 0, 'cloud-platform-gcp': 0, 'containers-orchestration': 1, 'infrastructure-as-code': 1, 'cloud-ops-devops': 1, 'advanced-cloud-strategy': 0 }, description: 'Entry-level. Learning cloud fundamentals and one primary cloud platform. Building basic cloud infrastructure. Learning IaC and containers. Focusing on hands-on cloud service usage.' },
  { title: 'Cloud Architect / Cloud Engineer', minLevel: 2, expected: { 'cloud-architecture': 2, 'cloud-platform-aws': 2, 'cloud-platform-azure': 1, 'cloud-platform-gcp': 1, 'containers-orchestration': 2, 'infrastructure-as-code': 2, 'cloud-ops-devops': 2, 'advanced-cloud-strategy': 0 }, description: 'Core role. Designing and implementing cloud architectures on one or more platforms. Building IaC modules. Deploying container workloads. Understanding cloud networking and security.' },
  { title: 'Senior Cloud Architect', minLevel: 3, expected: { 'cloud-architecture': 3, 'cloud-platform-aws': 3, 'cloud-platform-azure': 2, 'cloud-platform-gcp': 2, 'containers-orchestration': 3, 'infrastructure-as-code': 3, 'cloud-ops-devops': 3, 'advanced-cloud-strategy': 1 }, description: 'Operates independently. Designing complex cloud architectures across multiple platforms. Leading cloud migrations. Building cloud-native systems. Mentoring juniors. Strong multi-platform expertise.' },
  { title: 'Lead Cloud Architect / Principal Cloud Engineer', minLevel: 4, expected: { 'cloud-architecture': 4, 'cloud-platform-aws': 4, 'cloud-platform-azure': 3, 'cloud-platform-gcp': 3, 'containers-orchestration': 4, 'infrastructure-as-code': 4, 'cloud-ops-devops': 4, 'advanced-cloud-strategy': 2 }, description: 'Leading cloud architecture for organization or major initiative. Setting cloud standards and patterns. Making platform decisions. Driving cloud strategy. Technical leadership across cloud teams.' },
  { title: 'Principal Cloud Architect', minLevel: 5, expected: { 'cloud-architecture': 5, 'cloud-platform-aws': 5, 'cloud-platform-azure': 4, 'cloud-platform-gcp': 4, 'containers-orchestration': 5, 'infrastructure-as-code': 5, 'cloud-ops-devops': 5, 'advanced-cloud-strategy': 3 }, description: 'Senior cloud leader across organization. Solving highest-complexity cloud architecture problems. Setting enterprise cloud strategy. Recognized expert across multiple cloud platforms.' },
  { title: 'Cloud Architecture Manager / Head of Cloud', minLevel: 5, expected: { 'cloud-architecture': 4, 'cloud-platform-aws': 4, 'cloud-platform-azure': 3, 'cloud-platform-gcp': 3, 'containers-orchestration': 4, 'infrastructure-as-code': 4, 'cloud-ops-devops': 5, 'advanced-cloud-strategy': 4 }, description: 'Managing cloud architecture team. Hiring and developing cloud architects. Setting cloud roadmap. Managing cloud budgets. Balancing technical architecture with team leadership.' },
  { title: 'Director of Cloud / Head of Infrastructure', minLevel: 6, expected: { 'cloud-architecture': 4, 'cloud-platform-aws': 4, 'cloud-platform-azure': 4, 'cloud-platform-gcp': 4, 'containers-orchestration': 4, 'infrastructure-as-code': 4, 'cloud-ops-devops': 6, 'advanced-cloud-strategy': 5 }, description: 'Leading cloud/infrastructure organization. Setting cloud strategy aligned with business goals. Managing cloud teams and budgets. Executive stakeholder relationships. Cloud operating model design.' },
  { title: 'VP of Cloud / CTO / Chief Architect', minLevel: 6, expected: { 'cloud-architecture': 5, 'cloud-platform-aws': 4, 'cloud-platform-azure': 4, 'cloud-platform-gcp': 4, 'containers-orchestration': 4, 'infrastructure-as-code': 4, 'cloud-ops-devops': 6, 'advanced-cloud-strategy': 6 }, description: 'Executive leadership for cloud and architecture. Enterprise-wide cloud vision and strategy. Board-level strategic support. Building cloud capabilities across entire organization.' },
];

export const SKILL_COUNT = Object.keys(SKILLS).length;
export const PILLAR_COUNT = COMPETENCY_AREAS.length;
