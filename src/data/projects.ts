export interface Project {
  name: string;
  slug: string;
  category: string;
  description: string;
  github: string;
  live?: string;
  marketplace?: string;
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
  benchmark?: {
    summary?: string;
    metrics?: { label: string; value: string }[];
    environment?: string;
    notes?: string[];
  };
  screenshotCaptions?: Record<string, string>;
  screenshots: string[];
}

export const projects: Project[] = [
  {
    "name": "Geo-Watch",
    "slug": "geo-watch",
    "category": "Web Apps",
    "github": "https://github.com/SujalPatil21/Geo-Watch",
    "live": "https://geo-watch.pages.dev",
    "docs": "/projects/geo-watch",
    "stack": {
      "frontend": [
        "React",
        "Vite",
        "Flutter"
      ],
      "backend": [
        "Spring Boot",
        "Java"
      ],
      "database": [
        "PostgreSQL"
      ],
      "infrastructure": [
        "WebSockets",
        "Docker"
      ]
    },
    "overview": "Geo-Watch is a real-time crowd safety platform designed to monitor public events using geo-fenced client incident reports and automated risk zone clustering. It leverages custom spatial partitioning algorithms to instantly identify and broadcast danger zones across thousands of concurrent clients.",
    "problem": [
      "Event organizers lack real-time visibility into crowd safety incidents.",
      "Emergency updates are delayed by fragmented reporting systems.",
      "Analyzing large volumes of spatial incident data in real-time is computationally expensive."
    ],
    "solution": "A decoupled geospatial architecture that ingests high-volume incident reports, calculates threat densities using a grid-optimized DBSCAN clustering algorithm, and broadcasts live risk heatmaps via WebSocket connections.",
    "features": [
      {
        "title": "Real-Time Risk Clustering",
        "description": "Aggregates spatial incidents using DBSCAN to identify emerging threat zones instantly."
      },
      {
        "title": "Geofenced Reporting",
        "description": "Ensures incident validity by mathematically verifying client locations against event boundaries."
      },
      {
        "title": "Live WebSocket Broadcasts",
        "description": "Pushes localized risk updates to monitoring dashboards and mobile clients simultaneously."
      },
      {
        "title": "Rate Limiting",
        "description": "Protects backend infrastructure from high-frequency reporting abuse using robust token-bucket strategies."
      }
    ],
    "architecture": {
      "image": "/assets/projects/geo-watch/arch_deployment_architecture.png",
      "description": "The platform uses a decoupled architecture. Mobile clients send geofenced HTTP requests to the Spring Boot REST API. Validated requests are written to PostgreSQL. An asynchronous, debounced worker thread pulls recent incidents, runs spatial clustering, and pushes the generated risk clusters to an in-memory STOMP broker, which broadcasts the updates to the React monitoring dashboard.",
      "components": [
        "Flutter Client",
        "React Dashboard",
        "Spring Boot Engine",
        "PostgreSQL PostGIS"
      ]
    },
    "apis": [
      {
        "method": "GET",
        "endpoint": "/api/events/nearby",
        "purpose": "Fetch active events within a specific geographic radius."
      },
      {
        "method": "POST",
        "endpoint": "/api/incidents",
        "purpose": "Ingest a new geo-tagged incident report from a client."
      },
      {
        "method": "GET",
        "endpoint": "/api/clusters/active",
        "purpose": "Retrieve the current live risk clusters for heatmap rendering."
      }
    ],
    "database": [
      {
        "entity": "Event",
        "fields": [
          "id",
          "name",
          "boundary_polygon",
          "active_status"
        ]
      },
      {
        "entity": "Incident",
        "fields": [
          "id",
          "event_id",
          "latitude",
          "longitude",
          "timestamp",
          "severity"
        ]
      }
    ],
    "screenshots": [
      "/assets/projects/geo-watch/screen_0_img2.png"
    ],
    "description": "Real-time crowd safety platform for monitoring public events and geo-fenced incidents."
  },
  {
    "name": "JUNCTION",
    "slug": "junction",
    "category": "Web Apps",
    "github": "https://github.com/SujalPatil21/Junction",
    "docs": "/projects/junction",
    "description": "Mega-event operations platform for crowd monitoring, predictive forecasting, AI recommendations, and 3D stadium visualization.",
    "stack": {
      "frontend": [
        "Next.js 16",
        "React 19",
        "TypeScript"
      ],
      "backend": [
        "Spring Boot",
        "Java 21"
      ],
      "database": [
        "PostgreSQL"
      ],
      "infrastructure": [
        "Python",
        "YOLOv12",
        "ByteTrack",
        "Flutter",
        "Docker",
        "Grafana k6"
      ]
    },
    "overview": "JUNCTION is an intelligent mega-event operations platform designed to help organizers monitor crowd conditions, anticipate operational risks, and coordinate venue operations. It combines multi-source sensor ingestion, crowd-state analysis, predictive forecasting, AI-assisted recommendations, computer vision, and an interactive 3D stadium digital twin.",
    "problem": [
      "Large events generate operational data across disconnected systems such as CCTV feeds, sensors, venue zones, and attendee applications.",
      "Organizers lack centralized visibility into real-time crowd pressure and exit queue dynamics.",
      "Emergency updates and crowd redirection decisions are hindered by manual, delayed reporting across disparate stakeholder teams.",
      "Identifying emerging crowd bottlenecks before they escalate requires computationally heavy multi-source ingestion and short-horizon forecasting."
    ],
    "solution": "A modular platform combining a Java 21 Spring Boot backend, Next.js web frontend, PostgreSQL database, Python computer-vision bridge, and Flutter attendee application. It processes sensor observations, evaluates operational conditions, generates forecasts, and presents recommendations for organizer review.",
    "features": [
      {
        "title": "Sensor Ingestion",
        "description": "Processing normalized observations from computer-vision and sensor sources via authenticated REST ingestion pipelines."
      },
      {
        "title": "Sensor Fusion",
        "description": "Combining multi-modal observations to evaluate real-time operational crowd conditions, pressure indices, and coverage honesty across venue zones."
      },
      {
        "title": "Predictive Forecasting",
        "description": "Short-horizon crowd surge and resource pressure forecasts across 15, 30, 45, and 60-minute planning horizons."
      },
      {
        "title": "Operational Recommendations",
        "description": "Generating proposed operational interventions with a human-in-the-loop organizer review, approval, and rejection workflow."
      },
      {
        "title": "3D Stadium Digital Twin",
        "description": "Interactive Wankhede Stadium visualization with crowd-flow context, stand occupancy heatmaps, gate navigation, and spatial situational awareness."
      },
      {
        "title": "Computer Vision",
        "description": "Python-based YOLOv12 and ByteTrack pipeline for privacy-preserving CCTV observation processing, pedestrian counting, and tripwire directional flux calculation."
      },
      {
        "title": "Mobile Attendee Experience",
        "description": "Flutter application for event information, dynamic venue routing, and attendee-facing hospitality incentives."
      },
      {
        "title": "Hospitality Coordination",
        "description": "Restaurant partner inventory and operational demand coordination to balance venue egress dining traffic."
      }
    ],
    "architecture": {
      "image": null,
      "description": "JUNCTION utilizes a decoupled multi-service architecture designed for resilient mega-event operations. The Next.js 16 and React 19 web frontend acts as the organizer command center, rendering live venue telemetry and the Three.js / Cesium-powered 3D stadium digital twin. The Spring Boot backend (running on Java 21 LTS with Apache Tomcat 10.1 and HikariCP) serves as the centralized core, executing sensor fusion, forecasting algorithms, and the stateful intervention lifecycle. PostgreSQL 18 handles persistence for profiles, restaurants, memberships, inventory logs, immutable audit events, and operational interventions via Flyway migrations. An edge Python computer-vision bridge executes YOLOv12 detection and ByteTrack tracking on CCTV feeds, serializing normalized observation batches directly to the backend over Bearer-authenticated REST endpoints. Concurrently, attendees access event advisories through a cross-platform Flutter mobile client consuming public telemetry endpoints.",
      "components": [
        "Next.js 16 & React 19 Web Command Center",
        "Java 21 & Spring Boot 4.1.2 Backend Engine",
        "PostgreSQL 18 Relational Persistence Layer",
        "Python YOLOv12 & ByteTrack Computer-Vision Bridge",
        "Flutter Cross-Platform Mobile Attendee Application",
        "Clerk OAuth2 / RS256 JWT & Edge Bearer Token Security Gateways"
      ]
    },
    "apis": [
      {
        "method": "GET",
        "endpoint": "/api/health",
        "purpose": "Check backend service health, container liveness, and active configuration profile."
      },
      {
        "method": "GET",
        "endpoint": "/api/scenarios",
        "purpose": "Retrieve available and active operational scenarios for event simulation."
      },
      {
        "method": "POST",
        "endpoint": "/api/scenarios",
        "purpose": "Update the active operational scenario to trigger simulated crowd surge conditions."
      },
      {
        "method": "GET",
        "endpoint": "/api/observations",
        "purpose": "Retrieve recent sensor observations buffer, optionally filtered by zone ID."
      },
      {
        "method": "POST",
        "endpoint": "/api/observations",
        "purpose": "Ingest normalized observation batches from cv_bridge edge devices or sensor services."
      },
      {
        "method": "GET",
        "endpoint": "/api/zones",
        "purpose": "Retrieve fused operational states and pressure metrics for all registered venue zones."
      },
      {
        "method": "GET",
        "endpoint": "/api/zones/{zoneId}",
        "purpose": "Retrieve a specific operational zone fused state, capacity, and density metrics."
      },
      {
        "method": "GET",
        "endpoint": "/api/zones/coverage",
        "purpose": "Retrieve data honesty and sensor coverage profiles across all operational venue zones."
      },
      {
        "method": "GET",
        "endpoint": "/api/forecast",
        "purpose": "Generate short-horizon zone crowd surge forecasts across 15, 30, 45, and 60-minute horizons."
      },
      {
        "method": "GET",
        "endpoint": "/api/recommendations",
        "purpose": "Retrieve all proposed, approved, and executed operational interventions."
      },
      {
        "method": "POST",
        "endpoint": "/api/recommendations/generate",
        "purpose": "Generate proposed operational interventions from real-time zone states."
      },
      {
        "method": "POST",
        "endpoint": "/api/recommendations/plan",
        "purpose": "Generate a multi-horizon recommendation and heuristic dispatch plan from operational context."
      },
      {
        "method": "POST",
        "endpoint": "/api/recommendations/{id}/approve",
        "purpose": "Approve a proposed operational intervention and record organizer rationale."
      },
      {
        "method": "POST",
        "endpoint": "/api/recommendations/{id}/reject",
        "purpose": "Reject a proposed operational intervention with documented operator justification."
      }
    ],
    "database": [
      {
        "entity": "profiles",
        "fields": [
          "id (UUID, PK)",
          "clerk_user_id (TEXT, UNIQUE) — External Clerk identity anchor",
          "name (TEXT)",
          "email (TEXT)",
          "role (user_role ENUM: ORGANIZER | RESTAURANT_PARTNER | ATTENDEE)",
          "created_at (TIMESTAMPTZ)",
          "updated_at (TIMESTAMPTZ)"
        ]
      },
      {
        "entity": "restaurants",
        "fields": [
          "id (TEXT, PK, e.g. 'R1', 'R2')",
          "name (TEXT)",
          "zone (TEXT) — Operational zone reference (e.g. 'ZONE_A', 'ZONE_WANKHEDE')",
          "cuisine (TEXT)",
          "address (TEXT)",
          "total_capacity (INTEGER)",
          "available_covers (INTEGER)",
          "expected_reservations (INTEGER)",
          "price_range (TEXT)",
          "lat / lng (DOUBLE PRECISION)",
          "is_active (BOOLEAN)",
          "created_at / updated_at (TIMESTAMPTZ)"
        ]
      },
      {
        "entity": "restaurant_memberships",
        "fields": [
          "id (UUID, PK)",
          "profile_id (UUID, FK -> profiles.id)",
          "restaurant_id (TEXT, FK -> restaurants.id)",
          "role (membership_role ENUM: OWNER | MANAGER | STAFF)",
          "created_at (TIMESTAMPTZ)",
          "CONSTRAINT uq_restaurant_membership UNIQUE (profile_id, restaurant_id)"
        ]
      },
      {
        "entity": "restaurant_inventory",
        "fields": [
          "id (UUID, PK)",
          "restaurant_id (TEXT, FK -> restaurants.id)",
          "reported_by_profile_id (UUID, FK -> profiles.id, ON DELETE SET NULL)",
          "available_tables (INTEGER)",
          "available_covers (INTEGER)",
          "expected_covers (INTEGER)",
          "out_of_order_tables (INTEGER)",
          "notes (TEXT)",
          "recorded_at (TIMESTAMPTZ)"
        ]
      },
      {
        "entity": "audit_events",
        "fields": [
          "id (TEXT, PK)",
          "actor_id (TEXT)",
          "actor_role (TEXT)",
          "category (TEXT)",
          "target_entity_type (TEXT)",
          "target_entity_id (TEXT)",
          "change_summary (TEXT)",
          "rationale (TEXT)",
          "previous_state_json (TEXT)",
          "new_state_json (TEXT)",
          "is_simulated_scenario (BOOLEAN)",
          "timestamp (TIMESTAMPTZ)"
        ]
      },
      {
        "entity": "operational_interventions",
        "fields": [
          "id (TEXT, PK)",
          "type (TEXT)",
          "title (TEXT)",
          "description (TEXT)",
          "target_zone_id (TEXT)",
          "status (TEXT: PROPOSED | APPROVED | REJECTED | EXECUTED)",
          "urgency (TEXT: LOW | MEDIUM | HIGH | CRITICAL)",
          "requires_approval (BOOLEAN)",
          "approval_role_required (TEXT)",
          "rationale (TEXT)",
          "confidence_score (DOUBLE PRECISION)",
          "expected_pressure_reduction_percent (INTEGER)",
          "proposed_at (TIMESTAMPTZ)",
          "expires_at (TIMESTAMPTZ)",
          "approved_at (TIMESTAMPTZ)",
          "approved_by_user_id (TEXT)",
          "rejection_reason (TEXT)"
        ]
      }
    ],
    "benchmark": {
      "summary": "Measured using Grafana k6 under a 250 concurrent virtual user mixed-workload load test targeting the optimized Spring Boot 4.1.2 backend and local PostgreSQL database. The benchmark reflects local execution performance and does not represent guaranteed production cloud capacity.",
      "metrics": [
        { "label": "Peak REST Throughput", "value": "3,284.94 requests/sec" },
        { "label": "Peak Concurrent Virtual Users", "value": "250 VUs" },
        { "label": "Requests Processed (Single Run)", "value": "262,809 requests (80s duration)" },
        { "label": "Cumulative Campaign Requests", "value": "737,293 requests (0 HTTP failures)" },
        { "label": "Response Latency (p95)", "value": "59.36 ms (median: 15.57 ms)" },
        { "label": "Progressive Load Latency (p95)", "value": "32.21 ms (median: 5.55 ms)" },
        { "label": "Reported HTTP Failure Rate", "value": "0.00% (0 errors across 262,809 reqs)" },
        { "label": "500 Client Telemetry Handling", "value": "100.00% success (HTTP polling fallback)" }
      ],
      "environment": "Microsoft Windows 11 Home (64-bit, Build 10.0.26300) | 13th Gen Intel(R) Core(TM) i5-13450HX (10 cores: 6 P-cores + 4 E-cores, 16 threads, 2.4-4.6 GHz) | 16 GB DDR5 RAM | PCIe 4.0 NVMe SSD | Oracle Java HotSpot 21.0.11+9-LTS | Spring Boot 4.1.2 / Apache Tomcat 10.1 | PostgreSQL 18.4 (local, port 5432) | HikariCP 5.1.0 (pool: 25) | Grafana k6 v1.6.0.",
      "notes": [
        "Local Benchmark Scope: The backend and PostgreSQL database were tested locally on the same host machine without network hops, measuring application framework, JVM, and database engine limits rather than network transmission overhead.",
        "Real-Time Telemetry Architecture: The Spring Boot backend codebase does not register a WebSocket or STOMP broker (@EnableWebSocketMessageBroker is not active). Real-time telemetry is maintained via active HTTP polling and SSE against /api/scenarios and /api/observations.",
        "500 Concurrent Clients Test: When 500 virtual users attempted connection to /ws, the uninstrumented route returned HTTP 404, prompting clients to execute the active HTTP polling fallback mechanism. The fallback polling transport maintained a 100.00% success rate across 4,732 requests with 0 dropped sessions. JUNCTION makes no claim of native WebSocket concurrency.",
        "Performance Tuning: Scaling the HikariCP connection pool from 5 to 25 connections and suppressing high-frequency Hibernate SQL console I/O logging reduced p95 latency from 1,090.26 ms to 59.36 ms (an 18.36x latency reduction) under 250 VU mixed concurrency."
      ]
    },
    "screenshots": [
      "/assets/projects/Junction/image.png"
    ],
    "screenshotCaptions": {
      "/assets/projects/Junction/image.png": "Interactive 3D Stadium Digital Twin — Wankhede Stadium"
    }
  },
  {
    "name": "AASHA",
    "slug": "aasha",
    "category": "Web Apps",
    "github": "https://github.com/SujalPatil21/AASHA",
    "docs": "/projects/aasha",
    "stack": {
      "frontend": [
        "React PWA",
        "TypeScript"
      ],
      "backend": [
        "Spring Boot",
        "Java"
      ],
      "database": [
        "PostgreSQL"
      ],
      "infrastructure": [
        "IndexedDB",
        "Service Workers"
      ]
    },
    "overview": "AASHA is an AI-assisted, offline-first health data platform engineered for rural health workers (ASHA). It captures unstructured voice or text observations, securely processes them into structured medical records locally, and applies rule-based risk engines to flag high-priority cases without requiring internet connectivity.",
    "problem": [
      "Rural health workers operate in regions with zero or unreliable internet connectivity.",
      "Paper-based workflows delay critical reporting to Primary Health Centers (PHCs).",
      "High-risk patients are often overlooked due to unstructured data collection."
    ],
    "solution": "An offline-first Progressive Web App (PWA) that stores data via IndexedDB. It uses local rule engines to instantly triage patients based on observed symptoms. When connectivity is restored, a robust sync manager safely transmits the encrypted data to the central Spring Boot server.",
    "features": [
      {
        "title": "Offline-First Architecture",
        "description": "Full application functionality operates independently of network status using Service Workers and IndexedDB."
      },
      {
        "title": "Rule-Based Risk Flagging",
        "description": "Transparent, deterministic algorithms flag critical health conditions without relying on black-box AI."
      },
      {
        "title": "Automatic Synchronization",
        "description": "Conflict-resolving background sync automatically pushes pending records when networks become available."
      },
      {
        "title": "Role-Based Dashboard",
        "description": "Provides filtered, prioritized views for ASHA workers, ANMs, and PHC doctors."
      }
    ],
    "architecture": {
      "image": null,
      "description": "An offline-first client architecture. The React PWA handles data entry and local risk assessment. Upon network recovery, it syncs with a Spring Boot API. The data is finally persisted in PostgreSQL for PHC dashboard retrieval.",
      "components": []
    },
    "apis": [
      {
        "method": "POST",
        "endpoint": "/api/sync/batch",
        "purpose": "Process bulk offline records pushed from the PWA."
      },
      {
        "method": "GET",
        "endpoint": "/api/patients/high-risk",
        "purpose": "Retrieve prioritized patient cases for PHC doctors."
      }
    ],
    "database": [
      {
        "entity": "HealthRecord",
        "fields": [
          "id",
          "patient_id",
          "symptoms",
          "risk_level",
          "sync_status"
        ]
      },
      {
        "entity": "Patient",
        "fields": [
          "id",
          "demographics",
          "village_id"
        ]
      }
    ],
    "screenshots": [
      "/assets/projects/aasha/screen_0_dashboard.png"
    ],
    "description": "Offline-first healthcare platform that helps ASHA workers capture and assess patient data."
  },
  {
    "name": "WardWatch",
    "slug": "wardwatch",
    "category": "Web Apps",
    "github": "https://github.com/SujalPatil21/WardWatch",
    "docs": "/projects/wardwatch",
    "stack": {
      "frontend": [
        "React",
        "Vite",
        "Tailwind CSS"
      ],
      "backend": [
        "Spring Boot",
        "Java"
      ],
      "database": [
        "PostgreSQL"
      ],
      "infrastructure": [
        "WebSockets"
      ]
    },
    "overview": "WardWatch is a centralized, real-time hospital ward management system. It provides live visibility into bed allocation, patient flow, and ward capacity, replacing fragmented manual handover processes with an interactive, WebSocket-driven operational dashboard.",
    "problem": [
      "Nurses and administrators lack real-time visibility into bed status.",
      "Patient discharges are delayed due to scattered operational data.",
      "Shift handovers rely on manual, error-prone paper records."
    ],
    "solution": "A highly responsive, centralized platform that tracks bed states in real-time. Role-based access ensures doctors, nurses, and admins see context-relevant data, while WebSocket connections instantly reflect bed status changes across the entire hospital network.",
    "features": [
      {
        "title": "Live Bed Tracking",
        "description": "Instant visual updates on bed availability, occupancy, and maintenance status."
      },
      {
        "title": "Smart Allocation Queue",
        "description": "Automated queue management for incoming patients based on severity and bed matching."
      },
      {
        "title": "Shift Handover Summaries",
        "description": "Generates structured, printable reports for seamless nursing staff transitions."
      },
      {
        "title": "Capacity Alerts",
        "description": "Real-time notifications when ward capacity reaches critical thresholds."
      }
    ],
    "architecture": {
      "image": null,
      "description": "The React frontend establishes a persistent STOMP/WebSocket connection to the Spring Boot backend. Business logic layers handle bed allocation and capacity checks before writing to PostgreSQL. State mutations instantly trigger broadcast events back to all subscribed clients, ensuring UI synchronization without polling.",
      "components": []
    },
    "apis": [
      {
        "method": "GET",
        "endpoint": "/api/wards/{id}/beds",
        "purpose": "Retrieve current matrix of bed states for a specific ward."
      },
      {
        "method": "POST",
        "endpoint": "/api/allocations",
        "purpose": "Assign a patient to an available bed."
      },
      {
        "method": "PUT",
        "endpoint": "/api/beds/{id}/status",
        "purpose": "Update bed status (e.g., Cleaning, Available, Occupied)."
      }
    ],
    "database": [
      {
        "entity": "Bed",
        "fields": [
          "id",
          "ward_id",
          "status",
          "patient_id",
          "last_updated"
        ]
      },
      {
        "entity": "Ward",
        "fields": [
          "id",
          "name",
          "capacity",
          "current_occupancy"
        ]
      },
      {
        "entity": "AllocationQueue",
        "fields": [
          "id",
          "patient_id",
          "priority_score",
          "requested_at"
        ]
      }
    ],
    "screenshots": [],
    "description": "Real-time hospital ward management system for bed allocation and operational visibility."
  },
  {
    "name": "Globe-Trotter",
    "slug": "globe-trotter",
    "category": "Web Apps",
    "github": "https://github.com/SujalPatil21/Globe-Trotter",
    "docs": "/projects/globe-trotter",
    "stack": {
      "frontend": [
        "React",
        "Tailwind CSS"
      ],
      "backend": [
        "Python",
        "FastAPI"
      ],
      "database": [
        "PostgreSQL"
      ],
      "infrastructure": []
    },
    "overview": "Globe-Trotter is a collaborative itinerary planner and social travel platform that allows users to discover destinations, plan trips with friends, and share their travel experiences.",
    "problem": [
      "Collaborating on travel itineraries across spreadsheets and chat apps is messy.",
      "Discovering community-curated travel routes is difficult on standard booking sites."
    ],
    "solution": "A unified platform offering real-time collaborative itinerary editing, interactive maps, and a social feed for sharing completed journeys.",
    "features": [
      {
        "title": "Collaborative Itineraries",
        "description": "Multi-user editing for trip schedules and activities."
      },
      {
        "title": "Interactive Maps",
        "description": "Visual mapping of planned routes and lodging."
      }
    ],
    "architecture": {
      "image": null,
      "description": "A scalable web architecture using React for the interface, Node.js/Express for API handling, and MongoDB for flexible document storage of complex trip data structures.",
      "components": []
    },
    "apis": [],
    "database": [],
    "screenshots": [],
    "description": "Collaborative travel planner for discovering destinations and building shared itineraries."
  },
  {
    "name": "Mind-Meal",
    "slug": "mind-meal",
    "category": "Web Apps",
    "github": "https://github.com/SujalPatil21/Mind-Meal",
    "docs": "/projects/mind-meal",
    "stack": {
      "frontend": [
        "HTML",
        "CSS",
        "JavaScript"
      ],
      "backend": [
        "Python",
        "FastAPI"
      ],
      "database": [],
      "infrastructure": []
    },
    "overview": "Mind-Meal is a smart nutrition and meal-planning application that helps users generate customized dietary schedules based on their personal health goals and preferences.",
    "problem": [
      "Manual meal planning is time-consuming and often lacks nutritional balance.",
      "Users struggle to find recipes that strictly adhere to their dietary restrictions."
    ],
    "solution": "An intelligent recommendation engine that takes user constraints (calories, macros, allergies) and algorithmically generates weekly meal plans and shopping lists.",
    "features": [
      {
        "title": "Macro Tracking",
        "description": "Calculates daily nutritional intake against goals."
      },
      {
        "title": "Automated Planning",
        "description": "Generates diverse weekly meal schedules instantly."
      }
    ],
    "architecture": {
      "image": null,
      "description": "React frontend interfacing with a robust Node.js backend. User profiles and nutritional databases are indexed in PostgreSQL for rapid relational querying.",
      "components": []
    },
    "apis": [],
    "database": [],
    "screenshots": [],
    "description": "Smart meal-planning application for generating personalized dietary schedules."
  },
  {
    "name": "StaySplit",
    "slug": "staysplit",
    "category": "Web Apps",
    "github": "https://github.com/SujalPatil21/StaySplit",
    "docs": "/projects/staysplit",
    "stack": {
      "frontend": [
        "HTML",
        "CSS",
        "JavaScript"
      ],
      "backend": [
        "Spring Boot",
        "Java"
      ],
      "database": [],
      "infrastructure": []
    },
    "overview": "StaySplit is a financial utility application that simplifies the process of tracking, dividing, and settling shared expenses during group travels and accommodations.",
    "problem": [
      "Tracking uneven shared expenses across large groups causes friction.",
      "Calculating the optimal settlement path (who owes whom) is mathematically complex."
    ],
    "solution": "An intuitive web app where users log expenses. The backend applies a debt-simplification graph algorithm to minimize the total number of transactions needed to settle all balances.",
    "features": [
      {
        "title": "Expense Logging",
        "description": "Quickly log bills and split them evenly or by custom percentages."
      },
      {
        "title": "Debt Simplification",
        "description": "Algorithmically reduces complex debt networks into minimum required payments."
      }
    ],
    "architecture": {
      "image": null,
      "description": "Standard MERN stack application. The React frontend interacts with an Express REST API, which persists transactions in MongoDB. Graph calculations are computed on the backend upon request.",
      "components": []
    },
    "apis": [],
    "database": [],
    "screenshots": [],
    "description": "Shared accommodation platform for managing stays, expenses, and participants."
  },
  {
    "name": "DISPATCHOPS",
    "slug": "dispatchops",
    "category": "Web Apps",
    "github": "https://github.com/SujalPatil21/DISPATCHOPS",
    "docs": "/projects/dispatchops",
    "stack": {
      "frontend": [
        "React",
        "AWS Amplify"
      ],
      "backend": [
        "AWS CDK",
        "TypeScript",
        "Spring Boot",
        "Java"
      ],
      "database": [
        "DynamoDB"
      ],
      "infrastructure": []
    },
    "overview": "DISPATCHOPS is a system utility and operational tool designed for developers to manage deployment scripts, system services, and background task monitoring across varied environments.",
    "problem": [
      "Managing multiple operational deployment scripts across different servers is chaotic.",
      "Developers lack centralized visibility into background task statuses."
    ],
    "solution": "A centralized operational dispatch tool that standardizes script execution, captures standard output logs dynamically, and reports health statuses.",
    "features": [
      {
        "title": "Script Orchestration",
        "description": "Executes chained deployment scripts with dependency resolution."
      },
      {
        "title": "Log Aggregation",
        "description": "Captures and streams stdout/stderr from background processes."
      }
    ],
    "architecture": {
      "image": null,
      "description": "A modular CLI architecture that spawns background processes and manages their IPC streams for real-time logging and health checking.",
      "components": []
    },
    "apis": [],
    "database": [],
    "screenshots": [],
    "description": "Operational platform for managing deployment workflows and infrastructure operations."
  },
  {
    "name": "Mob-Alert",
    "slug": "mob-alert",
    "category": "AI / Intelligent Projects",
    "github": "https://github.com/SujalPatil21/Mob-Alert",
    "docs": "/projects/mob-alert",
    "stack": {
      "frontend": [
        "React",
        "Flutter"
      ],
      "backend": [
        "Spring Boot",
        "Java"
      ],
      "database": [
        "H2 Database"
      ],
      "infrastructure": []
    },
    "overview": "Mob-Alert is an early-warning communication system designed to disseminate critical security and safety alerts to large groups of localized users rapidly.",
    "problem": [
      "During local emergencies, targeted communication to specific geographic zones is slow.",
      "Traditional SMS alerting lacks rich context and interactive verification."
    ],
    "solution": "A push-based alerting system that uses geographic targeting to push high-priority notifications to registered users within affected bounding boxes.",
    "features": [
      {
        "title": "Geospatial Targeting",
        "description": "Broadcasts messages only to users registered within specific coordinate bounds."
      },
      {
        "title": "High-Throughput Delivery",
        "description": "Optimized broadcasting queues for rapid message dissemination."
      }
    ],
    "architecture": {
      "image": null,
      "description": "Node.js backend utilizing task queues to handle fan-out message broadcasting efficiently, backed by PostgreSQL for user spatial indexing.",
      "components": []
    },
    "apis": [],
    "database": [],
    "screenshots": [],
    "description": "Early-warning communication system for distributing critical safety alerts."
  },
  {
    "name": "Drill-Insight",
    "slug": "drill-insight",
    "category": "AI / Intelligent Projects",
    "github": "https://github.com/SujalPatil21/Drill-Insight",
    "docs": "/projects/drill-insight",
    "stack": {
      "frontend": [
        "React",
        "Tailwind CSS"
      ],
      "backend": [
        "Python",
        "FastAPI"
      ],
      "database": [
        "PostgreSQL",
        "pgvector"
      ],
      "infrastructure": []
    },
    "overview": "Drill-Insight is an analytical platform built to process heavy drilling logs, providing operational insights and anomaly detection through data science techniques.",
    "problem": [
      "Raw drilling sensor data is too noisy to interpret manually.",
      "Operational anomalies are detected too late, leading to equipment failure."
    ],
    "solution": "A data pipeline that ingests sensor CSV logs, applies smoothing algorithms, and uses machine learning models to detect anomalies and visualize drilling efficiency.",
    "features": [
      {
        "title": "Sensor Data Smoothing",
        "description": "Applies rolling averages and noise-reduction algorithms to raw logs."
      },
      {
        "title": "Anomaly Detection",
        "description": "Highlights operational deviations using statistical thresholds."
      }
    ],
    "architecture": {
      "image": null,
      "description": "The React frontend uploads large CSV files to the FastAPI backend. Pandas and Scikit-learn process the dataframes in-memory, computing metrics before returning JSON arrays for charting.",
      "components": []
    },
    "apis": [],
    "database": [],
    "screenshots": [],
    "description": "AI-assisted platform for analyzing and extracting insights from operational drill data."
  },
  {
    "name": "GitGo",
    "slug": "gitgo",
    "category": "Developer Tools",
    "github": "https://github.com/SujalPatil21/GitGo",
    "docs": "/projects/gitgo",
    "stack": {
      "frontend": [],
      "backend": [
        "TypeScript",
        "VS Code Extension API",
        "Node.js"
      ],
      "database": [],
      "infrastructure": [
        "CLI",
        "Git API"
      ]
    },
    "overview": "GitGo is a streamlined command-line interface tool designed to automate the repetitive tasks associated with publishing coding solutions (like LeetCode or HackerRank) to GitHub. It handles file staging, metadata generation, and committing in one atomic pipeline.",
    "problem": [
      "Publishing daily algorithmic solutions requires repetitive folder creation and naming.",
      "Writing consistent, high-quality READMEs for every solution is tedious.",
      "Context switching between the IDE, terminal, and browser breaks developer flow."
    ],
    "solution": "A highly configurable CLI pipeline that detects the programming language, generates a standardized README, creates the appropriate folder structure, and automatically pushes the commit—all triggered by a single command.",
    "features": [
      {
        "title": "Atomic Publishing Pipeline",
        "description": "Handles file moving, README generation, and git pushing synchronously."
      },
      {
        "title": "Language Auto-Detection",
        "description": "Identifies the solution language via file extensions to format markdown blocks accurately."
      },
      {
        "title": "Customizable Templates",
        "description": "Allows developers to define their own markdown templates for problem descriptions."
      }
    ],
    "architecture": {
      "image": null,
      "description": "GitGo operates as an executable Node.js CLI script. It utilizes the child_process module to interface with the local git binary, and the fs module to manipulate files. A pipeline executor pattern ensures that stages (Parsing -> Template Generation -> Git Staging -> Git Push) run sequentially and handle rollbacks on failure.",
      "components": []
    },
    "apis": [],
    "database": [],
    "screenshots": [],
    "description": "VS Code extension for automating repetitive Git and development workflows.",
    "marketplace": "https://marketplace.visualstudio.com/items?itemName=RuntimeSync.gitgo"
  },
  {
    "name": "Arch-Flow",
    "slug": "arch-flow",
    "category": "Developer Tools",
    "github": "https://github.com/SujalPatil21/Arch-Flow",
    "docs": "/projects/arch-flow",
    "stack": {
      "frontend": [
        "React",
        "Vite"
      ],
      "backend": [
        "Node.js",
        "Express"
      ],
      "database": [],
      "infrastructure": [
        "AST Parsing",
        "LLM Integration"
      ]
    },
    "overview": "Arch-Flow is an intelligent repository visualization tool that ingests raw source code, parses its Abstract Syntax Tree (AST), and generates an interactive, AI-annotated dependency graph. It bridges the gap between reading code and understanding system architecture.",
    "problem": [
      "Onboarding onto complex legacy codebases takes weeks of manual tracing.",
      "Static dependency graphs are visually overwhelming and lack semantic context.",
      "Developers struggle to identify high-impact, heavily-coupled core modules."
    ],
    "solution": "A pipeline that converts file structures and AST imports into a directed graph. It overlays AI-generated summaries onto nodes, allowing developers to visually explore code boundaries, module dependencies, and architectural bottlenecks in a highly interactive UI.",
    "features": [
      {
        "title": "AST Dependency Mapping",
        "description": "Automatically traces ES6/CommonJS imports to build accurate module graphs."
      },
      {
        "title": "Semantic AI Insights",
        "description": "Generates human-readable summaries for complex files to accelerate understanding."
      },
      {
        "title": "Impact Visualizer",
        "description": "Highlights highly coupled nodes to identify architectural bottlenecks."
      }
    ],
    "architecture": {
      "image": null,
      "description": "The ingestion service traverses the local file system, feeding files through an AST parser. The extracted dependency edge-list is passed to an intelligence layer that queries an LLM for semantic context. The combined graph data is served to the React frontend, which renders it using force-directed graph visualization libraries.",
      "components": []
    },
    "apis": [
      {
        "method": "POST",
        "endpoint": "/api/ingest",
        "purpose": "Trigger repository parsing and graph generation."
      },
      {
        "method": "GET",
        "endpoint": "/api/graph",
        "purpose": "Retrieve the computed node and edge matrix."
      }
    ],
    "database": [],
    "screenshots": [
      "/assets/projects/arch-flow/screen_0_2.png"
    ],
    "description": "Repository visualization tool that analyzes code structure and generates architectural insights."
  }
];
