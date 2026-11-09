# JUNCTION — Intelligent Mega-Event Operations Platform
![Interactive 3D Stadium Digital Twin — Wankhede Stadium](/assets/projects/Junction/image.png)

Centralized crowd monitoring, predictive forecasting, AI-driven recommendations, and 3D stadium visualization for mega-events.

JUNCTION is an intelligent mega-event operations platform designed to help organizers monitor crowd conditions, anticipate operational risks, and coordinate venue operations. It combines multi-source sensor ingestion, crowd-state analysis, predictive forecasting, AI-assisted recommendations, computer vision, and an interactive 3D stadium digital twin.

Sense Observations → Fuse Zone Telemetry → Forecast Crowd Surges → Recommend Interventions → Orchestrate Operations.

---

## Problem

Large-scale events such as international cricket tournaments, mega-concerts, and metropolitan festivals generate massive, high-velocity operational data across disconnected systems:

- Fragmented optical camera feeds and CCTV networks operating in silos.
- Uncoordinated gate, corridor, and turnstile crowd influxes.
- Disconnected venue zones lacking unified pressure and density metrics.
- Delayed, manual radio communications between field marshals and incident control centers.
- Bottlenecks at stadium exits and surrounding transit hubs during sudden egress surges.
- Hospitality partners and local restaurants receiving unannounced surges without demand-smoothing coordination.

Because traditional event management systems are fragmented and reactive:

- Critical bottlenecks are discovered only after density reaches dangerous thresholds.
- Supervisors receive late or contradictory updates from field personnel.
- Incident response teams lack quantitative data to justify perimeter interventions.
- Attendees face severe congestion, long wait times, and disorientation during peak egress.

### Root Cause

Most venue management platforms are either static dispatch boards or uncoupled monitoring dashboards. They lack automated real-time sensor fusion capable of converting raw multi-camera detections into normalized spatial telemetry, short-horizon crowd forecasts, and executable, audited operational recommendations.

---

## Solution

JUNCTION transforms event operations into an integrated, real-time, explainable command platform.

It links multi-camera computer vision edge nodes, an enterprise Spring Boot orchestration engine, a high-performance Next.js 16 command center, and a Flutter attendee application into a unified operational loop.

The system:

- Ingests high-frequency spatial observations from edge CCTV cameras and IoT sensors.
- Applies deterministic sensor fusion algorithms to compute real-time crowd pressure indices and sensor honesty scores.
- Generates rolling short-horizon crowd surge forecasts across 15, 30, 45, and 60-minute operational planning windows.
- Automatically generates explainable operational interventions (gate rebalancing, shuttle dispatch, hospitality voucher incentives).
- Enforces a human-in-the-loop approval workflow where authorized organizers review, approve, or reject proposed actions with recorded rationales.
- Renders an interactive 3D digital twin of Wankhede Stadium (powered by Three.js and Cesium) showing live stand occupancy, gate queues, and heatmaps.
- Distributes dynamic crowd dispersal incentives directly to attendees via a dedicated Flutter mobile client.
- Coordinates hospitality capacity by logging restaurant inventory and routing dining demand away from congested stadium exits.

No uncoordinated field actions.  
No black-box, unmonitored automated dispatches.  
Complete auditability for every operational intervention.

---

## Key Features

- **Sensor Ingestion:** Ingests high-frequency batches of normalized spatial observations (`JUNCTION-NormalizedObservation-v1.0.0`) from computer-vision and IoT sensor sources via Bearer-authenticated REST pipelines.
- **Sensor Fusion:** Evaluates operational conditions across designated venue zones by calculating weighted crowd density, zone pressure indexes, and sensor coverage honesty profiles.
- **Predictive Forecasting:** Short-horizon crowd surge and resource pressure forecasts computed across 15, 30, 45, and 60-minute planning horizons to alert operators before critical thresholds are reached.
- **Operational Recommendations:** Generates rule and heuristic-driven operational interventions (gate balancing, transit dispatch, hospitality voucher incentives) with an organizer approval workflow.
- **3D Stadium Digital Twin:** Interactive Wankhede Stadium visualization with crowd-flow context, stand occupancy heatmaps, gate navigation, and spatial situational awareness.
- **Computer Vision Bridge:** Python-based edge pipeline combining YOLOv12 object detection and ByteTrack tracking to extract privacy-preserving pedestrian counts and directional tripwire flux from CCTV feeds.
- **Mobile Attendee Experience:** Cross-platform Flutter application providing attendees with live event updates, transit navigation, and crowd-dispersal incentive vouchers.
- **Hospitality Coordination:** Partner portal tracking real-time restaurant table availability, covers, and dynamically routing dining demand away from congested stadium exits.

---

## System Workflow

```
[ CCTV Video Feeds / IoT Nodes ]
               │
               ▼
   [ cv_bridge (Python / YOLOv12 / ByteTrack) ]
   - Zero facial recognition (privacy by design)
   - Spatial bounding boxes, tripwire crossing vectors, count metrics
               │
               ▼ (HTTP POST /api/observations — Bearer Token)
   [ Spring Boot 4.1.2 Backend Engine (Java 21) ]
   ┌────────────────────────────────────────────────────────┐
   │ 1. Ingestion Pipeline Buffer                          │
   │ 2. Sensor Fusion Service (Zone Density & Pressure)    │
   │ 3. Short-Horizon Forecasting (15m, 30m, 45m, 60m)      │
   │ 4. Recommendation Engine (Intervention Proposals)     │
   │ 5. Audit Logging & State Lifecycle Management         │
   └────────────────────────┬───────────────────────────────┘
                            │
         ┌──────────────────┴──────────────────┐
         ▼                                     ▼
[ PostgreSQL 18 Persistence ]     [ Next.js 16 / React 19 Frontend ]
- Profiles & Clerk RBAC           - Organizer Command Center
- Restaurant Telemetry            - 3D Wankhede Stadium Twin
- Operational Interventions       - Human-in-the-Loop Approvals
- Immutable Audit Events          - Simulation & Telemetry Controls
                                               │
                                               ▼
                              [ Flutter Mobile Attendee App ]
                              - Live Egress Routing & Advisories
                              - Dynamic Hospitality Food Vouchers
```

1. **Detection:** Edge CCTV cameras process video streams through the Python `cv_bridge` running YOLOv12 and ByteTrack, calculating crowd counts and directional flux without capturing biometrics.
2. **Ingestion:** Edge devices serialize normalized observation batches and post them to `/api/observations` guarded by an edge device secret.
3. **Fusion:** The backend sensor fusion engine correlates observations with zone geometry, calculating real-time density, capacity percentages, and pressure levels.
4. **Forecasting:** The forecasting service projects crowd trends 15, 30, 45, and 60 minutes into the future based on active event scenarios and scenario velocity factors.
5. **Recommendation Generation:** When zone pressure exceeds safe operational thresholds, the recommendation engine drafts structured interventions (e.g., "Redirect Gate 3 to Gate 5").
6. **Operator Review:** The event organizer inspects the intervention on the web dashboard, reviews the rationale and confidence score, and approves or rejects the action.
7. **Execution & Audit:** Approved interventions are marked for execution, notifications are dispatched to field marshals, and an immutable record is committed to `audit_events`.
8. **Attendee Dispersal:** The Flutter attendee app displays updated route suggestions and promotional hospitality vouchers to disperse crowd pressure.

---

## Screenshots

### Interactive 3D Stadium Digital Twin — Wankhede Stadium
![Interactive 3D Stadium Digital Twin — Wankhede Stadium](/assets/projects/Junction/image.png)

*Interactive 3D Stadium Digital Twin — Wankhede Stadium rendering stand zones, live occupancy levels, crowd ingress controls, and spatial operational context.*

---

## Tech Stack

### Web Command Center
- **Framework:** Next.js 16.3.4 (App Router)
- **Library:** React 19.2.8
- **Language:** TypeScript 5.x
- **3D Graphics & Spatial Rendering:** Three.js 0.174, `@react-three/fiber` 9.8, `@react-three/drei` 10.7, Cesium 1.145
- **Mapping & Charts:** Leaflet 1.9, MapLibre GL 5.1, Recharts 3.10
- **State Management:** Zustand 5.0
- **Authentication:** Clerk Next.js SDK (`@clerk/nextjs` 7.9)

### Backend Engine
- **Runtime:** Oracle Java 21 LTS (HotSpot 64-Bit Server VM)
- **Framework:** Spring Boot 4.1.2 (Spring Framework 6.2)
- **Web Container:** Apache Tomcat 10.1 (embedded)
- **Security:** Spring Security OAuth2 Resource Server (Clerk RS256 JWT validation) + Custom Edge Device Token Filter
- **Data Access:** Spring Data JPA, Hibernate 6.x
- **Connection Pool:** HikariCP 5.1.0
- **Database Migrations:** Flyway 10.x
- **Documentation:** SpringDoc OpenAPI 2.7.0 (Swagger UI)

### Database Layer
- **Engine:** PostgreSQL 18.4 (x86_64)
- **Schema Management:** Flyway SQL Versioned Migrations (`V1__create_junction_schema.sql`)
- **Key Tables:** `profiles`, `restaurants`, `restaurant_memberships`, `restaurant_inventory`, `audit_events`, `operational_interventions`

### Computer Vision Edge Bridge
- **Language:** Python 3.11+
- **Object Detection:** YOLOv12 (`yolov12n.pt`, `yolov12m.pt`)
- **Multi-Object Tracking:** ByteTrack
- **Image Processing:** OpenCV (`cv2`)
- **Inference Transport:** Requests (HTTP REST batch pushing with Bearer token authentication)
- **Privacy Architecture:** Zero facial recognition, zero biometric retention; spatial bounding boxes and directional vectors only

### Mobile Attendee Application
- **Framework:** Flutter 3.x / Dart SDK
- **Platforms:** Android, iOS, Web
- **Networking:** HTTP REST client consuming Spring Boot public telemetry endpoints
- **Features:** Event itinerary, dynamic wayfinding, crowd advisory notices, restaurant voucher discovery

### Testing & Infrastructure
- **Load Testing:** Grafana k6 v1.6.0 (mixed-workload, soak, spike, load, stress suites)
- **Containerization:** Docker & Docker Compose
- **Container Testing:** Testcontainers 1.20.4

---

## Core Modules & Architecture

JUNCTION is organized into distinct, decoupled subsystems adhering to single-responsibility design principles:

### 1. Ingestion Pipeline Module (`IngestionPipelineService`)
- Manages an in-memory concurrent ring buffer of recent spatial observations.
- Normalizes incoming sensor observations against standard schema definitions (`BatchIngestionRequestDto`).
- Enforces edge token validation and schema structure before admitting telemetry into the fusion pipeline.

### 2. Sensor Fusion Engine (`SensorFusionService`)
- Correlates multi-camera observations to registered venue zones.
- Computes weighted crowd density, current occupancy against maximum safe capacity, and dynamic pressure indices (0–100 scale).
- Evaluates sensor coverage profiles to generate data honesty scores reflecting observation age and camera availability.

### 3. Forecasting Module (`ForecastingService`)
- Evaluates active event scenarios (e.g., standard egress, emergency gate closure, severe rain surge).
- Computes crowd trajectory projections across 15, 30, 45, and 60-minute forward horizons.
- Generates early warning signals when projected crowd pressure breaches safe operational thresholds.

### 4. Recommendation Lifecycle Service (`RecommendationLifecycleService`)
- Automated heuristic analysis of fused zone states to propose operational interventions.
- Manages state machine transitions: `PROPOSED` → `APPROVED` / `REJECTED` → `EXECUTED`.
- Enforces strict human-in-the-loop authorization: only users authenticated with the `ORGANIZER` role can approve or reject recommendations.
- Captures operator rationale and records immutable audit events for every state transition.

### 5. Restaurant Partner Coordination Service (`RestaurantService`)
- Maintains the hospitality partner directory categorized by operational zones.
- Accepts live table capacity and available cover updates from restaurant partners.
- Coordinates dynamic dining vouchers to incentivize attendees to remain in entertainment zones rather than rushing to congested transit hubs.

### 6. Audit & Compliance Module (`AuditEventService`)
- Records immutable, append-only operational audit events (`audit_events`).
- Captures actor identity, role, timestamp, target entity, previous state JSON, new state JSON, and operational rationale.
- Guarantees transparency for post-event forensic reviews and safety audits.

---

## Security & Role-Based Access Control

JUNCTION implements multi-layered security across public, edge, and organizer endpoints:

### Authentication Schemes
1. **Edge Device Bearer Authentication:**
   - Dedicated filter (`EdgeDeviceAuthenticationFilter`) protecting `/api/observations`.
   - Requires valid `Authorization: Bearer <JUNCTION_EDGE_DEVICE_SECRET>`.
   - Prevents unauthorized external data injection into the sensor fusion pipeline.

2. **Clerk RS256 OAuth2 Resource Server:**
   - Protects administrative and organizer management routes (`/api/zones`, `/api/recommendations/**`, `/api/audit`, `/api/scenarios` writes).
   - Validates RS256 asymmetric JWT signatures against Clerk's remote JWKS endpoint (`https://working-ladybird-7761.clerk.accounts.dev/.well-known/jwks.json`).
   - Maps external Clerk user identities to internal domain roles using custom JWT claim converters.

3. **Public Telemetry Whitelist:**
   - `/api/health`, `/api/scenarios` (GET), `/api/weather`, `/api/social-signals`, `/api/nugen/intelligence`, and `/api/recommendations/plan` are whitelisted in `SecurityConfig.java` to support public edge telemetry and attendee guidance.

### Role Hierarchy & Permissions
- **ORGANIZER:** Full access to command dashboard, scenario switching, recommendation approval/rejection/execution, partner management, and immutable audit logs.
- **RESTAURANT_PARTNER:** Scoped access to view and update table availability, cover counts, and active promotional vouchers for their assigned restaurant venue (`restaurant_memberships`).
- **ATTENDEE:** Read-only access to public crowd status, route navigation, event schedules, and available dining vouchers.

---

## Engineering Details — API Architecture

The Spring Boot backend exposes REST endpoints mapped to specific controllers and security policies:

| Method | Endpoint | Purpose | Access Control |
|---|---|---|---|
| `GET` | `/api/health` | Check backend service health, container liveness, and active profile | Public (PermitAll) |
| `GET` | `/api/scenarios` | Retrieve available scenarios and active operational scenario configuration | Public (PermitAll) |
| `POST` | `/api/scenarios` | Update the active operational scenario to trigger simulated crowd conditions | `hasRole('ORGANIZER')` |
| `GET` | `/api/observations` | Retrieve recent sensor and CV observations buffer (optionally filtered by `zoneId`) | Public / Internal |
| `POST` | `/api/observations` | Ingest batch of normalized observations from `cv_bridge` or IoT sensors | Bearer Token (Edge Secret) |
| `GET` | `/api/zones` | Retrieve real-time fused operational states and pressure metrics for all venue zones | Public / Authenticated |
| `GET` | `/api/zones/{zoneId}` | Retrieve real-time fused state, capacity, and density metrics for a specific zone | Public / Authenticated |
| `GET` | `/api/zones/coverage` | Retrieve sensor coverage profiles and data honesty scores across all venue zones | Public / Authenticated |
| `GET` | `/api/forecast` | Generate short-horizon crowd surge forecasts across 15, 30, 45, and 60-minute horizons | Public (PermitAll) |
| `GET` | `/api/recommendations` | Retrieve all operational interventions across all lifecycle states | Authenticated (`ORGANIZER`) |
| `POST` | `/api/recommendations/generate` | Evaluate live zone states against density thresholds and generate proposed interventions | Public / System Trigger |
| `POST` | `/api/recommendations/plan` | Generate multi-horizon AI recommendation and heuristic dispatch plan from context | Public (PermitAll) |
| `POST` | `/api/recommendations/{id}/approve` | Approve a proposed intervention and record organizer rationale | `hasRole('ORGANIZER')` |
| `POST` | `/api/recommendations/{id}/reject` | Reject a proposed intervention with documented operator justification | `hasRole('ORGANIZER')` |
| `POST` | `/api/recommendations/{id}/execute` | Mark an approved intervention as actively executed | `hasRole('ORGANIZER')` |
| `GET` | `/api/restaurants` | Retrieve partner restaurant directory and live capacity telemetry (optional zone filter) | Public / Authenticated |
| `POST` | `/api/restaurants/{id}/inventory` | Record live table availability and cover capacity telemetry | `hasAnyRole('ORGANIZER', 'RESTAURANT_PARTNER')` |
| `GET` | `/api/audit` | Retrieve immutable audit event log of operational actions and interventions | `hasRole('ORGANIZER')` |

---

## Engineering Details — Data Model

The PostgreSQL persistence layer is defined via Flyway versioned migration (`V1__create_junction_schema.sql`) and mapped to JPA entity classes:

### 1. `profiles`
User identity records linked to external Clerk authentication. Acts as the anchor for all domain authorizations.
- `id` (UUID, Primary Key, `gen_random_uuid()`)
- `clerk_user_id` (TEXT, NOT NULL, UNIQUE) — Primary external identity reference
- `name` (TEXT) — User display name
- `email` (TEXT, NOT NULL) — User email address
- `role` (ENUM `user_role`: `ORGANIZER`, `RESTAURANT_PARTNER`, `ATTENDEE`)
- `created_at` / `updated_at` (TIMESTAMPTZ, NOT NULL)

### 2. `restaurants`
Hospitality partner venues participating in crowd dispersal and event orchestration.
- `id` (TEXT, Primary Key, e.g., `'R1'`, `'R2'`)
- `name` (TEXT, NOT NULL) — Restaurant business name
- `zone` (TEXT, NOT NULL) — Operational zone identifier (e.g., `'ZONE_A'`, `'ZONE_WANKHEDE'`)
- `cuisine` (TEXT) — Cuisine classification
- `address` (TEXT) — Physical venue address
- `total_capacity` (INTEGER, NOT NULL, DEFAULT 100)
- `available_covers` (INTEGER, NOT NULL, DEFAULT 50)
- `expected_reservations` (INTEGER, NOT NULL, DEFAULT 0)
- `price_range` (TEXT, DEFAULT `'₹₹'`)
- `lat` / `lng` (DOUBLE PRECISION) — Geographic coordinates
- `is_active` (BOOLEAN, NOT NULL, DEFAULT TRUE)
- `created_at` / `updated_at` (TIMESTAMPTZ, NOT NULL)

### 3. `restaurant_memberships`
Scoped role-based access control mapping individual user profiles to specific restaurant partner venues.
- `id` (UUID, Primary Key, `gen_random_uuid()`)
- `profile_id` (UUID, NOT NULL, FOREIGN KEY → `profiles.id` ON DELETE CASCADE)
- `restaurant_id` (TEXT, NOT NULL, FOREIGN KEY → `restaurants.id` ON DELETE CASCADE)
- `role` (ENUM `membership_role`: `OWNER`, `MANAGER`, `STAFF`)
- `created_at` (TIMESTAMPTZ, NOT NULL)
- *Constraint:* `UNIQUE (profile_id, restaurant_id)` prevents duplicate memberships.

### 4. `restaurant_inventory`
Live telemetry and cover capacity updates submitted by restaurant partners.
- `id` (UUID, Primary Key, `gen_random_uuid()`)
- `restaurant_id` (TEXT, NOT NULL, FOREIGN KEY → `restaurants.id` ON DELETE CASCADE)
- `reported_by_profile_id` (UUID, FOREIGN KEY → `profiles.id` ON DELETE SET NULL) — Preserves history on profile deletion
- `available_tables` (INTEGER, NOT NULL, DEFAULT 0)
- `available_covers` (INTEGER, NOT NULL, DEFAULT 0)
- `expected_covers` (INTEGER, NOT NULL, DEFAULT 0)
- `out_of_order_tables` (INTEGER, NOT NULL, DEFAULT 0)
- `notes` (TEXT) — Operational notes
- `recorded_at` (TIMESTAMPTZ, NOT NULL, DEFAULT NOW())

### 5. `audit_events`
Immutable, append-only security and operational audit trail. Rows are never modified or deleted.
- `id` (TEXT, Primary Key)
- `actor_id` (TEXT, NOT NULL) — User ID or system identifier
- `actor_role` (TEXT, NOT NULL) — Role of the actor performing the action
- `category` (TEXT, NOT NULL) — Event classification (e.g., `'RECOMMENDATION_APPROVAL'`, `'SCENARIO_CHANGE'`)
- `target_entity_type` (TEXT, NOT NULL) — Target entity type (e.g., `'INTERVENTION'`, `'SCENARIO'`)
- `target_entity_id` (TEXT, NOT NULL) — ID of the affected entity
- `change_summary` (TEXT, NOT NULL) — Human-readable summary of the action
- `rationale` (TEXT) — Operator justification or automated trigger rationale
- `previous_state_json` (TEXT) — JSON snapshot of entity state prior to change
- `new_state_json` (TEXT) — JSON snapshot of entity state post-change
- `is_simulated_scenario` (BOOLEAN, NOT NULL, DEFAULT TRUE)
- `timestamp` (TIMESTAMPTZ, NOT NULL, DEFAULT NOW())

### 6. `operational_interventions`
Stateful lifecycle management for AI and heuristic-generated recommendations.
- `id` (TEXT, Primary Key)
- `type` (TEXT, NOT NULL) — Intervention type (e.g., `'GATE_REDIRECTION'`, `'TRANSIT_DISPATCH'`, `'HOSPITALITY_INCENTIVE'`)
- `title` (TEXT, NOT NULL) — Short intervention title
- `description` (TEXT, NOT NULL) — Detailed operational instructions
- `target_zone_id` (TEXT, NOT NULL) — Target venue zone ID
- `status` (TEXT, NOT NULL, DEFAULT `'PROPOSED'`) — Lifecycle state: `PROPOSED` | `APPROVED` | `REJECTED` | `EXECUTED`
- `urgency` (TEXT, NOT NULL, DEFAULT `'MEDIUM'`) — Urgency level: `LOW` | `MEDIUM` | `HIGH` | `CRITICAL`
- `requires_approval` (BOOLEAN, NOT NULL, DEFAULT TRUE)
- `approval_role_required` (TEXT) — Role required to approve (typically `'ORGANIZER'`)
- `rationale` (TEXT, NOT NULL) — Mathematical or rule-based reason for recommendation
- `confidence_score` (DOUBLE PRECISION, NOT NULL, DEFAULT 0.8) — AI confidence (0.0 to 1.0)
- `expected_pressure_reduction_percent` (INTEGER, NOT NULL, DEFAULT 0)
- `proposed_at` (TIMESTAMPTZ, NOT NULL, DEFAULT NOW())
- `expires_at` (TIMESTAMPTZ, NOT NULL) — Automatic expiration timestamp if unaddressed
- `approved_at` (TIMESTAMPTZ) — Timestamp of operator approval
- `approved_by_user_id` (TEXT) — Identity of approving operator
- `rejection_reason` (TEXT) — Operator explanation if rejected

---

## Performance Benchmark

A comprehensive load and stress-testing evaluation of the JUNCTION platform was conducted using Grafana k6, targeting the running Spring Boot 4.1.2 backend and PostgreSQL database.

### Benchmark Metrics Summary (Mixed-Workload Load Test)

| Metric | Baseline Configuration | Optimized Production Profile | Parity / Improvement |
|---|---|---|---|
| **Peak REST Throughput** | 350.81 req/sec | **3,284.94 req/sec** | **9.36× throughput increase (+836%)** |
| **Peak Virtual Users** | 250 VUs | **250 VUs** | Sustained high-concurrency peak |
| **Requests Processed (Single Run)** | 28,068 reqs | **262,809 reqs** | Processed in identical 80-second window |
| **Cumulative Campaign Requests** | 207,206 reqs | **737,293 reqs** | Across all k6 suites combined |
| **p95 Latency (at 250 VUs)** | 1,090.26 ms | **59.36 ms** | **18.36× latency reduction** |
| **Median Latency (at 250 VUs)** | 321.46 ms | **15.57 ms** | **20.64× speedup** |
| **Progressive Load p95 Latency** | 472.16 ms | **32.21 ms** | **14.65× latency reduction** |
| **Reported HTTP Failure Rate** | 0.00% (0 errors) | **0.00% (0 errors)** | Zero dropped requests across 262,809 reqs |
| **500 Concurrent Clients Test** | 500 HTTP Polling | **500 HTTP Polling (100% success)** | 4,732/4,732 polling iterations succeeded |

### Test Environment & System Specifications

All benchmark tests were executed on the following standardized local host environment:

- **Host Operating System:** Microsoft Windows 11 Home Single Language (64-bit, Build 10.0.26300)
- **Processor:** 13th Gen Intel(R) Core(TM) i5-13450HX (10 Physical Cores: 6 Performance Cores + 4 Efficient Cores, 16 Logical Threads, base 2.4 GHz, boost up to 4.6 GHz)
- **Memory:** 16.0 GB DDR5 RAM (16,454,352 KB visible system memory)
- **Storage:** PCIe 4.0 NVMe Solid State Drive
- **Java Virtual Machine:** Oracle Java HotSpot(TM) 64-Bit Server VM, build `21.0.11+9-LTS-211`
- **Application Framework:** Spring Boot 4.1.2 on Spring Framework 6.2.x
- **Embedded Web Container:** Apache Tomcat 10.1.x (max-threads: 200, min-spare-threads: 10)
- **Database Engine:** PostgreSQL 18.4 (x86_64-windows, MSVC 19.44, 64-bit) listening on port 5432
- **Connection Pool:** HikariCP 5.1.0
- **Load Testing Engine:** Grafana k6 v1.6.0 (`go1.23.6`, `windows/amd64`)

### Bottleneck Identification & Optimization Actions

Under baseline testing with 250 concurrent virtual users, p95 latency reached 1,090.26 ms due to two system bottlenecks:

1. **HikariCP Connection Pool Starvation:** The default development configuration set `maximum-pool-size: 5`. With 250 concurrent Tomcat worker threads contending for database transactions, 245 threads were blocked waiting in `HikariPool.getConnection()`.
2. **Standard I/O Console Saturation:** Verbose Hibernate SQL statement logging printed hundreds of thousands of lines to the Windows PowerShell terminal, saturating ConHost/OpenConsole buffers and blocking worker threads on `System.out` synchronization locks.

**Targeted Configuration Optimizations Applied:**

```yaml
# backend/src/main/resources/application-dev.yml
spring:
  datasource:
    hikari:
      maximum-pool-size: 25          # Scaled from 5 to 25 connections
      minimum-idle: 5                # Pre-warmed pool baseline
      connection-timeout: 30000
      idle-timeout: 600000
      max-lifetime: 1800000
  jpa:
    show-sql: false                  # Disabled stdout console dump
logging:
  level:
    org.hibernate.SQL: WARN          # Switched from DEBUG to WARN
    org.hibernate.type.descriptor.sql: WARN
```

Following this tuning, peak throughput jumped to **3,284.94 req/s** (+836%) and p95 latency dropped to **59.36 ms** under peak 250 VU load.

### Important Benchmark Constraints & Accuracy Disclaimers

1. **Local Benchmark, Not Production Capacity:** All tests were conducted locally on a single workstation with the Spring Boot backend, PostgreSQL database, and k6 test runner co-located. This setup eliminates real-world network routing, public internet latency, and cloud load-balancer overhead. These results measure application framework, JVM, and database engine execution limits, and should not be interpreted as guaranteed production cloud deployment throughput.
2. **Real-Time Client Architecture & WebSocket Clarification:** The current Spring Boot backend does not register a WebSocket or STOMP broker (`@EnableWebSocketMessageBroker` is not enabled). The real-time web console and mobile clients maintain situational awareness via active HTTP polling and Server-Sent Events (SSE). During the 500-client concurrency test, clients probe `/ws`, receive an uninstrumented HTTP 404, and seamlessly execute the HTTP polling fallback against `/api/scenarios` and `/api/observations`. The polling fallback maintained a **100.00% success rate across 4,732 requests with 0 dropped sessions**. JUNCTION makes **no claim** of native WebSocket concurrency.

---

## Installation & Development Setup

### Prerequisites
- Node.js 20+
- Java 21 LTS
- PostgreSQL 16+
- Python 3.11+
- Flutter SDK (for mobile attendee development)
- Docker & Docker Compose (optional)

### 1. Database Setup
```bash
# Create local PostgreSQL database
createdb -U postgres junction_db

# Migrations are automatically applied by Spring Boot via Flyway on startup
```

### 2. Spring Boot Backend Setup
```bash
cd backend

# Verify build and dependencies
./mvnw clean compile

# Run Spring Boot backend on port 8080
./mvnw spring-boot:run
```

### 3. Next.js Web Command Center Setup
```bash
cd frontend

# Install dependencies
npm install

# Run Next.js development server on port 3000
npm run dev
```

### 4. Computer Vision Bridge Setup
```bash
cd cv_bridge

# Create and activate virtual environment
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\Activate.ps1

# Install requirements
pip install -r requirements.txt

# Run inference stream pointing to Spring Boot
python -m cv_bridge.inference \
  --video shared/assets/test-videos/demo_cctv.mp4 \
  --zone-id ZONE_WANKHEDE \
  --camera-id DEV_CCTV_WANKHEDE_01 \
  --resource-id WANKHEDE_EXIT \
  --http-url http://localhost:8080/api/observations \
  --frame-stride 2
```

### 5. Flutter Mobile Attendee App Setup
```bash
cd mobile/attendee_flutter_app

# Fetch Flutter dependencies
flutter pub get

# Run on connected device or emulator
flutter run
```

---

## Repository Structure

```
JUNCTION/
├── backend/                             # Java 21 / Spring Boot 4.1.2 backend service
│   ├── pom.xml                          # Maven build configuration
│   └── src/
│       ├── main/java/com/junction/
│       │   ├── controller/              # REST controllers (Observations, Zones, Forecasts, Recommendations)
│       │   ├── service/                 # Business logic (Sensor Fusion, Forecasting, Ingestion, Lifecycle)
│       │   ├── entity/                  # JPA entities (Profiles, Restaurants, AuditEvents, Interventions)
│       │   ├── repository/              # Spring Data JPA repositories
│       │   ├── security/                # Clerk JWT validation & Edge authentication filters
│       │   └── health/                  # Health & liveness endpoints
│       └── main/resources/
│           ├── application.yml          # Core Spring Boot configuration
│           ├── application-dev.yml      # Optimized local dev profile (HikariCP pool: 25)
│           └── db/migration/            # Flyway SQL migrations (V1__create_junction_schema.sql)
├── frontend/                            # Next.js 16 / React 19 web command center
│   ├── package.json                     # NPM dependencies (Three.js, Cesium, Zustand, Clerk)
│   ├── public/                          # Public static assets & 3D models
│   └── src/
│       ├── app/                         # App Router pages (/organizer, /organizer/stadium, /attendee)
│       └── components/                  # 3D stadium viewer, zone heatmaps, recommendation cards
├── cv_bridge/                           # Python edge computer-vision pipeline
│   ├── inference.py                     # YOLOv12 detection & ByteTrack tracking loop
│   ├── metrics.py                       # Density calculation & tripwire directional flux
│   ├── observation_serializer.py        # Normalization to JUNCTION-NormalizedObservation-v1.0.0
│   └── transport.py                     # Multi-channel transport (HTTP REST with Bearer auth)
├── mobile/
│   └── attendee_flutter_app/            # Flutter cross-platform mobile client
├── contracts/
│   └── openapi.yaml                     # OpenAPI 3.0 specification contract
├── docs/                                # Technical documentation & benchmark artifacts
│   ├── JUNCTION_K6_PERFORMANCE_REPORT.md# Full k6 benchmark report & tuning log
│   └── performance-results/             # Raw k6 test summary JSON files
├── scripts/
│   └── testing/k6/                      # Automated k6 load-testing test suite
└── README.md                            # Main project overview
```

---

## Authors & Links

- **Repository:** [GitHub Repository](https://github.com/SujalPatil21/Junction)
- **Documentation Route:** `/projects/junction`
- **Author:** Sujal Patil — [GitHub Profile](https://github.com/SujalPatil21)
- **License:** MIT License
