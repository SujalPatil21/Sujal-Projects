const fs = require('fs');

const projects = [
  {
    name: 'Geo-Watch',
    slug: 'geo-watch',
    category: 'Web Apps',
    github: 'https://github.com/SujalPatil21/Geo-Watch',
    live: 'https://geo-watch.pages.dev',
    docs: '/projects/geo-watch',
    stack: {
      frontend: ['React', 'Vite', 'Flutter'],
      backend: ['Spring Boot', 'Java'],
      database: ['PostgreSQL'],
      infrastructure: ['WebSockets', 'Docker']
    },
    overview: 'Geo-Watch is a real-time crowd safety platform designed to monitor public events using geo-fenced client incident reports and automated risk zone clustering. It leverages custom spatial partitioning algorithms to instantly identify and broadcast danger zones across thousands of concurrent clients.',
    problem: [
      'Event organizers lack real-time visibility into crowd safety incidents.',
      'Emergency updates are delayed by fragmented reporting systems.',
      'Analyzing large volumes of spatial incident data in real-time is computationally expensive.'
    ],
    solution: 'A decoupled geospatial architecture that ingests high-volume incident reports, calculates threat densities using a grid-optimized DBSCAN clustering algorithm, and broadcasts live risk heatmaps via WebSocket connections.',
    features: [
      { title: 'Real-Time Risk Clustering', description: 'Aggregates spatial incidents using DBSCAN to identify emerging threat zones instantly.' },
      { title: 'Geofenced Reporting', description: 'Ensures incident validity by mathematically verifying client locations against event boundaries.' },
      { title: 'Live WebSocket Broadcasts', description: 'Pushes localized risk updates to monitoring dashboards and mobile clients simultaneously.' },
      { title: 'Rate Limiting', description: 'Protects backend infrastructure from high-frequency reporting abuse using robust token-bucket strategies.' }
    ],
    architecture: {
      image: 'https://raw.githubusercontent.com/SujalPatil21/Geo-Watch/main/docs/assets/deployment_architecture.png',
      description: 'The platform uses a decoupled architecture. Mobile clients send geofenced HTTP requests to the Spring Boot REST API. Validated requests are written to PostgreSQL. An asynchronous, debounced worker thread pulls recent incidents, runs spatial clustering, and pushes the generated risk clusters to an in-memory STOMP broker, which broadcasts the updates to the React monitoring dashboard.',
      components: ['Flutter Client', 'React Dashboard', 'Spring Boot Engine', 'PostgreSQL PostGIS']
    },
    apis: [
      { method: 'GET', endpoint: '/api/events/nearby', purpose: 'Fetch active events within a specific geographic radius.' },
      { method: 'POST', endpoint: '/api/incidents', purpose: 'Ingest a new geo-tagged incident report from a client.' },
      { method: 'GET', endpoint: '/api/clusters/active', purpose: 'Retrieve the current live risk clusters for heatmap rendering.' }
    ],
    database: [
      { entity: 'Event', fields: ['id', 'name', 'boundary_polygon', 'active_status'] },
      { entity: 'Incident', fields: ['id', 'event_id', 'latitude', 'longitude', 'timestamp', 'severity'] }
    ],
    projectStructure: 'backend/\n  src/main/java/com/geowatch/\n    controllers/\n    services/\n    clustering/\n    entities/\nfrontend/\n  src/\n    components/\n    websocket/',
    screenshots: [
      'https://raw.githubusercontent.com/SujalPatil21/Geo-Watch/main/docs/assets/img2.png',
      'https://raw.githubusercontent.com/SujalPatil21/Geo-Watch/main/docs/assets/img3.png'
    ]
  },
  {
    name: 'AASHA',
    slug: 'aasha',
    category: 'Web Apps',
    github: 'https://github.com/SujalPatil21/AASHA',
    docs: '/projects/aasha',
    stack: {
      frontend: ['React PWA', 'TypeScript'],
      backend: ['Spring Boot', 'Python', 'FastAPI'],
      database: ['PostgreSQL'],
      infrastructure: ['IndexedDB', 'Service Workers']
    },
    overview: 'AASHA is an AI-assisted, offline-first health data platform engineered for rural health workers (ASHA). It captures unstructured voice or text observations, securely processes them into structured medical records locally, and applies rule-based risk engines to flag high-priority cases without requiring internet connectivity.',
    problem: [
      'Rural health workers operate in regions with zero or unreliable internet connectivity.',
      'Paper-based workflows delay critical reporting to Primary Health Centers (PHCs).',
      'High-risk patients are often overlooked due to unstructured data collection.'
    ],
    solution: 'An offline-first Progressive Web App (PWA) that stores data via IndexedDB. It uses local rule engines to instantly triage patients based on observed symptoms. When connectivity is restored, a robust sync manager safely transmits the encrypted data to the central Spring Boot server.',
    features: [
      { title: 'Offline-First Architecture', description: 'Full application functionality operates independently of network status using Service Workers and IndexedDB.' },
      { title: 'Rule-Based Risk Flagging', description: 'Transparent, deterministic algorithms flag critical health conditions without relying on black-box AI.' },
      { title: 'Automatic Synchronization', description: 'Conflict-resolving background sync automatically pushes pending records when networks become available.' },
      { title: 'Role-Based Dashboard', description: 'Provides filtered, prioritized views for ASHA workers, ANMs, and PHC doctors.' }
    ],
    architecture: {
      image: 'https://raw.githubusercontent.com/SujalPatil21/AASHA/main/screenshots/dashboard.png',
      description: 'A offline-first client architecture. The React PWA handles data entry and local risk assessment. Upon network recovery, it syncs with a Spring Boot API. An asynchronous Python NLP service processes legacy unstructured notes into structured fields, which are finally persisted in PostgreSQL for PHC dashboard retrieval.',
      components: []
    },
    apis: [
      { method: 'POST', endpoint: '/api/sync/batch', purpose: 'Process bulk offline records pushed from the PWA.' },
      { method: 'GET', endpoint: '/api/patients/high-risk', purpose: 'Retrieve prioritized patient cases for PHC doctors.' }
    ],
    database: [
      { entity: 'HealthRecord', fields: ['id', 'patient_id', 'symptoms', 'risk_level', 'sync_status'] },
      { entity: 'Patient', fields: ['id', 'demographics', 'village_id'] }
    ],
    projectStructure: 'frontend/\n  src/indexeddb/\n  src/sync/\nbackend/\n  src/main/java/\nai-service/\n  app.py',
    screenshots: [
      'https://raw.githubusercontent.com/SujalPatil21/AASHA/main/screenshots/dashboard.png',
      'https://raw.githubusercontent.com/SujalPatil21/AASHA/main/screenshots/add-patient.png',
      'https://raw.githubusercontent.com/SujalPatil21/AASHA/main/screenshots/role-selection.png'
    ]
  },
  {
    name: 'WardWatch',
    slug: 'wardwatch',
    category: 'Web Apps',
    github: 'https://github.com/SujalPatil21/WardWatch',
    live: 'https://ward-watch.vercel.app/',
    docs: '/projects/wardwatch',
    stack: {
      frontend: ['React', 'Vite', 'Tailwind CSS'],
      backend: ['Spring Boot', 'Java'],
      database: ['PostgreSQL'],
      infrastructure: ['WebSockets']
    },
    overview: 'WardWatch is a centralized, real-time hospital ward management system. It provides live visibility into bed allocation, patient flow, and ward capacity, replacing fragmented manual handover processes with an interactive, WebSocket-driven operational dashboard.',
    problem: [
      'Nurses and administrators lack real-time visibility into bed status.',
      'Patient discharges are delayed due to scattered operational data.',
      'Shift handovers rely on manual, error-prone paper records.'
    ],
    solution: 'A highly responsive, centralized platform that tracks bed states in real-time. Role-based access ensures doctors, nurses, and admins see context-relevant data, while WebSocket connections instantly reflect bed status changes across the entire hospital network.',
    features: [
      { title: 'Live Bed Tracking', description: 'Instant visual updates on bed availability, occupancy, and maintenance status.' },
      { title: 'Smart Allocation Queue', description: 'Automated queue management for incoming patients based on severity and bed matching.' },
      { title: 'Shift Handover Summaries', description: 'Generates structured, printable reports for seamless nursing staff transitions.' },
      { title: 'Capacity Alerts', description: 'Real-time notifications when ward capacity reaches critical thresholds.' }
    ],
    architecture: {
      image: null,
      description: 'The React frontend establishes a persistent STOMP/WebSocket connection to the Spring Boot backend. Business logic layers handle bed allocation and capacity checks before writing to PostgreSQL. State mutations instantly trigger broadcast events back to all subscribed clients, ensuring UI synchronization without polling.',
      components: []
    },
    apis: [
      { method: 'GET', endpoint: '/api/wards/{id}/beds', purpose: 'Retrieve current matrix of bed states for a specific ward.' },
      { method: 'POST', endpoint: '/api/allocations', purpose: 'Assign a patient to an available bed.' },
      { method: 'PUT', endpoint: '/api/beds/{id}/status', purpose: 'Update bed status (e.g., Cleaning, Available, Occupied).' }
    ],
    database: [
      { entity: 'Bed', fields: ['id', 'ward_id', 'status', 'patient_id', 'last_updated'] },
      { entity: 'Ward', fields: ['id', 'name', 'capacity', 'current_occupancy'] },
      { entity: 'AllocationQueue', fields: ['id', 'patient_id', 'priority_score', 'requested_at'] }
    ],
    projectStructure: 'client/\n  src/components/\n  src/services/websocket.ts\napi/\n  src/main/java/com/wardwatch/\n    controllers/\n    websocket/',
    screenshots: []
  },
  {
    name: 'Arch-Flow',
    slug: 'arch-flow',
    category: 'Developer Tools',
    github: 'https://github.com/SujalPatil21/Arch-Flow',
    docs: '/projects/arch-flow',
    stack: {
      frontend: ['React', 'Vite'],
      backend: ['Node.js', 'Express'],
      database: [],
      infrastructure: ['AST Parsing', 'LLM Integration']
    },
    overview: 'Arch-Flow is an intelligent repository visualization tool that ingests raw source code, parses its Abstract Syntax Tree (AST), and generates an interactive, AI-annotated dependency graph. It bridges the gap between reading code and understanding system architecture.',
    problem: [
      'Onboarding onto complex legacy codebases takes weeks of manual tracing.',
      'Static dependency graphs are visually overwhelming and lack semantic context.',
      'Developers struggle to identify high-impact, heavily-coupled core modules.'
    ],
    solution: 'A pipeline that converts file structures and AST imports into a directed graph. It overlays AI-generated summaries onto nodes, allowing developers to visually explore code boundaries, module dependencies, and architectural bottlenecks in a highly interactive UI.',
    features: [
      { title: 'AST Dependency Mapping', description: 'Automatically traces ES6/CommonJS imports to build accurate module graphs.' },
      { title: 'Semantic AI Insights', description: 'Generates human-readable summaries for complex files to accelerate understanding.' },
      { title: 'Impact Visualizer', description: 'Highlights highly coupled nodes to identify architectural bottlenecks.' }
    ],
    architecture: {
      image: 'https://raw.githubusercontent.com/SujalPatil21/Arch-Flow/main/1.png',
      description: 'The ingestion service traverses the local file system, feeding files through an AST parser. The extracted dependency edge-list is passed to an intelligence layer that queries an LLM for semantic context. The combined graph data is served to the React frontend, which renders it using force-directed graph visualization libraries.',
      components: []
    },
    apis: [
      { method: 'POST', endpoint: '/api/ingest', purpose: 'Trigger repository parsing and graph generation.' },
      { method: 'GET', endpoint: '/api/graph', purpose: 'Retrieve the computed node and edge matrix.' }
    ],
    database: [],
    projectStructure: 'backend-dev2/\n  src/\n    ast-parser/\n    intelligence/\n    graph-builder/\nFrontend/\n  src/\n    components/GraphViewer/',
    screenshots: [
      'https://raw.githubusercontent.com/SujalPatil21/Arch-Flow/main/2.png',
      'https://raw.githubusercontent.com/SujalPatil21/Arch-Flow/main/3.png'
    ]
  },
  {
    name: 'GitGo',
    slug: 'gitgo',
    category: 'Developer Tools',
    github: 'https://github.com/SujalPatil21/GitGo',
    docs: '/projects/gitgo',
    stack: {
      frontend: [],
      backend: ['Node.js', 'TypeScript'],
      database: [],
      infrastructure: ['CLI', 'Git API']
    },
    overview: 'GitGo is a streamlined command-line interface tool designed to automate the repetitive tasks associated with publishing coding solutions (like LeetCode or HackerRank) to GitHub. It handles file staging, metadata generation, and committing in one atomic pipeline.',
    problem: [
      'Publishing daily algorithmic solutions requires repetitive folder creation and naming.',
      'Writing consistent, high-quality READMEs for every solution is tedious.',
      'Context switching between the IDE, terminal, and browser breaks developer flow.'
    ],
    solution: 'A highly configurable CLI pipeline that detects the programming language, generates a standardized README, creates the appropriate folder structure, and automatically pushes the commit—all triggered by a single command.',
    features: [
      { title: 'Atomic Publishing Pipeline', description: 'Handles file moving, README generation, and git pushing synchronously.' },
      { title: 'Language Auto-Detection', description: 'Identifies the solution language via file extensions to format markdown blocks accurately.' },
      { title: 'Customizable Templates', description: 'Allows developers to define their own markdown templates for problem descriptions.' }
    ],
    architecture: {
      image: 'https://raw.githubusercontent.com/SujalPatil21/GitGo/main/architecture.png',
      description: 'GitGo operates as an executable Node.js CLI script. It utilizes the child_process module to interface with the local git binary, and the fs module to manipulate files. A pipeline executor pattern ensures that stages (Parsing -> Template Generation -> Git Staging -> Git Push) run sequentially and handle rollbacks on failure.',
      components: []
    },
    apis: [],
    database: [],
    projectStructure: 'src/\n  commands/\n  pipeline/\n  templates/\n  services/',
    screenshots: [
      'https://raw.githubusercontent.com/SujalPatil21/GitGo/main/architecture.png'
    ]
  },
  {
    name: 'DISPATCHOPS',
    slug: 'dispatchops',
    category: 'Developer Tools',
    github: 'https://github.com/SujalPatil21/DISPATCHOPS',
    docs: '/projects/dispatchops',
    stack: {
      frontend: [],
      backend: ['Node.js'],
      database: [],
      infrastructure: []
    },
    overview: 'DISPATCHOPS is a system utility and operational tool designed for developers to manage deployment scripts, system services, and background task monitoring across varied environments.',
    problem: [
      'Managing multiple operational deployment scripts across different servers is chaotic.',
      'Developers lack centralized visibility into background task statuses.'
    ],
    solution: 'A centralized operational dispatch tool that standardizes script execution, captures standard output logs dynamically, and reports health statuses.',
    features: [
      { title: 'Script Orchestration', description: 'Executes chained deployment scripts with dependency resolution.' },
      { title: 'Log Aggregation', description: 'Captures and streams stdout/stderr from background processes.' }
    ],
    architecture: {
      image: null,
      description: 'A modular CLI architecture that spawns background processes and manages their IPC streams for real-time logging and health checking.',
      components: []
    },
    apis: [],
    database: [],
    projectStructure: '',
    screenshots: []
  },
  {
    name: 'Drill-Insight',
    slug: 'drill-insight',
    category: 'Data Science & AI',
    github: 'https://github.com/SujalPatil21/Drill-Insight',
    docs: '/projects/drill-insight',
    stack: {
      frontend: ['React'],
      backend: ['Python', 'FastAPI'],
      database: [],
      infrastructure: ['Pandas', 'Scikit-learn']
    },
    overview: 'Drill-Insight is an analytical platform built to process heavy drilling logs, providing operational insights and anomaly detection through data science techniques.',
    problem: [
      'Raw drilling sensor data is too noisy to interpret manually.',
      'Operational anomalies are detected too late, leading to equipment failure.'
    ],
    solution: 'A data pipeline that ingests sensor CSV logs, applies smoothing algorithms, and uses machine learning models to detect anomalies and visualize drilling efficiency.',
    features: [
      { title: 'Sensor Data Smoothing', description: 'Applies rolling averages and noise-reduction algorithms to raw logs.' },
      { title: 'Anomaly Detection', description: 'Highlights operational deviations using statistical thresholds.' }
    ],
    architecture: {
      image: null,
      description: 'The React frontend uploads large CSV files to the FastAPI backend. Pandas and Scikit-learn process the dataframes in-memory, computing metrics before returning JSON arrays for charting.',
      components: []
    },
    apis: [],
    database: [],
    projectStructure: '',
    screenshots: []
  },
  {
    name: 'StaySplit',
    slug: 'staysplit',
    category: 'Web Apps',
    github: 'https://github.com/SujalPatil21/StaySplit',
    docs: '/projects/staysplit',
    stack: {
      frontend: ['React'],
      backend: ['Node.js'],
      database: ['MongoDB'],
      infrastructure: []
    },
    overview: 'StaySplit is a financial utility application that simplifies the process of tracking, dividing, and settling shared expenses during group travels and accommodations.',
    problem: [
      'Tracking uneven shared expenses across large groups causes friction.',
      'Calculating the optimal settlement path (who owes whom) is mathematically complex.'
    ],
    solution: 'An intuitive web app where users log expenses. The backend applies a debt-simplification graph algorithm to minimize the total number of transactions needed to settle all balances.',
    features: [
      { title: 'Expense Logging', description: 'Quickly log bills and split them evenly or by custom percentages.' },
      { title: 'Debt Simplification', description: 'Algorithmically reduces complex debt networks into minimum required payments.' }
    ],
    architecture: {
      image: null,
      description: 'Standard MERN stack application. The React frontend interacts with an Express REST API, which persists transactions in MongoDB. Graph calculations are computed on the backend upon request.',
      components: []
    },
    apis: [],
    database: [],
    projectStructure: '',
    screenshots: []
  },
  {
    name: 'Mind-Meal',
    slug: 'mind-meal',
    category: 'Web Apps',
    github: 'https://github.com/SujalPatil21/Mind-Meal',
    docs: '/projects/mind-meal',
    stack: {
      frontend: ['React'],
      backend: ['Node.js'],
      database: ['PostgreSQL'],
      infrastructure: []
    },
    overview: 'Mind-Meal is a smart nutrition and meal-planning application that helps users generate customized dietary schedules based on their personal health goals and preferences.',
    problem: [
      'Manual meal planning is time-consuming and often lacks nutritional balance.',
      'Users struggle to find recipes that strictly adhere to their dietary restrictions.'
    ],
    solution: 'An intelligent recommendation engine that takes user constraints (calories, macros, allergies) and algorithmically generates weekly meal plans and shopping lists.',
    features: [
      { title: 'Macro Tracking', description: 'Calculates daily nutritional intake against goals.' },
      { title: 'Automated Planning', description: 'Generates diverse weekly meal schedules instantly.' }
    ],
    architecture: {
      image: null,
      description: 'React frontend interfacing with a robust Node.js backend. User profiles and nutritional databases are indexed in PostgreSQL for rapid relational querying.',
      components: []
    },
    apis: [],
    database: [],
    projectStructure: '',
    screenshots: []
  },
  {
    name: 'Globe-Trotter',
    slug: 'globe-trotter',
    category: 'Web Apps',
    github: 'https://github.com/SujalPatil21/Globe-Trotter',
    docs: '/projects/globe-trotter',
    stack: {
      frontend: ['React'],
      backend: ['Node.js'],
      database: ['MongoDB'],
      infrastructure: []
    },
    overview: 'Globe-Trotter is a collaborative itinerary planner and social travel platform that allows users to discover destinations, plan trips with friends, and share their travel experiences.',
    problem: [
      'Collaborating on travel itineraries across spreadsheets and chat apps is messy.',
      'Discovering community-curated travel routes is difficult on standard booking sites.'
    ],
    solution: 'A unified platform offering real-time collaborative itinerary editing, interactive maps, and a social feed for sharing completed journeys.',
    features: [
      { title: 'Collaborative Itineraries', description: 'Multi-user editing for trip schedules and activities.' },
      { title: 'Interactive Maps', description: 'Visual mapping of planned routes and lodging.' }
    ],
    architecture: {
      image: null,
      description: 'A scalable web architecture using React for the interface, Node.js/Express for API handling, and MongoDB for flexible document storage of complex trip data structures.',
      components: []
    },
    apis: [],
    database: [],
    projectStructure: '',
    screenshots: []
  },
  {
    name: 'Mob-Alert',
    slug: 'mob-alert',
    category: 'Web Apps',
    github: 'https://github.com/SujalPatil21/Mob-Alert',
    docs: '/projects/mob-alert',
    stack: {
      frontend: ['React'],
      backend: ['Node.js'],
      database: ['PostgreSQL'],
      infrastructure: []
    },
    overview: 'Mob-Alert is an early-warning communication system designed to disseminate critical security and safety alerts to large groups of localized users rapidly.',
    problem: [
      'During local emergencies, targeted communication to specific geographic zones is slow.',
      'Traditional SMS alerting lacks rich context and interactive verification.'
    ],
    solution: 'A push-based alerting system that uses geographic targeting to push high-priority notifications to registered users within affected bounding boxes.',
    features: [
      { title: 'Geospatial Targeting', description: 'Broadcasts messages only to users registered within specific coordinate bounds.' },
      { title: 'High-Throughput Delivery', description: 'Optimized broadcasting queues for rapid message dissemination.' }
    ],
    architecture: {
      image: null,
      description: 'Node.js backend utilizing task queues to handle fan-out message broadcasting efficiently, backed by PostgreSQL for user spatial indexing.',
      components: []
    },
    apis: [],
    database: [],
    projectStructure: '',
    screenshots: []
  }
];

const fileContent = \`export interface Project {
  name: string;
  slug: string;
  category: string;
  description: string;
  github: string;
  live?: string;
  docs?: string;
  stack: {
    frontend: string[];
    backend: string[];
    database: string[];
    infrastructure: string[];
  };
  overview: string;
  problem: string[];
  solution: string;
  features: { title: string; description: string }[];
  architecture: {
    image: string | null;
    description: string;
    components: string[];
  };
  apis: { method: string; endpoint: string; purpose: string }[];
  database: { entity: string; fields: string[] }[];
  projectStructure: string;
  screenshots: string[];
}

export const projects: Project[] = \${JSON.stringify(projects, null, 2)};
\`;

fs.writeFileSync('C:\\\\Projects\\\\src\\\\data\\\\projects.ts', fileContent);
console.log('Successfully synthesized custom AI written project case studies.');
