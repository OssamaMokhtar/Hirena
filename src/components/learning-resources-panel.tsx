"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import type { SkillGap, Skill } from "@/types";
import { getSkillDescription, getRoleDescription } from "@/lib/it-skill-descriptions";
import { useTranslation } from "@/lib/i18n-provider";

// ─── Partner Content Registry ──────────────────────────────────────────────
// Maps skill IDs to curated learning resources from top educational platforms.
// This is the "content mapping per skill" that connects skill gaps to
// specific courses, articles, and resources from Coursera, edX, DeepLearning.AI, etc.

interface PartnerResource {
  platform: string;
  title: string;
  url: string;
  format: "course" | "article" | "video" | "book" | "practice";
  level: number; // minimum level this resource is appropriate for
  effortHours: number; // estimated time commitment
  description: string;
  cost: "free" | "paid" | "auditable";
  partnerLogo?: string;
}

// Curated content map — skillId → array of recommended resources
const SKILL_CONTENT_MAP: Partial<Record<string, PartnerResource[]>> = {
  // ── General / cross-cutting ──────────────────────────────────────────────
  "problem-solving": [
    {
      platform: "Coursera",
      title: "Creative Problem Solving",
      url: "https://www.coursera.org/learn/creative-problem-solving",
      format: "course",
      level: 0,
      effortHours: 15,
      description: "Learn structured problem-solving methods including brainstorming, divergent thinking, and solution evaluation.",
      cost: "auditable",
    },
    {
      platform: "Coursera",
      title: "Critical Thinking Skills for University Success",
      url: "https://www.coursera.org/learn/critical-thinking-skills",
      format: "course",
      level: 0,
      effortHours: 20,
      description: "Develop critical thinking skills for analyzing problems and evaluating solutions.",
      cost: "auditable",
    },
  ],
  "communication": [
    {
      platform: "Coursera",
      title: "Improving Communication Skills",
      url: "https://www.coursera.org/learn/improving-communication-skills",
      format: "course",
      level: 0,
      effortHours: 12,
      description: "Learn effective communication strategies for the workplace including written, verbal, and interpersonal communication.",
      cost: "auditable",
    },
    {
      platform: "edX",
      title: "Communicating Effectively",
      url: "https://www.edx.org/course/communicating-effectively",
      format: "course",
      level: 0,
      effortHours: 18,
      description: "Master the fundamentals of effective professional communication across different audiences and contexts.",
      cost: "auditable",
    },
  ],

  // ── Software Engineering Core ────────────────────────────────────────────
  "programming-languages": [
    {
      platform: "Coursera",
      title: "Learn Python (University of Michigan)",
      url: "https://www.coursera.org/specializations/python",
      format: "course",
      level: 0,
      effortHours: 40,
      description: "Comprehensive Python specialization covering basics through advanced topics. One of Coursera's most popular programming paths.",
      cost: "auditable",
    },
    {
      platform: "Coursera",
      title: "Java Programming and Software Engineering Fundamentals (Duke University)",
      url: "https://www.coursera.org/specializations/java-programming",
      format: "course",
      level: 0,
      effortHours: 48,
      description: "Full Java specialization from Duke covering OOP, data structures, and software engineering fundamentals.",
      cost: "auditable",
    },
    {
      platform: "DeepLearning.AI",
      title: "AI For Everyone",
      url: "https://www.deeplearning.ai/courses/ai-for-everyone/",
      format: "course",
      level: 1,
      effortHours: 8,
      description: "Non-technical AI course that helps software engineers understand AI capabilities and how to apply them in software projects.",
      cost: "free",
    },
  ],
  "algorithms-data-structures": [
    {
      platform: "Coursera",
      title: "Algorithms Specialization (Stanford - Tim Roughgarden)",
      url: "https://www.coursera.org/specializations/algorithms",
      format: "course",
      level: 2,
      effortHours: 60,
      description: "Stanford's renowned algorithms specialization covering divide-and-conquer, graph search, shortest paths, and greedy algorithms.",
      cost: "auditable",
    },
    {
      platform: "Coursera",
      title: "Data Structures and Algorithms Specialization (UCSD)",
      url: "https://www.coursera.org/specializations/data-structures-algorithms",
      format: "course",
      level: 2,
      effortHours: 55,
      description: "Comprehensive data structures and algorithms course with programming assignments in Python, C++, or Java.",
      cost: "auditable",
    },
    {
      platform: "edX",
      title: "Algorithms and Data Structures (MIT)",
      url: "https://www.edx.org/learn/algorithms-and-data-structures",
      format: "course",
      level: 2,
      effortHours: 45,
      description: "MIT's algorithms course covering fundamental data structures, sorting, searching, and graph algorithms.",
      cost: "auditable",
    },
  ],
  "system-design": [
    {
      platform: "DeepLearning.AI",
      title: "Machine Learning Engineering for Production (MLOps)",
      url: "https://www.deeplearning.ai/courses/machine-learning-engineering-for-production/",
      format: "course",
      level: 3,
      effortHours: 30,
      description: "While ML-focused, this covers system design for production ML systems — relevant for understanding scalable system architecture patterns.",
      cost: "free",
    },
    {
      platform: "Coursera",
      title: "Cloud Computing Basics (Cloud2U)",
      url: "https://www.coursera.org/learn/cloud-computing-basics",
      format: "course",
      level: 1,
      effortHours: 15,
      description: "Introduction to cloud computing concepts including IaaS, PaaS, SaaS, virtualization, and cloud architecture patterns.",
      cost: "auditable",
    },
    {
      platform: "Coursera",
      title: "Software Architecture & Design",
      url: "https://www.coursera.org/learn/software-architecture-design",
      format: "course",
      level: 3,
      effortHours: 25,
      description: "Covers architectural patterns, design principles, and trade-off analysis for large-scale software systems.",
      cost: "auditable",
    },
  ],
  "version-control": [
    {
      platform: "Coursera",
      title: "Version Control with Git (Atlassian)",
      url: "https://www.coursera.org/learn/version-control-git",
      format: "course",
      level: 0,
      effortHours: 10,
      description: "Official Atlassian Git tutorial course covering branching, merging, rebasing, and collaborative workflows.",
      cost: "free",
    },
    {
      platform: "edX",
      title: "Introduction to Git and GitHub",
      url: "https://www.edx.org/course/introduction-to-git-and-github",
      format: "course",
      level: 0,
      effortHours: 12,
      description: "Hands-on introduction to Git version control and GitHub collaboration workflows.",
      cost: "auditable",
    },
  ],
  "testing": [
    {
      platform: "Coursera",
      title: "Software Testing and Automation Specialization (U of Minnesota)",
      url: "https://www.coursera.org/specializations/software-testing",
      format: "course",
      level: 1,
      effortHours: 40,
      description: "Comprehensive software testing specialization covering unit testing, integration testing, automation, and test-driven development.",
      cost: "auditable",
    },
    {
      platform: "edX",
      title: "Software Testing",
      url: "https://www.edx.org/course/software-testing",
      format: "course",
      level: 1,
      effortHours: 20,
      description: "Fundamentals of software testing including test design techniques, test management, and quality assurance processes.",
      cost: "auditable",
    },
  ],
  "debugging-troubleshooting": [
    {
      platform: "Coursera",
      title: "Debugging Software (University of Toronto)",
      url: "https://www.coursera.org/learn/debugging-software",
      format: "course",
      level: 1,
      effortHours: 10,
      description: "Systematic approaches to debugging software including understanding error messages, using debuggers, and logical deduction.",
      cost: "auditable",
    },
  ],
  "code-quality": [
    {
      platform: "Coursera",
      title: "Clean Code (University of Alberta)",
      url: "https://www.coursera.org/learn/clean-code",
      format: "course",
      level: 1,
      effortHours: 15,
      description: "Principles and practices for writing clean, readable, and maintainable code inspired by Robert C. Martin's Clean Code.",
      cost: "auditable",
    },
  ],

  // ── Architecture & Design ────────────────────────────────────────────────
  "architecture": [
    {
      platform: "Coursera",
      title: "Software Architecture (University of Alberta)",
      url: "https://www.coursera.org/learn/software-architecture",
      format: "course",
      level: 3,
      effortHours: 20,
      description: "Comprehensive software architecture course covering architectural styles, patterns, and design decisions.",
      cost: "auditable",
    },
    {
      platform: "Coursera",
      title: "Cloud Architecture (Google Cloud)",
      url: "https://www.coursera.org/professional-certificates/google-cloud-architecture",
      format: "course",
      level: 3,
      effortHours: 120,
      description: "Professional certificate in Google Cloud architecture covering design, deployment, and management of cloud-native solutions.",
      cost: "paid",
    },
  ],
  "api-design": [
    {
      platform: "Coursera",
      title: "RESTful API Design (API University)",
      url: "https://www.coursera.org/learn/restful-api-design",
      format: "course",
      level: 2,
      effortHours: 15,
      description: "Best practices for designing RESTful APIs including resource naming, versioning, error handling, and documentation.",
      cost: "auditable",
    },
  ],
  "database-design": [
    {
      platform: "Coursera",
      title: "Database Systems Specialization (Colorado)",
      url: "https://www.coursera.org/specializations/database-systems",
      format: "course",
      level: 2,
      effortHours: 45,
      description: "Comprehensive database specialization covering SQL, data modeling, normalization, and database design.",
      cost: "auditable",
    },
    {
      platform: "edX",
      title: "Database Design and Management",
      url: "https://www.edx.org/course/database-design-and-management",
      format: "course",
      level: 2,
      effortHours: 25,
      description: "Principles of relational database design including normalization, indexing, and query optimization.",
      cost: "auditable",
    },
  ],
  "performance-optimization": [
    {
      platform: "Coursera",
      title: "Performance Tuning (IBM)",
      url: "https://www.coursera.org/learn/performance-tuning-systems",
      format: "course",
      level: 3,
      effortHours: 20,
      description: "Techniques for identifying and resolving performance bottlenecks in software systems and databases.",
      cost: "auditable",
    },
  ],

  // ── Cloud & Infrastructure ──────────────────────────────────────────────
  "cloud-platforms": [
    {
      platform: "Coursera",
      title: "AWS Fundamentals Specialization",
      url: "https://www.coursera.org/specializations/aws-fundamentals",
      format: "course",
      level: 1,
      effortHours: 45,
      description: "Introduction to AWS core services including EC2, S3, RDS, VPC, IAM, and Lambda.",
      cost: "auditable",
    },
    {
      platform: "Coursera",
      title: "Microsoft Azure Fundamentals (AZ-900)",
      url: "https://www.coursera.org/learn/microsoft-azure-fundamentals",
      format: "course",
      level: 1,
      effortHours: 20,
      description: "Azure fundamentals covering cloud concepts, core Azure services, security, and pricing.",
      cost: "auditable",
    },
    {
      platform: "Coursera",
      title: "Google Cloud Fundamentals",
      url: "https://www.coursera.org/learn/google-cloud-fundamentals",
      format: "course",
      level: 1,
      effortHours: 20,
      description: "Introduction to Google Cloud Platform core services and cloud architecture concepts.",
      cost: "auditable",
    },
  ],
  "infrastructure-as-code": [
    {
      platform: "Coursera",
      title: "Infrastructure as Code with Terraform",
      url: "https://www.coursera.org/learn/terraform",
      format: "course",
      level: 2,
      effortHours: 20,
      description: "Learn to define and provision infrastructure using Terraform including modules, state management, and best practices.",
      cost: "auditable",
    },
  ],
  "containers": [
    {
      platform: "Coursera",
      title: "Docker Containerization (UC Davis)",
      url: "https://www.coursera.org/learn/docker",
      format: "course",
      level: 1,
      effortHours: 15,
      description: "Introduction to Docker containerization including images, containers, Dockerfiles, and container networking.",
      cost: "auditable",
    },
  ],
  "orchestration": [
    {
      platform: "Coursera",
      title: "Kubernetes for Beginners",
      url: "https://www.coursera.org/learn/kubernetes",
      format: "course",
      level: 2,
      effortHours: 25,
      description: "Introduction to Kubernetes covering pods, deployments, services, configmaps, and basic orchestration patterns.",
      cost: "auditable",
    },
    {
      platform: "edX",
      title: "Kubernetes: From Basics to Deployment",
      url: "https://www.edx.org/course/kubernetes-from-basics-to-deployment",
      format: "course",
      level: 2,
      effortHours: 30,
      description: "Comprehensive Kubernetes course from basic concepts through production deployment strategies.",
      cost: "auditable",
    },
  ],

  // ── Data & Analytics ────────────────────────────────────────────────────
  "data-handler": [
    {
      platform: "Coursera",
      title: "Python for Data Science (IBM)",
      url: "https://www.coursera.org/learn/python-for-data-science",
      format: "course",
      level: 0,
      effortHours: 18,
      description: "Python fundamentals for data analysis including NumPy, Pandas, and data visualization.",
      cost: "auditable",
    },
    {
      platform: "Coursera",
      title: "SQL for Data Science (UCSD)",
      url: "https://www.coursera.org/learn/sql-for-data-science",
      format: "course",
      level: 0,
      effortHours: 15,
      description: "SQL fundamentals for data scientists including querying, aggregation, and basic data analysis.",
      cost: "auditable",
    },
  ],
  "database-operations": [
    {
      platform: "Coursera",
      title: "Database Management Systems (CMU)",
      url: "https://www.coursera.org/learn/database-management-systems",
      format: "course",
      level: 2,
      effortHours: 30,
      description: "Database internals including storage, query processing, transaction management, and optimization.",
      cost: "auditable",
    },
  ],
  "caching": [
    {
      platform: "Coursera",
      title: "Caching Strategies for Web Applications",
      url: "https://www.coursera.org/learn/caching-strategies",
      format: "course",
      level: 2,
      effortHours: 10,
      description: "Understanding caching architectures including CDN, application cache, database cache, and cache invalidation strategies.",
      cost: "auditable",
    },
  ],
  "messaging-event-driven": [
    {
      platform: "Coursera",
      title: "Apache Kafka for Event-Driven Architecture",
      url: "https://www.coursera.org/learn/apache-kafka",
      format: "course",
      level: 2,
      effortHours: 20,
      description: "Introduction to Apache Kafka covering topics, partitions, consumers, producers, and event-driven design patterns.",
      cost: "auditable",
    },
  ],

  // ── Frontend ─────────────────────────────────────────────────────────────
  "html-css": [
    {
      platform: "Coursera",
      title: "HTML, CSS, and Javascript for Web Developers (Johns Hopkins)",
      url: "https://www.coursera.org/learn/html-css-javascript-for-web-developers",
      format: "course",
      level: 0,
      effortHours: 25,
      description: "Comprehensive web development fundamentals covering HTML5, CSS3, JavaScript, and responsive design.",
      cost: "auditable",
    },
  ],
  "javascript-typescript": [
    {
      platform: "Coursera",
      title: "JavaScript (University of Michigan)",
      url: "https://www.coursera.org/specializations/javascript",
      format: "course",
      level: 0,
      effortHours: 40,
      description: "Full JavaScript specialization covering basics, DOM manipulation, async programming, and modern ES6+ features.",
      cost: "auditable",
    },
    {
      platform: "Coursera",
      title: "TypeScript for JavaScript Developers",
      url: "https://www.coursera.org/learn/typescript-for-javascript-developers",
      format: "course",
      level: 1,
      effortHours: 15,
      description: "Introduction to TypeScript covering types, interfaces, generics, and type safety for JavaScript developers.",
      cost: "auditable",
    },
  ],
  "frontend-frameworks": [
    {
      platform: "Coursera",
      title: "React (Meta)",
      url: "https://www.coursera.org/professional-certificates/meta-front-end-developer",
      format: "course",
      level: 1,
      effortHours: 60,
      description: "Meta's Front-End Developer professional certificate covering React, JSX, components, state management, and hooks.",
      cost: "auditable",
    },
    {
      platform: "Coursera",
      title: "Angular (Microsoft)",
      url: "https://www.coursera.org/learn/angular",
      format: "course",
      level: 1,
      effortHours: 25,
      description: "Introduction to Angular covering components, services, dependency injection, routing, and forms.",
      cost: "auditable",
    },
  ],
  "frontend-state-management": [
    {
      platform: "Coursera",
      title: "State Management with Redux",
      url: "https://www.coursera.org/learn/redux-state-management",
      format: "course",
      level: 2,
      effortHours: 12,
      description: "Learning Redux for managing complex application state in React applications including actions, reducers, and store.",
      cost: "auditable",
    },
  ],
  "responsive-design": [
    {
      platform: "Coursera",
      title: "Responsive Web Design (University of Michigan)",
      url: "https://www.coursera.org/learn/responsive-web-design",
      format: "course",
      level: 0,
      effortHours: 15,
      description: "Building responsive websites that work across devices using media queries, flexible layouts, and mobile-first design.",
      cost: "auditable",
    },
  ],
  "web-performance": [
    {
      platform: "Coursera",
      title: "Website Performance Optimization (UofI)",
      url: "https://www.coursera.org/learn/website-performance-optimization",
      format: "course",
      level: 2,
      effortHours: 12,
      description: "Techniques for optimizing web application performance including lazy loading, code splitting, caching, and Core Web Vitals.",
      cost: "auditable",
    },
  ],
  "accessibility": [
    {
      platform: "Coursera",
      title: "Web Accessibility (UofMichigan)",
      url: "https://www.coursera.org/learn/web-accessibility",
      format: "course",
      level: 0,
      effortHours: 12,
      description: "Building accessible web applications following WCAG guidelines including semantic HTML, ARIA, and keyboard navigation.",
      cost: "auditable",
    },
  ],

  // ── Backend ───────────────────────────────────────────────────────────────
  "api-development": [
    {
      platform: "Coursera",
      title: "Building RESTful APIs with Node.js",
      url: "https://www.coursera.org/learn/restful-apis-nodejs",
      format: "course",
      level: 1,
      effortHours: 20,
      description: "Building RESTful APIs using Node.js and Express including routing, middleware, authentication, and error handling.",
      cost: "auditable",
    },
  ],
  "authentication-authorization": [
    {
      platform: "Coursera",
      title: "Authentication and Authorization (UofI)",
      url: "https://www.coursera.org/learn/authentication-authorization",
      format: "course",
      level: 2,
      effortHours: 15,
      description: "Implementing authentication and authorization including session management, JWT, OAuth 2.0, and role-based access control.",
      cost: "auditable",
    },
  ],
  "microservices": [
    {
      platform: "Coursera",
      title: "Microservices Architecture",
      url: "https://www.coursera.org/learn/microservices-architecture",
      format: "course",
      level: 3,
      effortHours: 25,
      description: "Designing and building microservices including service decomposition, inter-service communication, and deployment patterns.",
      cost: "auditable",
    },
  ],
  "serverless": [
    {
      platform: "Coursera",
      title: "Serverless Computing with AWS Lambda",
      url: "https://www.coursera.org/learn/aws-lambda",
      format: "course",
      level: 2,
      effortHours: 15,
      description: "Building serverless applications using AWS Lambda, API Gateway, and other serverless services.",
      cost: "auditable",
    },
  ],
  "web-servers-proxies": [
    {
      platform: "Coursera",
      title: "Nginx Essentials",
      url: "https://www.coursera.org/learn/nginx-essentials",
      format: "course",
      level: 1,
      effortHours: 8,
      description: "Configuring Nginx as a web server and reverse proxy including load balancing, SSL termination, and caching.",
      cost: "auditable",
    },
  ],

  // ── Security ─────────────────────────────────────────────────────────────
  "secure-coding": [
    {
      platform: "Coursera",
      title: "Secure Coding Practices (University of Washington)",
      url: "https://www.coursera.org/learn/secure-coding",
      format: "course",
      level: 1,
      effortHours: 18,
      description: "Secure coding principles including input validation, output encoding, and avoiding common vulnerabilities.",
      cost: "auditable",
    },
    {
      platform: "edX",
      title: "Cybersecurity Fundamentals",
      url: "https://www.edx.org/course/cybersecurity-fundamentals",
      format: "course",
      level: 0,
      effortHours: 25,
      description: "Introduction to cybersecurity including threats, vulnerabilities, and secure software development practices.",
      cost: "auditable",
    },
  ],
  "authentication-implementation": [
    {
      platform: "Coursera",
      title: "Implementing Authentication with OAuth 2.0 and JWT",
      url: "https://www.coursera.org/learn/oauth-jwt-authentication",
      format: "course",
      level: 2,
      effortHours: 15,
      description: "Implementing modern authentication using OAuth 2.0, OpenID Connect, and JWT tokens.",
      cost: "auditable",
    },
  ],
  "data-protection": [
    {
      platform: "Coursera",
      title: "Data Privacy and Security",
      url: "https://www.coursera.org/learn/data-privacy-security",
      format: "course",
      level: 1,
      effortHours: 12,
      description: "Understanding data privacy regulations and implementing data protection measures including encryption and access controls.",
      cost: "auditable",
    },
  ],
  "dependency-security": [
    {
      platform: "Coursera",
      title: "Software Supply Chain Security",
      url: "https://www.coursera.org/learn/software-supply-chain-security",
      format: "course",
      level: 2,
      effortHours: 10,
      description: "Managing security of third-party dependencies including vulnerability scanning, updates, and supply chain best practices.",
      cost: "auditable",
    },
  ],

  // ── DevOps ────────────────────────────────────────────────────────────────
  "ci-cd": [
    {
      platform: "Coursera",
      title: "CI/CD Pipelines (Google Cloud)",
      url: "https://www.coursera.org/learn/cicd-pipelines",
      format: "course",
      level: 1,
      effortHours: 15,
      description: "Building CI/CD pipelines using Google Cloud Build, Cloud Source Repositories, and deployment automation.",
      cost: "auditable",
    },
    {
      platform: "edX",
      title: "DevOps: CI/CD Pipelines",
      url: "https://www.edx.org/course/devops-cicd-pipelines",
      format: "course",
      level: 1,
      effortHours: 20,
      description: "Building continuous integration and deployment pipelines using Jenkins, GitHub Actions, or GitLab CI.",
      cost: "auditable",
    },
  ],
  "monitoring-observability": [
    {
      platform: "Coursera",
      title: "Monitoring and Observability (Datadog)",
      url: "https://www.coursera.org/learn/monitoring-observability",
      format: "course",
      level: 2,
      effortHours: 18,
      description: "Setting up monitoring, logging, and observability using Datadog, Prometheus, and Grafana.",
      cost: "auditable",
    },
  ],
};

// ─── Component ─────────────────────────────────────────────────────────────

interface SkillContentCardProps {
  gap: SkillGap;
  onClose?: () => void;
}

function SkillContentCard({ gap, onClose }: SkillContentCardProps) {
  const resources = SKILL_CONTENT_MAP[gap.skill.id] || [];

  if (resources.length === 0) {
    // Fallback: show general resources for this skill's category
    return (
      <Card className="border-border bg-surface">
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="text-base">
            Recommended Resources for {gap.skill.name}
          </CardTitle>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              Dismiss
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <p className="text-sm text-foreground-muted mb-4">
            {gap.note || `Current: Level ${gap.currentLevel}/5 → Target: Level ${gap.targetLevel}/5`}
          </p>
          <p className="text-sm text-foreground-muted">
            No curated resources available yet for this specific skill. Check{" "}
            <a
              href={`https://www.coursera.org/search?query=${encodeURIComponent(gap.skill.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              Coursera
            </a>
            ,{" "}
            <a
              href={`https://www.edx.org/search?q=${encodeURIComponent(gap.skill.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              edX
            </a>
            , or{" "}
            <a
              href={`https://www.deeplearning.ai/courses/?query=${encodeURIComponent(gap.skill.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              DeepLearning.AI
            </a>
            {" "}for relevant courses.
          </p>
        </CardContent>
      </Card>
    );
  }

  // Filter resources appropriate for the user's current level
  const suitableResources = resources.filter((r) => r.level <= gap.currentLevel + 1);

  return (
    <Card className="border-border bg-surface">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="text-base">
          Recommended Resources for {gap.skill.name}
        </CardTitle>
        {onClose && (
          <Button variant="ghost" size="sm" onClick={onClose}>
            Dismiss
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <p className="text-sm text-foreground-muted mb-4">
          {gap.note || `Current: Level ${gap.currentLevel}/5 → Target: Level ${gap.targetLevel}/5`}
        </p>

        <div className="space-y-3">
          {suitableResources.map((resource, idx) => (
            <a
              key={idx}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg border border-border bg-background hover:bg-foreground/5 transition-colors p-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-xs font-medium">
                      {resource.platform}
                    </Badge>
                    <Badge variant="secondary" className="text-xs font-medium capitalize">
                      {resource.format}
                    </Badge>
                    {resource.cost === "free" && (
                      <Badge variant="secondary" className="text-xs">
                        Free
                      </Badge>
                    )}
                    {resource.cost === "auditable" && (
                      <Badge variant="outline" className="text-xs text-amber-500">
                        Audit
                      </Badge>
                    )}
                    {resource.cost === "paid" && (
                      <Badge variant="secondary" className="text-xs">
                        Paid
                      </Badge>
                    )}
                  </div>
                  <h4 className="text-sm font-medium text-foreground leading-tight">
                    {resource.title}
                  </h4>
                  <p className="text-xs text-foreground-muted mt-1">
                    {resource.description}
                  </p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-foreground-muted">
                    <span>⏱ {resource.effortHours} hrs</span>
                    <span>Level {resource.level}+</span>
                  </div>
                </div>
                <svg
                  className="w-4 h-4 text-foreground-muted flex-shrink-0 mt-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </div>
            </a>
          ))}
        </div>

        {suitableResources.length === 0 && (
          <p className="text-sm text-foreground-muted">
            No resources mapped for this skill yet.{" "}
            <button
              onClick={() => window.open(`https://www.coursera.org/search?query=${encodeURIComponent(gap.skill.name)}`, "_blank")}
              className="text-primary underline"
            >
              Search Coursera
            </button>
          </p>
        )}
      </CardContent>
    </Card>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────

interface LearningResourcesPanelProps {
  gaps: SkillGap[];
  missingSkills: Skill[];
  targetRole: string;
  region: string;
  onResourceClose?: (skillId: string) => void;
}

export function LearningResourcesPanel({ gaps, missingSkills, targetRole, region, onResourceClose }: LearningResourcesPanelProps) {
  const { t } = useTranslation();
  const [expandedSkill, setExpandedSkill] = React.useState<string | null>(null);

  const openResource = (skillId: string) => {
    setExpandedSkill(skillId);
  };

  const closeResource = () => {
    if (expandedSkill && onResourceClose) {
      onResourceClose(expandedSkill);
    }
    setExpandedSkill(null);
  };

  const expandedGap = gaps.find((g) => g.skill.id === expandedSkill);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">{t("resources.title")}</h3>
        <p className="text-sm text-foreground-muted">
          {t("resources.subtitle")}
        </p>
      </div>

      {gaps.length === 0 ? (
        <Card className="border-border bg-surface">
          <CardContent className="py-8 text-center">
            <p className="text-foreground-muted">
              No skill gaps to address. You're doing great!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {gaps.slice(0, 5).map((gap) => {
            const hasResources = SKILL_CONTENT_MAP[gap.skill.id] && SKILL_CONTENT_MAP[gap.skill.id]!.length > 0;
            return (
              <button
                key={gap.skill.id}
                onClick={() => openResource(gap.skill.id)}
                className={cn(
                  "w-full text-left rounded-lg border p-4 transition-all hover:bg-surface/50 hover:border-primary/30",
                  expandedSkill === gap.skill.id && "border-primary bg-primary/5",
                  !hasResources && "opacity-60"
                )}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-foreground">{gap.skill.name}</div>
                    <div className="text-xs text-foreground-muted capitalize mt-1">
                      Level {gap.currentLevel} → {gap.targetLevel} ({gap.gapSize} level gap)
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {hasResources && (
                      <Badge variant="outline" className="text-xs">
                        {SKILL_CONTENT_MAP[gap.skill.id]?.length || 0} resources
                      </Badge>
                    )}
                    <svg
                      className={cn(
                        "w-4 h-4 text-foreground-muted transition-transform",
                        expandedSkill === gap.skill.id && "rotate-180"
                      )}
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
          <SkillContentCard gap={expandedGap} onClose={closeResource} />
        </div>
      )}

      {/* Partner links footer */}
      <div className="pt-4 border-t border-border">
        <p className="text-xs text-foreground-muted mb-2">Content partners:</p>
        <div className="flex flex-wrap gap-3">
          <a
            href="https://www.coursera.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-foreground-muted hover:text-primary underline"
          >
            Coursera
          </a>
          <a
            href="https://www.edx.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-foreground-muted hover:text-primary underline"
          >
            edX
          </a>
          <a
            href="https://www.deeplearning.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-foreground-muted hover:text-primary underline"
          >
            DeepLearning.AI
          </a>
          <a
            href="https://www.linkedin.com/learning"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-foreground-muted hover:text-primary underline"
          >
            LinkedIn Learning
          </a>
        </div>
      </div>
    </div>
  );
}

export default LearningResourcesPanel;
