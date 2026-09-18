import type { Skill, CompetencyArea, ProficiencyLevel, CareerLadderStep } from "@/types";

/**
 * Data Analyst Competency Model
 * Covers SQL, statistics, data visualization, business intelligence, Python for data, data storytelling.
 * 26 skills across 5 competency areas.
 */

export const SKILLS: Record<string, Skill> = {
  // ── Data Analysis & Statistics ──────────────────────────────────────────
  "descriptive-stats": {
    id: "descriptive-stats",
    name: "Descriptive Statistics",
    description: "Mean, median, mode, variance, standard deviation, percentiles, distributions, skewness, kurtosis. Summarizing and describing datasets with statistical measures.",
    category: "statistics",
    level: 0,
  },
  "inferential-stats": {
    id: "inferential-stats",
    name: "Inferential Statistics",
    description: "Hypothesis testing, confidence intervals, p-values, t-tests, ANOVA, chi-square, correlation vs causation. Drawing conclusions from samples and understanding statistical significance.",
    category: "statistics",
    level: 0,
  },
  "probability": {
    id: "probability",
    name: "Probability & Distributions",
    description: "Probability theory basics: conditional probability, Bayes' theorem, common distributions (normal, binomial, Poisson, uniform), expected value, variance. Foundation for statistical modeling.",
    category: "statistics",
    level: 0,
  },
  "A-B-testing": {
    id: "A-B-testing",
    name: "A/B Testing & Experimentation",
    description: "Designing and analyzing experiments: hypothesis formulation, sample size calculation, randomization, metric selection, statistical power, interpreting results, avoiding common pitfalls (peeking, multiple comparisons).",
    category: "statistics",
    level: 0,
  },
  "statistical-modeling": {
    id: "statistical-modeling",
    name: "Statistical Modeling (Regression, Classification)",
    description: "Linear and logistic regression, generalized linear models, model assumptions, diagnostics, interpretation of coefficients, R-squared, residual analysis, overfitting, regularization basics.",
    category: "statistics",
    level: 0,
  },

  // ── SQL & Data Querying ─────────────────────────────────────────────────
  "sql-advanced": {
    id: "sql-advanced",
    name: "Advanced SQL",
    description: "Complex queries: JOINs (inner, outer, cross, self), subqueries, CTEs, window functions (RANK, ROW_NUMBER, LAG/LEAD, aggregations over partitions), query optimization, indexing, execution plans.",
    category: "sql",
    level: 0,
  },
  "data-manipulation-sql": {
    id: "data-manipulation-sql",
    name: "Data Manipulation & Aggregation in SQL",
    description: "GROUP BY, HAVING, aggregate functions (SUM, AVG, COUNT, MIN, MAX), CASE expressions, pivoting/unpivoting, working with dates and strings, conditional aggregation.",
    category: "sql",
    level: 0,
  },
  "database-understanding": {
    id: "database-understanding",
    name: "Database Concepts & Data Modeling",
    description: "Relational database fundamentals: tables, keys (primary, foreign), normalization, indexes, transactions, ACID properties, data types, schema design basics. Understanding how data is stored and retrieved.",
    category: "sql",
    level: 0,
  },

  // ── Data Visualization & BI ─────────────────────────────────────────────
  "data-visualization-principles": {
    id: "data-visualization-principles",
    name: "Data Visualization Principles",
    description: "Choosing the right chart for the data story: bar charts, line charts, scatter plots, histograms, heatmaps, box plots, treemaps. Visual encoding, color theory, avoiding chart junk, accessibility in visualization.",
    category: "visualization",
    level: 0,
  },
  "tableau": {
    id: "tableau",
    name: "Tableau / Power BI / Looker",
    description: "Building dashboards and reports in a BI tool: connecting to data sources, creating calculated fields, building visualizations, dashboard design, interactivity (filters, parameters), storytelling with dashboards.",
    category: "visualization",
    level: 0,
  },
  "ggplot-python-viz": {
    id: "ggplot-python-viz",
    name: "Python Visualization (Matplotlib, Seaborn, Plotly)",
    description: "Creating visualizations in Python: Matplotlib for static plots, Seaborn for statistical visualizations, Plotly for interactive charts. Customizing plots, subplots, themes, saving figures.",
    category: "visualization",
    level: 0,
  },

  // ── Programming for Data Analysis ───────────────────────────────────────
  "python-data-stack": {
    id: "python-data-stack",
    name: "Python Data Stack (Pandas, NumPy)",
    description: "Data manipulation in Python: NumPy arrays and vectorized operations, Pandas DataFrames, data cleaning (missing values, duplicates, outliers), merging/joining, groupby, pivot tables, time series.",
    category: "programming",
    level: 0,
  },
  "data-cleaning": {
    id: "data-cleaning",
    name: "Data Cleaning & Wrangling",
    description: "Handling messy real-world data: missing values (imputation strategies), duplicates, outliers, inconsistent formatting, data type conversion, string parsing, record linkage, data validation.",
    category: "programming",
    level: 0,
  },
  "git-for-data": {
    id: "git-for-data",
    name: "Git & Version Control for Data Projects",
    description: "Using Git for data analysis projects: version control for scripts and notebooks, branching, collaboration, reproducibility, environment management (requirements.txt, pip, conda).",
    category: "tools",
    level: 0,
  },

  // ── Business Intelligence & Communication ───────────────────────────────
  "business-metrics": {
    id: "business-metrics",
    name: "Business Metrics & KPIs",
    description: "Understanding and defining business metrics: revenue, margin, CAC, LTV, churn, retention, conversion funnels, cohorts. Translating business questions into measurable metrics.",
    category: "business",
    level: 0,
  },
  "data-storytelling": {
    id: "data-storytelling",
    name: "Data Storytelling & Communication",
    description: "Turning analysis into compelling narratives: structuring insights for different audiences (executives, managers, technical teams), framing recommendations, using data to persuade, avoiding misinterpretation.",
    category: "communication",
    level: 0,
  },
  "requirements-elicitation": {
    id: "requirements-elicitation",
    name: "Requirements Elicitation for Analytics",
    description: "Working with stakeholders to understand what questions they need answered: translating vague business questions into concrete analytical tasks, scoping analysis projects, setting expectations on feasibility and timeline.",
    category: "business",
    level: 0,
  },
  "domain-knowledge": {
    id: "domain-knowledge",
    name: "Domain Knowledge & Context",
    description: "Understanding the business context and domain you analyze data in: industry-specific metrics, business models, competitive landscape, regulatory environment. Domain knowledge makes analysis relevant and actionable.",
    category: "business",
    level: 0,
  },

  // ── Tools & Platforms ───────────────────────────────────────────────────
  "excel-advanced": {
    id: "excel-advanced",
    name: "Excel (Advanced)",
    description: "Advanced Excel: pivot tables, VLOOKUP/XLOOKUP, INDEX/MATCH, conditional formatting, data validation, Power Query, array formulas, basic macros/VBA for data tasks.",
    category: "tools",
    level: 0,
  },
  "spreadsheets-best-practices": {
    id: "spreadsheets-best-practices",
    name: "Spreadsheet Best Practices & Modeling",
    description: "Building reliable, auditable spreadsheets: separating raw data from analysis, documentation, error checking, named ranges, structured references, avoiding hard-coded values, reproducible spreadsheet models.",
    category: "tools",
    level: 0,
  },
};

export const COMPETENCY_AREAS: CompetencyArea[] = [
  {
    id: "statistics",
    name: "Statistics & Experimentation",
    description: "Statistical reasoning, hypothesis testing, A/B testing, and modeling — the analytical core of data analysis.",
    skills: ["descriptive-stats", "inferential-stats", "probability", "A-B-testing", "statistical-modeling"],
    weight: 30,
  },
  {
    id: "sql",
    name: "SQL & Database Skills",
    description: "Querying, manipulating, and understanding data in relational databases — the primary tool for data extraction.",
    skills: ["sql-advanced", "data-manipulation-sql", "database-understanding"],
    weight: 25,
  },
  {
    id: "visualization",
    name: "Data Visualization & BI",
    description: "Creating charts, dashboards, and reports that communicate insights clearly to stakeholders.",
    skills: ["data-visualization-principles", "tableau", "ggplot-python-viz"],
    weight: 20,
  },
  {
    id: "programming",
    name: "Programming for Data Analysis",
    description: "Python (Pandas, NumPy) for data cleaning, transformation, and analysis — beyond what SQL and spreadsheets can do.",
    skills: ["python-data-stack", "data-cleaning", "git-for-data"],
    weight: 20,
  },
  {
    id: "business",
    name: "Business Context & Communication",
    description: "Understanding the business, defining metrics, eliciting requirements, and telling data stories that drive decisions.",
    skills: ["business-metrics", "data-storytelling", "requirements-elicitation", "domain-knowledge"],
    weight: 25,
  },
  {
    id: "tools",
    name: "Tools & Productivity",
    description: "Excel, spreadsheets, Git, and other tools that support efficient, reproducible data work.",
    skills: ["excel-advanced", "spreadsheets-best-practices"],
    weight: 10,
  },
];

export const LEVELS: ProficiencyLevel[] = [0, 1, 2, 3, 4, 5, 6, 7];

export const CAREER_LADDER: CareerLadderStep[] = [
  {
    title: "Junior Data Analyst",
    minLevel: 0,
    typicalYearsOfExperience: "0-2 years",
    description: "Entry-level analyst. Works with structured data, writes basic SQL queries, creates simple reports and dashboards under guidance. Learns statistical concepts and business context.",
  },
  {
    title: "Data Analyst",
    minLevel: 2,
    typicalYearsOfExperience: "2-4 years",
    description: "Core analyst role. Independently extracts and analyzes data, builds dashboards, conducts A/B tests, and delivers insights to stakeholders. Proficient in SQL, Python/Pandas, and at least one BI tool.",
  },
  {
    title: "Senior Data Analyst",
    minLevel: 3,
    typicalYearsOfExperience: "4-7 years",
    description: "Senior analyst. Tackles complex, ambiguous analytical problems. Designs experiments, builds advanced models, automates reporting, and mentors juniors. Strong business acumen and communication.",
  },
  {
    title: "Lead Data Analyst / Analytics Manager",
    minLevel: 4,
    typicalYearsOfExperience: "6-8 years",
    description: "Leads analytics workstreams or manages a team of analysts. Sets analytical standards, prioritizes analysis requests, ensures data quality, and drives data-informed decision making across the organization.",
  },
  {
    title: "Principal Data Analyst",
    minLevel: 5,
    typicalYearsOfExperience: "8+ years",
    description: "Principal-level analyst. Solves the hardest analytical problems, defines analytics strategy, builds advanced statistical models, and is the go-to expert for complex data questions across the organization.",
  },
  {
    title: "Analytics Engineer",
    minLevel: 4,
    typicalYearsOfExperience: "5-8 years",
    description: "Hybrid role bridging analysis and engineering: transforms raw data into analysis-ready datasets (dbt, data modeling), builds data pipelines for analytics, and enables self-service analytics for the organization.",
  },
  {
    title: "Director of Analytics",
    minLevel: 2,
    typicalYearsOfExperience: "10+ years",
    description: "Leads the analytics function. Sets strategy, manages teams, ensures data infrastructure supports analysis needs, and drives organization-wide data culture and decision-making practices.",
  },
];

export const SKILL_COUNT = Object.keys(SKILLS).length;
export const PILLAR_COUNT = COMPETENCY_AREAS.length;
