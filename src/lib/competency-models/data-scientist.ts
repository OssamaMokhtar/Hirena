import type { Skill, ProficiencyLevel, CompetencyArea, CareerLadderStep } from '@/types';

export const SKILLS: Record<string, Skill> = {
  // Statistics & Probability
  'probability-theory': {
    id: 'probability-theory', name: 'Probability Theory',
    description: 'Probability distributions (normal, binomial, Poisson, exponential, uniform), Bayes\' theorem, conditional probability, expectation, variance, covariance, law of large numbers, central limit theorem.',
    category: 'statistics-probability', level: 0,
  },
  'statistical-inference': {
    id: 'statistical-inference', name: 'Statistical Inference',
    description: 'Hypothesis testing, p-values, confidence intervals, type I/II errors, statistical power, sample size determination, t-tests, ANOVA, chi-square tests, nonparametric tests, multiple testing correction.',
    category: 'statistics-probability', level: 0,
  },
  'regression-analysis': {
    id: 'regression-analysis', name: 'Regression Analysis',
    description: 'Linear regression, multiple regression, logistic regression, regularization (Ridge, Lasso), model diagnostics (R-squared, residuals, multicollinearity), interaction terms, polynomial regression.',
    category: 'statistics-probability', level: 0,
  },
  'experimental-design': {
    id: 'experimental-design', name: 'Experimental Design & A/B Testing',
    description: 'A/B test design, hypothesis formulation, test duration calculation, statistical significance vs. practical significance, sequential testing, multi-armed bandits, test analysis and interpretation.',
    category: 'statistics-probability', level: 0,
  },
  // Machine Learning
  'supervised-learning': {
    id: 'supervised-learning', name: 'Supervised Learning',
    description: 'Classification and regression algorithms: decision trees, random forests, gradient boosting (XGBoost, LightGBM), SVM, k-NN, naive Bayes, linear/logistic regression, model evaluation metrics.',
    category: 'machine-learning', level: 0,
  },
  'unsupervised-learning': {
    id: 'unsupervised-learning', name: 'Unsupervised Learning',
    description: 'Clustering (k-means, hierarchical, DBSCAN, Gaussian mixture models), dimensionality reduction (PCA, t-SNE, UMAP), anomaly detection, association rules, latent variable models.',
    category: 'machine-learning', level: 0,
  },
  'feature-engineering': {
    id: 'feature-engineering', name: 'Feature Engineering',
    description: 'Feature creation, transformation, encoding (one-hot, target encoding), feature selection, handling missing data, outlier treatment, feature scaling, polynomial features, domain-specific feature creation.',
    category: 'machine-learning', level: 0,
  },
  'model-evaluation-optimization': {
    id: 'model-evaluation-optimization', name: 'Model Evaluation & Optimization',
    description: 'Cross-validation, evaluation metrics (accuracy, precision, recall, F1, ROC-AUC, PR-AUC, MSE, MAE, RMSE, log loss), hyperparameter tuning (grid search, random search, Bayesian optimization), model selection.',
    category: 'machine-learning', level: 0,
  },
  'ensemble-methods': {
    id: 'ensemble-methods', name: 'Ensemble Methods',
    description: 'Bagging, boosting, stacking, voting ensembles, model combination strategies, bias-variance tradeoff, Random Forest internals, gradient boosting mechanics, XGBoost/LightGBM/CatBoost.',
    category: 'machine-learning', level: 0,
  },
  // Deep Learning
  'neural-networks-basics': {
    id: 'neural-networks-basics', name: 'Neural Networks Fundamentals',
    description: 'Perceptron, multilayer perceptron, activation functions (ReLU, sigmoid, tanh, softmax), backpropagation, gradient descent variants (SGD, Adam, RMSProp), loss functions, regularization (dropout, L1/L2).',
    category: 'deep-learning', level: 0,
  },
  'deep-learning-frameworks': {
    id: 'deep-learning-frameworks', name: 'Deep Learning Frameworks',
    description: 'PyTorch or TensorFlow proficiency: tensor operations, autograd, building models, training loops, data loaders, model saving/loading, GPU utilization, debugging neural networks.',
    category: 'deep-learning', level: 0,
  },
  'cnns': {
    id: 'cnns', name: 'Convolutional Neural Networks',
    description: 'CNN architectures (LeNet, AlexNet, VGG, ResNet, Inception), convolution operations, pooling, batch normalization, transfer learning, data augmentation, image classification, object detection basics.',
    category: 'deep-learning', level: 0,
  },
  'rnn-transformers': {
    id: 'rnn-transformers', name: 'RNNs, LSTMs & Transformers',
    description: 'Recurrent neural networks, LSTM/GRU, sequence modeling, attention mechanism, transformer architecture (self-attention, positional encoding), encoder-decoder, BERT/GPT fundamentals, HuggingFace.',
    category: 'deep-learning', level: 0,
  },
  // Data Processing & Engineering
  'data-cleaning-preprocessing': {
    id: 'data-cleaning-preprocessing', name: 'Data Cleaning & Preprocessing',
    description: 'Handling missing data, outlier detection and treatment, data validation, data quality assessment, deduplication, type conversion, string manipulation, date/time handling, robust data pipelines.',
    category: 'data-engineering', level: 0,
  },
  'sql-advanced-data-science': {
    id: 'sql-advanced-data-science', name: 'Advanced SQL for Data Science',
    description: 'Complex SQL: CTEs, window functions, subqueries, joins, aggregations, query optimization, statistical functions in SQL, data extraction for analysis, working with large datasets.',
    category: 'data-engineering', level: 0,
  },
  'python-data-ecosystem': {
    id: 'python-data-ecosystem', name: 'Python Data Ecosystem',
    description: 'Pandas (DataFrames, groupby, merging, time series), NumPy (array operations, broadcasting), data visualization (Matplotlib, Seaborn, Plotly), scikit-learn, data pipeline construction.',
    category: 'data-engineering', level: 0,
  },
  'big-data-tools': {
    id: 'big-data-tools', name: 'Big Data Tools',
    description: 'Spark (PySpark), Hadoop ecosystem basics, distributed computing concepts, handling large datasets, cluster computing, Spark SQL, DataFrame API, RDDs, optimization for large-scale data processing.',
    category: 'data-engineering', level: 0,
  },
  // Data Visualization
  'data-visualization-storytelling': {
    id: 'data-visualization-storytelling', name: 'Data Visualization & Storytelling',
    description: 'Visualization principles, chart selection, visual encoding, avoiding misleading visualizations, creating effective dashboards, data storytelling, communication of insights, ggplot2 or equivalent.',
    category: 'visualization-communication', level: 0,
  },
  'dashboard-creation': {
    id: 'dashboard-creation', name: 'Dashboard & Report Creation',
    description: 'Building interactive dashboards (Tableau, Power BI, Streamlit, Dash), report automation, KPI tracking, stakeholder-facing visualizations, communicating data insights to non-technical audiences.',
    category: 'visualization-communication', level: 0,
  },
  // MLOps & Deployment
  'model-deployment': {
    id: 'model-deployment', name: 'Model Deployment',
    description: 'Model serialization (pickle, joblib, ONNX), API deployment (FastAPI, Flask), containerization for ML, model serving, batch vs. real-time inference, model versioning, deployment patterns.',
    category: 'mlops-deployment', level: 0,
  },
  'ml-pipelines': {
    id: 'ml-pipelines', name: 'ML Pipelines & Workflow Automation',
    description: 'ML pipeline construction (scikit-learn pipelines, Kubeflow, Airflow), feature stores, automated retraining, CI/CD for ML, pipeline monitoring, data drift detection, model registry.',
    category: 'mlops-deployment', level: 0,
  },
  // Advanced
  'nlp-fundamentals': {
    id: 'nlp-fundamentals', name: 'NLP Fundamentals',
    description: 'Text preprocessing, tokenization, stemming/lemmatization, TF-IDF, word embeddings (Word2Vec, GloVe), text classification, sentiment analysis, named entity recognition, topic modeling.',
    category: 'advanced-specializations', level: 0,
  },
  'time-series-analysis': {
    id: 'time-series-analysis', name: 'Time Series Analysis',
    description: 'Time series decomposition, stationarity, autocorrelation, ARIMA/SARIMA, exponential smoothing, Prophet, forecasting techniques, time series cross-validation, handling seasonality and trends.',
    category: 'advanced-specializations', level: 0,
  },
  'reinforcement-learning-basics': {
    id: 'reinforcement-learning-basics', name: 'Reinforcement Learning Basics',
    description: 'MDPs, Bellman equations, Q-learning, SARSA, policy gradients, DQN, exploration vs. exploitation, reward design, RL environments, basic RL applications.',
    category: 'advanced-specializations', level: 0,
  },
};

export const COMPETENCY_AREAS: CompetencyArea[] = [
  { id: 'statistics-probability', name: 'Statistics & Probability', description: 'Probability theory, statistical inference, regression, experimental design, A/B testing', skills: ['probability-theory', 'statistical-inference', 'regression-analysis', 'experimental-design'], weight: 22 },
  { id: 'machine-learning', name: 'Machine Learning', description: 'Supervised/unsupervised learning, feature engineering, model evaluation, ensemble methods', skills: ['supervised-learning', 'unsupervised-learning', 'feature-engineering', 'model-evaluation-optimization', 'ensemble-methods'], weight: 26 },
  { id: 'deep-learning', name: 'Deep Learning', description: 'Neural networks, frameworks, CNNs, RNNs, transformers', skills: ['neural-networks-basics', 'deep-learning-frameworks', 'cnns', 'rnn-transformers'], weight: 18 },
  { id: 'data-engineering', name: 'Data Engineering & Processing', description: 'Data cleaning, SQL, Python ecosystem, big data tools', skills: ['data-cleaning-preprocessing', 'sql-advanced-data-science', 'python-data-ecosystem', 'big-data-tools'], weight: 14 },
  { id: 'visualization-communication', name: 'Visualization & Communication', description: 'Data visualization, storytelling, dashboard creation, stakeholder communication', skills: ['data-visualization-storytelling', 'dashboard-creation'], weight: 10 },
  { id: 'mlops-deployment', name: 'MLOps & Deployment', description: 'Model deployment, ML pipelines, workflow automation, model monitoring', skills: ['model-deployment', 'ml-pipelines'], weight: 8 },
  { id: 'advanced-specializations', name: 'Advanced Specializations', description: 'NLP, time series analysis, reinforcement learning', skills: ['nlp-fundamentals', 'time-series-analysis', 'reinforcement-learning-basics'], weight: 2 },
];

export const LEVELS: ProficiencyLevel[] = [0, 1, 2, 3, 4, 5, 6, 7];

export const CAREER_LADDER: CareerLadderStep[] = [
  { title: 'Junior Data Scientist', minLevel: 0, expected: { 'statistics-probability': 1, 'machine-learning': 1, 'deep-learning': 0, 'data-engineering': 1, 'visualization-communication': 1, 'mlops-deployment': 0, 'advanced-specializations': 0 }, description: 'Entry-level. Assisting with data analysis and model building under guidance. Learning statistics and ML fundamentals. Writing basic SQL and Python scripts.' },
  { title: 'Data Scientist', minLevel: 2, expected: { 'statistics-probability': 2, 'machine-learning': 2, 'deep-learning': 0, 'data-engineering': 2, 'visualization-communication': 2, 'mlops-deployment': 1, 'advanced-specializations': 0 }, description: 'Core role. Building and evaluating ML models independently. Conducting statistical analysis. Creating visualizations and reports. Deploying simple models. SQL and Python proficiency.' },
  { title: 'Senior Data Scientist', minLevel: 3, expected: { 'statistics-probability': 3, 'machine-learning': 3, 'deep-learning': 1, 'data-engineering': 3, 'visualization-communication': 3, 'mlops-deployment': 2, 'advanced-specializations': 1 }, description: 'Operates independently. Solving complex data problems. Designing and implementing advanced ML solutions. Deploying models to production. Mentoring juniors. Strong statistical and ML expertise.' },
  { title: 'Lead Data Scientist / Data Science Lead', minLevel: 4, expected: { 'statistics-probability': 3, 'machine-learning': 4, 'deep-learning': 2, 'data-engineering': 4, 'visualization-communication': 4, 'mlops-deployment': 3, 'advanced-specializations': 2 }, description: 'Leading data science for a domain/product area. Setting DS standards. Driving ML strategy. Coordinating model deployment. Stakeholder management. Technical leadership across DS team.' },
  { title: 'Principal Data Scientist', minLevel: 5, expected: { 'statistics-probability': 4, 'machine-learning': 5, 'deep-learning': 3, 'data-engineering': 4, 'visualization-communication': 4, 'mlops-deployment': 4, 'advanced-specializations': 3 }, description: 'Senior data science leader across organization. Driving ML innovation. Solving highest-complexity problems. Setting technical direction. Recognized expert in ML and data science.' },
  { title: 'Data Science Manager / Head of Data Science', minLevel: 5, expected: { 'statistics-probability': 3, 'machine-learning': 4, 'deep-learning': 2, 'data-engineering': 3, 'visualization-communication': 4, 'mlops-deployment': 4, 'advanced-specializations': 3 }, description: 'Managing data science team. Hiring and developing data scientists. Setting DS roadmap. Managing stakeholder expectations. Balancing technical work with people leadership.' },
  { title: 'Director of Data Science', minLevel: 6, expected: { 'statistics-probability': 3, 'machine-learning': 4, 'deep-learning': 2, 'data-engineering': 3, 'visualization-communication': 4, 'mlops-deployment': 4, 'advanced-specializations': 3 }, description: 'Leading data science organization. Setting DS strategy aligned with business goals. Managing DS teams and budgets. Executive stakeholder relationships. Building data-driven culture.' },
  { title: 'VP of Data Science / Chief Data Officer', minLevel: 6, expected: { 'statistics-probability': 2, 'machine-learning': 3, 'deep-learning': 1, 'data-engineering': 2, 'visualization-communication': 5, 'mlops-deployment': 3, 'advanced-specializations': 2 }, description: 'Executive leadership for data science and data strategy. Enterprise-wide data vision. Building data capabilities across organization. Board-level strategic support on data and AI.' },
];

export const SKILL_COUNT = Object.keys(SKILLS).length;
export const PILLAR_COUNT = COMPETENCY_AREAS.length;
