"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { SkillGap, Skill } from "@/types";
import { useTranslation } from "@/lib/i18n-provider";

interface PartnerResource {
  platform: string;
  title: string;
  url: string;
  format: "course" | "article" | "video" | "book" | "practice";
  level: number;
  effortHours: number;
  description: string;
  cost: "free" | "paid" | "auditable";
}

const SKILL_CONTENT_MAP: Partial<Record<string, PartnerResource[]>> = {
  "problem-solving": [
    { platform: "Coursera", title: "Creative Problem Solving", url: "https://www.coursera.org/learn/creative-problem-solving", format: "course", level: 0, effortHours: 15, description: "Learn structured problem-solving methods including brainstorming, divergent thinking, and solution evaluation.", cost: "auditable" },
    { platform: "Coursera", title: "Critical Thinking Skills for University Success", url: "https://www.coursera.org/learn/critical-thinking-skills", format: "course", level: 0, effortHours: 20, description: "Develop critical thinking skills for analyzing problems and evaluating solutions.", cost: "auditable" },
  ],
  "communication": [
    { platform: "Coursera", title: "Improving Communication Skills", url: "https://www.coursera.org/learn/improving-communication-skills", format: "course", level: 0, effortHours: 12, description: "Learn effective communication strategies for the workplace including written, verbal, and interpersonal communication.", cost: "auditable" },
    { platform: "edX", title: "Communicating Effectively", url: "https://www.edx.org/course/communicating-effectively", format: "course", level: 0, effortHours: 18, description: "Master the fundamentals of effective professional communication across different audiences and contexts.", cost: "auditable" },
  ],
  "programming-languages": [
    { platform: "Coursera", title: "Learn Python (University of Michigan)", url: "https://www.coursera.org/specializations/python", format: "course", level: 0, effortHours: 40, description: "Comprehensive Python specialization covering basics through advanced topics.", cost: "auditable" },
    { platform: "Coursera", title: "Java Programming and Software Engineering Fundamentals (Duke)", url: "https://www.coursera.org/specializations/java-programming", format: "course", level: 0, effortHours: 48, description: "Full Java specialization from Duke covering OOP, data structures, and software engineering fundamentals.", cost: "auditable" },
    { platform: "DeepLearning.AI", title: "AI For Everyone", url: "https://www.deeplearning.ai/courses/ai-for-everyone/", format: "course", level: 1, effortHours: 8, description: "Non-technical AI course that helps software engineers understand AI capabilities and how to apply them.", cost: "free" },
  ],
  "algorithms-data-structures": [
    { platform: "Coursera", title: "Algorithms Specialization (Stanford)", url: "https://www.coursera.org/specializations/algorithms", format: "course", level: 2, effortHours: 60, description: "Stanford's renowned algorithms specialization covering divide-and-conquer, graph search, and greedy algorithms.", cost: "auditable" },
    { platform: "Coursera", title: "Data Structures and Algorithms Specialization (UCSD)", url: "https://www.coursera.org/specializations/data-structures-algorithms", format: "course", level: 2, effortHours: 55, description: "Comprehensive data structures and algorithms course with programming assignments in Python, C++, or Java.", cost: "auditable" },
    { platform: "edX", title: "Algorithms and Data Structures (MIT)", url: "https://www.edx.org/learn/algorithms-and-data-structures", format: "course", level: 2, effortHours: 45, description: "MIT's algorithms course covering fundamental data structures, sorting, searching, and graph algorithms.", cost: "auditable" },
  ],
  "system-design": [
    { platform: "DeepLearning.AI", title: "Machine Learning Engineering for Production (MLOps)", url: "https://www.deeplearning.ai/courses/machine-learning-engineering-for-production/", format: "course", level: 3, effortHours: 30, description: "Covers system design for production ML systems — relevant for understanding scalable architecture patterns.", cost: "free" },
    { platform: "Coursera", title: "Cloud Computing Basics (Cloud2U)", url: "https://www.coursera.org/learn/cloud-computing-basics", format: "course", level: 1, effortHours: 15, description: "Introduction to cloud computing concepts including IaaS, PaaS, SaaS, and cloud architecture patterns.", cost: "auditable" },
    { platform: "Coursera", title: "Software Architecture & Design", url: "https://www.coursera.org/learn/software-architecture-design", format: "course", level: 3, effortHours: 25, description: "Covers architectural patterns, design principles, and trade-off analysis for large-scale systems.", cost: "auditable" },
  ],
  "version-control": [
    { platform: "Coursera", title: "Version Control with Git (Atlassian)", url: "https://www.coursera.org/learn/version-control-git", format: "course", level: 0, effortHours: 10, description: "Official Atlassian Git tutorial covering branching, merging, rebasing, and collaborative workflows.", cost: "free" },
    { platform: "edX", title: "Introduction to Git and GitHub", url: "https://www.edx.org/course/introduction-to-git-and-github", format: "course", level: 0, effortHours: 12, description: "Hands-on introduction to Git version control and GitHub collaboration workflows.", cost: "auditable" },
  ],
  "testing": [
    { platform: "Coursera", title: "Software Testing and Automation Specialization (U of Minnesota)", url: "https://www.coursera.org/specializations/software-testing", format: "course", level: 1, effortHours: 40, description: "Comprehensive software testing specialization covering unit testing, integration testing, automation, and TDD.", cost: "auditable" },
    { platform: "edX", title: "Software Testing", url: "https://www.edx.org/course/software-testing", format: "course", level: 1, effortHours: 20, description: "Fundamentals of software testing including test design techniques, test management, and quality assurance.", cost: "auditable" },
  ],
  "debugging-troubleshooting": [
    { platform: "Coursera", title: "Debugging Software (University of Toronto)", url: "https://www.coursera.org/learn/debugging-software", format: "course", level: 1, effortHours: 10, description: "Systematic approaches to debugging software including understanding error messages, using debuggers, and logical deduction.", cost: "auditable" },
  ],
  "code-quality": [
    { platform: "Coursera", title: "Clean Code (University of Alberta)", url: "https://www.coursera.org/learn/clean-code", format: "course", level: 1, effortHours: 15, description: "Principles and practices for writing clean, readable, and maintainable code.", cost: "auditable" },
  ],
  "architecture": [
    { platform: "Coursera", title: "Software Architecture (University of Alberta)", url: "https://www.coursera.org/learn/software-architecture", format: "course", level: 3, effortHours: 20, description: "Comprehensive software architecture course covering architectural styles, patterns, and design decisions.", cost: "auditable" },
    { platform: "Coursera", title: "Cloud Architecture (Google Cloud)", url: "https://www.coursera.org/professional-certificates/google-cloud-architecture", format: "course", level: 3, effortHours: 120, description: "Professional certificate in Google Cloud architecture covering design, deployment, and management of cloud-native solutions.", cost: "paid" },
  ],
  "api-design": [
    { platform: "Coursera", title: "RESTful API Design (API University)", url: "https://www.coursera.org/learn/restful-api-design", format: "course", level: 2, effortHours: 15, description: "Best practices for designing RESTful APIs including resource naming, versioning, error handling, and documentation.", cost: "auditable" },
  ],
  "database-design": [
    { platform: "Coursera", title: "Database Systems Specialization (Colorado)", url: "https://www.coursera.org/specializations/database-systems", format: "course", level: 2, effortHours: 45, description: "Comprehensive database specialization covering SQL, data modeling, normalization, and database design.", cost: "auditable" },
    { platform: "edX", title: "Database Design and Management", url: "https://www.edx.org/course/database-design-and-management", format: "course", level: 2, effortHours: 25, description: "Principles of relational database design including normalization, indexing, and query optimization.", cost: "auditable" },
  ],
  "performance-optimization": [
    { platform: "Coursera", title: "Performance Tuning (IBM)", url: "https://www.coursera.org/learn/performance-tuning-systems", format: "course", level: 3, effortHours: 20, description: "Techniques for identifying and resolving performance bottlenecks in software systems and databases.", cost: "auditable" },
  ],
  "cloud-platforms": [
    { platform: "Coursera", title: "AWS Fundamentals Specialization", url: "https://www.coursera.org/specializations/aws-fundamentals", format: "course", level: 1, effortHours: 45, description: "Introduction to AWS core services including EC2, S3, RDS, VPC, IAM, and Lambda.", cost: "auditable" },
    { platform: "Coursera", title: "Microsoft Azure Fundamentals (AZ-900)", url: "https://www.coursera.org/learn/microsoft-azure-fundamentals", format: "course", level: 1, effortHours: 20, description: "Azure fundamentals covering cloud concepts, core Azure services, security, and pricing.", cost: "auditable" },
    { platform: "Coursera", title: "Google Cloud Fundamentals", url: "https://www.coursera.org/learn/google-cloud-fundamentals", format: "course", level: 1, effortHours: 20, description: "Introduction to Google Cloud Platform core services and cloud architecture concepts.", cost: "auditable" },
  ],
  "infrastructure-as-code": [
    { platform: "Coursera", title: "Infrastructure as Code with Terraform", url: "https://www.coursera.org/learn/terraform", format: "course", level: 2, effortHours: 20, description: "Learn to define and provision infrastructure using Terraform including modules, state management, and best practices.", cost: "auditable" },
  ],
  "containers": [
    { platform: "Coursera", title: "Docker Containerization (UC Davis)", url: "https://www.coursera.org/learn/docker", format: "course", level: 1, effortHours: 15, description: "Introduction to Docker containerization including images, containers, Dockerfiles, and container networking.", cost: "auditable" },
  ],
  "orchestration": [
    { platform: "Coursera", title: "Kubernetes for Beginners", url: "https://www.coursera.org/learn/kubernetes", format: "course", level: 2, effortHours: 25, description: "Introduction to Kubernetes covering pods, deployments, services, configmaps, and basic orchestration patterns.", cost: "auditable" },
    { platform: "edX", title: "Kubernetes: From Basics to Deployment", url: "https://www.edx.org/course/kubernetes-from-basics-to-deployment", format: "course", level: 2, effortHours: 30, description: "Comprehensive Kubernetes course from basic concepts through production deployment strategies.", cost: "auditable" },
  ],
  "data-handler": [
    { platform: "Coursera", title: "Python for Data Science (IBM)", url: "https://www.coursera.org/learn/python-for-data-science", format: "course", level: 0, effortHours: 18, description: "Python fundamentals for data analysis including NumPy, Pandas, and data visualization.", cost: "auditable" },
    { platform: "Coursera", title: "SQL for Data Science (UCSD)", url: "https://www.coursera.org/learn/sql-for-data-science", format: "course", level: 0, effortHours: 15, description: "SQL fundamentals for data scientists including querying, aggregation, and basic data analysis.", cost: "auditable" },
  ],
  "database-operations": [
    { platform: "Coursera", title: "Database Management Systems (CMU)", url: "https://www.coursera.org/learn/database-management-systems", format: "course", level: 2, effortHours: 30, description: "Database internals including storage, query processing, transaction management, and optimization.", cost: "auditable" },
  ],
  "caching": [
    { platform: "Coursera", title: "Caching Strategies for Web Applications", url: "https://www.coursera.org/learn/caching-strategies", format: "course", level: 2, effortHours: 10, description: "Understanding caching architectures including CDN, application cache, database cache, and cache invalidation strategies.", cost: "auditable" },
  ],
  "messaging-event-driven": [
    { platform: "Coursera", title: "Apache Kafka for Event-Driven Architecture", url: "https://www.coursera.org/learn/apache-kafka", format: "course", level: 2, effortHours: 20, description: "Introduction to Apache Kafka covering topics, partitions, consumers, producers, and event-driven design patterns.", cost: "auditable" },
  ],
  "html-css": [
    { platform: "Coursera", title: "HTML, CSS, and Javascript for Web Developers (Johns Hopkins)", url: "https://www.coursera.org/learn/html-css-javascript-for-web-developers", format: "course", level: 0, effortHours: 25, description: "Comprehensive web development fundamentals covering HTML5, CSS3, JavaScript, and responsive design.", cost: "auditable" },
  ],
  "javascript-typescript": [
    { platform: "Coursera", title: "JavaScript (University of Michigan)", url: "https://www.coursera.org/specializations/javascript", format: "course", level: 0, effortHours: 40, description: "Full JavaScript specialization covering basics, DOM manipulation, async programming, and modern ES6+ features.", cost: "auditable" },
    { platform: "Coursera", title: "TypeScript for JavaScript Developers", url: "https://www.coursera.org/learn/typescript-for-javascript-developers", format: "course", level: 1, effortHours: 15, description: "Introduction to TypeScript covering types, interfaces, generics, and type safety for JavaScript developers.", cost: "auditable" },
  ],
  "frontend-frameworks": [
    { platform: "Coursera", title: "React (Meta)", url: "https://www.coursera.org/professional-certificates/meta-front-end-developer", format: "course", level: 1, effortHours: 60, description: "Meta's Front-End Developer professional certificate covering React, JSX, components, state management, and hooks.", cost: "auditable" },
    { platform: "Coursera", title: "Angular (Microsoft)", url: "https://www.coursera.org/learn/angular", format: "course", level: 1, effortHours: 25, description: "Introduction to Angular covering components, services, dependency injection, routing, and forms.", cost: "auditable" },
  ],
  "frontend-state-management": [
    { platform: "Coursera", title: "State Management with Redux", url: "https://www.coursera.org/learn/redux-state-management", format: "course", level: 2, effortHours: 12, description: "Learning Redux for managing complex application state in React applications including actions, reducers, and store.", cost: "auditable" },
  ],
  "responsive-design": [
    { platform: "Coursera", title: "Responsive Web Design (University of Michigan)", url: "https://www.coursera.org/learn/responsive-web-design", format: "course", level: 0, effortHours: 15, description: "Building responsive websites that work across devices using media queries, flexible layouts, and mobile-first design.", cost: "auditable" },
  ],
  "web-performance": [
    { platform: "Coursera", title: "Website Performance Optimization (UofI)", url: "https://www.coursera.org/learn/website-performance-optimization", format: "course", level: 2, effortHours: 12, description: "Techniques for optimizing web application performance including lazy loading, code splitting, caching, and Core Web Vitals.", cost: "auditable" },
  ],
  "accessibility": [
    { platform: "Coursera", title: "Web Accessibility (UofMichigan)", url: "https://www.coursera.org/learn/web-accessibility", format: "course", level: 0, effortHours: 12, description: "Building accessible web applications following WCAG guidelines including semantic HTML, ARIA, and keyboard navigation.", cost: "auditable" },
  ],
  "api-development": [
    { platform: "Coursera", title: "Building RESTful APIs with Node.js", url: "https://www.coursera.org/learn/restful-apis-nodejs", format: "course", level: 1, effortHours: 20, description: "Building RESTful APIs using Node.js and Express including routing, middleware, authentication, and error handling.", cost: "auditable" },
  ],
  "authentication-authorization": [
    { platform: "Coursera", title: "Authentication and Authorization (UofI)", url: "https://www.coursera.org/learn/authentication-authorization", format: "course", level: 2, effortHours: 15, description: "Implementing authentication and authorization including session management, JWT, OAuth 2.0, and RBAC.", cost: "auditable" },
  ],
  "microservices": [
    { platform: "Coursera", title: "Microservices Architecture", url: "https://www.coursera.org/learn/microservices-architecture", format: "course", level: 3, effortHours: 25, description: "Designing and building microservices including service decomposition, inter-service communication, and deployment patterns.", cost: "auditable" },
  ],
  "serverless": [
    { platform: "Coursera", title: "Serverless Computing with AWS Lambda", url: "https://www.coursera.org/learn/aws-lambda", format: "course", level: 2, effortHours: 15, description: "Building serverless applications using AWS Lambda, API Gateway, and other serverless services.", cost: "auditable" },
  ],
  "web-servers-proxies": [
    { platform: "Coursera", title: "Nginx Essentials", url: "https://www.coursera.org/learn/nginx-essentials", format: "course", level: 1, effortHours: 8, description: "Configuring Nginx as a web server and reverse proxy including load balancing, SSL termination, and caching.", cost: "auditable" },
  ],
  "secure-coding": [
    { platform: "Coursera", title: "Secure Coding Practices (University of Washington)", url: "https://www.coursera.org/learn/secure-coding", format: "course", level: 1, effortHours: 18, description: "Secure coding principles including input validation, output encoding, and avoiding common vulnerabilities.", cost: "auditable" },
    { platform: "edX", title: "Cybersecurity Fundamentals", url: "https://www.edx.org/course/cybersecurity-fundamentals", format: "course", level: 0, effortHours: 25, description: "Introduction to cybersecurity including threats, vulnerabilities, and secure software development practices.", cost: "auditable" },
  ],
  "authentication-implementation": [
    { platform: "Coursera", title: "Implementing Authentication with OAuth 2.0 and JWT", url: "https://www.coursera.org/learn/oauth-jwt-authentication", format: "course", level: 2, effortHours: 15, description: "Implementing modern authentication using OAuth 2.0, OpenID Connect, and JWT tokens.", cost: "auditable" },
  ],
  "data-protection": [
    { platform: "Coursera", title: "Data Privacy and Security", url: "https://www.coursera.org/learn/data-privacy-security", format: "course", level: 1, effortHours: 12, description: "Understanding data privacy regulations and implementing data protection measures including encryption and access controls.", cost: "auditable" },
  ],
  "dependency-security": [
    { platform: "Coursera", title: "Software Supply Chain Security", url: "https://www.coursera.org/learn/software-supply-chain-security", format: "course", level: 2, effortHours: 10, description: "Managing security of third-party dependencies including vulnerability scanning, updates, and supply chain best practices.", cost: "auditable" },
  ],
  "ci-cd": [
    { platform: "Coursera", title: "CI/CD Pipelines (Google Cloud)", url: "https://www.coursera.org/learn/cicd-pipelines", format: "course", level: 1, effortHours: 15, description: "Building CI/CD pipelines using Google Cloud Build, Cloud Source Repositories, and deployment automation.", cost: "auditable" },
    { platform: "edX", title: "DevOps: CI/CD Pipelines", url: "https://www.edx.org/course/devops-cicd-pipelines", format: "course", level: 1, effortHours: 20, description: "Building CI/CD pipelines using Jenkins, GitHub Actions, or GitLab CI.", cost: "auditable" },
  ],
  "monitoring-observability": [
    { platform: "Coursera", title: "Monitoring and Observability (Datadog)", url: "https://www.coursera.org/learn/monitoring-observability", format: "course", level: 2, effortHours: 18, description: "Setting up monitoring, logging, and observability using Datadog, Prometheus, and Grafana.", cost: "auditable" },
  ],
};

const BOOKMARKS_KEY = "hirena_bookmarks";

function getBookmarks(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const stored = localStorage.getItem(BOOKMARKS_KEY);
    return stored ? new Set(JSON.parse(stored) as string[]) : new Set();
  } catch {
    return new Set();
  }
}

function saveBookmarks(bookmarks: Set<string>) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(Array.from(bookmarks)));
  } catch {
    // ignore
  }
}

interface SkillContentCardProps {
  gap: SkillGap;
  onClose?: () => void;
  searchQuery: string;
  platformFilter: string[];
  costFilter: string[];
  bookmarkedOnly: boolean;
  bookmarks: Set<string>;
  onToggleBookmark: (resourceId: string) => void;
}

function SkillContentCard({
  gap,
  onClose,
  searchQuery,
  platformFilter,
  costFilter,
  bookmarkedOnly,
  bookmarks,
  onToggleBookmark,
}: SkillContentCardProps) {
  const { t } = useTranslation();
  const resources = SKILL_CONTENT_MAP[gap.skill.id] || [];
  const resourceId = (r: PartnerResource) => `${r.platform}::${r.title}`;

  const query = searchQuery.trim().toLowerCase();
  let filtered = resources;
  if (query) {
    filtered = filtered.filter(
      (r) =>
        r.title.toLowerCase().includes(query) ||
        r.description.toLowerCase().includes(query) ||
        r.platform.toLowerCase().includes(query)
    );
  }
  if (platformFilter.length > 0) {
    filtered = filtered.filter((r) => platformFilter.includes(r.platform));
  }
  if (costFilter.length > 0) {
    filtered = filtered.filter((r) => costFilter.includes(r.cost));
  }
  if (bookmarkedOnly) {
    filtered = filtered.filter((r) => bookmarks.has(resourceId(r)));
  }

  const isBookmarked = (r: PartnerResource) => bookmarks.has(resourceId(r));

  return (
    <Card className="border-border bg-surface">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="text-base">{t("resources.cardTitle", { skill: gap.skill.name })}</CardTitle>
        {onClose && (
          <Button variant="ghost" size="sm" onClick={onClose}>
            {t("resources.close")}
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <p className="text-sm text-foreground-muted mb-4">
          {gap.note || `${t("resources.levelHint", { current: gap.currentLevel, target: gap.targetLevel })}`}
        </p>

        <div className="flex flex-wrap items-center gap-2 mb-4">
          <Input
            placeholder={t("resources.searchPlaceholder")}
            value={searchQuery}
            onChange={(e) => {}}
            className="w-40"
          />
          <Select>
            <SelectTrigger className="w-32">
              <SelectValue placeholder={t("resources.filterPlatform")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("resources.allPlatforms")}</SelectItem>
              <SelectItem value="Coursera">Coursera</SelectItem>
              <SelectItem value="edX">edX</SelectItem>
              <SelectItem value="DeepLearning.AI">DeepLearning.AI</SelectItem>
              <SelectItem value="LinkedIn Learning">LinkedIn Learning</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-32">
              <SelectValue placeholder={t("resources.filterCost")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("resources.allCosts")}</SelectItem>
              <SelectItem value="free">{t("resources.free")}</SelectItem>
              <SelectItem value="auditable">{t("resources.audit")}</SelectItem>
              <SelectItem value="paid">{t("resources.paid")}</SelectItem>
            </SelectContent>
          </Select>
          <Button variant={bookmarkedOnly ? "default" : "outline"} size="sm" className="text-xs" onClick={() => {}}>
            {t("resources.bookmarkedOnly")}
          </Button>
        </div>

        {filtered.length > 0 ? (
          <div className="space-y-3">
            {filtered.map((resource) => {
              const rid = resourceId(resource);
              return (
                <a
                  key={rid}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-lg border border-border bg-background hover:bg-foreground/5 transition-colors p-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <Badge variant="outline" className="text-xs font-medium">{resource.platform}</Badge>
                        <Badge variant="secondary" className="text-xs font-medium capitalize">{resource.format}</Badge>
                        {resource.cost === "free" && <Badge variant="secondary" className="text-xs">{t("resources.free")}</Badge>}
                        {resource.cost === "auditable" && <Badge variant="outline" className="text-xs text-amber-500">{t("resources.audit")}</Badge>}
                        {resource.cost === "paid" && <Badge variant="secondary" className="text-xs">{t("resources.paid")}</Badge>}
                      </div>
                      <h4 className="text-sm font-medium text-foreground leading-tight">{resource.title}</h4>
                      <p className="text-xs text-foreground-muted mt-1">{resource.description}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-foreground-muted">
                        <span>⏱ {resource.effortHours} hrs</span>
                        <span>{t("resources.level", { level: resource.level })}</span>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onToggleBookmark(rid);
                      }}
                      className={cn(
                        "flex-shrink-0 mt-1 transition-colors",
                        isBookmarked(resource) ? "text-amber-500" : "text-foreground-muted hover:text-amber-500"
                      )}
                      title={isBookmarked(resource) ? t("resources.removeBookmark") : t("resources.addBookmark")}
                    >
                      <svg className="w-5 h-5" fill={isBookmarked(resource) ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                    </button>
                  </div>
                </a>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-foreground-muted">
            {query || platformFilter.length > 0 || costFilter.length > 0 || bookmarkedOnly
              ? t("resources.noResults")
              : t("resources.noResources")}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

interface LearningResourcesPanelProps {
  gaps: SkillGap[];
  missingSkills: Skill[];
  targetRole: string;
  region: string;
  onResourceClose?: (skillId: string) => void;
}

const ALL_PLATFORMS = ["Coursera", "edX", "DeepLearning.AI", "LinkedIn Learning"];
const ALL_COSTS = ["free", "auditable", "paid"];

export function LearningResourcesPanel({ gaps, missingSkills, targetRole, region, onResourceClose }: LearningResourcesPanelProps) {
  const { t } = useTranslation();
  const [expandedSkill, setExpandedSkill] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [platformFilter, setPlatformFilter] = React.useState<string[]>([]);
  const [costFilter, setCostFilter] = React.useState<string[]>([]);
  const [bookmarkedOnly, setBookmarkedOnly] = React.useState(false);
  const [bookmarks, setBookmarks] = React.useState<Set<string>>(() => getBookmarks());

  const resourceId = (r: PartnerResource) => `${r.platform}::${r.title}`;

  const openResource = (skillId: string) => setExpandedSkill(skillId);

  const closeResource = () => {
    if (expandedSkill && onResourceClose) onResourceClose(expandedSkill);
    setExpandedSkill(null);
  };

  const toggleBookmark = (rid: string) => {
    setBookmarks((prev) => {
      const next = new Set(prev);
      if (next.has(rid)) next.delete(rid);
      else next.add(rid);
      saveBookmarks(next);
      return next;
    });
  };

  const clearFilters = () => {
    setSearchQuery("");
    setPlatformFilter([]);
    setCostFilter([]);
    setBookmarkedOnly(false);
  };

  const hasActiveFilters = searchQuery.trim() || platformFilter.length > 0 || costFilter.length > 0 || bookmarkedOnly;
  const expandedGap = gaps.find((g) => g.skill.id === expandedSkill);
  const bookmarkedCount = Array.from(bookmarks).length;

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">{t("resources.title")}</h3>
          <p className="text-sm text-foreground-muted">{t("resources.subtitle")}</p>
        </div>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs text-foreground-muted">
            {t("resources.clearFilters")}
          </Button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2">
        <Input
          placeholder={t("resources.searchPlaceholder")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-40 h-9 text-sm"
        />
        <Select>
          <SelectTrigger className="w-36 h-9 text-sm">
            <SelectValue placeholder={t("resources.filterPlatform")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("resources.allPlatforms")}</SelectItem>
            {ALL_PLATFORMS.map((p) => (
              <SelectItem key={p} value={p}>{p}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-36 h-9 text-sm">
            <SelectValue placeholder={t("resources.filterCost")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("resources.allCosts")}</SelectItem>
            {ALL_COSTS.map((c) => (
              <SelectItem key={c} value={c}>{t(`resources.${c}`)}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          variant={bookmarkedOnly ? "default" : "outline"}
          size="sm"
          onClick={() => setBookmarkedOnly(!bookmarkedOnly)}
          className="text-xs"
        >
          {t("resources.bookmarkedOnly")}
        </Button>
      </div>

      {bookmarkedCount > 0 && (
        <div className="text-xs text-foreground-muted">{t("resources.bookmarkCount", { count: bookmarkedCount })}</div>
      )}

      {gaps.length === 0 ? (
        <Card className="border-border bg-surface">
          <CardContent className="py-8 text-center">
            <p className="text-foreground-muted">{t("resources.noGaps")}</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {gaps.slice(0, 5).map((gap) => {
            const hasResources = SKILL_CONTENT_MAP[gap.skill.id] && SKILL_CONTENT_MAP[gap.skill.id]!.length > 0;
            const expanded = expandedSkill === gap.skill.id;
            return (
              <button
                key={gap.skill.id}
                onClick={() => openResource(gap.skill.id)}
                className={cn(
                  "w-full text-left rounded-lg border p-4 transition-all hover:bg-surface/50 hover:border-primary/30",
                  expanded && "border-primary bg-primary/5",
                  !hasResources && "opacity-60"
                )}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-foreground">{gap.skill.name}</div>
                    <div className="text-xs text-foreground-muted capitalize mt-1">
                      {t("resources.gapSize", { current: gap.currentLevel, target: gap.targetLevel, gap: gap.gapSize })}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {hasResources && (
                      <Badge variant="outline" className="text-xs">
                        {SKILL_CONTENT_MAP[gap.skill.id]?.length || 0} {t("resources.resourcesCount")}
                      </Badge>
                    )}
                    <svg
                      className={cn("w-4 h-4 text-foreground-muted transition-transform", expanded && "rotate-180")}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {expandedGap && (
        <div className="mt-2">
          <SkillContentCard
            gap={expandedGap}
            onClose={closeResource}
            searchQuery={searchQuery}
            platformFilter={platformFilter}
            costFilter={costFilter}
            bookmarkedOnly={bookmarkedOnly}
            bookmarks={bookmarks}
            onToggleBookmark={toggleBookmark}
          />
        </div>
      )}

      <div className="pt-4 border-t border-border">
        <p className="text-xs text-foreground-muted mb-2">{t("resources.partners")}</p>
        <div className="flex flex-wrap gap-3">
          {[
            { name: "Coursera", url: "https://www.coursera.org" },
            { name: "edX", url: "https://www.edx.org" },
            { name: "DeepLearning.AI", url: "https://www.deeplearning.ai" },
            { name: "LinkedIn Learning", url: "https://www.linkedin.com/learning" },
          ].map((p) => (
            <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" className="text-xs text-foreground-muted hover:text-primary underline">
              {p.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LearningResourcesPanel;
