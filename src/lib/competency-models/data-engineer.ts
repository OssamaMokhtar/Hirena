// Hirena — Data Engineer Competency Model
// 26 skills across 5 pillars, proficiency levels 0-7, career ladder.

import type { Skill, ProficiencyLevel, CompetencyArea, CareerLadderStep, RoleCompetencyModel, CompetencyPillar } from '@/types';

export const DATA_ENGINEER_SKILLS: Record<string, Skill> = {
  // Data Pipelines & ETL/ELT (6 skills)
  "etl-concepts": {
    id: "etl-concepts",
    name: "ETL/ELT Concepts & Patterns",
    description: "Understanding ETL/ELT: extraction, transformation, loading; batch vs streaming; data integration patterns; data quality; idempotency",
    category: "data-engineering",
    level: 0,
  },
  "pipeline-orchestration": {
    id: "pipeline-orchestration",
    name: "Pipeline Orchestration (Airflow/Dagster/Prefect)",
    description: "Orchestrating data pipelines: DAGs, scheduling, dependencies, retries, backfills, monitoring, alerting, dynamic pipelines",
    category: "data-engineering",
    level: 0,
  },
  "data Modeling-pipeline": {
    id: "data-modeling-pipeline",
    name: "Data Modeling for Pipelines",
    description: "Modeling data for pipelines: normalization, denormalization, partitioning, bucketing, schema design for analytics",
    category: "data-engineering",
    level: 0,
  },
  "data-quality": {
    id: "data-quality",
    name: "Data Quality & Testing",
    description: "Ensuring data quality: validation, anomaly detection, data contracts, testing pipelines, data observability, data lineage",
    category: "data-engineering",
    level: 0,
  },
  "cdc": {
    id: "cdc",
    name: "Change Data Capture (CDC)",
    description: "CDC patterns: log-based, trigger-based, timestamp-based; tools (Debezium, Fivetran); replication, conflict resolution",
    category: "data-engineering",
    level: 0,
  },
  "streaming-etl": {
    id: "streaming-etl",
    name: "Streaming ETL / Real-Time Pipelines",
    description: "Real-time data pipelines: Kafka Streams, Flink, Spark Streaming; windowing, watermarking, state management, exactly-once semantics",
    category: "data-engineering",
    level: 0,
  },

  // Big Data Technologies (5 skills)
  "spark": {
    id: "spark",
    name: "Apache Spark",
    description: "Spark: RDDs, DataFrames, SQL, transformations, actions, caching, performance tuning, Spark architecture, cluster modes",
    category: "data-engineering",
    level: 0,
  },
  "hadoop-ecosystem": {
    id: "hadoop-ecosystem",
    name: "Hadoop Ecosystem",
    description: "Hadoop ecosystem: HDFS, YARN, MapReduce, Hive, HBase, Pig, Sqoop, Flume; understanding when to use each",
    category: "data-engineering",
    level: 0,
  },
  "data-lakes": {
    id: "data-lakes",
    name: "Data Lakes & Lakehouses",
    description: "Data lakes and lakehouses: storage formats (Parquet, ORC, Avro), lakehouse architecture (Delta Lake, Hudi, Iceberg), medallion architecture",
    category: "data-engineering",
    level: 0,
  },
  "bigdata-sql": {
    id: "bigdata-sql",
    name: "Big Data SQL (Presto/Trino/Impala)",
    description: "Distributed SQL engines: Presto/Trino, Impala; querying across data sources, federated queries, performance tuning",
    category: "data-engineering",
    level: 0,
  },
  "nosql-data-engineering": {
    id: "nosql-data-engineering",
    name: "NoSQL for Data Engineering",
    description: "NoSQL for data engineering: document stores, key-value, column-family, graph; data modeling, access patterns, consistency",
    category: "data-engineering",
    level: 0,
  },

  // Cloud Data Services (4 skills)
  "cloud-data-aws": {
    id: "cloud-data-aws",
    name: "AWS Data Services",
    description: "AWS data services: S3, Glue, EMR, Redshift, Kinesis, MSK, Athena, Lake Formation, DynamoDB, RDS",
    category: "cloud-platforms",
    level: 0,
  },
  "cloud-data-gcp": {
    id: "cloud-data-gcp",
    name: "GCP Data Services",
    description: "GCP data services: Cloud Storage, BigQuery, Dataflow, Pub/Sub, Dataproc, Dataprep, Data Fusion, Cloud SQL",
    category: "cloud-platforms",
    level: 0,
  },
  "cloud-data-azure": {
    id: "cloud-data-azure",
    name: "Azure Data Services",
    description: "Azure data services: Data Lake Storage, Synapse, Data Factory, Databricks, Event Hubs, Stream Analytics, SQL Database",
    category: "cloud-platforms",
    level: 0,
  },
  "serverless-data": {
    id: "serverless-data",
    name: "Serverless Data Processing",
    description: "Serverless data processing: AWS Lambda + S3/Glue, GCP Cloud Functions + BigQuery, Azure Functions + Synapse; cost, scaling, limitations",
    category: "cloud-platforms",
    level: 0,
  },

  // Programming (3 skills)
  "python-de": {
    id: "python-de",
    name: "Python for Data Engineering",
    description: "Python for data engineering: pandas, PySpark, boto3/GCP client libraries, scripting, automation, connectors",
    category: "data-programming",
    level: 0,
  },
  "scala-de": {
    id: "scala-de",
    name: "Scala for Data Engineering",
    description: "Scala for data engineering: functional programming, Spark (native Scala API), type safety, collections, pattern matching",
    category: "data-programming",
    level: 0,
  },
  "java-de": {
    id: "java-de",
    name: "Java for Data Engineering",
    description: "Java for data engineering: Spring Batch, Kafka clients, HDFS API, JDBC, enterprise integration patterns",
    category: "data-programming",
    level: 0,
  },

  // Infrastructure & DevOps for Data (4 skills)
  "data-infrastructure": {
    id: "data-infrastructure",
    name: "Data Infrastructure & Architecture",
    description: "Designing data infrastructure: storage, compute, networking, security; data architecture patterns; lambda/kappa architecture",
    category: "infrastructure",
    level: 0,
  },
  "data-devops": {
    id: "data-devops",
    name: "Data DevOps (DataOps)",
    description: "DataOps: CI/CD for data pipelines, infrastructure as code for data, testing data pipelines, monitoring data infrastructure, automation",
    category: "infrastructure",
    level: 0,
  },
  "containers-data": {
    id: "containers-data",
    name: "Containers & Kubernetes for Data",
    description: "Running data workloads on containers/K8s: Spark on K8s, Kafka on K8s, stateful sets, persistent volumes, resource management",
    category: "infrastructure",
    level: 0,
  },
  "dbt": {
    id: "dbt",
    name: "dbt (data build tool)",
    description: "dbt: modeling, transformations, testing, documentation, snapshots, incremental models, macros, Jinja templating, project structure",
    category: "infrastructure",
    level: 0,
  },

  // Collaboration & Soft Skills (4 skills)
  "data-governance": {
    id: "data-governance",
    name: "Data Governance & Metadata",
    description: "Data governance: data catalog, metadata management, data lineage, data ownership, access control, compliance (GDPR, CCPA)",
    category: "collaboration",
    level: 0,
  },
  "data-documentation": {
    id: "data-documentation",
    name: "Data Documentation & Discoverability",
    description: "Documenting data: data dictionaries, schema documentation, data lineage diagrams, data discovery, data catalog usage",
    category: "collaboration",
    level: 0,
  },
  "cross-functional-data": {
    id: "cross-functional-data",
    name: "Cross-Functional Collaboration",
    description: "Collaborating with data scientists, analysts, engineers, product, business; understanding their data needs; designing data products",
    category: "collaboration",
    level: 0,
  },
  "communication-data": {
    id: "communication-data",
    name: "Communication & Stakeholder Management",
    description: "Communicating data architecture and pipelines; explaining technical concepts; managing expectations; presenting to leadership",
    category: "collaboration",
    level: 0,
  },
};

export const DATA_ENGINEER_PILLARS: CompetencyPillar[] = [
  {
    id: "pipelines",
    name: "Data Pipelines & ETL/ELT",
    description: "ETL/ELT concepts, pipeline orchestration, data modeling for pipelines, data quality & testing, CDC, streaming ETL",
    weight: 25,
    categories: ["data-engineering"],
  },
  {
    id: "bigdata",
    name: "Big Data Technologies",
    description: "Apache Spark, Hadoop ecosystem, data lakes & lakehouses, big data SQL, NoSQL for data engineering",
    weight: 20,
    categories: ["data-engineering", "data"],
  },
  {
    id: "cloud-data",
    name: "Cloud Data Services",
    description: "AWS, GCP, Azure data services, serverless data processing",
    weight: 15,
    categories: ["cloud-platforms", "cloud-infrastructure"],
  },
  {
    id: "programming",
    name: "Programming for Data Engineering",
    description: "Python, Scala, Java for data engineering",
    weight: 15,
    categories: ["data-programming", "backend"],
  },
  {
    id: "infrastructure",
    name: "Infrastructure, DataOps & Governance",
    description: "Data infrastructure & architecture, DataOps, containers & K8s for data, dbt, data governance & metadata, documentation, collaboration",
    weight: 25,
    categories: ["infrastructure", "ci-cd", "containerization", "collaboration"],
  },
];

export const DATA_ENGINEER_LEVELS = [
  { level: 0 as ProficiencyLevel, name: "No Experience", description: "No practical experience with this skill" },
  { level: 1 as ProficiencyLevel, name: "Basic", description: "Can understand and use the skill with guidance" },
  { level: 2 as ProficiencyLevel, name: "Intermediate", description: "Can use the skill independently on routine tasks" },
  { level: 3 as ProficiencyLevel, name: "Competent", description: "Can use the skill independently on complex tasks; can troubleshoot" },
  { level: 4 as ProficiencyLevel, name: "Advanced", description: "Can apply the skill to novel problems; can teach others; deep understanding" },
  { level: 5 as ProficiencyLevel, name: "Expert", description: "Recognized expert; can design systems using this skill; can drive best practices" },
  { level: 6 as ProficiencyLevel, name: "Master", description: "Industry-level expertise; can contribute to the field; extensive real-world experience" },
  { level: 7 as ProficiencyLevel, name: "Authority", description: "Thought leader; has shaped the practice; extensive publications, talks, or open-source contributions" },
];

export const DATA_ENGINEER_CAREER_LADDER: CareerLadderStep[] = [
  {
    title: "Junior Data Engineer",
    minLevel: 0,
    maxLevel: 2,
    expectedProficiency: {
      "pipelines": 1,
      "bigdata": 1,
      "cloud-data": 1,
      "programming": 2,
      "infrastructure": 1,
    },
    description: "Entry-level data engineer. Builds simple pipelines under guidance. Learns Spark, SQL, and cloud data services. Works with senior engineers on complex pipelines.",
    typicalYearsOfExperience: "0-2 years",
  },
  {
    title: "Data Engineer",
    minLevel: 2,
    maxLevel: 3,
    expectedProficiency: {
      "pipelines": 3,
      "bigdata": 2,
      "cloud-data": 2,
      "programming": 3,
      "infrastructure": 2,
    },
    description: "Mid-level data engineer. Builds and maintains data pipelines independently. Works with Spark, cloud data services, and dbt. Ensures data quality.",
    typicalYearsOfExperience: "2-5 years",
  },
  {
    title: "Senior Data Engineer",
    minLevel: 3,
    maxLevel: 4,
    expectedProficiency: {
      "pipelines": 4,
      "bigdata": 3,
      "cloud-data": 3,
      "programming": 4,
      "infrastructure": 3,
    },
    description: "Senior data engineer. Designs complex data pipelines and architectures. Optimizes Spark jobs. Implements data quality and DataOps. Mentors juniors.",
    typicalYearsOfExperience: "5-8 years",
  },
  {
    title: "Lead Data Engineer",
    minLevel: 4,
    maxLevel: 5,
    expectedProficiency: {
      "pipelines": 5,
      "bigdata": 4,
      "cloud-data": 4,
      "programming": 4,
      "infrastructure": 4,
    },
    description: "Lead data engineer. Sets data architecture and strategy. Makes technology decisions. Ensures data quality and governance. Mentors team.",
    typicalYearsOfExperience: "8-12 years",
  },
  {
    title: "Principal Data Engineer",
    minLevel: 5,
    maxLevel: 7,
    expectedProficiency: {
      "pipelines": 5,
      "bigdata": 5,
      "cloud-data": 5,
      "programming": 5,
      "infrastructure": 5,
    },
    description: "Principal data engineer. Technical authority for data engineering. Solves the hardest data infrastructure problems. Drives data strategy. Recognized expert.",
    typicalYearsOfExperience: "12+ years",
  },
];

export const DATA_ENGINEER_MODEL: RoleCompetencyModel = {
  role: "data-engineer",
  roleName: "Data Engineer",
  track: "data",
  description: "Data engineer focused on building and maintaining data pipelines, data infrastructure, and data architecture. Enables data-driven decision making by ensuring reliable, high-quality data is available to analysts and data scientists.",
  skills: DATA_ENGINEER_SKILLS,
  pillars: DATA_ENGINEER_PILLARS,
  levels: DATA_ENGINEER_LEVELS,
  careerLadder: DATA_ENGINEER_CAREER_LADDER,
  expectedLevels: {
    junior: 2,
    "data-engineer": 3,
    senior: 4,
    lead: 5,
    principal: 6,
  },
  region: "MENAC",
  totalSkills: Object.keys(DATA_ENGINEER_SKILLS).length,
};
