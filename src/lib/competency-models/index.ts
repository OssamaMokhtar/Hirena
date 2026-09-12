import {
  SKILLS as SOFTWARE_ENGINEER_SKILLS, COMPETENCY_AREAS as SOFTWARE_ENGINEER_COMPETENCY_AREAS, LEVELS as SOFTWARE_ENGINEER_LEVELS, CAREER_LADDER as SOFTWARE_ENGINEER_CAREER_LADDER, SKILL_COUNT as SE_SKILL_COUNT, PILLAR_COUNT as SE_PILLAR_COUNT
} from './software-engineer';
import {
  SKILLS as FRONTEND_ENGINEER_SKILLS, COMPETENCY_AREAS as FRONTEND_ENGINEER_COMPETENCY_AREAS, LEVELS as FRONTEND_ENGINEER_LEVELS, CAREER_LADDER as FRONTEND_ENGINEER_CAREER_LADDER, SKILL_COUNT as FE_SKILL_COUNT, PILLAR_COUNT as FE_PILLAR_COUNT
} from './frontend-engineer';
import {
  SKILLS as BACKEND_ENGINEER_SKILLS, COMPETENCY_AREAS as BACKEND_ENGINEER_COMPETENCY_AREAS, LEVELS as BACKEND_ENGINEER_LEVELS, CAREER_LADDER as BACKEND_ENGINEER_CAREER_LADDER, SKILL_COUNT as BE_SKILL_COUNT, PILLAR_COUNT as BE_PILLAR_COUNT
} from './backend-engineer';
import {
  SKILLS as FULL_STACK_ENGINEER_SKILLS, COMPETENCY_AREAS as FULL_STACK_ENGINEER_COMPETENCY_AREAS, LEVELS as FULL_STACK_ENGINEER_LEVELS, CAREER_LADDER as FULL_STACK_ENGINEER_CAREER_LADDER, SKILL_COUNT as FSE_SKILL_COUNT, PILLAR_COUNT as FSE_PILLAR_COUNT
} from './full-stack-engineer';
import {
  SKILLS as QA_ENGINEER_SKILLS, COMPETENCY_AREAS as QA_ENGINEER_COMPETENCY_AREAS, LEVELS as QA_ENGINEER_LEVELS, CAREER_LADDER as QA_ENGINEER_CAREER_LADDER, SKILL_COUNT as QA_SKILL_COUNT, PILLAR_COUNT as QA_PILLAR_COUNT
} from './qa-engineer';
import type { Skill, ProficiencyLevel, CompetencyArea, CareerLadderStep, RoleCompetencyModel, RoleSummary } from '@/types';

export const ROLE_COMPETENCY_MODELS: Record<string, RoleCompetencyModel> = {
  'software-engineer': {
    role: 'software-engineer',
    track: 'engineering',
    description: 'Designs, builds, and maintains software systems from concept to production.',
    levels: SOFTWARE_ENGINEER_LEVELS,
    skills: SOFTWARE_ENGINEER_SKILLS,
    competencyAreas: SOFTWARE_ENGINEER_COMPETENCY_AREAS,
    careerLadder: SOFTWARE_ENGINEER_CAREER_LADDER,
    expectedLevels: {
      'junior-software-engineer': { 'technical-foundation': 1, languages: 1, 'development-tools': 2, testing: 1, 'engineering-practices': 1, collaboration: 1, architecture: 0, data: 1 },
      'software-engineer': { 'technical-foundation': 2, languages: 2, 'development-tools': 3, testing: 2, 'engineering-practices': 2, collaboration: 2, architecture: 1, data: 2 },
      'senior-software-engineer': { 'technical-foundation': 3, languages: 3, 'development-tools': 4, testing: 3, 'engineering-practices': 3, collaboration: 3, architecture: 2, data: 2 },
      'lead-software-engineer': { 'technical-foundation': 3, languages: 3, 'development-tools': 4, testing: 3, 'engineering-practices': 4, collaboration: 4, architecture: 3, data: 3 },
      'principal-engineer': { 'technical-foundation': 4, languages: 4, 'development-tools': 5, testing: 4, 'engineering-practices': 5, collaboration: 5, architecture: 4, data: 4 },
      'engineering-manager': { 'technical-foundation': 3, languages: 2, 'development-tools': 3, testing: 3, 'engineering-practices': 4, collaboration: 5, architecture: 2, data: 2 },
      'director-of-engineering': { 'technical-foundation': 3, languages: 2, 'development-tools': 3, testing: 2, 'engineering-practices': 5, collaboration: 5, architecture: 3, data: 2 },
      'vp-engineering': { 'technical-foundation': 3, languages: 2, 'development-tools': 2, testing: 2, 'engineering-practices': 5, collaboration: 6, architecture: 3, data: 2 },
      'cto': { 'technical-foundation': 4, languages: 3, 'development-tools': 3, testing: 3, 'engineering-practices': 5, collaboration: 6, architecture: 4, data: 3 },
    },
  },
  'frontend-engineer': {
    role: 'frontend-engineer',
    track: 'engineering',
    description: 'Builds user-facing web applications and interfaces. Specializes in HTML/CSS/JavaScript, frameworks, performance, accessibility, and user experience.',
    levels: FRONTEND_ENGINEER_LEVELS,
    skills: FRONTEND_ENGINEER_SKILLS,
    competencyAreas: FRONTEND_ENGINEER_COMPETENCY_AREAS,
    careerLadder: FRONTEND_ENGINEER_CAREER_LADDER,
    expectedLevels: {
      'junior-frontend-engineer': { 'frontend-fundamentals': 1, 'frameworks-libraries': 1, 'css-styling': 1, 'web-essentials': 1, testing: 1, 'performance-optimization': 1, accessibility: 1, collaboration: 1 },
      'frontend-engineer': { 'frontend-fundamentals': 2, 'frameworks-libraries': 2, 'css-styling': 2, 'web-essentials': 2, testing: 2, 'performance-optimization': 2, accessibility: 2, collaboration: 2 },
      'senior-frontend-engineer': { 'frontend-fundamentals': 3, 'frameworks-libraries': 3, 'css-styling': 3, 'web-essentials': 3, testing: 3, 'performance-optimization': 3, accessibility: 3, collaboration: 3 },
      'lead-frontend-engineer': { 'frontend-fundamentals': 3, 'frameworks-libraries': 4, 'css-styling': 4, 'web-essentials': 3, testing: 3, 'performance-optimization': 4, accessibility: 3, collaboration: 4 },
      'principal-frontend-engineer': { 'frontend-fundamentals': 4, 'frameworks-libraries': 5, 'css-styling': 5, 'web-essentials': 4, testing: 4, 'performance-optimization': 5, accessibility: 4, collaboration: 5 },
      'frontend-architect': { 'frontend-fundamentals': 4, 'frameworks-libraries': 5, 'css-styling': 5, 'web-essentials': 4, testing: 4, 'performance-optimization': 5, accessibility: 4, collaboration: 5 },
      'frontend-engineering-manager': { 'frontend-fundamentals': 3, 'frameworks-libraries': 3, 'css-styling': 3, 'web-essentials': 3, testing: 2, 'performance-optimization': 3, accessibility: 2, collaboration: 5 },
      'director-of-frontend': { 'frontend-fundamentals': 3, 'frameworks-libraries': 3, 'css-styling': 2, 'web-essentials': 2, testing: 2, 'performance-optimization': 3, accessibility: 2, collaboration: 6 },
    },
  },
  'backend-engineer': {
    role: 'backend-engineer',
    track: 'engineering',
    description: 'Builds server-side logic, APIs, databases, and infrastructure. Focuses on scalability, performance, security, and data integrity.',
    levels: BACKEND_ENGINEER_LEVELS,
    skills: BACKEND_ENGINEER_SKILLS,
    competencyAreas: BACKEND_ENGINEER_COMPETENCY_AREAS,
    careerLadder: BACKEND_ENGINEER_CAREER_LADDER,
    expectedLevels: {
      'junior-backend-engineer': { 'programming-languages': 1, databases: 1, apis: 1, testing: 1, 'infrastructure-devops': 1, security: 1, 'system-design': 1, performance: 0, collaboration: 1 },
      'backend-engineer': { 'programming-languages': 2, databases: 2, apis: 2, testing: 2, 'infrastructure-devops': 2, security: 2, 'system-design': 2, performance: 1, collaboration: 2 },
      'senior-backend-engineer': { 'programming-languages': 3, databases: 3, apis: 3, testing: 3, 'infrastructure-devops': 3, security: 3, 'system-design': 3, performance: 2, collaboration: 3 },
      'lead-backend-engineer': { 'programming-languages': 3, databases: 4, apis: 4, testing: 3, 'infrastructure-devops': 4, security: 3, 'system-design': 4, performance: 3, collaboration: 4 },
      'principal-backend-engineer': { 'programming-languages': 4, databases: 5, apis: 5, testing: 4, 'infrastructure-devops': 5, security: 4, 'system-design': 5, performance: 4, collaboration: 5 },
      'backend-architect': { 'programming-languages': 4, databases: 5, apis: 5, testing: 4, 'infrastructure-devops': 5, security: 5, 'system-design': 5, performance: 5, collaboration: 5 },
      'backend-engineering-manager': { 'programming-languages': 3, databases: 3, apis: 3, testing: 2, 'infrastructure-devops': 3, security: 2, 'system-design': 3, performance: 3, collaboration: 5 },
      'director-of-backend': { 'programming-languages': 2, databases: 3, apis: 2, testing: 2, 'infrastructure-devops': 3, security: 2, 'system-design': 3, performance: 3, collaboration: 6 },
    },
  },
  'full-stack-engineer': {
    role: 'full-stack-engineer',
    track: 'engineering',
    description: 'Works across the entire stack — frontend, backend, databases, and infrastructure. Versatile engineer who can build complete features end-to-end.',
    levels: FULL_STACK_ENGINEER_LEVELS,
    skills: FULL_STACK_ENGINEER_SKILLS,
    competencyAreas: FULL_STACK_ENGINEER_COMPETENCY_AREAS,
    careerLadder: FULL_STACK_ENGINEER_CAREER_LADDER,
    expectedLevels: {
      'junior-full-stack-engineer': { 'frontend-development': 1, 'backend-development': 1, 'databases-data': 1, 'infrastructure-deployment': 1, testing: 1, 'architecture-system-design': 1, 'devops-cicd': 1, security: 1, performance: 1, 'collaboration-communication': 1 },
      'full-stack-engineer': { 'frontend-development': 2, 'backend-development': 2, 'databases-data': 2, 'infrastructure-deployment': 2, testing: 2, 'architecture-system-design': 2, 'devops-cicd': 2, security: 2, performance: 2, 'collaboration-communication': 2 },
      'senior-full-stack-engineer': { 'frontend-development': 3, 'backend-development': 3, 'databases-data': 3, 'infrastructure-deployment': 3, testing: 3, 'architecture-system-design': 3, 'devops-cicd': 3, security: 3, performance: 3, 'collaboration-communication': 3 },
      'lead-full-stack-engineer': { 'frontend-development': 4, 'backend-development': 4, 'databases-data': 3, 'infrastructure-deployment': 4, testing: 3, 'architecture-system-design': 4, 'devops-cicd': 4, security: 3, performance: 4, 'collaboration-communication': 4 },
      'principal-full-stack-engineer': { 'frontend-development': 5, 'backend-development': 5, 'databases-data': 4, 'infrastructure-deployment': 5, testing: 4, 'architecture-system-design': 5, 'devops-cicd': 5, security: 4, performance: 5, 'collaboration-communication': 5 },
      'full-stack-architect': { 'frontend-development': 5, 'backend-development': 5, 'databases-data': 4, 'infrastructure-deployment': 5, testing: 4, 'architecture-system-design': 5, 'devops-cicd': 5, security: 4, performance: 5, 'collaboration-communication': 5 },
      'full-stack-engineering-manager': { 'frontend-development': 3, 'backend-development': 3, 'databases-data': 3, 'infrastructure-deployment': 3, testing: 2, 'architecture-system-design': 3, 'devops-cicd': 3, security: 2, performance: 3, 'collaboration-communication': 5 },
      'director-of-engineering': { 'frontend-development': 3, 'backend-development': 2, 'databases-data': 2, 'infrastructure-deployment': 3, testing: 2, 'architecture-system-design': 4, 'devops-cicd': 3, security: 2, performance: 3, 'collaboration-communication': 6 },
    },
  },
  'qa-engineer': {
    role: 'qa-engineer',
    track: 'engineering',
    description: 'Ensures software quality through testing strategies, automation, and process improvement. Protects the user experience by catching defects before they reach production.',
    levels: QA_ENGINEER_LEVELS,
    skills: QA_ENGINEER_SKILLS,
    competencyAreas: QA_ENGINEER_COMPETENCY_AREAS,
    careerLadder: QA_ENGINEER_CAREER_LADDER,
    expectedLevels: {
      'junior-qa-engineer': { 'testing-foundations': 1, 'test-automation': 1, 'api-testing': 1, 'performance-testing': 1, 'security-testing': 1, 'test-management-tools': 1, 'process-collaboration': 1 },
      'qa-engineer': { 'testing-foundations': 2, 'test-automation': 2, 'api-testing': 2, 'performance-testing': 1, 'security-testing': 1, 'test-management-tools': 2, 'process-collaboration': 2 },
      'senior-qa-engineer': { 'testing-foundations': 3, 'test-automation': 3, 'api-testing': 3, 'performance-testing': 2, 'security-testing': 2, 'test-management-tools': 3, 'process-collaboration': 3 },
      'lead-qa-engineer': { 'testing-foundations': 4, 'test-automation': 4, 'api-testing': 4, 'performance-testing': 3, 'security-testing': 3, 'test-management-tools': 4, 'process-collaboration': 4 },
      'principal-qa-engineer': { 'testing-foundations': 5, 'test-automation': 5, 'api-testing': 5, 'performance-testing': 4, 'security-testing': 4, 'test-management-tools': 5, 'process-collaboration': 5 },
      'qa-architect': { 'testing-foundations': 5, 'test-automation': 5, 'api-testing': 5, 'performance-testing': 4, 'security-testing': 4, 'test-management-tools': 5, 'process-collaboration': 5 },
      'qa-engineering-manager': { 'testing-foundations': 4, 'test-automation': 3, 'api-testing': 3, 'performance-testing': 2, 'security-testing': 2, 'test-management-tools': 3, 'process-collaboration': 5 },
      'director-of-quality': { 'testing-foundations': 4, 'test-automation': 3, 'api-testing': 2, 'performance-testing': 2, 'security-testing': 2, 'test-management-tools': 2, 'process-collaboration': 6 },
    },
  },
};

export const ROLE_SUMMARIES: RoleSummary[] = [
  {
    id: 'software-engineer',
    title: 'Software Engineer',
    track: 'Engineering',
    description: 'Designs, builds, and maintains software systems from concept to production. Focuses on clean code, system reliability, and scalable architecture.',
    skillCount: SE_SKILL_COUNT,
    pillarCount: SE_PILLAR_COUNT,
    levels: 7,
    careerLadder: ['Junior Software Engineer', 'Software Engineer', 'Senior Software Engineer', 'Lead Software Engineer', 'Principal Engineer', 'Engineering Manager', 'Director of Engineering', 'VP Engineering', 'CTO'],
    proficiencyLevels: 7,
    icon: '💻',
  },
  {
    id: 'frontend-engineer',
    title: 'Frontend Engineer',
    track: 'Engineering',
    description: 'Builds user-facing web applications and interfaces. Specializes in HTML/CSS/JavaScript, frameworks (React, Vue, Angular), performance, accessibility, and user experience.',
    skillCount: FE_SKILL_COUNT,
    pillarCount: FE_PILLAR_COUNT,
    levels: 7,
    careerLadder: ['Junior Frontend Engineer', 'Frontend Engineer', 'Senior Frontend Engineer', 'Lead Frontend Engineer', 'Principal Frontend Engineer', 'Frontend Architect', 'Frontend Engineering Manager', 'Director of Frontend'],
    proficiencyLevels: 7,
    icon: '🎨',
  },
  {
    id: 'backend-engineer',
    title: 'Backend Engineer',
    track: 'Engineering',
    description: 'Builds server-side logic, APIs, databases, and infrastructure. Focuses on scalability, performance, security, and data integrity.',
    skillCount: BE_SKILL_COUNT,
    pillarCount: BE_PILLAR_COUNT,
    levels: 7,
    careerLadder: ['Junior Backend Engineer', 'Backend Engineer', 'Senior Backend Engineer', 'Lead Backend Engineer', 'Principal Backend Engineer', 'Backend Architect', 'Backend Engineering Manager', 'Director of Backend'],
    proficiencyLevels: 7,
    icon: '⚙️',
  },
  {
    id: 'full-stack-engineer',
    title: 'Full-Stack Engineer',
    track: 'Engineering',
    description: 'Works across the entire stack — frontend, backend, databases, and infrastructure. Versatile engineer who can build complete features end-to-end.',
    skillCount: FSE_SKILL_COUNT,
    pillarCount: FSE_PILLAR_COUNT,
    levels: 7,
    careerLadder: ['Junior Full-Stack Engineer', 'Full-Stack Engineer', 'Senior Full-Stack Engineer', 'Lead Full-Stack Engineer', 'Principal Full-Stack Engineer', 'Full-Stack Architect', 'Full-Stack Engineering Manager', 'Director of Engineering'],
    proficiencyLevels: 7,
    icon: '🔄',
  },
  {
    id: 'qa-engineer',
    title: 'QA Engineer',
    track: 'Engineering',
    description: 'Ensures software quality through testing strategies, automation, and process improvement. Protects the user experience by catching defects before they reach production.',
    skillCount: QA_SKILL_COUNT,
    pillarCount: QA_PILLAR_COUNT,
    levels: 7,
    careerLadder: ['Junior QA Engineer', 'QA Engineer', 'Senior QA Engineer', 'Lead QA Engineer', 'Principal QA Engineer', 'QA Architect', 'QA Engineering Manager', 'Director of Quality'],
    proficiencyLevels: 7,
    icon: '🧪',
  },
];

export function getRoleModel(roleId: string): RoleCompetencyModel | undefined {
  return ROLE_COMPETENCY_MODELS[roleId];
}

export function getAllRoleIds(): string[] {
  return Object.keys(ROLE_COMPETENCY_MODELS);
}

export function getRoleSummary(roleId: string): RoleSummary | undefined {
  return ROLE_SUMMARIES.find(r => r.id === roleId);
}

export function getAllRoles(): RoleSummary[] {
  return ROLE_SUMMARIES;
}
