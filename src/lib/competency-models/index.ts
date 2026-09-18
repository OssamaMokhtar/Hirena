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
import {
  SKILLS as DEVOPS_ENGINEER_SKILLS, COMPETENCY_AREAS as DEVOPS_ENGINEER_COMPETENCY_AREAS, LEVELS as DEVOPS_ENGINEER_LEVELS, CAREER_LADDER as DEVOPS_ENGINEER_CAREER_LADDER, SKILL_COUNT as DO_SKILL_COUNT, PILLAR_COUNT as DO_PILLAR_COUNT
} from './devops-engineer';
import {
  SKILLS as DATA_ANALYST_SKILLS, COMPETENCY_AREAS as DATA_ANALYST_COMPETENCY_AREAS, LEVELS as DATA_ANALYST_LEVELS, CAREER_LADDER as DATA_ANALYST_CAREER_LADDER, SKILL_COUNT as DA_SKILL_COUNT, PILLAR_COUNT as DA_PILLAR_COUNT
} from './data-analyst';
import {
  SKILLS as DATA_ENGINEER_SKILLS, COMPETENCY_AREAS as DATA_ENGINEER_COMPETENCY_AREAS, LEVELS as DATA_ENGINEER_LEVELS, CAREER_LADDER as DATA_ENGINEER_CAREER_LADDER, SKILL_COUNT as DE_SKILL_COUNT, PILLAR_COUNT as DE_PILLAR_COUNT
} from './data-engineer';
import {
  SKILLS as SOFTWARE_ARCHITECT_SKILLS, COMPETENCY_AREAS as SOFTWARE_ARCHITECT_COMPETENCY_AREAS, LEVELS as SOFTWARE_ARCHITECT_LEVELS, CAREER_LADDER as SOFTWARE_ARCHITECT_CAREER_LADDER, SKILL_COUNT as SA_SKILL_COUNT, PILLAR_COUNT as SA_PILLAR_COUNT
} from './software-architect';
import {
  SKILLS as TECH_LEAD_SKILLS, COMPETENCY_AREAS as TECH_LEAD_COMPETENCY_AREAS, LEVELS as TECH_LEAD_LEVELS, CAREER_LADDER as TECH_LEAD_CAREER_LADDER, SKILL_COUNT as TL_SKILL_COUNT, PILLAR_COUNT as TL_PILLAR_COUNT
} from './tech-lead';
import {
  SKILLS as ENGINEERING_MANAGER_SKILLS, COMPETENCY_AREAS as ENGINEERING_MANAGER_COMPETENCY_AREAS, LEVELS as ENGINEERING_MANAGER_LEVELS, CAREER_LADDER as ENGINEERING_MANAGER_CAREER_LADDER, SKILL_COUNT as EM_SKILL_COUNT, PILLAR_COUNT as EM_PILLAR_COUNT
} from './engineering-manager';
import {
  SKILLS as BUSINESS_CONSULTANT_SKILLS, COMPETENCY_AREAS as BUSINESS_CONSULTANT_COMPETENCY_AREAS, LEVELS as BUSINESS_CONSULTANT_LEVELS, CAREER_LADDER as BUSINESS_CONSULTANT_CAREER_LADDER, SKILL_COUNT as BC_SKILL_COUNT, PILLAR_COUNT as BC_PILLAR_COUNT
} from './business-consultant';
import {
  SKILLS as UX_UI_DESIGNER_SKILLS, COMPETENCY_AREAS as UX_UI_DESIGNER_COMPETENCY_AREAS, LEVELS as UX_UI_DESIGNER_LEVELS, CAREER_LADDER as UX_UI_DESIGNER_CAREER_LADDER, SKILL_COUNT as UID_SKILL_COUNT, PILLAR_COUNT as UID_PILLAR_COUNT
} from './ux-ui-designer';
import {
  SKILLS as SCRUM_MASTER_SKILLS, COMPETENCY_AREAS as SCRUM_MASTER_COMPETENCY_AREAS, LEVELS as SCRUM_MASTER_LEVELS, CAREER_LADDER as SCRUM_MASTER_CAREER_LADDER, SKILL_COUNT as SM_SKILL_COUNT, PILLAR_COUNT as SM_PILLAR_COUNT
} from './scrum-master';
import {
  SKILLS as BUSINESS_ANALYST_SKILLS, COMPETENCY_AREAS as BUSINESS_ANALYST_COMPETENCY_AREAS, LEVELS as BUSINESS_ANALYST_LEVELS, CAREER_LADDER as BUSINESS_ANALYST_CAREER_LADDER, SKILL_COUNT as BA_SKILL_COUNT, PILLAR_COUNT as BA_PILLAR_COUNT
} from './business-analyst';
import {
  SKILLS as DATA_SCIENTIST_SKILLS, COMPETENCY_AREAS as DATA_SCIENTIST_COMPETENCY_AREAS, LEVELS as DATA_SCIENTIST_LEVELS, CAREER_LADDER as DATA_SCIENTIST_CAREER_LADDER, SKILL_COUNT as DS_SKILL_COUNT, PILLAR_COUNT as DS_PILLAR_COUNT
} from './data-scientist';
import {
  SKILLS as ML_ENGINEER_SKILLS, COMPETENCY_AREAS as ML_ENGINEER_COMPETENCY_AREAS, LEVELS as ML_ENGINEER_LEVELS, CAREER_LADDER as ML_ENGINEER_CAREER_LADDER, SKILL_COUNT as MLE_SKILL_COUNT, PILLAR_COUNT as MLE_PILLAR_COUNT
} from './ml-engineer';
import {
  SKILLS as SECURITY_ENGINEER_SKILLS, COMPETENCY_AREAS as SECURITY_ENGINEER_COMPETENCY_AREAS, LEVELS as SECURITY_ENGINEER_LEVELS, CAREER_LADDER as SECURITY_ENGINEER_CAREER_LADDER, SKILL_COUNT as SE_SEC_SKILL_COUNT, PILLAR_COUNT as SE_SEC_PILLAR_COUNT
} from './security-engineer';
import {
  SKILLS as CLOUD_ARCHITECT_SKILLS, COMPETENCY_AREAS as CLOUD_ARCHITECT_COMPETENCY_AREAS, LEVELS as CLOUD_ARCHITECT_LEVELS, CAREER_LADDER as CLOUD_ARCHITECT_CAREER_LADDER, SKILL_COUNT as CA_SKILL_COUNT, PILLAR_COUNT as CA_PILLAR_COUNT
} from './cloud-architect';
import type { Skill, ProficiencyLevel, CompetencyArea, CareerLadderStep, RoleCompetencyModel, RoleSummary } from '@/types';

export const ROLE_COMPETENCY_MODELS: Record<string, RoleCompetencyModel> = {
  'software-engineer': {
    role: 'software-engineer',
    track: 'engineering',
    description: 'Designs, builds, and maintains software systems from concept to production.',
    skills: SOFTWARE_ENGINEER_SKILLS,
    competencyAreas: SOFTWARE_ENGINEER_COMPETENCY_AREAS,
    careerLadder: SOFTWARE_ENGINEER_CAREER_LADDER,
    totalSkills: SE_SKILL_COUNT,
  },
  'frontend-engineer': {
    role: 'frontend-engineer',
    track: 'engineering',
    description: 'Builds user-facing web applications and interfaces. Specializes in HTML/CSS/JavaScript, frameworks, performance, accessibility, and user experience.',
    skills: FRONTEND_ENGINEER_SKILLS,
    competencyAreas: FRONTEND_ENGINEER_COMPETENCY_AREAS,
    careerLadder: FRONTEND_ENGINEER_CAREER_LADDER,
    totalSkills: FE_SKILL_COUNT,
  },
  'backend-engineer': {
    role: 'backend-engineer',
    track: 'engineering',
    description: 'Builds server-side logic, APIs, databases, and infrastructure. Focuses on scalability, performance, security, and data integrity.',
    skills: BACKEND_ENGINEER_SKILLS,
    competencyAreas: BACKEND_ENGINEER_COMPETENCY_AREAS,
    careerLadder: BACKEND_ENGINEER_CAREER_LADDER,
    totalSkills: BE_SKILL_COUNT,
  },
  'full-stack-engineer': {
    role: 'full-stack-engineer',
    track: 'engineering',
    description: 'Works across the entire stack — frontend, backend, databases, and infrastructure. Versatile engineer who can build complete features end-to-end.',
    skills: FULL_STACK_ENGINEER_SKILLS,
    competencyAreas: FULL_STACK_ENGINEER_COMPETENCY_AREAS,
    careerLadder: FULL_STACK_ENGINEER_CAREER_LADDER,
    totalSkills: FSE_SKILL_COUNT,
    pillarCount: FSE_PILLAR_COUNT,
  },
  'qa-engineer': {
    role: 'qa-engineer',
    track: 'engineering',
    description: 'Ensures software quality through testing strategies, automation, and process improvement. Protects the user experience by catching defects before they reach production.',
    skills: QA_ENGINEER_SKILLS,
    competencyAreas: QA_ENGINEER_COMPETENCY_AREAS,
    careerLadder: QA_ENGINEER_CAREER_LADDER,
    totalSkills: QA_SKILL_COUNT,
    pillarCount: QA_PILLAR_COUNT,
  },
  'devops-engineer': {
    role: 'devops-engineer',
    track: 'engineering',
    description: 'Bridges development and operations to deliver software faster and more reliably. Builds CI/CD pipelines, manages cloud infrastructure, containers, monitoring, and automation.',
    skills: DEVOPS_ENGINEER_SKILLS,
    competencyAreas: DEVOPS_ENGINEER_COMPETENCY_AREAS,
    careerLadder: DEVOPS_ENGINEER_CAREER_LADDER,
    totalSkills: DO_SKILL_COUNT,
    pillarCount: DO_PILLAR_COUNT,
  },
  'data-analyst': {
    role: 'data-analyst',
    track: 'data',
    description: 'Analyzes data to extract insights that drive business decisions. Combines statistical analysis, SQL, visualization, and business acumen to tell stories with data.',
    skills: DATA_ANALYST_SKILLS,
    competencyAreas: DATA_ANALYST_COMPETENCY_AREAS,
    careerLadder: DATA_ANALYST_CAREER_LADDER,
    totalSkills: DA_SKILL_COUNT,
  },
  'data-engineer': {
    role: 'data-engineer',
    track: 'data',
    description: 'Builds and maintains data pipelines, data infrastructure, and data architecture. Enables data-driven decision making by ensuring reliable, high-quality data is available to analysts and data scientists.',
    skills: DATA_ENGINEER_SKILLS,
    competencyAreas: DATA_ENGINEER_COMPETENCY_AREAS,
    careerLadder: DATA_ENGINEER_CAREER_LADDER,
    totalSkills: DE_SKILL_COUNT,
  },
  'business-consultant': {
    role: 'business-consultant',
    track: 'consulting',
    description: 'Advises organizations on how to use technology to achieve business objectives. Analyzes business processes, systems, and strategies; gathers requirements; develops recommendations and implementation plans.',
    skills: BUSINESS_CONSULTANT_SKILLS,
    competencyAreas: BUSINESS_CONSULTANT_COMPETENCY_AREAS,
    careerLadder: BUSINESS_CONSULTANT_CAREER_LADDER,
    totalSkills: BC_SKILL_COUNT,
  },
  'ux-ui-designer': {
    role: 'ux-ui-designer',
    track: 'design',
    description: 'Creates intuitive, user-centered digital experiences through research, wireframing, prototyping, visual design, and design systems. Bridges user needs with business goals through iterative design and testing.',
    skills: UX_UI_DESIGNER_SKILLS,
    competencyAreas: UX_UI_DESIGNER_COMPETENCY_AREAS,
    careerLadder: UX_UI_DESIGNER_CAREER_LADDER,
    totalSkills: UID_SKILL_COUNT,
  },
  'scrum-master': {
    role: 'scrum-master',
    track: 'agile',
    description: 'Facilitates Agile/Scrum processes, removes impediments, coaches teams on Agile practices, and fosters an environment of continuous improvement. Serves as a shield and enabler for the development team.',
    skills: SCRUM_MASTER_SKILLS,
    competencyAreas: SCRUM_MASTER_COMPETENCY_AREAS,
    careerLadder: SCRUM_MASTER_CAREER_LADDER,
    totalSkills: SM_SKILL_COUNT,
  },
  'business-analyst': {
    role: 'business-analyst',
    track: 'business',
    description: 'Acts as a bridge between business stakeholders and technical teams. Elicits, analyzes, and documents requirements; facilitates communication; and ensures solutions deliver business value.',
    skills: BUSINESS_ANALYST_SKILLS,
    competencyAreas: BUSINESS_ANALYST_COMPETENCY_AREAS,
    careerLadder: BUSINESS_ANALYST_CAREER_LADDER,
    totalSkills: BA_SKILL_COUNT,
  },
  'data-scientist': {
    role: 'data-scientist',
    track: 'data',
    description: 'Builds statistical models and machine learning solutions to extract insights, predict outcomes, and drive data-informed decisions. Combines statistics, programming, and domain expertise.',
    skills: DATA_SCIENTIST_SKILLS,
    competencyAreas: DATA_SCIENTIST_COMPETENCY_AREAS,
    careerLadder: DATA_SCIENTIST_CAREER_LADDER,
    totalSkills: DS_SKILL_COUNT,
  },
  'ml-engineer': {
    role: 'ml-engineer',
    track: 'data',
    description: 'Designs, builds, and deploys machine learning models and data products into production. Bridges data science and software engineering to deliver scalable, reliable ML systems.',
    skills: ML_ENGINEER_SKILLS,
    competencyAreas: ML_ENGINEER_COMPETENCY_AREAS,
    careerLadder: ML_ENGINEER_CAREER_LADDER,
    totalSkills: MLE_SKILL_COUNT,
  },
  'security-engineer': {
    role: 'security-engineer',
    track: 'security',
    description: 'Designs and implements security controls, monitors for threats, responds to incidents, and ensures compliance with security standards. Protects systems, data, and infrastructure from security risks.',
    skills: SECURITY_ENGINEER_SKILLS,
    competencyAreas: SECURITY_ENGINEER_COMPETENCY_AREAS,
    careerLadder: SECURITY_ENGINEER_CAREER_LADDER,
    totalSkills: SE_SEC_SKILL_COUNT,
  },
  'cloud-architect': {
    role: 'cloud-architect',
    track: 'infrastructure',
    description: 'Designs and oversees cloud infrastructure, multi-cloud strategies, container orchestration, and infrastructure-as-code. Ensures scalable, secure, and cost-effective cloud environments.',
    skills: CLOUD_ARCHITECT_SKILLS,
    competencyAreas: CLOUD_ARCHITECT_COMPETENCY_AREAS,
    careerLadder: CLOUD_ARCHITECT_CAREER_LADDER,
    totalSkills: CA_SKILL_COUNT,
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
  {
    id: 'devops-engineer',
    title: 'DevOps Engineer',
    track: 'Engineering',
    description: 'Bridges development and operations to deliver software faster and more reliably. Builds CI/CD pipelines, manages cloud infrastructure, containers, monitoring, and automation.',
    skillCount: DO_SKILL_COUNT,
    pillarCount: DO_PILLAR_COUNT,
    levels: 7,
    careerLadder: ['Junior DevOps Engineer', 'DevOps Engineer', 'Senior DevOps Engineer', 'Lead DevOps Engineer', 'Principal DevOps Engineer', 'DevOps Architect', 'Engineering Manager (DevOps)', 'Director of Infrastructure'],
    proficiencyLevels: 7,
    icon: '🚀',
  },
  {
    id: 'data-analyst',
    title: 'Data Analyst',
    track: 'Data',
    description: 'Analyzes data to extract insights that drive business decisions. Combines statistical analysis, SQL, visualization, and business acumen to tell stories with data.',
    skillCount: DA_SKILL_COUNT,
    pillarCount: DA_PILLAR_COUNT,
    levels: 8,
    careerLadder: ['Junior Data Analyst', 'Data Analyst', 'Senior Data Analyst', 'Lead Data Analyst / Analytics Manager', 'Principal Data Analyst', 'Analytics Engineer', 'Director of Analytics'],
    proficiencyLevels: 8,
    icon: '📊',
  },
  {
    id: 'data-engineer',
    title: 'Data Engineer',
    track: 'Data',
    description: 'Builds and maintains data pipelines, data infrastructure, and data architecture. Enables data-driven decision making by ensuring reliable, high-quality data is available to analysts and data scientists.',
    skillCount: DE_SKILL_COUNT,
    pillarCount: DE_PILLAR_COUNT,
    levels: 8,
    careerLadder: ['Junior Data Engineer', 'Data Engineer', 'Senior Data Engineer', 'Lead Data Engineer', 'Principal Data Engineer', 'Data Architect', 'Director of Data Engineering'],
    proficiencyLevels: 8,
    icon: '🗄️',
  },
  {
    id: 'business-consultant',
    title: 'Business Consultant (IT)',
    track: 'Consulting',
    description: 'Advises organizations on how to use technology to achieve business objectives. Analyzes business processes, systems, and strategies; gathers requirements; develops recommendations and implementation plans.',
    skillCount: BC_SKILL_COUNT,
    pillarCount: BC_PILLAR_COUNT,
    levels: 7,
    careerLadder: ['Junior Business Consultant', 'Business Consultant', 'Senior Business Consultant', 'Lead Consultant / Engagement Manager', 'Principal Consultant', 'Managing Consultant / Director', 'Partner / Senior Partner'],
    proficiencyLevels: 7,
    icon: '💼',
  },
  {
    id: 'ux-ui-designer',
    title: 'UX/UI Designer',
    track: 'Design',
    description: 'Creates intuitive, user-centered digital experiences. Specializes in user research, wireframing, prototyping, visual design, design systems, accessibility, and user testing.',
    skillCount: UID_SKILL_COUNT,
    pillarCount: UID_PILLAR_COUNT,
    levels: 7,
    careerLadder: ['Junior UX/UI Designer', 'UX/UI Designer', 'Senior UX/UI Designer', 'Lead UX/UI Designer', 'Principal UX/UI Designer', 'UX/UI Design Manager', 'Director of Design', 'VP of Design / Head of Design'],
    proficiencyLevels: 7,
    icon: '🎨',
  },
  {
    id: 'scrum-master',
    title: 'Scrum Master',
    track: 'Agile',
    description: 'Facilitates Agile/Scrum processes, removes impediments, coaches teams on Agile practices, and fosters an environment of continuous improvement and self-organization.',
    skillCount: SM_SKILL_COUNT,
    pillarCount: SM_PILLAR_COUNT,
    levels: 7,
    careerLadder: ['Junior Scrum Master', 'Scrum Master', 'Senior Scrum Master', 'Lead Scrum Master / Agile Coach', 'Principal Agile Coach', 'Scrum Master Manager / Agile Practice Lead', 'Director of Agile', 'VP of Agile / Chief Agile Officer'],
    proficiencyLevels: 7,
    icon: '🔄',
  },
  {
    id: 'business-analyst',
    title: 'Business Analyst',
    track: 'Business',
    description: 'Acts as a bridge between business stakeholders and technical teams. Elicits, analyzes, and documents requirements to ensure solutions deliver business value.',
    skillCount: BA_SKILL_COUNT,
    pillarCount: BA_PILLAR_COUNT,
    levels: 7,
    careerLadder: ['Junior Business Analyst', 'Business Analyst', 'Senior Business Analyst', 'Lead Business Analyst', 'Principal Business Analyst', 'Business Analyst Manager / Practice Lead', 'Director of Business Analysis', 'VP of Business Analysis / Chief Business Architect'],
    proficiencyLevels: 7,
    icon: '📋',
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    track: 'Data',
    description: 'Builds statistical models and machine learning solutions to extract insights, predict outcomes, and drive data-informed decisions. Combines statistics, programming, and domain expertise.',
    skillCount: DS_SKILL_COUNT,
    pillarCount: DS_PILLAR_COUNT,
    levels: 7,
    careerLadder: ['Junior Data Scientist', 'Data Scientist', 'Senior Data Scientist', 'Lead Data Scientist / Data Science Lead', 'Principal Data Scientist', 'Data Science Manager / Head of Data Science', 'Director of Data Science', 'VP of Data Science / Chief Data Officer'],
    proficiencyLevels: 7,
    icon: '🤖',
  },
  {
    id: 'ml-engineer',
    title: 'ML Engineer',
    track: 'Data',
    description: 'Designs, builds, and deploys machine learning models and data products into production. Bridges data science and software engineering to deliver scalable, reliable ML systems.',
    skillCount: MLE_SKILL_COUNT,
    pillarCount: MLE_PILLAR_COUNT,
    levels: 7,
    careerLadder: ['Junior ML Engineer', 'ML Engineer', 'Senior ML Engineer', 'Lead ML Engineer / ML Tech Lead', 'Principal ML Engineer', 'ML Engineering Manager / Head of ML Engineering', 'Director of ML Engineering / Head of AI', 'VP of AI / Chief AI Officer'],
    proficiencyLevels: 7,
    icon: '🧠',
  },
  {
    id: 'security-engineer',
    title: 'Security Engineer',
    track: 'Security',
    description: 'Designs and implements security controls, monitors for threats, responds to incidents, and ensures compliance with security standards and regulations.',
    skillCount: SE_SEC_SKILL_COUNT,
    pillarCount: SE_SEC_PILLAR_COUNT,
    levels: 7,
    careerLadder: ['Junior Security Engineer', 'Security Engineer', 'Senior Security Engineer', 'Lead Security Engineer / Security Lead', 'Principal Security Engineer', 'Security Engineering Manager / Security Manager', 'Director of Security / Head of Security', 'VP of Security / CISO'],
    proficiencyLevels: 7,
    icon: '🔒',
  },
  {
    id: 'cloud-architect',
    title: 'Cloud Architect',
    track: 'Infrastructure',
    description: 'Designs and oversees cloud infrastructure, multi-cloud strategies, container orchestration, and infrastructure-as-code. Ensures scalable, secure, and cost-effective cloud environments.',
    skillCount: CA_SKILL_COUNT,
    pillarCount: CA_PILLAR_COUNT,
    levels: 7,
    careerLadder: ['Junior Cloud Architect', 'Cloud Architect', 'Senior Cloud Architect', 'Lead Cloud Architect / Principal Cloud Engineer', 'Principal Cloud Architect', 'Cloud Architecture Manager / Head of Cloud', 'Director of Cloud / Head of Infrastructure', 'VP of Cloud / CTO / Chief Architect'],
    proficiencyLevels: 7,
    icon: '☁️',
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
