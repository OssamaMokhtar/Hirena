import type { Skill, CompetencyArea, ProficiencyLevel, CareerLadderStep } from "@/types";

/**
 * Data Engineer Competency Model
 * Covers data pipelines, ETL/ELT, data warehousing, big data technologies, data architecture, streaming, data quality.
 * 28 skills across 6 competency areas.
 */

export const SKILLS: Record<string, Skill> = {
  // ── Data Pipelines & Orchestration ──────────────────────────────────────
  "etl-concepts": {
    id: "etl-concepts",
    name: "ETL/ELT Concepts & Patterns",
    description: "Understanding ETL/ELT: extraction, transformation, loading; batch vs streaming architectures; data integration patterns; idempotency; data quality; slowly changing dimensions; star/snowflake schemas.",
    category: "pipelines",
    level: 0,
  },
  "pipeline-orchestration": {
    id: "pipeline-orchestration",
    name: "Pipeline Orchestration (Airflow/Dagster/Prefect)",
    description: "Orchestrating data pipelines: DAGs, scheduling, dependencies, retries, backfills, monitoring, alerting. Writing effective DAGs, managing task dependencies, handling failures gracefully, dynamic pipeline generation.",
    category: "pipelines",
    level: 0,
  },
  "workflow-management": {
    id: "workflow-management",
    name: "Workflow Management & Scheduling",
    description: "Managing data workflows at scale: cron-based scheduling, event-driven triggers, workflow prioritization, resource allocation, concurrency control, SLA management, workflow observability.",
    category: "pipelines",
    level: 0,
  },

  // ── Data Warehousing & Modeling ─────────────────────────────────────────
  "data-warehousing": {
    id: "data-warehousing",
    name: "Data Warehousing (Snowflake/Redshift/BigQuery)",
    description: "Cloud data warehouse concepts: columnar storage, query optimization, partitioning/clustering, warehouse sizing, cost management, data loading strategies (COPY, INSERT), query performance tuning.",
    category: "warehousing",
    level: 0,
  },
  "data-modeling": {
    id: "data-modeling",
    name: "Data Modeling (Dimensional, Normalization)",
    description: "Data modeling for analytics: star schema, snowflake schema, fact/dimension tables, slowly changing dimensions (SCD types 1-3), normalization vs denormalization, data vault, one-big-table approaches.",
    category: "warehousing",
    level: 0,
  },
  "dbt": {
    id: "dbt",
    name: "dbt (data build tool)",
    description: "Using dbt for transformation: modeling with SELECT statements, materializations (table, view, incremental, ephemeral), tests (unique, not_null, relationships, custom), documentation, snapshots, macros, jinja templating, dbt projects and modularity.",
    category: "warehousing",
    level: 0,
  },

  // ── Big Data & Distributed Processing ───────────────────────────────────
  "spark": {
    id: "spark",
    name: "Apache Spark",
    description: "Distributed data processing with Spark: RDDs, DataFrames, Spark SQL, transformations vs actions, caching, partitioning, aggregations, joins at scale, Spark Cluster (standalone, YARN, K8s), PySpark, performance tuning.",
    category: "big-data",
    level: 0,
  },
  "hadoop-ecosystem": {
    id: "hadoop-ecosystem",
    name: "Hadoop Ecosystem (HDFS, MapReduce, Hive)",
    description: "Understanding Hadoop ecosystem: HDFS architecture, MapReduce programming model, Hive for SQL-on-Hadoop, HBase, YARN resource management, when to use Hadoop vs modern cloud data platforms.",
    category: "big-data",
    level: 0,
  },
  "stream-processing": {
    id: "stream-processing",
    name: "Stream Processing (Kafka, Kinesis, Flink)",
    description: "Real-time data processing: Kafka architecture (producers, consumers, topics, partitions, consumer groups), stream processing concepts (windowing, watermarks, exactly-once semantics), Kinesis, Flink fundamentals.",
    category: "big-data",
    level: 0,
  },

  // ── Programming for Data Engineering ────────────────────────────────────
  "python-data-engineering": {
    id: "python-data-engineering",
    name: "Python for Data Engineering",
    description: "Python for building data pipelines: writing robust scripts, using libraries (pandas, pyarrow, boto3), connecting to APIs and databases, error handling, logging, testing data pipelines, packaging and deployment.",
    category: "programming",
    level: 0,
  },
  "scala-big-data": {
    id: "scala-big-data",
    name: "Scala for Big Data (Spark/Scala)",
    description: "Scala for Spark development: functional programming basics, case classes, pattern matching, Spark's Scala API, type safety, performance considerations, building reusable Spark libraries.",
    category: "programming",
    level: 0,
  },
  "sql-advanced-de": {
    id: "sql-advanced-de",
    name: "Advanced SQL for Data Engineering",
    description: "SQL at scale: window functions, CTEs, complex joins, query optimization, execution plans, UDFs, stored procedures, working with semi-structured data (JSON), query performance analysis.",
    category: "programming",
    level: 0,
  },

  // ── Data Architecture & Infrastructure ──────────────────────────────────
  "data-architecture": {
    id: "data-architecture",
    name: "Data Architecture & Strategy",
    description: "Designing data architectures: data lakes vs warehouses vs lakehouses, medallion architecture (bronze/silver/gold), lambda vs kappa architecture, data mesh concepts, data fabric, choosing the right architecture for the use case.",
    category: "architecture",
    level: 0,
  },
  "data-governance": {
    id: "data-governance",
    name: "Data Governance & Quality",
    description: "Data governance practices: data cataloging, metadata management, data lineage, data quality frameworks (completeness, accuracy, timeliness, consistency), data stewardship, access control, privacy/compliance (GDPR, CCPA).",
    category: "architecture",
    level: 0,
  },
  "data-infrastructure": {
    id: "data-infrastructure",
    name: "Data Infrastructure & Cloud Services",
    description: "Cloud data infrastructure: storage (S3, GCS, Azure Data Lake), compute (EMR, Databricks, Dataflow), serverless data services, infrastructure as code for data platforms, networking for data, cost optimization.",
    category: "architecture",
    level: 0,
  },

  // ── Data Quality & Testing ──────────────────────────────────────────────
  "data-quality-testing": {
    id: "data-quality-testing",
    name: "Data Quality Testing & Validation",
    description: "Testing data pipelines and data quality: unit testing for data transformations, integration testing, data quality rules (schema validation, record counts, value ranges, referential integrity), automated data quality monitoring, anomaly detection.",
    category: "quality",
    level: 0,
  },
  "data-lineage": {
    id: "data-lineage",
    name: "Data Lineage & Observability",
    description: "Tracking data lineage: where data comes from, how it transforms, where it goes. Using lineage for impact analysis, debugging, compliance, and trust. Tools and approaches for capturing and visualizing lineage.",
    category: "quality",
    level: 0,
  },

  // ── APIs & Data Integration ─────────────────────────────────────────────
  "api-integration": {
    id: "api-integration",
    name: "API Integration & Data Ingestion",
    description: "Ingesting data from APIs: REST APIs, GraphQL, pagination, rate limiting, authentication (OAuth, API keys), webhooks, batch vs streaming ingestion, incremental loading, handling API changes.",
    category: "integration",
    level: 0,
  },
  "file-formats": {
    id: "file-formats",
    name: "Data File Formats & Serialization",
    description: "Working with data file formats: CSV, JSON, Parquet, Avro, ORC, Protobuf. Choosing the right format for the use case (columnar vs row-based, compression, schema evolution), reading/writing efficiently.",
    category: "integration",
    level: 0,
  },
  "messaging-systems": {
    id: "messaging-systems",
    name: "Messaging & Event Systems",
    description: "Message queues and event buses: Kafka, RabbitMQ, AWS SQS/SNS, Google Pub/Sub. Understanding pub/sub vs queue patterns, at-least-once vs exactly-once delivery, message formatting, dead letter queues.",
    category: "integration",
    level: 0,
  },

  // ── Soft Skills for Data Engineering ────────────────────────────────────
  "collaboration-de": {
    id: "collaboration-de",
    name: "Cross-functional Collaboration",
    description: "Working with data analysts, data scientists, software engineers, and business stakeholders. Understanding their needs, communicating technical constraints, negotiating priorities, building shared understanding of data.",
    category: "collaboration",
    level: 0,
  },
  "documentation-de": {
    id: "documentation-de",
    name: "Documentation & Knowledge Sharing",
    description: "Creating and maintaining documentation for data pipelines, data models, architecture decisions, and operational procedures. Sharing knowledge through tech talks, wiki pages, runbooks, and code review.",
    category: "collaboration",
    level: 0,
  },
};

export const COMPETENCY_AREAS: CompetencyArea[] = [
  {
    id: "pipelines",
    name: "Data Pipelines & Orchestration",
    description: "Building, orchestrating, and operating data pipelines — the core of data engineering.",
    skills: ["etl-concepts", "pipeline-orchestration", "workflow-management"],
    weight: 25,
  },
  {
    id: "warehousing",
    name: "Data Warehousing & Modeling",
    description: "Designing and implementing data warehouses, dimensional models, and dbt transformations for analytics.",
    skills: ["data-warehousing", "data-modeling", "dbt"],
    weight: 22,
  },
  {
    id: "big-data",
    name: "Big Data & Distributed Processing",
    description: "Apache Spark, Hadoop ecosystem, and stream processing for large-scale data workloads.",
    skills: ["spark", "hadoop-ecosystem", "stream-processing"],
    weight: 22,
  },
  {
    id: "programming",
    name: "Programming for Data Engineering",
    description: "Python, Scala, and advanced SQL for building robust, scalable data engineering solutions.",
    skills: ["python-data-engineering", "scala-big-data", "sql-advanced-de"],
    weight: 20,
  },
  {
    id: "architecture",
    name: "Data Architecture & Infrastructure",
    description: "Data architecture strategy, governance, and cloud infrastructure for data platforms.",
    skills: ["data-architecture", "data-governance", "data-infrastructure"],
    weight: 20,
  },
  {
    id: "quality",
    name: "Data Quality & Observability",
    description: "Testing, validation, lineage, and monitoring to ensure data is trustworthy and reliable.",
    skills: ["data-quality-testing", "data-lineage"],
    weight: 15,
  },
  {
    id: "integration",
    name: "Data Integration & Ingestion",
    description: "Connecting to APIs, managing file formats, and using messaging systems to ingest data from diverse sources.",
    skills: ["api-integration", "file-formats", "messaging-systems"],
    weight: 18,
  },
  {
    id: "collaboration",
    name: "Collaboration & Communication",
    description: "Working effectively with cross-functional teams and sharing knowledge across the data organization.",
    skills: ["collaboration-de", "documentation-de"],
    weight: 12,
  },
];

export const LEVELS: ProficiencyLevel[] = [0, 1, 2, 3, 4, 5, 6, 7];

export const CAREER_LADDER: CareerLadderStep[] = [
  {
    title: "Junior Data Engineer",
    minLevel: 0,
    typicalYearsOfExperience: "0-2 years",
    description: "Entry-level data engineer. Works on data pipeline components under guidance. Learns SQL, Python, and one orchestration tool. Understands data modeling basics.",
  },
  {
    title: "Data Engineer",
    minLevel: 2,
    typicalYearsOfExperience: "2-4 years",
    description: "Core data engineer. Builds and maintains data pipelines independently, works with warehouses and dbt, writes efficient SQL and Python, and collaborates with analysts and scientists.",
  },
  {
    title: "Senior Data Engineer",
    minLevel: 3,
    typicalYearsOfExperience: "4-7 years",
    description: "Senior data engineer. Designs pipeline architectures, optimizes performance at scale, mentors juniors, leads complex migrations, and makes architecture decisions for data infrastructure.",
  },
  {
    title: "Lead Data Engineer",
    minLevel: 4,
    typicalYearsOfExperience: "6-8 years",
    description: "Technical lead for data engineering. Owns the data platform roadmap, sets engineering standards, manages incidents, leads major initiatives, and ensures data quality and reliability across the organization.",
  },
  {
    title: "Principal Data Engineer",
    minLevel: 5,
    typicalYearsOfExperience: "8+ years",
    description: "Principal-level data engineer. Solves the hardest data engineering problems, defines architecture strategy, evaluates and introduces new technologies, and is the go-to expert for distributed data systems.",
  },
  {
    title: "Data Architect",
    minLevel: 5,
    typicalYearsOfExperience: "8+ years",
    description: "Architect-level role focused on data architecture. Designs enterprise data platforms, evaluates build-vs-buy decisions, sets data governance and quality standards, and aligns data strategy with business objectives.",
  },
  {
    title: "Director of Data Engineering",
    minLevel: 2,
    typicalYearsOfExperience: "10+ years",
    description: "Leads the data engineering organization. Sets strategy, manages teams and budgets, drives data culture, and ensures data infrastructure supports the organization's analytical and ML needs at scale.",
  },
];

export const SKILL_COUNT = Object.keys(SKILLS).length;
export const PILLAR_COUNT = COMPETENCY_AREAS.length;
