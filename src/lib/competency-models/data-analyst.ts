// Hirena — Data Analyst Competency Model
// 26 skills across 5 pillars, proficiency levels 0-7, career ladder.

import type { Skill, ProficiencyLevel, CompetencyArea, CareerLadderStep, RoleCompetencyModel, CompetencyPillar } from '@/types';

export const DATA_ANALYST_SKILLS: Record<string, Skill> = {
  // Data Analysis & Statistics (6 skills)
  "descriptive-stats": {
    id: "descriptive-stats",
    name: "Descriptive Statistics",
    description: "Mean, median, mode, variance, standard deviation, percentiles, distributions, skewness, kurtosis; summarizing data",
    category: "data-analysis",
    level: 0,
  },
  "inferential-stats": {
    id: "inferential-stats",
    name: "Inferential Statistics",
    description: "Hypothesis testing, confidence intervals, p-values, t-tests, ANOVA, chi-square; drawing conclusions from samples",
    category: "data-analysis",
    level: 0,
  },
  "probability": {
    id: "probability",
    name: "Probability & Distributions",
    description: "Probability theory, common distributions (normal, binomial, Poisson, exponential), Bayes' theorem, conditional probability",
    category: "data-analysis",
    level: 0,
  },
  "regression": {
    id: "regression",
    name: "Regression Analysis",
    description: "Linear regression, logistic regression, multiple regression, interpretation of coefficients, R-squared, assumptions, diagnostics",
    category: "data-analysis",
    level: 0,
  },
  "experimentation-stats": {
    id: "experimentation-stats",
    name: "Experimentation & A/B Testing",
    description: "Designing A/B tests: hypothesis formation, sample size calculation, statistical power, significance testing, interpreting results, avoiding pitfalls",
    category: "data-analysis",
    level: 0,
  },
  "data-visualization-stats": {
    id: "data-visualization-stats",
    name: "Statistical Visualization",
    description: "Visualizing statistical data: histograms, box plots, scatter plots, heatmaps, correlation matrices, distribution plots; choosing the right viz",
    category: "data-analysis",
    level: 0,
  },

  // SQL & Data Querying (5 skills)
  "sql-advanced": {
    id: "sql-advanced",
    name: "Advanced SQL",
    description: "Complex SQL: joins, subqueries, CTEs, window functions, aggregations, query optimization, execution plans, indexing",
    category: "data-tools",
    level: 0,
  },
  "sql-performance": {
    id: "sql-performance",
    name: "SQL Performance Tuning",
    description: "Optimizing SQL queries: indexing strategies, query plans, avoiding N+1, partitioning, materialized views, query profiling",
    category: "data-tools",
    level: 0,
  },
  "database-concepts": {
    id: "database-concepts",
    name: "Database Concepts",
    description: "Understanding databases: relational vs NoSQL, ACID, normalization, transactions, isolation levels, indexing, data modeling",
    category: "data-tools",
    level: 0,
  },
  "data-warehousing": {
    id: "data-warehousing",
    name: "Data Warehousing",
    description: "Data warehousing concepts: star schema, snowflake schema, fact/dimension tables, ETL/ELT, data lakes, modern data stack",
    category: "data-tools",
    level: 0,
  },
  "data-pipelines": {
    id: "data-pipelines",
    name: "Data Pipelines & ETL",
    description: "Building data pipelines: extraction, transformation, loading; scheduling; data quality checks; tools (Airflow, dbt, Prefect)",
    category: "data-tools",
    level: 0,
  },

  // Programming (4 skills)
  "python-data": {
    id: "python-data",
    name: "Python for Data Analysis",
    description: "Python data stack: pandas, numpy, scipy, matplotlib, seaborn; data manipulation, analysis, visualization",
    category: "data-programming",
    level: 0,
  },
  "r-data": {
    id: "r-data",
    name: "R for Data Analysis",
    description: "R for data: tidyverse (dplyr, ggplot2, tidyr), statistical modeling, data visualization, RMarkdown",
    category: "data-programming",
    level: 0,
  },
  "excel-advanced": {
    id: "excel-advanced",
    name: "Advanced Excel/Sheets",
    description: "Advanced spreadsheets: formulas, pivot tables, VLOOKUP/XLOOKUP, conditional formatting, macros/VBA, data validation, charts",
    category: "data-tools",
    level: 0,
  },
  "data-cleaning": {
    id: "data-cleaning",
    name: "Data Cleaning & Wrangling",
    description: "Cleaning and transforming data: handling missing values, outliers, duplicates, data types, string manipulation, reshaping data",
    category: "data-programming",
    level: 0,
  },

  // Visualization & Reporting (4 skills)
  "viz-tools": {
    id: "viz-tools",
    name: "Visualization Tools (Tableau/Looker/PowerBI)",
    description: "Business intelligence tools: building dashboards, charts, reports; data connections; calculated fields; sharing and collaboration",
    category: "data-tools",
    level: 0,
  },
  "storytelling-viz": {
    id: "storytelling-viz",
    name: "Data Storytelling & Visualization Design",
    description: "Designing effective visualizations: choosing chart types, color theory, reducing clutter, highlighting insights, storytelling with data",
    category: "data-tools",
    level: 0,
  },
  "dashboard-design": {
    id: "dashboard-design",
    name: "Dashboard Design & UX",
    description: "Designing dashboards: information architecture, layout, interactivity, filtering, drill-down, user experience, actionable insights",
    category: "data-tools",
    level: 0,
  },
  "reporting": {
    id: "reporting",
    name: "Reporting & Communication",
    description: "Creating reports: executive summaries, automated reports, scheduled reports, written communication of insights, recommendations",
    category: "communication",
    level: 0,
  },

  // Business & Domain (4 skills)
  "business-metrics": {
    id: "business-metrics",
    name: "Business Metrics & KPIs",
    description: "Understanding business metrics: revenue, retention, churn, LTV, CAC, conversion, engagement; defining and tracking KPIs",
    category: "domain-knowledge",
    level: 0,
  },
  "product-analytics": {
    id: "product-analytics",
    name: "Product Analytics",
    description: "Product metrics: activation, retention, engagement, funnels, cohorts, user journeys, feature adoption; tools (Mixpanel, Amplitude)",
    category: "domain-knowledge",
    level: 0,
  },
  "domain-experience": {
    id: "domain-experience",
    name: "Domain Knowledge",
    description: "Understanding the business domain: industry context, market dynamics, competitive landscape, customer behavior, business model",
    category: "domain-knowledge",
    level: 0,
  },
  "stakeholder-management-da": {
    id: "stakeholder-management-da",
    name: "Stakeholder Management",
    description: "Managing stakeholders: understanding their needs, communicating insights, managing expectations, building trust, influencing decisions",
    category: "stakeholder",
    level: 0,
  },

  // Tools & Platforms (3 skills)
  "analytics-platforms": {
    id: "analytics-platforms",
    name: "Analytics Platforms",
    description: "Using analytics platforms: Google Analytics, Mixpanel, Amplitude, Heap; event tracking, funnel analysis, cohort analysis, segmentation",
    category: "data-tools",
    level: 0,
  },
  "databricks-bigquery": {
    id: "databricks-bigquery",
    name: "Cloud Data Platforms (BigQuery/Databricks/Snowflake)",
    description: "Cloud data platforms: querying large datasets, SQL dialects, cost management, data sharing, integrations",
    category: "data-tools",
    level: 0,
  },
  "git-basic": {
    id: "git-basic",
    name: "Git & Version Control",
    description: "Git basics: cloning, branching, committing, pushing, pulling, merge conflicts, PRs; versioning analysis code",
    category: "tools",
    level: 0,
  },
};

export const DATA_ANALYST_PILLARS: CompetencyPillar[] = [
  {
    id: "statistics",
    name: "Statistics & Experimentation",
    description: "Descriptive/inferential statistics, probability, regression, experimentation & A/B testing, statistical visualization",
    weight: 25,
    categories: ["data-analysis"],
  },
  {
    id: "querying",
    name: "SQL & Data Querying",
    description: "Advanced SQL, performance tuning, database concepts, data warehousing, data pipelines & ETL",
    weight: 25,
    categories: ["data-tools", "data"],
  },
  {
    id: "programming",
    name: "Programming for Data",
    description: "Python for data analysis, R for data analysis, advanced Excel, data cleaning & wrangling",
    weight: 20,
    categories: ["data-programming", "data-tools"],
  },
  {
    id: "visualization",
    name: "Visualization & Reporting",
    description: "Visualization tools, data storytelling, dashboard design, reporting & communication",
    weight: 20,
    categories: ["data-tools", "communication"],
  },
  {
    id: "business",
    name: "Business & Domain Knowledge",
    description: "Business metrics & KPIs, product analytics, domain knowledge, stakeholder management",
    weight: 10,
    categories: ["domain-knowledge", "stakeholder"],
  },
];

export const DATA_ANALYST_LEVELS = [
  { level: 0 as ProficiencyLevel, name: "No Experience", description: "No practical experience with this skill" },
  { level: 1 as ProficiencyLevel, name: "Basic", description: "Can understand and use the skill with guidance" },
  { level: 2 as ProficiencyLevel, name: "Intermediate", description: "Can use the skill independently on routine tasks" },
  { level: 3 as ProficiencyLevel, name: "Competent", description: "Can use the skill independently on complex tasks; can troubleshoot" },
  { level: 4 as ProficiencyLevel, name: "Advanced", description: "Can apply the skill to novel problems; can teach others; deep understanding" },
  { level: 5 as ProficiencyLevel, name: "Expert", description: "Recognized expert; can design systems using this skill; can drive best practices" },
  { level: 6 as ProficiencyLevel, name: "Master", description: "Industry-level expertise; can contribute to the field; extensive real-world experience" },
  { level: 7 as ProficiencyLevel, name: "Authority", description: "Thought leader; has shaped the practice; extensive publications, talks, or open-source contributions" },
];

export const DATA_ANALYST_CAREER_LADDER: CareerLadderStep[] = [
  {
    title: "Junior Data Analyst",
    minLevel: 0,
    maxLevel: 2,
    expectedProficiency: {
      "statistics": 1,
      "querying": 2,
      "programming": 1,
      "visualization": 2,
      "business": 2,
    },
    description: "Entry-level data analyst. Runs basic queries and creates simple reports. Learns SQL, Excel, and visualization tools. Works under guidance.",
    typicalYearsOfExperience: "0-2 years",
  },
  {
    title: "Data Analyst",
    minLevel: 2,
    maxLevel: 3,
    expectedProficiency: {
      "statistics": 2,
      "querying": 3,
      "programming": 2,
      "visualization": 3,
      "business": 3,
    },
    description: "Mid-level data analyst. Analyzes data independently. Builds dashboards. Conducts A/B tests. Communicates insights to stakeholders.",
    typicalYearsOfExperience: "2-5 years",
  },
  {
    title: "Senior Data Analyst",
    minLevel: 3,
    maxLevel: 4,
    expectedProficiency: {
      "statistics": 3,
      "querying": 4,
      "programming": 3,
      "visualization": 4,
      "business": 4,
    },
    description: "Senior data analyst. Leads complex analyses. Designs dashboards and reports. Mentors juniors. Drives data-informed decisions. Deep business acumen.",
    typicalYearsOfExperience: "5-8 years",
  },
  {
    title: "Lead Data Analyst",
    minLevel: 4,
    maxLevel: 5,
    expectedProficiency: {
      "statistics": 4,
      "querying": 5,
      "programming": 4,
      "visualization": 4,
      "business": 5,
    },
    description: "Lead data analyst. Sets analytics strategy. Makes tooling and method decisions. Ensures data quality. Mentors team. Influences product and business strategy.",
    typicalYearsOfExperience: "8-12 years",
  },
  {
    title: "Principal Data Analyst",
    minLevel: 5,
    maxLevel: 7,
    expectedProficiency: {
      "statistics": 5,
      "querying": 5,
      "programming": 5,
      "visualization": 5,
      "business": 5,
    },
    description: "Principal data analyst. Technical authority for analytics. Solves the hardest data problems. Drives data culture. Recognized expert.",
    typicalYearsOfExperience: "12+ years",
  },
];

export const DATA_ANALYST_MODEL: RoleCompetencyModel = {
  role: "data-analyst",
  roleName: "Data Analyst",
  track: "data",
  description: "Data analyst focused on extracting insights from data to drive business decisions. Combines statistical analysis, SQL querying, programming, and visualization to tell stories with data.",
  skills: DATA_ANALYST_SKILLS,
  pillars: DATA_ANALYST_PILLARS,
  levels: DATA_ANALYST_LEVELS,
  careerLadder: DATA_ANALYST_CAREER_LADDER,
  expectedLevels: {
    junior: 2,
    "data-analyst": 3,
    senior: 4,
    lead: 5,
    principal: 6,
  },
  region: "MENAC",
  totalSkills: Object.keys(DATA_ANALYST_SKILLS).length,
};
