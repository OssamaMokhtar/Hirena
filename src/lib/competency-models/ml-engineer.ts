import type { Skill, ProficiencyLevel, CompetencyArea, CareerLadderStep } from '@/types';

export const SKILLS: Record<string, Skill> = {
  // ML Fundamentals & Algorithms
  'ml-algorithms-theory': {
    id: 'ml-algorithms-theory', name: 'ML Algorithms & Theory',
    description: 'Deep understanding of ML algorithms: linear/logistic regression, decision trees, random forests, gradient boosting, SVMs, k-means, PCA, neural networks. Algorithm selection, bias-variance tradeoff, computational complexity.',
    category: 'ml-theory-algorithms', level: 0,
  },
  'optimization-convex-optimization': {
    id: 'optimization-convex-optimization', name: 'Optimization & Convex Optimization',
    description: 'Gradient descent variants, convex optimization, Lagrange multipliers, constrained optimization, stochastic optimization, Adam/ADAMW, learning rate scheduling, convergence analysis.',
    category: 'ml-theory-algorithms', level: 0,
  },
  'probability-stats-ml': {
    id: 'probability-stats-ml', name: 'Probability & Statistics for ML',
    description: 'Probability distributions, Bayesian inference, maximum likelihood estimation, information theory (entropy, KL divergence), statistical testing for ML, uncertainty quantification.',
    category: 'ml-theory-algorithms', level: 0,
  },
  // Deep Learning Engineering
  'deep-learning-engineering': {
    id: 'deep-learning-engineering', name: 'Deep Learning Engineering',
    description: 'Building and training deep learning models at scale: efficient data pipelines, mixed precision training, gradient accumulation, distributed training (data parallel, model parallel), profiling and optimization.',
    category: 'deep-learning-engineering', level: 0,
  },
  'model-architecture-design': {
    id: 'model-architecture-design', name: 'Model Architecture Design',
    description: 'Designing custom neural network architectures, understanding architectural tradeoffs, modifying existing architectures, efficient architectures (MobileNet, EfficientNet), architecture search basics.',
    category: 'deep-learning-engineering', level: 0,
  },
  'transfer-learning-finetuning': {
    id: 'transfer-learning-finetuning', name: 'Transfer Learning & Fine-tuning',
    description: 'Using pretrained models, fine-tuning strategies, domain adaptation, few-shot learning, prompt engineering for LLMs, parameter-efficient fine-tuning (LoRA, adapters), transfer learning best practices.',
    category: 'deep-learning-engineering', level: 0,
  },
  // MLOps & Infrastructure
  'ml-deployment-production': {
    id: 'ml-deployment-production', name: 'ML Deployment & Productionization',
    description: 'Deploying ML models to production: REST/gRPC APIs, batch inference, real-time serving, model versioning, A/B testing for models, canary deployments for ML, model monitoring and observability.',
    category: 'mlops-infrastructure', level: 0,
  },
  'ml-pipelines-orchestration': {
    id: 'ml-pipelines-orchestration', name: 'ML Pipelines & Orchestration',
    description: 'Building ML pipelines with Airflow, Kubeflow, TensorFlow Extended, or MLflow. Pipeline design, feature engineering automation, training pipelines, evaluation pipelines, deployment automation.',
    category: 'mlops-infrastructure', level: 0,
  },
  'feature-stores': {
    id: 'feature-stores', name: 'Feature Stores & Data Management for ML',
    description: 'Feature store concepts (Feast, Tecton), feature engineering at scale, point-in-time correctness, feature validation, training-serving skew prevention, data versioning for ML (DVC).',
    category: 'mlops-infrastructure', level: 0,
  },
  'model-monitoring-observability': {
    id: 'model-monitoring-observability', name: 'Model Monitoring & Observability',
    description: 'Monitoring ML models in production: data drift detection, concept drift, performance degradation, model fairness monitoring, explainability monitoring, alerting strategies, model retraining triggers.',
    category: 'mlops-infrastructure', level: 0,
  },
  'ml-infrastructure-cloud': {
    id: 'ml-infrastructure-cloud', name: 'ML Infrastructure & Cloud',
    description: 'Cloud ML services ( SageMaker, Vertex AI, Azure ML), GPU/TPU provisioning, ML infrastructure cost optimization, containerized ML workloads, Kubernetes for ML, infrastructure as code for ML.',
    category: 'mlops-infrastructure', level: 0,
  },
  // Software Engineering
  'ml-software-engineering': {
    id: 'ml-software-engineering', name: 'ML Software Engineering',
    description: 'Software engineering best practices for ML: code quality, testing (unit, integration, ML-specific tests), code review, version control, CI/CD for ML, modular ML code, documentation, reproducibility.',
    category: 'software-engineering', level: 0,
  },
  'api-design-ml-services': {
    id: 'api-design-ml-services', name: 'API Design for ML Services',
    description: 'Designing APIs for ML models: REST API design, gRPC, request/response schemas, batching strategies, latency optimization, rate limiting, authentication/authorization for ML services.',
    category: 'software-engineering', level: 0,
  },
  'testing-ml-systems': {
    id: 'testing-ml-systems', name: 'Testing ML Systems',
    description: 'Testing strategies for ML: unit testing ML code, integration testing pipelines, data validation tests, model performance tests, testing data drift, shadow mode testing, canary analysis.',
    category: 'software-engineering', level: 0,
  },
  // Data Engineering for ML
  'data-pipelines-ml': {
    id: 'data-pipelines-ml', name: 'Data Pipelines for ML',
    description: 'Building data pipelines for ML workloads: data ingestion, transformation, feature computation, handling streaming and batch data, real-time feature computation, data quality checks for ML pipelines.',
    category: 'data-engineering-ml', level: 0,
  },
  'vector-databases-embeddings': {
    id: 'vector-databases-embeddings', name: 'Vector Databases & Embeddings',
    description: 'Vector database usage (Pinecone, Weaviate, Milvus, pgvector), embedding generation and storage, similarity search, vector indexing, embedding-based retrieval, building RAG pipelines.',
    category: 'data-engineering-ml', level: 0,
  },
  // Advanced
  'llm-engineering': {
    id: 'llm-engineering', name: 'LLM Engineering & Applications',
    description: 'Building applications with large language models: prompt engineering, RAG systems, function calling, agents, fine-tuning LLMs, LLM evaluation, cost optimization, latency management, responsible LLM use.',
    category: 'advanced-specializations', level: 0,
  },
  'computer-vision-engineering': {
    id: 'computer-vision-engineering', name: 'Computer Vision Engineering',
    description: 'Image processing, object detection, image segmentation, vision transformers, video analysis, OCR, multi-modal models, deploying CV models, CV-specific optimization and augmentation.',
    category: 'advanced-specializations', level: 0,
  },
  'nlp-engineering': {
    id: 'nlp-engineering', name: 'NLP Engineering',
    description: 'Text processing at scale, text classification, NER, sentiment analysis, language models, information extraction, question answering systems, chatbot engineering, text generation systems.',
    category: 'advanced-specializations', level: 0,
  },
  'ml-research-reading': {
    id: 'ml-research-reading', name: 'ML Research Reading & Application',
    description: 'Reading and understanding ML research papers, reproducing results, applying research to production problems, staying current with ML advances, critical evaluation of new methods.',
    category: 'advanced-specializations', level: 0,
  },
};

export const COMPETENCY_AREAS: CompetencyArea[] = [
  { id: 'ml-theory-algorithms', name: 'ML Theory & Algorithms', description: 'ML algorithms, optimization, probability and statistics for ML', skills: ['ml-algorithms-theory', 'optimization-convex-optimization', 'probability-stats-ml'], weight: 18 },
  { id: 'deep-learning-engineering', name: 'Deep Learning Engineering', description: 'Deep learning at scale, model architecture, transfer learning, fine-tuning', skills: ['deep-learning-engineering', 'model-architecture-design', 'transfer-learning-finetuning'], weight: 20 },
  { id: 'mlops-infrastructure', name: 'MLOps & Infrastructure', description: 'ML deployment, pipelines, feature stores, monitoring, cloud ML infrastructure', skills: ['ml-deployment-production', 'ml-pipelines-orchestration', 'feature-stores', 'model-monitoring-observability', 'ml-infrastructure-cloud'], weight: 24 },
  { id: 'software-engineering', name: 'Software Engineering for ML', description: 'ML code quality, API design, testing ML systems, CI/CD for ML', skills: ['ml-software-engineering', 'api-design-ml-services', 'testing-ml-systems'], weight: 16 },
  { id: 'data-engineering-ml', name: 'Data Engineering for ML', description: 'Data pipelines for ML, vector databases, embeddings, feature computation', skills: ['data-pipelines-ml', 'vector-databases-embeddings'], weight: 12 },
  { id: 'advanced-specializations', name: 'Advanced Specializations', description: 'LLMs, computer vision, NLP, ML research reading', skills: ['llm-engineering', 'computer-vision-engineering', 'nlp-engineering', 'ml-research-reading'], weight: 10 },
];

export const LEVELS: ProficiencyLevel[] = [0, 1, 2, 3, 4, 5, 6, 7];

export const CAREER_LADDER: CareerLadderStep[] = [
  { title: 'Junior ML Engineer', minLevel: 0, expected: { 'ml-theory-algorithms': 1, 'deep-learning-engineering': 1, 'mlops-infrastructure': 1, 'software-engineering': 1, 'data-engineering-ml': 1, 'advanced-specializations': 0 }, description: 'Entry-level. Building ML models under guidance. Learning deployment basics. Writing clean ML code. Assisting with data pipelines and feature engineering.' },
  { title: 'ML Engineer', minLevel: 2, expected: { 'ml-theory-algorithms': 2, 'deep-learning-engineering': 2, 'mlops-infrastructure': 2, 'software-engineering': 2, 'data-engineering-ml': 2, 'advanced-specializations': 0 }, description: 'Core role. Building and deploying ML models independently. Writing production ML code. Building ML pipelines. Understanding MLOps fundamentals. SQL and Python proficiency.' },
  { title: 'Senior ML Engineer', minLevel: 3, expected: { 'ml-theory-algorithms': 3, 'deep-learning-engineering': 3, 'mlops-infrastructure': 3, 'software-engineering': 3, 'data-engineering-ml': 3, 'advanced-specializations': 1 }, description: 'Operates independently. Deploying complex ML systems to production. Designing ML architectures. Building scalable ML infrastructure. Mentoring juniors. Strong software engineering practices.' },
  { title: 'Lead ML Engineer / ML Tech Lead', minLevel: 4, expected: { 'ml-theory-algorithms': 3, 'deep-learning-engineering': 4, 'mlops-infrastructure': 4, 'software-engineering': 4, 'data-engineering-ml': 4, 'advanced-specializations': 2 }, description: 'Leading ML engineering for a domain/product area. Setting ML engineering standards. Driving ML infrastructure decisions. Technical leadership across ML team. Stakeholder management.' },
  { title: 'Principal ML Engineer', minLevel: 5, expected: { 'ml-theory-algorithms': 4, 'deep-learning-engineering': 5, 'mlops-infrastructure': 5, 'software-engineering': 5, 'data-engineering-ml': 5, 'advanced-specializations': 3 }, description: 'Senior ML leader across organization. Solving highest-complexity ML engineering problems. Driving ML platform strategy. Setting technical direction. Recognized expert in ML engineering and MLOps.' },
  { title: 'ML Engineering Manager / Head of ML Engineering', minLevel: 5, expected: { 'ml-theory-algorithms': 3, 'deep-learning-engineering': 4, 'mlops-infrastructure': 4, 'software-engineering': 4, 'data-engineering-ml': 4, 'advanced-specializations': 3 }, description: 'Managing ML engineering team. Hiring and developing ML engineers. Setting ML engineering roadmap. Managing stakeholder expectations. Balancing technical work with people leadership.' },
  { title: 'Director of ML Engineering / Head of AI', minLevel: 6, expected: { 'ml-theory-algorithms': 3, 'deep-learning-engineering': 4, 'mlops-infrastructure': 5, 'software-engineering': 4, 'data-engineering-ml': 4, 'advanced-specializations': 3 }, description: 'Leading ML/AI engineering organization. Setting ML strategy aligned with business goals. Managing ML teams and budgets. Executive stakeholder relationships. Building ML capabilities across organization.' },
  { title: 'VP of AI / Chief AI Officer', minLevel: 6, expected: { 'ml-theory-algorithms': 2, 'deep-learning-engineering': 3, 'mlops-infrastructure': 5, 'software-engineering': 3, 'data-engineering-ml': 3, 'advanced-specializations': 4 }, description: 'Executive leadership for AI and ML. Enterprise-wide AI vision and strategy. Building AI capabilities across organization. Board-level strategic support on AI and ML initiatives.' },
];

export const SKILL_COUNT = Object.keys(SKILLS).length;
export const PILLAR_COUNT = COMPETENCY_AREAS.length;
