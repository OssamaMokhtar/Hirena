// Hirena — Mock Interview Analysis Fallback
//
// Provides deterministic interview analysis when OpenAI's GPT-4o is unavailable
// (no API key, $0 balance, rate-limited, network error).
//
// Used by src/app/api/interview/analyze/route.ts as a fallback when the
// real OpenAI call throws. Produces the same shape as the GPT-4o response so
// the route's existing response builder still works unchanged.
//
// The mock uses:
//   1. Keyword pattern matching on the transcription to infer skills
//   2. Generic overall assessment scores (moderate, realistic for a demo)
//   3. Strengths/gaps derived from the inferred skill levels
//   4. A generic follow-up question or null

import type { SkillCategory } from "@/types";

export interface MockAnalysis {
  overallAssessment: {
    technicalAccuracy: number;
    depthOfKnowledge: number;
    communicationClarity: number;
    problemSolvingApproach: number;
    confidenceSignals: number;
    engagement: number;
    overallImpression: string;
  };
  strengths: string[];
  gaps: string[];
  skillInference: Record<string, { level: number; confidence: number; reasoning: string }>;
  followUpQuestion: string | null;
}

/** Proficiency level patterns (same as mock-ai.ts) */
const L0_PATTERNS = [
  /never /i, /no experience/i, /haven'?t (used|done|worked with|applied|tried|built)/i,
  /don'?t know how to/i, /complete beginner/i, /no knowledge/i, /just started/i,
  /theoretical only/i, /read about it but/i, /haven'?t had the chance/i, /not at all/i, /zero/i,
];
const L1_PATTERNS = [
  /heard of/i, /aware of/i, /know what it is/i, /conceptually/i,
  /familiar with the (idea|concept)/i, /understand the basics/i, /followed a tutorial/i,
  /took a course but/i, /read about/i, /knows about/i, /theoretical understanding/i,
  /basic awareness/i, /have (heard|seen) of/i,
];
const L2_PATTERNS = [
  /basic (knowledge|understanding|familiarity)/i, /simple/i, /with (help|guidance|assistance|support)/i,
  /under supervision/i, /used it a few times/i, /limited experience/i, /occasionally/i,
  /can do simple/i, /can handle basic/i, /small project/i, /entry level/i, /junior/i,
  /used occasionally/i, /got started with/i, /learning to use/i, /some experience/i, /a little/i, /a bit of/i,
];
const L3_PATTERNS = [
  /intermediate/i, /comfortable with/i, /confident (in|about|with)/i, /independently/i,
  /without help/i, /on my own/i, /regularly (use|work with|apply|build|create|develop)/i,
  /day-to-day/i, /daily/i, /production/i, /real-world/i, /real world/i, /built/i, /developed/i,
  /created/i, /implemented/i, /deployed/i, /hands-on/i, /practical experience/i,
  /solid (understanding|foundation|grasp)/i, /good understanding/i, /working knowledge/i,
  /used extensively/i, /frequently/i, /often/i, /well-versed/i, /skilled in/i, /skilled with/i,
  /experienced with/i, /experienced in/i, /competent/i, /proficient/i,
];
const L4_PATTERNS = [
  /advanced/i, /expert in/i, /expert with/i, /expert on/i, /deep understanding/i, /deep knowledge/i,
  /deep (experience|understanding)/i, /optimized/i, /optimization/i, /led (the|an|a)/i, /mentored/i,
  /mentoring/i, /trained others/i, /taught/i, /gave (a talk|training|workshops|presentations|lectures|seminars)/i,
  /best practices/i, /complex/i, /complicated/i, /challenging/i, /high-performance/i, /performance-critical/i,
  /scalable/i, /scalability/i, /production-grade/i, /production quality/i, /specialist/i, /specialized/i,
  /specialize in/i, /deep dive/i, /deep-dive/i, /troubleshoot/i, /debug/i, /in depth/i, /in-depth/i,
  /comprehensive/i, /extensive experience/i, /years of experience/i, /senior level/i,
];
const L5_PATTERNS = [
  /principal/i, /staff (engineer|developer|architect|consultant|manager)/i, /thought leader/i,
  /industry expert/i, /recognized (expert|authority|leader)/i, /published/i, /speaker/i,
  /conference/i, /talk at/i, /presented at/i, /open source/i, /contributed to (the )?open/i,
  /created the/i, /built the/i, /owned/i, /architected/i,
];

function scoreText(text: string): number {
  if (!text) return 0;
  const t = text.toLowerCase();
  let score = 0;
  if (L5_PATTERNS.some(p => p.test(t))) score = 5;
  else if (L4_PATTERNS.some(p => p.test(t))) score = 4;
  else if (L3_PATTERNS.some(p => p.test(t))) score = 3;
  else if (L2_PATTERNS.some(p => p.test(t))) score = 2;
  else if (L1_PATTERNS.some(p => p.test(t))) score = 1;
  else if (L0_PATTERNS.some(p => p.test(t))) score = 0;
  // If no patterns matched, give a modest score based on text length (longer = more detail)
  if (score === 0 && t.length > 50) score = 2;
  else if (score === 0 && t.length > 20) score = 1;
  return score;
}

/** Run keyword-based skill inference for a role (mirrors the route's existing keyword blocks) */
export function inferSkillsMock(targetRole: string, transcription: string): Record<string, { level: number; confidence: number; reasoning: string }> {
  const result: Record<string, { level: number; confidence: number; reasoning: string }> = {};
  if (!transcription) return result;
  const t = transcription.toLowerCase();

  const add = (skillId: string, keywords: string[], baseLevel: number) => {
    if (keywords.some(kw => t.includes(kw.toLowerCase()))) {
      // Boost level based on detail in response
      const detailScore = Math.min(2, Math.floor(t.length / 150));
      result[skillId] = { level: Math.min(5, baseLevel + detailScore), confidence: 0.5 + detailScore * 0.1, reasoning: `Candidate discussed ${skillId} — keyword match (${keywords[0]})` };
    }
  };

  // ── software-engineer / full-stack-engineer ──
  if (targetRole === "software-engineer" || targetRole === "full-stack-engineer" || targetRole === "backend-engineer" || targetRole === "frontend-engineer" || targetRole === "tech-lead" || targetRole === "software-architect") {
    add("data-structures", ["data structure", "algorithm", "big-o", "complexity"], 2);
    add("algorithms", ["algorithm", "sorting", "searching", "graph"], 2);
    add("testing-unit", ["unit test", "test", "jest", "testing"], 2);
    add("api-design", ["api", "rest", "graphql", "endpoint"], 2);
    add("containers", ["docker", "container", "kubernetes", "k8s"], 2);
    add("ci-cd", ["ci", "cd", "pipeline", "github actions", "yaml"], 2);
    add("cloud-platforms", ["aws", "azure", "gcp", "cloud", "lambdas"], 1);
    add("observability", ["logging", "monitoring", "metrics", "tracing", "grafana"], 1);
  }
  if (targetRole === "frontend-engineer" || targetRole === "ux-ui-designer") {
    add("react-fe", ["react", "component", "hooks", "redux"], 2);
    add("html-css-fe", ["css", "responsive", "html", "layout", "flexbox", "grid"], 2);
    add("performance-fe", ["performance", "bundle", "lazy", "render", "optimization"], 1);
    add("accessibility-a11y", ["accessibility", "a11y", "wcag", "screen reader", "aria"], 1);
    add("design-systems", ["design system", "component library", "storybook", "pattern"], 1);
  }
  if (targetRole === "backend-engineer") {
    add("api-design-be", ["api", "rest", "graphql", "endpoint", "grpc"], 3);
    add("database-advanced", ["database", "sql", "query", "postgres", "mysql", "nosql", "mongodb"], 2);
    add("authentication-be", ["auth", "authentication", "oauth", "jwt", "security"], 2);
    add("caching", ["cache", "redis", "memcached", "caching"], 1);
    add("messaging-event-driven", ["kafka", "rabbitmq", "message", "event", "queue"], 1);
    add("microservices", ["microservice", "service", "architecture", "distributed"], 1);
  }
  if (targetRole === "qa-engineer") {
    add("test-design", ["test case", "test plan", "test design", "scenario"], 3);
    add("test-planning", ["test planning", "test strategy", "qa plan", "quality"], 2);
    add("test-automation", ["automation", "selenium", "cypress", "playwright", "puppeteer", "automated test"], 2);
    add("performance-testing", ["performance test", "load test", "stress test", "jmeter", "k6"], 1);
    add("security-testing", ["security test", "penetration", "vulnerability", "owasp"], 1);
  }
  if (targetRole === "devops-engineer" || targetRole === "cloud-architect") {
    add("docker", ["docker", "container", "image", "dockerfile"], 3);
    add("kubernetes", ["kubernetes", "k8s", "pod", "deployment"], 2);
    add("ci-cd-devops", ["ci", "cd", "pipeline", "jenkins", "github actions", "gitlab ci", "circleci"], 3);
    add("cloud-devops", ["aws", "azure", "gcp", "cloud", "terraform", "iac"], 2);
    add("monitoring-observability", ["monitoring", "observability", "datadog", "prometheus", "grafana", "alerting", "log"], 2);
    add("infrastructure-as-code", ["terraform", "iac", "ansible", "cloudformation", "pulumi"], 2);
  }
  if (targetRole === "data-analyst" || targetRole === "data-engineer" || targetRole === "data-scientist") {
    add("sql-advanced", ["sql", "query", "join", "window function", "cte"], 3);
    add("data-visualization", ["visualization", "dashboard", "chart", "tableau", "power bi", "viz"], 2);
    add("python-data", ["python", "pandas", "numpy", "dataframe"], 2);
    if (targetRole === "data-engineer") {
      add("data-pipeline", ["pipeline", "etl", "data flow", "airflow", "spark", "dbt"], 3);
      add("data-modeling", ["data model", "schema", "normalization", "star schema", "data warehouse", "lake"], 2);
      add("stream-processing", ["stream", "kafka", "kinesis", "real-time", "flink", "spark streaming"], 1);
    }
  }
  if (targetRole === "data-scientist" || targetRole === "ml-engineer") {
    add("machine-learning", ["machine learning", "ml", "model", "training", "prediction"], 2);
    add("deep-learning", ["deep learning", "neural network", "tensorflow", "pytorch", "keras"], 1);
    add("nlp", ["nlp", "natural language", "text processing", "bert", "gpt"], 1);
    add("statistics", ["statistics", "statistical", "hypothesis", "regression", "distribution"], 2);
  }
  if (targetRole === "ml-engineer") {
    add("ml-serving", ["serving", "inference", "deployment", "mlflow", "sagemaker", "vertex ai"], 2);
    add("model-optimization", ["optimization", "quantization", "pruning", "distillation", "onnx"], 1);
    add("ml-pipelines", ["pipeline", "ml pipeline", "kubeflow", "airflow", "orchestration"], 2);
  }
  if (targetRole === "security-engineer") {
    add("authentication", ["auth", "authentication", "oauth", "sso", "saml", "mfa", "jwt"], 3);
    add("security-testing", ["security test", "penetration", "vulnerability", "burp", "owasp", "zap", "exploit"], 2);
    add("secure-coding", ["secure code", "input validation", "output encoding", "xss", "sql injection", "csrf"], 2);
    add("encryption", ["encryption", "aes", "rsa", "TLS", "ssl", "hash", "bcrypt", "secret"], 2);
    add("cloud-security", ["cloud security", "iam", "security group", "waf", "shield", "secrets manager"], 2);
  }
  if (targetRole === "data-engineer") {
    add("data-pipeline", ["pipeline", "etl", "data flow", "airflow", "spark", "dbt", "kafka"], 3);
    add("database-systems", ["database", "sql", "nosql", "postgres", "mysql", "mongodb", "dynamoDB"], 2);
    add("data-modeling", ["data model", "schema", "normalization", "star schema", "data warehouse", "lake"], 2);
    add("stream-processing", ["stream", "kafka", "kinesis", "real-time", "flink", "spark streaming"], 1);
  }
  if (targetRole === "software-architect") {
    add("system-design", ["system design", "architecture", "scalability", "distributed", "microservice"], 4);
    add("cloud-platforms", ["aws", "azure", "gcp", "cloud", "cloud architecture", "lambda"], 3);
    add("api-enterprise", ["api", "rest", "graphql", "grpc", "soa", "service mesh"], 3);
    add("infrastructure-as-code", ["terraform", "iac", "ansible", "cloudformation"], 2);
  }
  if (targetRole === "tech-lead") {
    add("technical-leadership", ["lead", "mentor", "guide", "coach", "team", "review"], 3);
    add("code-review", ["code review", "pull request", "feedback", "quality", "standards"], 3);
    add("architecture", ["architecture", "design", "system", "pattern", "trade-off"], 3);
    add("agile-process", ["agile", "scrum", "sprint", "backlog", "stand-up", "retrospective"], 2);
  }
  if (targetRole === "engineering-manager") {
    add("people-management", ["people", "team", "hire", "onboard", "mentor", "career", "performance review"], 3);
    add("delivery-management", ["delivery", "sprint", "roadmap", "release", "velocity", "capacity"], 3);
    add("technical-strategy", ["strategy", "technical direction", "architecture", "roadmap", "vision"], 2);
    add("stakeholder-management", ["stakeholder", "communication", "alignment", "expectation", "cross-functional"], 2);
  }
  if (targetRole === "business-consultant") {
    add("requirements-gathering", ["requirement", "stakeholder", "elicit", "workshop", "interview"], 3);
    add("process-modeling", ["process", "workflow", "bpmn", "flowchart", "diagram", "map"], 2);
    add("data-analysis-bc", ["data", "analysis", "excel", "dashboard", "report", "kpi"], 2);
    add("stakeholder-communication", ["stakeholder", "communication", "presentation", "slides", "client"], 2);
  }
  if (targetRole === "business-analyst") {
    add("requirements-gathering", ["requirement", "stakeholder", "elicit", "workshop", "user story"], 3);
    add("process-modeling", ["process", "workflow", "bpmn", "flowchart", "use case", "diagram"], 2);
    add("documentation", ["documentation", "spec", "bridge", "document", "wiki", "confluence"], 2);
    add(" stakeholder-management", ["stakeholder", "communication", "prioritization", "backlog", "po"], 2);
  }
  if (targetRole === "scrum-master") {
    add("scrum-framework", ["scrum", "sprint", "backlog", "stand-up", "retrospective", "ceremony"], 3);
    add("agile-coaching", ["agile", "coach", "team", "maturity", "transformation", "mindset"], 2);
    add("process-improvement", ["improvement", "cycle time", "throughput", "wip", "flow", "bottleneck"], 2);
    add("stakeholder-facilitation", ["facilitat", "stakeholder", "conflict", "agreement", "decision"], 2);
  }
  if (targetRole === "ux-ui-designer") {
    add("user-research", ["user research", "interview", "survey", "usability", "user test", "persona"], 3);
    add("interaction-design", ["interaction", "prototype", "wireframe", "flow", "figma", "figma"], 3);
    add("visual-design", ["visual", "typography", "color", "layout", "design system", "style guide"], 2);
    add("accessibility-a11y", ["accessibility", "a11y", "wcag", "inclusive", "screen reader", "aria"], 1);
    add("design-tools", ["figma", "sketch", "xd", "adobe", "after effects", "principle"], 2);
  }
  if (targetRole === "cloud-architect") {
    add("cloud-platforms", ["aws", "azure", "gcp", "cloud", "multi-cloud", "hybrid"], 4);
    add("infrastructure-as-code", ["terraform", "iac", "ansible", "cloudformation", "pulumi", "cdk"], 3);
    add("system-design", ["system design", "architecture", "scalability", "high availability", "disaster recovery", "multi-region"], 3);
    add("cost-optimization", ["cost", "budget", "finops", "optimize", "reserved instance", "spot", "savings plan"], 2);
    add("security-architecture", ["security", "iam", "network", "vpn", "private link", "zero trust", "encryption"], 2);
  }

  return result;
}

/** Build a mock overall assessment from the inferred skill levels */
export function buildMockOverallAssessment(skillInference: Record<string, { level: number; confidence: number; reasoning: string }>): MockAnalysis["overallAssessment"] {
  const levels = Object.values(skillInference).map(s => s.level);
  if (levels.length === 0) {
    return {
      technicalAccuracy: 2, depthOfKnowledge: 2, communicationClarity: 3,
      problemSolvingApproach: 2, confidenceSignals: 2, engagement: 3,
      overallImpression: "Candidate provided a brief response. More detail would allow for a more thorough assessment.",
    };
  }
  const avg = levels.reduce((a, b) => a + b, 0) / levels.length;
  const hasStrongSkills = levels.some(l => l >= 4);
  const hasWeakSkills = levels.some(l => l <= 1);

  return {
    technicalAccuracy: Math.round(Math.max(1, Math.min(5, avg + 0.5))),
    depthOfKnowledge: Math.round(Math.max(1, Math.min(5, avg))),
    communicationClarity: Math.round(Math.max(2, Math.min(5, avg + 1))),
    problemSolvingApproach: Math.round(Math.max(1, Math.min(5, avg + 0.3))),
    confidenceSignals: Math.round(Math.max(1, Math.min(5, avg + 0.5))),
    engagement: Math.round(Math.max(2, Math.min(5, avg + 1))),
    overallImpression: hasStrongSkills
      ? "Candidate demonstrated solid knowledge with evidence of hands-on experience. Shows good potential for the role."
      : hasWeakSkills
        ? "Candidate showed awareness of core concepts but lacked depth in key areas. Additional practice recommended."
        : "Candidate provided a moderate response covering the main points. Could benefit from deeper technical elaboration.",
  };
}

/** Derive strengths and gaps from skill levels */
export function buildMockStrengthsAndGaps(skillInference: Record<string, { level: number; confidence: number; reasoning: string }>): { strengths: string[]; gaps: string[] } {
  const strengths: string[] = [];
  const gaps: string[] = [];
  for (const [skillId, inf] of Object.entries(skillInference)) {
    if (inf.level >= 4) strengths.push(`Strong proficiency in ${skillId} (Level ${inf.level}/5)`);
    else if (inf.level >= 3) strengths.push(`Solid understanding of ${skillId} (Level ${inf.level}/5)`);
    if (inf.level <= 1) gaps.push(`Develop ${skillId} — currently at Level ${inf.level}/5, target is Level 3`);
    else if (inf.level === 2) gaps.push(`Grow ${skillId} from Level ${inf.level} to Level 3 for stronger proficiency`);
  }
  if (strengths.length === 0) strengths.push("Demonstrated awareness of core concepts");
  if (gaps.length === 0) gaps.push("Continue building depth in key areas through practice and projects");
  return { strengths, gaps };
}

/** Generate a follow-up question based on the weakest inferred skill */
export function buildMockFollowUpQuestion(skillInference: Record<string, { level: number; confidence: number; reasoning: string }>, targetRole: string): string | null {
  const levels = Object.entries(skillInference).map(([id, inf]) => ({ id, level: inf.level }));
  levels.sort((a, b) => a.level - b.level);
  if (levels.length === 0 || levels[0].level >= 3) return null;
  const weakSkill = levels[0].id;
  const questions: Record<string, string> = {
    "data-structures": "Can you walk through how you'd implement a hash map from scratch? What are the trade-offs versus a tree-based structure?",
    "algorithms": "Describe a time you chose one algorithm over another. What factors drove that decision?",
    "testing-unit": "What's your strategy for testing a function with multiple edge cases? How do you prioritize which cases to cover?",
    "api-design": "How do you design an API to be backward-compatible when you need to add new fields or change behavior?",
    "containers": "Explain how you'd debug a container that keeps crashing in production. What tools and steps would you use?",
    "ci-cd": "Describe your ideal CI/CD pipeline from commit to production. What quality gates would you include?",
    "cloud-platforms": "How do you decide between serverless (Lambda) and container-based (ECS/EKS) for a new service?",
    "observability": "What metrics would you set up for a service to know it's healthy? How do you alert without alert fatigue?",
    "react-fe": "How would you optimize a React component that re-renders too frequently? Walk through your approach.",
    "html-css-fe": "Describe how you'd build a responsive layout that works on mobile, tablet, and desktop. What techniques do you use?",
    "performance-fe": "What tools do you use to diagnose a slow-loading page? Walk through how you'd find and fix the bottleneck.",
    "accessibility-a11y": "How do you ensure a custom component (like a dropdown) is accessible to screen readers?",
    "design-systems": "How do you approach building a design system from scratch? What's the first component you'd create and why?",
    "api-design-be": "How do you handle API versioning when you need to make a breaking change?",
    "database-advanced": "Describe a time you had to optimize a slow query. What was the root cause and how did you fix it?",
    "authentication-be": "Explain the difference between authentication and authorization. How would you implement role-based access control?",
    "caching": "When would you use Redis versus an in-memory cache? What are the trade-offs?",
    "messaging-event-driven": "When would you choose a message queue versus a synchronous API call? Give an example.",
    "microservices": "What are the signs that a monolith should be split into microservices? When should you NOT split?",
    "test-design": "How do you decide what to test manually vs automate? Give criteria you use.",
    "test-planning": "Describe how you'd create a test plan for a feature with a tight deadline. What gets cut and why?",
    "test-automation": "What's your approach to selecting a test automation framework? How do you maintain tests over time?",
    "performance-testing": "How do you determine the right load to test against? What baseline do you use?",
    "security-testing": "What's your process for conducting a security review of a web application?",
    "sql-advanced": "Describe a complex SQL query you wrote. What made it challenging and how did you optimize it?",
    "data-visualization": "How do you decide which chart type to use for a given dataset? Give an example.",
    "python-data": "Describe your process for cleaning and exploring a new dataset. What tools do you reach for first?",
    "machine-learning": "How do you know when a model is ready for production? What metrics matter most?",
    "deep-learning": "When would you choose a deep learning approach versus a simpler traditional ML model?",
    "nlp": "How would you build a text classification system for customer support tickets? Walk through the pipeline.",
    "statistics": "Explain a statistical concept (like p-value or confidence interval) to a non-technical audience.",
    "data-pipeline": "Describe the most complex data pipeline you've built. What were the key design decisions?",
    "data-modeling": "How do you decide between a star schema and a snowflake schema for a data warehouse?",
    "stream-processing": "When would you use stream processing versus batch processing? Give a concrete example.",
    "ml-serving": "How do you monitor a model in production? What signals tell you it's time to retrain?",
    "model-optimization": "What techniques have you used to reduce model inference latency? What was the impact?",
    "ml-pipelines": "Describe your ideal ML pipeline from data ingestion to production deployment.",
    "authentication": "How do you implement multi-factor authentication? What are the common pitfalls?",
    "penetration-testing": "Describe your approach to penetration testing. What tools and methodology do you use?",
    "secure-coding": "What's your checklist for reviewing code for security vulnerabilities?",
    "encryption": "Explain the difference between symmetric and asymmetric encryption. When would you use each?",
    "cloud-security": "How do you secure data in the cloud? What are the key controls you implement?",
    "system-design": "Design a URL shortening service. What are the key components and how do they scale?",
    "high-availability": "How do you architect a highly available system across multiple availability zones?",
    "api-enterprise": "How would you design an API gateway for a microservices architecture?",
    "infrastructure-as-code": "What are the benefits of infrastructure-as-code over manual provisioning? Give an example.",
    "technical-leadership": "Describe your approach to mentoring a junior engineer who is struggling with a technical concept.",
    "code-review": "What do you look for in a code review beyond correctness? How do you give constructive feedback?",
    "architecture": "Describe a time you had to make an architectural trade-off. What was the decision and why?",
    "agile-process": "How do you handle a sprint where the team is consistently missing commitments?",
    "people-management": "How do you handle an underperforming team member? Walk through your approach step by step.",
    "delivery-management": "How do you prioritize when everything is labeled 'high priority'? What framework do you use?",
    "technical-strategy": "How do you develop a technical roadmap for your team? What inputs do you consider?",
    "stakeholder-management": "Describe a time you had to manage conflicting stakeholder expectations. How did you resolve it?",
    "requirements-gathering": "How do you elicit requirements from a stakeholder who struggles to articulate what they need?",
    "process-modeling": "Describe a process you mapped out that revealed inefficiencies. What did you find and how did you address it?",
    "data-analysis-bc": "How do you use data to drive business decisions? Give an example where data changed your approach.",
    "stakeholder-communication": "How do you communicate technical concepts to non-technical stakeholders? Give an example.",
    "documentation": "What's your approach to documenting a complex system? What tools and formats do you use?",
    "backlog-prioritization": "How do you prioritize the backlog when you have more requests than capacity?",
    "user-research": "Describe a user research study you conducted. What methods did you use and what did you learn?",
    "interaction-design": "Walk me through your process for designing a complex user flow from concept to prototype.",
    "visual-design": "How do you establish and maintain a consistent visual design across a product?",
    "design-tools": "Describe your proficiency with design tools. Which do you use most and why?",
    "scrum-framework": "How do you handle a sprint that's going off track mid-way? What actions do you take?",
    "agile-coaching": "Describe a time you helped a team improve their Agile practices. What was the turning point?",
    "process-improvement": "What metrics do you track to measure team effectiveness? How do you use them to drive improvement?",
    "stakeholder-facilitation": "Describe a time you facilitated a difficult conversation between team members. What was the outcome?",
    "cost-optimization": "Describe a time you reduced cloud costs without sacrificing performance. What did you do?",
    "security-architecture": "How do you incorporate security into the architecture phase rather than as an afterthought?",
  };
  return questions[weakSkill] || `What would you like to improve most about your ${weakSkill.replace(/-/g, ' ')} skills?`;
}

/** Full mock analysis — entry point for the route's catch block */
export function mockAnalyzeInterview(targetRole: string, transcription: string): MockAnalysis {
  const skillInference = inferSkillsMock(targetRole, transcription);
  const overallAssessment = buildMockOverallAssessment(skillInference);
  const { strengths, gaps } = buildMockStrengthsAndGaps(skillInference);
  const followUpQuestion = buildMockFollowUpQuestion(skillInference, targetRole);
  return { overallAssessment, strengths, gaps, skillInference, followUpQuestion };
}
