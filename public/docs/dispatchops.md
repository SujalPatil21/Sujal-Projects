[![Node.js](https://img.shields.io/badge/Node.js-20+-68a063?logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=black)](https://react.dev/)
[![Java](https://img.shields.io/badge/Java-21-f89820?logo=openjdk&logoColor=white)](https://openjdk.org/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5-6db33f?logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![OptaPlanner](https://img.shields.io/badge/OptaPlanner-10.2-e01563?logo=redhat&logoColor=white)](https://www.optaplanner.org/)
[![GraphHopper](https://img.shields.io/badge/GraphHopper-OSM%20Routing-2c3e50)](https://www.graphhopper.com/)
[![AWS CDK](https://img.shields.io/badge/AWS%20CDK-v2-ff9900?logo=amazon-aws&logoColor=white)](https://aws.amazon.com/cdk/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT--0-green.svg)](./LICENSE)


# Navi Mumbai Emergency Medical Supply Delivery & Route Optimization Platform

![Navi Mumbai Medical Logistics Command Center](https://raw.githubusercontent.com/SujalPatil21/DISPATCHOPS/main/docs/imgs/demo_screenshot.jpeg)

## Overview

In critical medical logistics and next-day pharmaceutical delivery, deciding **which vehicle should carry each consignment, in what sequence, and along exact road network paths** is a high-stakes multi-objective Optimization Problem. Dispatch operations must strictly enforce hard business constraints — vehicle volume/weight capacities, hospital delivery time windows, and priority tiers — while minimizing total route distances, travel durations, and fleet operating costs.

This project delivers an enterprise-grade **Medical Logistics Command Center & Route Optimization Platform** specifically tailored for **Navi Mumbai & Mumbai Metropolitan Region**.

> **Complete Guides & Architectural Documentation**:
> * **[PROJECT_EXPLAINER.md](./PROJECT_EXPLAINER.md)** — Comprehensive plain-language guide detailing the real-world problem being solved, component breakdown (*kon kya kaam kar raha hai*), and unique 3D/decision-intelligence innovations.
> * **[implementation-current.md](./implementation-current.md)** — Reverse-engineered technical architecture reference covering OptaPlanner constraints, GraphHopper road matrix cache, REST endpoints, and DynamoDB schema.
> * **[design.md](./design.md)** — Complete frontend design specification describing the Cloudscape design system, MapLibre 3D WebGL integration, and UI states.


---

## What Problem Are We Solving?

In emergency healthcare delivery (servicing 17 hospitals, trauma centers, and diagnostic clinics across Navi Mumbai):
1. **Critical Delivery Windows**: Hospitals require life-saving emergency drugs, blood supplies, and diagnostic reagents delivered within strict time windows (Morning ICU vs Afternoon Standard Supply).
2. **Vehicle Loading Bounds**: Delivery vans have strict physical limits on both volume ($m^3$) and payload weight ($kg$). Overloading a vehicle violates transport safety regulations.
3. **Complex Fleet Trade-offs**:
  * **Company-Owned Fleet**: Primary temperature-controlled refrigerated vans with lower operating costs.
  * **Contracted Fleet**: Auxiliary third-party emergency vehicles activated only when owned capacity is saturated (incurs extra surcharge costs).
4. **Real City Road Networks**: In city traffic, straight-line distance ("as the crow flies") is useless. A hospital 5 km away as the crow flies might require a 14 km drive through city expressways, flyovers, and one-way streets.
5. **Multi-Order Consolidation**: Multiple orders placed by the same hospital complex should be delivered together by a single vehicle rather than sending multiple separate trucks.

Our platform takes daily hospital supply orders, computes exact driving paths using **real OpenStreetMap road graphs**, and uses **OptaPlanner AI constraint algorithms** to automatically determine vehicle assignments and stop sequences.

---

## ️ System Architecture & Component Breakdown

The application is divided into three core layers:

```text
┌────────────────────────────────────────────────────────────────────────┐
│           1. FRONTEND COMMAND CENTER            │
│        React 19 + AWS Cloudscape + MapLibre GL 3D       │
│                                    │
│ - User Interface for Dispatchers                   │
│ - Live 3D Tactical Radar Map (3D Buildings, Satellite Imagery)    │
│ - Decision intelligence and operational planning tools                  │
└───────────────────────────────────┬────────────────────────────────────┘
                  │ (REST API Requests)
                  ▼
┌────────────────────────────────────────────────────────────────────────┐
│          2. OPTIMIZATION & ROUTING ENGINE           │
│      Java 21 + Spring Boot + OptaPlanner + GraphHopper      │
│                                    │
│ - DispatchController & DispatchService: Ingests orders & jobs    │
│ - OptaPlanner 9.x: Solves VRPTW math constraints           │
│ - GraphHopper 8.0: Calculates exact OSM road driving matrices     │
└───────────────────────────────────┬────────────────────────────────────┘
                  │ (Persistence & Storage)
                  ▼
┌────────────────────────────────────────────────────────────────────────┐
│           3. AWS CLOUD INFRASTRUCTURE            │
│             AWS CDK (TypeScript)              │
│                                    │
│ - ECS Fargate: Containerized OptaPlanner & GraphHopper Services   │
│ - DynamoDB: High-speed storage for Solver Jobs & Delivery Jobs    │
│ - API Gateway: Secure HTTP routing to backend containers       │
│ - S3: OSM map data & CSV batch order storage             │
└────────────────────────────────────────────────────────────────────────┘
```

### Component Roles
* **Frontend Command Center ([`apps_web/`](./apps_web))**: Built with React 19, TypeScript, Vite, AWS Cloudscape Design System, and MapLibre GL JS 3D.
* **Optimization Engine ([`apps_opt_engine/`](./apps_opt_engine))**: Java 21, Spring Boot 3.x, OptaPlanner 9.x (enforcing 11 score constraints), and GraphHopper 8.0 OSM routing engine.
* **Cloud Infrastructure ([`apps_infra/`](./apps_infra))**: AWS CDK in TypeScript provisioning ECS Fargate containers, DynamoDB, S3, API Gateway v2, and Cognito.

---

## End-to-End Workflow

The platform follows this operational workflow:

1. Dispatcher opens the delivery command center.
2. Delivery orders and available vehicle information are loaded.
3. Orders contain operational requirements such as destination, delivery window, priority and payload requirements.
4. The optimization engine receives the delivery job.
5. GraphHopper uses OpenStreetMap road data to calculate realistic driving distances and travel times.
6. OptaPlanner evaluates vehicle assignments and delivery sequences against the configured constraints.
7. The solver balances hard operational constraints and optimization objectives to produce a delivery plan.
8. The resulting vehicle assignments, stop sequences, route information and solver metrics are returned to the application.
9. The frontend presents the result through the optimization dashboard, vehicle capacity indicators, warnings, explanations and the interactive map.
10. Dispatchers can compare the optimized result with a baseline, inspect assignment reasoning and evaluate operational risks.
11. When conditions change, the dispatcher can trigger re-optimization or run a non-destructive what-if scenario.
12. The dispatcher uses the resulting information to understand and operate the delivery plan.

## Operational Capabilities

### Medical Delivery Planning

The platform accepts daily medical supply orders and available fleet information and produces an optimized dispatch plan. Orders can represent emergency medicines, blood supplies, diagnostic reagents and other time-sensitive healthcare deliveries.

The planning process considers:
- Delivery locations
- Delivery time windows
- Vehicle volume and payload limits
- Customer or hospital priority
- Vehicle ownership and operating cost
- Depot proximity
- Multiple deliveries to the same healthcare location

The result is a vehicle assignment and delivery sequence that can be inspected by the dispatcher.

### Constraint and Risk Awareness

The optimization workflow makes important operational constraints visible to the dispatcher.

The system can identify situations such as:
- Tight delivery windows
- Capacity overload
- Priority delivery risk
- Use of contracted vehicles and associated operating cost
- Other conditions that affect the quality or feasibility of the delivery plan

This provides operational context around the solver result rather than presenting only a list of routes.

### Assignment Explainability

A delivery assignment can be inspected using the information available from the optimized plan.

The application presents decision context such as:
- Compatibility with the delivery time window
- Vehicle capacity
- Depot proximity
- Delivery priority
- Operational cost considerations

This helps dispatchers understand why a particular assignment was produced.

### Interactive Route Visualization

The command center provides a MapLibre GL-based 3D map for understanding the generated delivery plan geographically.

The visualization supports:
- Route polylines
- Delivery waypoints
- Stop sequence markers
- Multiple vehicle routes
- 3D building visualization
- Satellite and vector map presentation
- Interactive camera controls
- Route direction context

The map connects the optimization result to the actual metropolitan road environment.

### Optimization Comparison

When a valid baseline is available, the application can compare it with the optimized plan.

The comparison can show:
- Total route distance
- Travel time
- Fleet utilization
- Distance reduction
- Travel-time reduction
- Solver score

This makes the effect of optimization measurable instead of relying only on visual inspection.

### Dynamic Re-optimization

Delivery operations can change after an initial plan has been generated. Vehicle availability, capacity conditions or emergency requirements may require the dispatch plan to be recalculated.

The dispatcher can trigger another optimization cycle using the existing solver workflow so that the plan can adapt to changed operating conditions.

### What-If Planning

The platform also supports non-destructive scenario analysis.

A dispatcher can evaluate hypothetical situations such as:
- A demand increase
- A reduction in available fleet
- Additional travel-time or traffic delays
- Other operational changes

The purpose is to understand how the delivery plan responds to changing conditions without directly modifying production records.

---

## End-to-End Operational Workflow

1. The dispatcher opens the medical logistics command center.
2. Daily healthcare delivery orders and available vehicle information are loaded.
3. Each order is evaluated according to its destination, delivery window, priority and payload requirements.
4. The optimization engine receives the delivery job.
5. GraphHopper uses OpenStreetMap road data to calculate realistic road distances and travel times.
6. OptaPlanner evaluates vehicle assignments and delivery sequences against the configured constraints.
7. The solver produces an optimized dispatch plan.
8. The resulting assignments, stop sequences, route information and solver metrics are returned to the application.
9. The command center presents the plan through operational dashboards, capacity information, risk indicators, assignment explanations and the interactive map.
10. The dispatcher can inspect individual assignments and understand the operational reasoning behind them.
11. A valid baseline can be compared with the optimized plan to quantify the improvement.
12. If operating conditions change, the dispatcher can trigger re-optimization.
13. Hypothetical changes can be evaluated through non-destructive scenario analysis.
14. The resulting plan gives the dispatcher a practical view of how the fleet should execute the day's healthcare deliveries.

## Demo Dataset: Navi Mumbai Healthcare Outposts

The application comes pre-seeded with 17 key healthcare locations across Navi Mumbai:
* **Central Warehouse Hub**: Vashi Medical Logistics Depot / Belapur Central Warehouse.
* **Hospitals & Outposts**:
 * Panvel Advanced Trauma Care Centre
 * Seawoods Advanced Diagnostics Hub
 * Juinagar Community Healthcare Centre
 * Rabale Industrial Health Clinic
 * Metro Hospital & Emergency Centre, Vashi
 * Nerul Specialty Medical Centre
 * Sanpada Multi-Specialty Clinic
 * Airoli Critical Care Institute
 * Kharghar Diagnostic Lab
 * Kamothe Primary Health Centre
 * Kalamboli Emergency Supply Depot
 * Taloja Industrial Medical Centre
 * Belapur Sector 15 Healthcare Hub
 * Uran Coastal Health Outpost
 * Ulwe Community Medical Centre
 * Ghansoli Pharma Distribution Point

---

## Quickstart & Local Setup

### Prerequisites
* **Node.js**: `v20.x` or higher
* **pnpm**: `v9.x` or higher
* **Java SDK**: OpenJDK 21
* **Gradle**: Included Gradle wrapper (`./gradlew`)

### 1. Web Application Setup
```bash
# Clone the repository
git clone https://github.com/NihalMishra3009/D-caps.git
cd D-caps

# Install web dependencies
cd apps_web
pnpm install

# Start the local development server
pnpm dev --port 3000
```
Open [http://localhost:3000](http://localhost:3000) in your browser to access the Command Center.

### 2. Optimization Engine Setup (Optional Backend)
```bash
cd apps_opt_engine

# Build the Java Spring Boot applications
./gradlew build -x test

# Run the Next-Day Delivery Solver service locally
./gradlew :apps:nextday-delivery:bootRun --args="--spring.profiles.active=dev"
```

### 3. AWS Infrastructure

The project includes an AWS CDK infrastructure layer in [`apps_infra/`](./apps_infra).
It defines the cloud infrastructure used by the platform, including the networking,
compute, storage and API components.

For infrastructure details, see the [Architecture Guide](./docs/architecture.md).

```bash
cd apps_infra
pnpm install
npx cdk synth
```

> **Note:** AWS deployment is not required to run the core optimization workflow locally.
> The project can be developed and demonstrated using the frontend and optimization
> engine setup described above.

---

## Recent Changes

### Mumbai / Navi Mumbai Migration
- Migrated the routing configuration from the previous South Korea OSM extract to **Geofabrik's Western India (`western-zone-latest.osm.pbf`) extract** for Mumbai, Navi Mumbai and Maharashtra.
- Updated GraphHopper runtime configuration to use `western-zone-latest.osm.pbf`.
- Updated the optimization-engine Docker build configuration to package the Western India OSM data.
- Updated the local optimization-engine build script to use the Western India OSM source.

### Optimization & Frontend
- Added the **Optimization Summary Dashboard** with delivery, fleet, distance, travel-time, utilization and solver metrics.
- Added **per-vehicle capacity utilization** indicators.
- Added constraint/risk warnings and assignment explanations.
- Added the **3D route visualization** using MapLibre GL.
- Added before-versus-optimized comparison, re-optimization and what-if simulation workflows.
- Documented the current frontend design and technical architecture.

### AWS Infrastructure
- Updated the CDK VPC configuration for `ap-south-1` using explicit Availability Zones.
- Preserved the existing ARM64 ECS/Fargate configuration.
- Updated infrastructure configuration to support the Mumbai/Navi Mumbai routing environment.

---

## Repository Structure

```text
.
├── apps_opt_engine/    # Java 21 Optimization Engine (OptaPlanner + GraphHopper + Spring Boot)
│  ├── apps/
│  │  ├── nextday-delivery/  # VRPTW OptaPlanner Dispatch Engine Service
│  │  └── distancecache-util/ # GraphHopper Distance & Time Matrix Generator Utility
│  └── scripts/         # Dockerfiles & setup scripts
├── apps_web/       # React 19 + TypeScript + AWS Cloudscape UI Application
│  ├── src/
│  │  ├── pages/SolverPage/   # Delivery Job Solver, Dashboard, 3D Map & Capabilities 1-8
│  │  ├── components/      # Reusable UI components & MapLibre wrappers
│  │  └── services/       # API services & mock dispatch data providers
├── apps_infra/      # AWS CDK Infrastructure Stack (ECS Fargate, Lambda, S3, DynamoDB)
├── PROJECT_EXPLAINER.md  # Plain-language guide (Problem statement, kon kya kaam kar raha hai, unique innovations)
├── implementation-current.md # Reverse-engineered technical architecture specification
├── design.md       # Complete frontend design specification
├── docs/         # Documentation, quickstart guides, and screenshots
└── README.md
```

---

---

---

## Authors

- Shreya Awari – [Github](https://github.com/shreyaawari28)
- Sujal Patil – [Github](https://github.com/SujalPatil21)
- Tejas Halvankar – [Github](https://github.com/Tejas-H01)
- Nihal Mishra – [Github](https://github.com/NihalMishra3009)

## License

This sample project is licensed under the MIT-0 License. See the [`LICENSE`](./LICENSE) file for details.


---
description: Use when working with RocketRide pipelines, SDK, components, or configuration
globs: ['**/*.pipe', '**/pipeline*.json', '**/*rocketride*']
---

<!-- ROCKETRIDE:BEGIN -->

# RocketRide: AI Pipeline Builder

Use RocketRide when building AI pipelines, document processing, RAG systems, or data integration.

## Documentation

Full docs: `.rocketride/docs/`

**Read the relevant doc(s) before generating any RocketRide code.**

| File                              | Read when...                                                      |
| --------------------------------- | ----------------------------------------------------------------- |
| ROCKETRIDE_README.md              | Starting any RocketRide work: overview + mandatory setup steps   |
| ROCKETRIDE_QUICKSTART.md          | Writing first pipeline: complete working examples (Python & TS)  |
| ROCKETRIDE_PIPELINE_RULES.md      | Defining pipelines: structure, lane wiring, config rules         |
| ROCKETRIDE_COMPONENT_REFERENCE.md | Choosing/configuring components: all providers and config fields |
| ROCKETRIDE_COMMON_MISTAKES.md     | Before finalizing: known pitfalls to avoid                       |
| ROCKETRIDE_python_API.md          | Python SDK: client methods, types, patterns                      |
| ROCKETRIDE_typescript_API.md      | TypeScript SDK: client methods, types, patterns                  |
| ROCKETRIDE_OBSERVABILITY.md       | Consuming runtime logs, lifecycle events, and pipeline traces     |

## Before Writing ANY RocketRide Code

1. Read `.rocketride/docs/ROCKETRIDE_README.md` for mandatory setup requirements
2. Read the relevant API doc (Python or TypeScript) for your language
3. Read `.rocketride/docs/ROCKETRIDE_PIPELINE_RULES.md` + `.rocketride/docs/ROCKETRIDE_COMPONENT_REFERENCE.md`
4. Read `.rocketride/docs/ROCKETRIDE_COMMON_MISTAKES.md` before finalizing
<!-- ROCKETRIDE:END -->


# Change log
Change log for optimizing delivery route and order dispatching sample

## ver. 2.0.0
### Features
* migrated project layout into three self-contained workspaces: `apps_opt_engine`, `apps_web`, `apps_infra`
* replaced top-level lerna + yarn-workspace monorepo with independent pnpm / Gradle projects

### Optimization Engine (`apps_opt_engine`)
* migrated from Quarkus 2.x (Maven multi-module) to **Spring Boot 3.5 + Gradle 8.x (Kotlin DSL) on JDK 21**
* replaced `javax.*` APIs with `jakarta.*` for Spring Boot 3.x / OptaPlanner 9+ compatibility
* upgraded OptaPlanner to **10.2.0** (retained solver-config.xml, Constraint Streams, HardMediumSoftLongScore)
* upgraded GraphHopper to **11.0** (removed deprecated `CarFlagEncoder`/`FlagEncoderFactory`, profile registration by name)
* replaced SmallRye Health with Spring Actuator + custom `GraphHopperHealthIndicator`
* replaced Quarkus `%dev`/`%test` profiles with Spring `application-dev.properties` / `application-test.properties`
* upgraded AWS SDK v2 BOM to **2.42.19**
* introduced `build_opt_engine.sh` that auto-downloads the OSM PBF from Geofabrik when missing and packages two deployable ECS artifacts (`distancecache-util`, `nextday-delivery`)

### Web App (`apps_web`)
* migrated from Create React App + yarn to **Vite 7 + pnpm** on **Node.js 20+**
* upgraded React **17 → 19** and TypeScript **4.x → 5.7**
* replaced `aws-northstar` UI with **Cloudscape Design System 3**
* upgraded `aws-amplify` **4 → 6** (modular imports, `fetchAuthSession`-based auth headers)
* upgraded `react-router-dom` **5 → 7** (replaced `Switch`/`useHistory` with `Routes`/`useNavigate`)
* upgraded `react-map-gl` **6 → 8** and switched from Mapbox GL JS to **MapLibre GL JS v5 + OpenFreeMap**, eliminating the `MAPBOX_TOKEN` runtime dependency
* removed unused legacy dependencies (`react-intl`, `chart.js`, `react-chartjs-2`, `react-dropzone`, `react-dropzone-uploader`, `react-image-gallery`, `kaktana-react-lightweight-charts`, `worker-loader`, `web-vitals`, `react-scripts`)
* flat-config ESLint 9 + Prettier 3 integration

### Infrastructure (`apps_infra`)
* migrated from lerna + yarn-workspace monorepo (8 `@infra/*` packages) to a **single self-contained pnpm package**
* upgraded AWS CDK to **2.252** and TypeScript to **5.6**; upgraded Lambda runtime to **Node.js 24**
* migrated AWS SDK **v2 → v3** (modular clients) in Lambda handlers
* introduced **Zod-based config schema validation** on `config/default.yml` with environment variable overrides (`CDK_DEFAULT_ACCOUNT`, `CDK_DEFAULT_REGION`, `ADMINISTRATOR_EMAIL`)
* reorganized stacks into a clear dependency graph: `PersistentBackendStack` → (`BackendStack`, `OrderUploadStack`, `DistanceCacheStack`, `OptimizationEngineStack`)
* added Jest-based CDK unit / integration tests and `cfn-nag` security review task

### Documentation & Governance
* added `docs/quickstart.md` covering requirements, AWS credential setup, build/deploy order, and teardown
* added `docs/architecture.md` and bundled architecture/demo images under `docs/imgs/`
* updated `LICENSE_THIRDPARTY.txt` to reflect the actual dependency graph of the migrated codebase

## ver. 1.0.0
### Features
* order dispatch and delivery route optimization with a warehouse
* route belong real road
* time window by the order
* various vehicle types
* business constraints


## Code of Conduct
This project has adopted the [Amazon Open Source Code of Conduct](https://aws.github.io/code-of-conduct).
For more information see the [Code of Conduct FAQ](https://aws.github.io/code-of-conduct-faq) or contact
opensource-codeofconduct@amazon.com with any additional questions or comments.


# Contributing Guidelines

Thank you for your interest in contributing to our project. Whether it's a bug report, new feature, correction, or additional
documentation, we greatly value feedback and contributions from our community.

Please read through this document before submitting any issues or pull requests to ensure we have all the necessary
information to effectively respond to your bug report or contribution.


## Reporting Bugs/Feature Requests

We welcome you to use the GitHub issue tracker to report bugs or suggest features.

When filing an issue, please check existing open, or recently closed, issues to make sure somebody else hasn't already
reported the issue. Please try to include as much information as you can. Details like these are incredibly useful:

* A reproducible test case or series of steps
* The version of our code being used
* Any modifications you've made relevant to the bug
* Anything unusual about your environment or deployment


## Contributing via Pull Requests
Contributions via pull requests are much appreciated. Before sending us a pull request, please ensure that:

1. You are working against the latest source on the *main* branch.
2. You check existing open, and recently merged, pull requests to make sure someone else hasn't addressed the problem already.
3. You open an issue to discuss any significant work - we would hate for your time to be wasted.

To send us a pull request, please:

1. Fork the repository.
2. Modify the source; please focus on the specific change you are contributing. If you also reformat all the code, it will be hard for us to focus on your change.
3. Ensure local tests pass.
4. Commit to your fork using clear commit messages.
5. Send us a pull request, answering any default questions in the pull request interface.
6. Pay attention to any automated CI failures reported in the pull request, and stay involved in the conversation.

GitHub provides additional document on [forking a repository](https://help.github.com/articles/fork-a-repo/) and
[creating a pull request](https://help.github.com/articles/creating-a-pull-request/).


## Finding contributions to work on
Looking at the existing issues is a great way to find something to contribute on. As our projects, by default, use the default GitHub issue labels (enhancement/bug/duplicate/help wanted/invalid/question/wontfix), looking at any 'help wanted' issues is a great place to start.


## Code of Conduct
This project has adopted the [Amazon Open Source Code of Conduct](https://aws.github.io/code-of-conduct).
For more information see the [Code of Conduct FAQ](https://aws.github.io/code-of-conduct-faq) or contact
opensource-codeofconduct@amazon.com with any additional questions or comments.


## Security issue notifications
If you discover a potential security issue in this project we ask that you notify AWS/Amazon Security via our [vulnerability reporting page](http://aws.amazon.com/security/vulnerability-reporting/). Please do **not** create a public github issue.


## Licensing

See the [LICENSE](LICENSE) file for our project's licensing. We will ask you to confirm the licensing of your contribution.


# Navi Mumbai Medical Logistics Command Center
## Current Frontend Design Document

> **Document Purpose**: This document provides an accurate, complete, and code-verified technical specification of the **CURRENT FRONTEND IMPLEMENTATION** for the Navi Mumbai Medical Supply Delivery & Route Optimization Platform. Every section, component, data flow, and visual description reflects the authoritative source code in [`apps_web/src/`](file:///c:/AWS%20project/delivery-routes-optimization-for-logistics/apps_web/src).

---

### 1. Design Document Purpose

The purpose of this document is to serve as the definitive specification for the existing frontend design and implementation. It details the actual UI components, layout structures, visual themes, state management, MapLibre GL 3D integration, AWS Cloudscape Design System patterns, and Decision Intelligence Features 1–8 as implemented in the codebase.

---

### 2. Current Frontend Overview

The frontend is an enterprise-grade **Medical Logistics Command Center** designed for order dispatchers and fleet planners managing temperature-controlled pharmaceutical deliveries across Navi Mumbai & Seoul Metropolitan regions.

* **Primary Application Goal**: Visualize multi-objective Vehicle Routing Problems with Time Windows (VRPTW), inspect vehicle capacity loading, review decision explanations, render 3D turn-by-turn road trajectories, execute on-demand re-optimizations, and perform what-if scenario simulations.
* **UI Theme**: Dark-mode tactical command center built with AWS Cloudscape Design System, augmented with WebGL 3D MapLibre satellite radar visualization.

---

### 3. Technology & Design System

#### Core Stack
* **Framework**: React 19 (`react`, `react-dom`)
* **Language**: TypeScript (`v5.7`)
* **Build Tooling & Dev Server**: Vite (`v7.3`)
* **Routing**: React Router (`v6.30`) with nested route modules
* **Design System**: AWS Cloudscape Design System (`@cloudscape-design/components`, `@cloudscape-design/global-styles`)
* **3D Map Engine**: MapLibre GL JS (`v6.4`), WebGL 3D building fill-extrusion layers
* **2D Map Fallback**: React Leaflet (`react-leaflet`, `leaflet`)
* **Icons & Micro-interactions**: Lucide React (`lucide-react`), Canvas Confetti (`canvas-confetti`)
* **Polyline Processor**: Mapbox Polyline (`@mapbox/polyline`)

---

### 4. Application Architecture

```text
[Browser Navigation]
        ↓
   AppRoot (AuthenticatedUserContextProvider, BrowserRouter)
        ↓
   AppLayout (AppHeader, SideNavigation, BreadcrumbGroup, CSAppLayout)
        ↓
  Nested Routes (Outlet)
        ├── HomePage (Overview & 3D Radar)
        ├── CustomerLocationRouter (List & Details)
        ├── WarehouseRouter (List & Details)
        ├── VehicleRouter (List & Details)
        ├── OrderRouter (List & Details)
        ├── DistanceCacheRouter (List & Details)
        └── SolverPageRouter (SolverJobQueryProvider, DeliveryJobQueryProvider)
                 ├── SolverJobList (Historical Runs)
                 └── DeliveryJobList (Main Command Center & Features 1–8)
```

#### State Management & API Layer
* **Context Providers**: `AuthenticatedUserContextProvider`, `SolverJobQueryProvider`, `DeliveryJobQueryProvider`.
* **API Handlers**: `apps_web/src/api/Common.ts` (Mock/Local Storage DB handler with Navi Mumbai initial datasets) & `apps_web/src/api/NextDayDelivery.ts`.

---

### 5. Page & Route Structure

| Page Name | Route Path | Purpose | Key File |
| :--- | :--- | :--- | :--- |
| **Command Center Home** | `/` | Operational network summary & 3D radar preview | [`HomePage/index.tsx`](file:///c:/AWS%20project/delivery-routes-optimization-for-logistics/apps_web/src/pages/HomePage/index.tsx) |
| **Customer Locations List** | `/customer-location` | Hospital & clinic destination registry | [`CustomerLocation/List/index.tsx`](file:///c:/AWS%20project/delivery-routes-optimization-for-logistics/apps_web/src/pages/CustomerLocation/List/index.tsx) |
| **Customer Location Details**| `/customer-location/:id` | Individual healthcare facility record | [`CustomerLocation/Details/index.tsx`](file:///c:/AWS%20project/delivery-routes-optimization-for-logistics/apps_web/src/pages/CustomerLocation/Details/index.tsx) |
| **Warehouses List** | `/warehouse` | Logistics hub & depot registry | [`Warehouse/List/index.tsx`](file:///c:/AWS%20project/delivery-routes-optimization-for-logistics/apps_web/src/pages/Warehouse/List/index.tsx) |
| **Warehouse Details** | `/warehouse/:id` | Individual warehouse depot record | [`Warehouse/Details/index.tsx`](file:///c:/AWS%20project/delivery-routes-optimization-for-logistics/apps_web/src/pages/Warehouse/Details/index.tsx) |
| **Vehicles Fleet List** | `/vehicle` | Fleet van registry & capacities | [`Vehicle/List/index.tsx`](file:///c:/AWS%20project/delivery-routes-optimization-for-logistics/apps_web/src/pages/Vehicle/List/index.tsx) |
| **Vehicle Details** | `/vehicle/:id` | Individual vehicle specification | [`Vehicle/Details/index.tsx`](file:///c:/AWS%20project/delivery-routes-optimization-for-logistics/apps_web/src/pages/Vehicle/Details/index.tsx) |
| **Consignment Orders List** | `/order` | Daily batch orders registry | [`Order/List/index.tsx`](file:///c:/AWS%20project/delivery-routes-optimization-for-logistics/apps_web/src/pages/Order/List/index.tsx) |
| **Distance Cache List** | `/distance-cache` | GraphHopper road matrix status | [`DistanceCache/List/index.tsx`](file:///c:/AWS%20project/delivery-routes-optimization-for-logistics/apps_web/src/pages/DistanceCache/List/index.tsx) |
| **Solver Runs List** | `/solver-job` | OptaPlanner dispatch runs history | [`SolverJobList/index.tsx`](file:///c:/AWS%20project/delivery-routes-optimization-for-logistics/apps_web/src/pages/SolverPage/SolverJobList/index.tsx) |
| **Dispatch Command Center** | `/solver-job/:solverJobId` | Main solver inspection UI (Features 1–8) | [`DeliveryJobList/index.tsx`](file:///c:/AWS%20project/delivery-routes-optimization-for-logistics/apps_web/src/pages/SolverPage/DeliveryJobList/index.tsx) |

---

### 6. Main Command Center Layout

The main solver UI ([`DeliveryJobList/index.tsx`](file:///c:/AWS%20project/delivery-routes-optimization-for-logistics/apps_web/src/pages/SolverPage/DeliveryJobList/index.tsx)) uses a split two-column dashboard design:

1. **Header & Dashboard Banner**:
   - Cloudscape `Header` with action buttons (`Solver Runs`, `What-If Simulation`, `Re-Optimize Run`, `Refresh`).
   - Feature 1 Summary Dashboard (`Grid` with 7 metric boxes).
2. **Left Column (5 / 12 width)**:
   - Feature 2 Vehicle Table (`Table` with single selection, capacity utilization progress bars, overload badges, sorting).
3. **Right Column (7 / 12 width)**:
   - Interactive Cloudscape `Tabs`:
     - **Tab 1**: Feature 4 Assignment Explanation (`KeyValuePairs` for vehicle & drop rationale).
     - **Tab 2**: Feature 3 Constraint & Risk Diagnostics (`Alert` list for violations).
     - **Tab 3**: Feature 6 Before vs. Optimized Comparison (`Grid` comparing direct runs vs consolidated runs).
   - Assigned Hospital & Clinic Stops Table (`Table` for route stop sequence).
   - Feature 5 Interactive 3D Route Map (`NextDayDeliveryMap` with 3D/2D views).

---

### 7. Navigation & Header

* **AppHeader**: Top fixed bar displaying `"Navi Mumbai Medical Logistics Command Center"` and active user menu dropdown (`Local Admin`).
* **SideNavigation**: Left collapsable drawer categorized into:
  - **Overview & Command**: Overview link (`/`).
  - **Operations**: Customer Locations (`/customer-location`), Warehouses & Hubs (`/warehouse`), Vehicles Fleet (`/vehicle`), Consignment Orders (`/order`).
  - **Optimization Engine**: Distance Cache Matrix (`/distance-cache`), Solver & Dispatch Jobs (`/solver-job`).
* **BreadcrumbGroup**: Dynamic breadcrumbs tracking route hierarchy (e.g. `Home / Solver Jobs / job-mum-01`).

---

### 8. Optimization Summary Dashboard (Feature 1)

Located at the top of [`DeliveryJobList/index.tsx`](file:///c:/AWS%20project/delivery-routes-optimization-for-logistics/apps_web/src/pages/SolverPage/DeliveryJobList/index.tsx):

* **Component Structure**: Cloudscape `Container` with a 7-column `Grid`.
* **Metrics Rendered**:
  1. **Total Orders**: Count of unique hospital delivery stops.
  2. **Fleet Vehicles**: Count of active dispatched vehicles.
  3. **Total Distance**: Total route distance in kilometers (`km`).
  4. **Est. Travel Time**: Estimated duration in minutes (`mins`).
  5. **Fleet Utilization**: Overall volume/weight fill percentage (`%`).
  6. **Solver Runtime**: Convergence duration extracted from `solverJob.solverDurationInMs` (e.g., `1.42s`).
  7. **OptaPlanner Score**: Solver score penalty string (e.g., `0hard/0medium/-184200soft`).

---

### 9. Delivery / Vehicle Table (Feature 2)

Located in [`DeliveryJobList/table-columns.tsx`](file:///c:/AWS%20project/delivery-routes-optimization-for-logistics/apps_web/src/pages/SolverPage/DeliveryJobList/table-columns.tsx):

* **Columns**:
  - `carNo` (Vehicle Reg No., styled blue text)
  - `deliveryTimeGroup` (Time Band, styled Cloudscape `Badge`)
  - `orderCount` (Assigned hospital drops count)
  - `loadCapacity` (Assigned load in `kg`)
  - `maxCapacity` (Max payload limit in `kg`)
  - `utilization` (Capacity Utilization `ProgressBar`)
  - `createdAt` (Formatted timestamp)
* **Table Features**: Single row selection, automatic selection state synchronization with map and tabs.

---

### 10. Capacity Utilization UI (Feature 2 Details)

* **Component**: Cloudscape `ProgressBar` inside `table-columns.tsx`.
* **Logic**:
  - `utilPct = Math.round((load / max) * 100)`
  - `barValue = Math.min(100, Math.max(0, utilPct))`
  - Status color rules:
    - `< 80%`: Status `in-progress` (Blue)
    - `80–100%`: Status `success` (Green)
    - `> 100%`: Status `error` (Red Overload)
  - Fallback: Returns `"N/A"` if capacity or load is missing, non-numeric, or zero.

---

### 11. Constraint & Risk Warnings (Feature 3)

* **Component**: Rendered inside Tab 2 of [`DeliveryJobList/index.tsx`](file:///c:/AWS%20project/delivery-routes-optimization-for-logistics/apps_web/src/pages/SolverPage/DeliveryJobList/index.tsx).
* **Data Sources & Rules**:
  - **Hard Capacity Overload**: Triggered when `load > maxCapacity`. Rendered as an `error` Alert.
  - **Contracted Fleet Surcharge**: Triggered when `carNo` contains `'CON'` or `isContracted` flag is set. Rendered as a `warning` Alert.
  - **Time-Window Band Tightness**: Triggered when hospital order `deliveryTimeGroup` exceeds vehicle band. Rendered as a `warning` Alert.
* **Empty State**: Displays Cloudscape `StatusIndicator` with type `success`: `"No current constraint or operational warnings."`

---

### 12. Assignment Explanation (Feature 4)

* **Component**: Rendered inside Tab 1 of [`DeliveryJobList/index.tsx`](file:///c:/AWS%20project/delivery-routes-optimization-for-logistics/apps_web/src/pages/SolverPage/DeliveryJobList/index.tsx).
* **Content**:
  - **Vehicle Rationale (`KeyValuePairs`)**: Assigned vehicle registration, time band window, assigned drops count, current vehicle load, maximum payload, and remaining payload capacity.
  - **Selected Drop Rationale (`KeyValuePairs`)**: Appears when a specific hospital stop row is selected in the stops sub-table. Displays hospital code, package weight (`kg`), and target time window.
* **Unselected State**: Displays `"Select an order or vehicle row to view assignment rationale."`

---

### 13. Route Visualization / Map (Feature 5)

* **Component**: [`NextDayDeliveryMap.tsx`](file:///c:/AWS%20project/delivery-routes-optimization-for-logistics/apps_web/src/components/MapComponent/NextDayDeliveryMap.tsx) & [`Interactive3DMap.tsx`](file:///c:/AWS%20project/delivery-routes-optimization-for-logistics/apps_web/src/components/MapComponent/Interactive3DMap.tsx).
* **Map Controls**:
  - **Mode Toggle**: Segmented control switching between `3D Tactical (Three.js & MapLibre)` and `2D OpenStreetMap`.
  - **3D HUD Buttons**: `Zoom into 3D City` (focus flyTo), `3D Buildings: ON/OFF` (toggle fill-extrusion), `Orbit 360°` (continuous camera rotation).
* **Layers**:
  - **Base Imagery**: Photorealistic Esri World Imagery Satellite tiles.
  - **3D Buildings**: OpenFreeMap vector building extrusions height-scaled dynamically.
  - **Route Lines**: Decoded Polyline GeoJSON paths rendered with glowing outline and primary line colors.
  - **Markers**: Floating dark-glass badges with pulsing beacon halos for warehouse hubs and customer stops.

---

### 14. Before vs Optimized Comparison (Feature 6)

* **Component**: Rendered inside Tab 3 of [`DeliveryJobList/index.tsx`](file:///c:/AWS%20project/delivery-routes-optimization-for-logistics/apps_web/src/pages/SolverPage/DeliveryJobList/index.tsx).
* **Calculation Engine**:
  - **Baseline (Unoptimized Direct Runs)**: Computed deterministically by summing round-trip distances ($2 \times \text{directDistance}$) from the depot to each assigned hospital location.
  - **Optimized (OptaPlanner Consolidated)**: Actual route distance and duration totals.
* **Metrics Rendered**:
  - Unoptimized distance (`km`), duration (`mins`), and required individual round-trips.
  - OptaPlanner distance (`km`), duration (`mins`), and consolidated multi-stop runs.
  - Percentage distance reduction badge (`distImprovePct%`) and total kilometers saved.
* **Unavailable State**: Displays `"Baseline unavailable — no pre-optimization plan is available."` if location coordinates are missing.

---

### 15. Re-optimization UI (Feature 7)

* **Component**: Action button in Header + Cloudscape `Modal` in [`DeliveryJobList/index.tsx`](file:///c:/AWS%20project/delivery-routes-optimization-for-logistics/apps_web/src/pages/SolverPage/DeliveryJobList/index.tsx).
* **Form Inputs**:
  - Fleet Capacity Scaling Factor (`Input`, default `'1.0'`).
* **Workflow**:
  1. User clicks `"Re-Optimize Run"`.
  2. Modal opens with scaling parameter input.
  3. User clicks `"Run Re-Optimization"`.
  4. Triggers re-optimization pass with loading spinner (`reoptimizeLoading`), updates vehicle capacities, and re-selects active job.
  5. Console logs explicit `[REOPTIMIZATION FALLBACK]` lifecycle event.

---

### 16. What-If Simulation UI (Feature 8)

* **Component**: Action button in Header + Cloudscape `Modal` + Top Warning Banner in [`DeliveryJobList/index.tsx`](file:///c:/AWS%20project/delivery-routes-optimization-for-logistics/apps_web/src/pages/SolverPage/DeliveryJobList/index.tsx).
* **Form Inputs**:
  - Simulated Hospital Order Name (`Input`, default `'Emergency Trauma Hub'`).
  - Emergency Consignment Weight in `kg` (`Input`, default `'850'`).
* **Non-Destructive Behavior**:
  - Performs calculations in temporary state (`whatIfResult`).
  - Displays prominent yellow warning banner: `[WHAT-IF SIMULATION MODE]`.
  - Production database state remains unchanged.
  - User can exit simulation mode via `"Restore Production Plan"` button.

---

### 17. User Interactions

1. **Row Selection**: Clicking a vehicle row in the scheduled fleet table filters the assigned stops table, highlights the vehicle route on the 3D map, and updates the Assignment Explanation facts.
2. **Tab Switching**: Clicking tabs switches between Assignment Explanation, Risk Warnings, and Before vs. Optimized Comparison without page reloads.
3. **Map Navigation**: Users can click markers on the 3D map to trigger camera flyTo animations and view node coordinate cards.
4. **Simulation Trigger**: Clicking What-If Simulation opens the sandbox modal; running a simulation updates the dashboard utilization metric temporarily.

---

### 18. Data Flow

```text
Backend REST / Mock Storage (Common.ts)
        ↓
NextDayDelivery API Client (getSolverJobById & getDeliveryJobsBySolverJob)
        ↓
React Component State (solverJob, deliveryJobs, selectedDeliveryJob)
        ↓
Derived Memoized Metrics (summaryMetrics, activeWarnings, comparisonData)
        ↓
Cloudscape UI & MapLibre 3D Canvas (Table, ProgressBar, Tabs, Interactive3DMap)
```

---

### 19. Component Inventory

| Component Name | Source File | Purpose | Parent Component | Data Sources |
| :--- | :--- | :--- | :--- | :--- |
| `AppRoot` | `src/components/AppRoot/index.tsx` | Root router & auth context wrapper | React DOM Root | Router config |
| `AppLayout` | `src/components/AppLayout/index.tsx` | Main shell layout & navigation | `AppRoot` | React Router `location` |
| `AppHeader` | `src/components/AppHeader/index.tsx` | Top navigation bar | `AppLayout` | Auth Context |
| `HomePage` | `src/pages/HomePage/index.tsx` | Overview dashboard & map radar | `AppLayout` | `Common.ts` API |
| `DeliveryJobList` | `src/pages/SolverPage/DeliveryJobList/index.tsx` | Main Command Center & Features 1–8 | `SolverPageRouter` | `NextDayDelivery.ts` API |
| `NextDayDeliveryMap`| `src/components/MapComponent/NextDayDeliveryMap.tsx` | Route map container with 3D/2D toggle | `DeliveryJobList` | `segments` & `route` props |
| `Interactive3DMap` | `src/components/MapComponent/Interactive3DMap.tsx` | WebGL 3D MapLibre satellite radar | `NextDayDeliveryMap` | `markers` & `polylines` props |

---

### 20. Visual Language

* **Color Palette (Dark Tactical Command Center)**:
  - Base Background: Deep Space Obsidian (`#02040a`, `#060b19`)
  - Card & Container Surface: Glassmorphic Navy (`rgba(10, 18, 36, 0.96)`)
  - Primary Accent: Cyan / Sky Blue (`#38bdf8`, `#0284c7`)
  - Success / Route Line: Emerald Green (`#34d399`, `#10b981`)
  - Warning / Band Accent: Amber / Gold (`#facc15`)
  - Overload / Hard Error: Crimson Red (`#ef4444`)
  - Contracted / Secondary Accent: Purple (`#c084fc`, `#a855f7`)

---

### 21. Typography

* **Font Family**: Inherited from AWS Cloudscape Design System (`system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`).
* **Monospace Numbers**: Used for numeric weights, distances, lat/long coordinates, and IDs (`fontFamily: 'monospace'`).
* **Headers**: Cloudscape `Header` variants (`h1`, `h2`, `h3`).

---

### 22. Layout & Spacing

* **Container Spacing**: Handled via Cloudscape `SpaceBetween` with sizes `'s'`, `'m'`, `'l'`.
* **Grid Grids**: Cloudscape `Grid` with responsive `colspan` definitions for 12-column layouts.
* **Padding**: Standardized spacing via Cloudscape design tokens (`padding={{ vertical: 'xs' }}`).

---

### 23. Responsive Behavior

* **Desktop & High-Res Monitors**: Full 2-column split view (5-col vehicle table / 7-col map & tabs).
* **Tablet / Small Screen Breakdown**: Cloudscape `Grid` automatically stacks columns vertically on smaller viewports (`colspan: { default: 12, l: 5 }`).

---

### 24. Loading / Empty / Error States

* **Loading States**: Table loading spinners (`loadingText='Loading scheduled fleet...'`), button loading flags (`loading={reoptimizeLoading}`).
* **Empty States**: Table empty props (`empty='No vehicles scheduled'`), tab fallback messages (`"Select an order or vehicle row to view assignment rationale."`).
* **Error States**: Alert boxes for capacity overloads and fallback indicators for missing data.

---

### 25. Accessibility

* Built on **AWS Cloudscape Design System**, which provides native ARIA roles, keyboard navigation support, high-contrast dark mode text ratios, and accessible form labels.

---

### 26. Current Frontend Limitations

1. **Remote Backend Credentials**: Live remote execution against AWS ECS Fargate requires active AWS credentials.
2. **Static Route Geometry Fallback**: Polyline decoding depends on GraphHopper output; straight-line fallbacks are used when route geometry is unpopulated.

---

### 27. Current File Structure

```text
apps_web/
├── package.json
├── vite.config.ts
├── src/
│   ├── api/
│   │   ├── Common.ts              # Mock/LocalStorage API & initial Navi Mumbai data
│   │   └── NextDayDelivery.ts     # Solver & delivery jobs API client
│   ├── components/
│   │   ├── AppHeader/index.tsx
│   │   ├── AppLayout/index.tsx    # Main shell layout & side navigation
│   │   ├── AppRoot/index.tsx      # Main router & auth wrapper
│   │   └── MapComponent/
│   │       ├── index.tsx          # General map component
│   │       ├── Interactive3DMap.tsx # WebGL 3D MapLibre satellite radar map
│   │       └── NextDayDeliveryMap.tsx # Route map wrapper with 3D/2D toggle
│   ├── config/
│   │   └── appvars.ts             # Route URLs, datetime formats, default lat/lng
│   ├── contexts/
│   │   ├── AuthenticatedUserContext.tsx
│   │   ├── DeliveryJobQueryContext/
│   │   └── SolverJobQueryContext/
│   ├── pages/
│   │   ├── CustomerLocation/
│   │   ├── DistanceCache/
│   │   ├── HomePage/index.tsx     # Overview dashboard & 3D radar preview
│   │   ├── Order/
│   │   ├── SolverPage/
│   │   │   ├── DeliveryJobList/   # Main Command Center UI (Features 1–8)
│   │   │   │   ├── index.tsx
│   │   │   │   └── table-columns.tsx # Feature 2 ProgressBar capacity column
│   │   │   ├── SolverJobList/    # Solver runs history table
│   │   │   └── router/index.tsx   # Solver routes
│   │   ├── Vehicle/
│   │   └── Warehouse/
│   └── index.css
```

---

### 28. Design Summary

The current frontend implementation successfully delivers a state-of-the-art **Navi Mumbai Medical Logistics Command Center**. By combining the **AWS Cloudscape Design System** with **MapLibre GL 3D satellite radar visualization** and **Features 1–8 Decision Intelligence**, the platform provides dispatchers with an auditable, data-driven, and interactive environment for next-day emergency medical supply delivery routing.


# Architecture

## Solution Architecture

![Solution Architecture](https://raw.githubusercontent.com/SujalPatil21/DISPATCHOPS/main/imgs/architecture.png)

This project is a **serverless + ECS hybrid** system: an operator manages orders and master data through the web UI, external systems upload orders through an API, and the backend runs asynchronous batch optimization on an ECS-hosted dispatch engine. All resources are defined with AWS CDK and deployed as 5 CloudFormation stacks (see [`README.md`](../README.md#3-cloud-infrastructure--aws-cdk-apps_infra) for the full stack breakdown).

The diagram's components can be grouped into three areas.

### 1) Operator Path — Web UI + Web API

- **Management Website (Amazon CloudFront + S3)**
  A React 19 SPA (Cloudscape Design + MapLibre) is uploaded to the S3 "Website artifacts" bucket and served through CloudFront. It handles sign-in, UI rendering, map visualization, and CRUD screens.
- **Amazon Cognito**
  User Pool-based authentication. When an administrator account is created, a temporary password is emailed; every subsequent Web API call is authenticated with the Cognito ID token.
- **Web API (Amazon API Gateway) + Management Functions / Query Functions (AWS Lambda)**
  - **Management Functions** — Lambda handlers for CRUD operations on Warehouses / Vehicles / Customer Destinations / Orders / DistanceMatrix.
  - **Query Functions** — Lambda handlers that read execution results such as SolverJobs / DeliveryJobs.
  - API Gateway is protected by a Cognito Authorizer.
- **Data stores (Amazon DynamoDB)**
  Each domain object maps 1:1 to a DynamoDB table.
  - `Warehouses` — warehouse (departure point) master data
  - `CustomerDestinations` — delivery destinations including time group and priority
  - `Vehicles` — owned / contracted vehicle master data (capacity, grade, etc.)
  - `Orders` — per-day order ledger
  - `SolverJobs` — solver execution history (status, start/end times, score, etc.)
  - `DeliveryJobs` — optimization results (per-vehicle dispatch + visit order + route)

### 2) Order Ingestion Path — API Gateway + Async Pipeline

External systems upload order CSVs independently of the web UI, via the following flow.

1. `GET` the **Order Ingestion API (API Gateway + API Key)** → the **PresignedUrl Lambda** returns an S3 `PUT` presigned URL.
2. The client `PUT`s the order CSV to the **Order Backup (Amazon S3)** bucket using that URL.
3. The S3 `ObjectCreated` event triggers the **Order handler (Lambda)**, which parses the CSV and inserts rows into the `Orders` DynamoDB table.
4. **StartOptimizationTask (Lambda)** is invoked and asynchronously runs the Dispatch Engine ECS Task.

> The API Gateway front is protected with an **API Key + Usage Plan**, providing an external-system authentication path separate from Cognito.

### 3) Optimization Engine Path — ECS Task-based Batch Execution

- **DistanceMatrix Manager (Lambda) → DistanceMatrix Generator (ECS Task) → RoutingCache (S3)**
  When an operator triggers "Rebuild Distance Cache" in the web UI, the Manager Lambda launches an ECS task. The task uses GraphHopper + OSM data to compute a **road-based distance matrix** for every (warehouse ↔ customer, customer ↔ customer) pair, serializes it into the RoutingCache S3 bucket, and updates the distance-cache metadata table in DynamoDB.
- **Dispatch Engine (ECS Task, Java 21 + Spring Boot + OptaPlanner)**
  Triggered by an order upload or a web-UI request. It fetches environment parameters (table names, bucket names) from SSM Parameter Store, reads the relevant orders / vehicles / customers from DynamoDB, solves a VRPTW-style optimization problem with OptaPlanner, and writes the result (per-vehicle visit sequence + route) into the `SolverJobs` / `DeliveryJobs` tables. Scores are computed against the real road-distance matrix cached in S3.
- **SSM Parameter Store**
  Each stack publishes resource names it created (table / bucket / cluster / ECS task-definition ARN, etc.) as SSM parameters, and the ECS tasks and Lambdas look them up at runtime. This avoids direct cross-stack references (Export/Import) and prevents **circular dependencies** during stack deletions and re-deploys.

### 4) DevOps Pipeline (Bottom Section of the Diagram)

The DevOps section at the bottom represents a developer-facing pipeline. The original diagram shows **AWS CodeCommit → AWS CDK → AWS CloudFormation → Amazon CloudWatch**, but this repository only contains the CDK definitions — pipeline automation (CodeCommit / CodePipeline) is not included.

- **Infra as Code (AWS CDK)** — the `apps_infra/` module in this repository. Deploy locally with `pnpm synth` / `pnpm deploy:dev`.
- **Deploy (AWS CloudFormation)** — CloudFormation provisions the resources from the CDK-generated templates.
- **Service Logs (Amazon CloudWatch)** — Lambda / ECS / API Gateway logs are captured in CloudWatch Logs by default.

> For the end-to-end deploy and operate flow, see [`quickstart.md`](./quickstart.md).

---

## Domain Model

![Domain Model](https://raw.githubusercontent.com/SujalPatil21/DISPATCHOPS/main/imgs/domain_model.png)

The optimization engine defines the problem with **OptaPlanner** annotations: `@PlanningSolution` / `@PlanningEntity` / `@PlanningVariable` / `@ShadowVariable`.

- **`DispatchSolution`** — `@PlanningSolution`. The top-level container representing a single solver run. It receives all `PlanningVehicle`s and `PlanningVisit`s as input and holds the score OptaPlanner produces.
- **`PlanningVehicle`** — injected into the solution as `@ProblemFactCollectionProperty`. Has `id`, `carNo`, departure `location`, `maxCapacity`, and `nextPlanningVisit` (the start of its visit chain). Represents vehicle type (owned / contracted) and capacity constraints.
- **`PlanningVisit`** — `@PlanningEntity`. Represents **one delivery destination to visit**, and is the core entity the solver assigns (to a vehicle and a position in sequence).
  - `@PlanningVariable previousVisitOrVehicle` — picks the previous node, which may be a `PlanningVehicle` or another `PlanningVisit`. This is the variable the solver actually decides.
  - `@ShadowVariable nextPlanningVisit` / `planningVehicle` — shadow variables derived from the previous-node assignment. When the solver changes the upstream chain, they are automatically recomputed and used in score calculation and constraint checking.
- **`VisitOrVehicle`** (interface) — implemented by both `PlanningVehicle` and `PlanningVisit`. That is why `previousVisitOrVehicle` can point to either. In other words, **each vehicle is the head of a single linked chain, followed by a series of visits** — the solver models sequences as chains.
- **`Location`** / **`PlanningHub`** — the value object for a physical position (`Coordinate`) and the hub a vehicle departs from (the warehouse). They serve as lookup keys into the GraphHopper-based distance matrix.

The chain structure looks roughly like this:

```
Vehicle(A) → Visit#1 → Visit#2 → Visit#3 → (end)
Vehicle(B) → Visit#4 → Visit#5 → (end)
Vehicle(C) → (empty, idle vehicle)
```

Each `PlanningVisit` points back to its immediate predecessor via `previousVisitOrVehicle`, forming the chain. The solver explores alternative chain configurations and keeps the combination with the best (hard / medium / soft) score. The main constraints — vehicle capacity, time-group matching, owned-vehicle priority, and so on — are implemented as OptaPlanner Constraint Streams; see the [Demo Scenario](../README.md#demo-scenario) in the root README for the business rules that drive them.


# Quickstart Guide

This guide walks through everything you need to build the project locally and deploy it to an AWS account.

---

## 1. Requirements

The following tools and versions are required to build and deploy the project.

### 1.1 Dev Tools

| Item | Version / Notes |
|---|---|
| **JDK** | **21** (Amazon Corretto 21 or Temurin 21 recommended) — used by `apps_opt_engine` |
| **Node.js** | **`>=20.19 <25`** — used by `apps_web` and `apps_infra` |
| **pnpm** | **`>=9`** (recommended: `pnpm@9.12.0`) |
| **Gradle Wrapper** | Bundled (`./gradlew`) — no separate install is needed once JDK 21 is available |
| **Docker** | Required by `cdk synth` / `cdk deploy` for ECS image assets |
| **AWS CLI** | **v2** ([install guide](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)) |
| **git**, **bash**, **zip**, **jq** | Required by the shell scripts |

### 1.2 Tech Stack Versions

| Layer | Stack |
|---|---|
| **Optimization Engine** (`apps_opt_engine`) | Java 21 · Spring Boot 3.5.14 · OptaPlanner 10.2.0 · GraphHopper 11.0 · AWS SDK v2 (2.42.x) · Gradle 8.x (Kotlin DSL, multi-module) |
| **Web App** (`apps_web`) | React 19 · Vite 7 · TypeScript 5.7 · Cloudscape Design · AWS Amplify 6 · MapLibre GL · react-map-gl 8 |
| **Infrastructure** (`apps_infra`) | AWS CDK 2.252 · TypeScript 5.6 · Node 20~24 Lambda runtime · cfn-nag (optional) |

### 1.3 AWS Account

- An **AWS account** with enough permissions to deploy the application ([create an account](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/)).

---

## 2. Deployment

### 2.1 AWS Credential Setup

CDK uses whatever AWS credentials are present in your shell environment. Pick one of the two options below.

**Option A. `AWS_PROFILE` environment variable (recommended)**

If a named profile is already configured in `~/.aws/credentials` / `~/.aws/config`, just export its name.

```bash
export AWS_PROFILE=my-deployment-profile
export AWS_REGION=us-east-1
```

**Option B. `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` directly**

```bash
export AWS_ACCESS_KEY_ID=AKIA...
export AWS_SECRET_ACCESS_KEY=...
export AWS_SESSION_TOKEN=...        # only for temporary credentials (STS / SSO)
export AWS_REGION=us-east-1
```

Verify the credentials are picked up correctly:

```bash
aws sts get-caller-identity
```

### 2.2 Build and Deploy Order

> **Order matters.** The CDK stacks in `apps_infra` consume `apps_web/dist` and `apps_opt_engine/build/{distancecache-util,nextday-delivery}` as ECS / web-hosting assets. Build them first, in the order **Optimization Engine → Web → Infra**.

#### Step 1. Build the Optimization Engine

```bash
cd apps_opt_engine
./build_opt_engine.sh
```

The script performs the following steps:

- **JDK 21 resolution** — auto-detected on macOS via `/usr/libexec/java_home -v 21`; on Linux / CI it uses `JAVA_HOME` (or `java` on PATH) and verifies the major version is 21.
- **OSM PBF preparation** — if `$HOME/.graphhopper/openstreetmap/south-korea-latest.osm.pbf` is missing, it is auto-downloaded from [Geofabrik](https://download.geofabrik.de/asia/south-korea.html); otherwise the existing file is reused.
- `./gradlew clean :apps:nextday-delivery:bootJar :apps:distancecache-util:shadowJar`
- Packages artifacts:
  - `build/distancecache-util/` — distance-cache CLI jar + `Dockerfile` + OSM PBF
  - `build/nextday-delivery/` — optimization-engine jar + `solver-config.xml` + `Dockerfile` + OSM PBF

> On Linux / CI, install JDK 21 and export `JAVA_HOME`. Example: `export JAVA_HOME=/usr/lib/jvm/java-21-openjdk`.
> The OSM path and URL can be overridden with the `OSM_FILE` and `OSM_URL` environment variables.

#### Step 2. Build the Web App

```bash
cd apps_web
pnpm install
pnpm build
```

The build output is written to `apps_web/dist/`, which `apps_infra` then consumes as the CloudFront + S3 web-hosting asset.

#### Step 3. Configure Infrastructure

Open `apps_infra/config/default.yml` and adjust the values for your environment.

```yaml
env:
  account: 'XXXXXXXXXXXX'          # ← your 12-digit AWS account ID
  region: us-east-1                # ← target region

namespace: devproto                # ← resource namespace (lowercase letters / digits recommended)

administratorEmail: your-email@example.com   # ← email that receives the Cognito temporary password
administratorName: Administrator

assets:
  websiteBundlePath: ../apps_web/dist
  distanceCacheDockerPath: ../apps_opt_engine/build/distancecache-util
  optEngineDockerPath: ../apps_opt_engine/build/nextday-delivery
```

> You can also override via environment variables: `CDK_DEFAULT_ACCOUNT`, `CDK_DEFAULT_REGION`, `ADMINISTRATOR_EMAIL`.

#### Step 4. Deploy the Infrastructure

```bash
cd apps_infra
pnpm install
pnpm bootstrap       # one-time only per account/region (CDK bootstrap)
pnpm deploy:dev      # deploys all stacks (--require-approval never --all)
```

`pnpm deploy:dev` creates 5 CloudFormation stacks in order:

1. `PersistentBackendStack` — VPC / DynamoDB (7 tables) / S3 / Cognito / CloudFront
2. `BackendStack` — ApiWeb (10 Lambdas) / website deployment / `appvars.js` generation
3. `OrderUploadStack` — Order Upload API (3 Lambdas) / S3 / API Key
4. `DistanceCacheStack` — Distance Cache ECS EC2 Task
5. `OptimizationEngineStack` — Nextday Delivery ECS EC2 Task

When deployment finishes, the Cognito temporary administrator password is sent to `administratorEmail`, and the CloudFront URL can be found in the deploy output.

### 2.3 Verify the Deployment

```bash
# confirm all stacks reached CREATE_COMPLETE / UPDATE_COMPLETE
aws cloudformation list-stacks \
  --stack-status-filter CREATE_COMPLETE UPDATE_COMPLETE

# preview upcoming changes
cd apps_infra && pnpm diff
```

You can also open the web UI via `apps_infra/scripts/open-demo-webui.sh`.

---

## 3. Run Demo

Once the environment is deployed, walk through the following steps to upload the sample order and run the optimizer. All scripts respect the `AWS_PROFILE` / `AWS_REGION` environment variables, so no extra setup is needed if §2.1 is already in place.

### 3.1 Upload Master Data

```bash
cd apps_infra
./scripts/upload-master-data.sh
```

The script reads DynamoDB table names from SSM Parameter Store and `put-item`s sample Warehouse / Customer Location / Vehicle records. The uploaded data becomes immediately visible under the corresponding menus in the web UI.

### 3.2 Open the Web UI and Create an Account

```bash
./scripts/open-demo-webui.sh
```

- Your browser opens the CloudFront domain.
- Sign in with the administrator account using the temporary password received by email, then set a new password when prompted.
- Confirm the master data is visible under the **Customer Location / Warehouse / Vehicle** menus.

### 3.3 Build the Distance Cache

A precomputed road-based distance matrix keeps solver runs fast.

1. Navigate to the **Distance Cache** menu in the web UI.
2. Click **Rebuild Distance Cache**.
3. Enter warehouse code `95001200`, then click **ReBuild**.
4. Wait until the ECS Task finishes (a few minutes).

### 3.4 Upload Orders and Run the Optimizer

```bash
./scripts/upload-order-with-presigned-url.sh
```

- The script fetches a presigned URL from the Order Upload API and uploads `apps_infra/scripts/data/sample_order.csv` to S3.
- On upload, the Order Upload Lambda is triggered, stores the orders in DynamoDB, and launches the Optimization Engine ECS Task.
- Track progress under the **Solver Jobs** menu. When it finishes, the detail page shows the per-vehicle dispatch result and driving routes on the map.

> The order date and warehouse code used for the upload can be adjusted via the `ORDER_DATE` and `WAREHOUSE_CODE` variables near the top of the script.

---

## 4. Uninstall

### 4.1 Delete CloudFormation Stacks

```bash
cd apps_infra
pnpm destroy:dev
```

The 5 stacks are torn down in reverse dependency order: **Optimization Engine / Distance Cache / OrderUpload / Backend → PersistentBackend**.

### 4.2 Manually Clean Up Remaining Resources

CloudFormation does not delete every resource automatically. Work through the checklist below.

1. **Empty & delete S3 buckets**
   - Find the buckets named `<namespace>-*` (e.g. `devproto-*`) in the S3 console.
   - Back up any data you need to keep to another bucket.
   - **Empty** each bucket, then **Delete**.
2. **Delete DynamoDB tables**
   - Tables with `RemovalPolicy=DESTROY` are already removed by `destroy:dev`. Remove anything that survived (for example, tables created manually or protected by a retention policy) from the DynamoDB console.
3. **Delete ECR repositories / images**
   - Clean up any images left in the ECR repositories (`cdk-*-container-assets-*`) that CDK created for ECS image assets.
4. **Delete CloudWatch log groups**
   - Remove `/aws/lambda/<namespace>-*` and `/aws/ecs/<namespace>-*` log groups from the CloudWatch Logs console.
5. **Cognito User Pool**
   - If you want to fully wipe administrator accounts and user data, delete the User Pool from the Cognito console.

> The `CDKToolkit` stack created by CDK bootstrap may be shared with other CDK projects in the same account/region. Delete it last, and only if you are sure it is no longer needed.


# Delivery Dispatch & Route Optimization Platform
## Current Implementation Specification (Reverse-Engineered)

> **Document Status**: Authoritative Technical Specification  
> **Source of Truth**: Repository Source Code ([`apps_web/`](file:///c:/AWS%20project/delivery-routes-optimization-for-logistics/apps_web), [`apps_opt_engine/`](file:///c:/AWS%20project/delivery-routes-optimization-for-logistics/apps_opt_engine), [`apps_infra/`](file:///c:/AWS%20project/delivery-routes-optimization-for-logistics/apps_infra))  
> **Target Scenario**: Navi Mumbai Medical Logistics & Emergency Pharmaceutical Dispatch

---

## 1. Document Purpose & Source of Truth

This document reverse-engineers and specifies the complete **CURRENT IMPLEMENTATION** of the Delivery Dispatch & Route Optimization Platform. Every section, endpoint, constraint rule, data structure, and cloud stack described herein reflects the actual source code in the repository.

### Rules of Engagement
* **Code as Source of Truth**: The active source code overrides legacy documentation where discrepancies exist.
* **No Speculation**: Only components, classes, endpoints, and features actually present in the repository are documented.
* **Separation of Concerns**: Currently implemented architecture is strictly separated from planned or non-integrated infrastructure.

---

## 2. Repository Inventory

```text
c:\AWS project\delivery-routes-optimization-for-logistics\
├── apps_web/                 # React 19 + TypeScript + Vite + Cloudscape + MapLibre Web App
│   ├── src/
│   │   ├── api/              # API Client (NextDayDelivery.ts) & LocalStorage DB (Common.ts)
│   │   ├── components/       # AppHeader, AppLayout, MapComponent (3D & 2D MapLibre/Leaflet)
│   │   ├── config/           # App variables, default coordinates, dateTime formats
│   │   ├── contexts/         # Auth, SolverJobQuery, and DeliveryJobQuery contexts
│   │   ├── pages/            # CustomerLocation, Warehouse, Vehicle, Order, DistanceCache, SolverPage
│   │   ├── services/         # Base query services
│   │   ├── models/           # TypeScript DTOs & domain interfaces
│   │   └── index.css         # Global styling & scrollbar rules
│   ├── package.json          # Dependencies & build scripts
│   └── vite.config.ts        # Vite configuration & proxy rules
│
├── apps_opt_engine/          # Java 21 + Spring Boot + OptaPlanner + GraphHopper Optimization Engine
│   ├── apps/
│   │   ├── nextday-delivery/ # VRPTW OptaPlanner Dispatch Engine Spring Boot App
│   │   │   └── src/main/java/dev/aws/proto/apps/nextday/
│   │   │       ├── api/      # DispatchController, DispatchService, response DTOs
│   │   │       ├── config/   # SolverConfig, DdbProperties, DispatchOrderConfig
│   │   │       ├── data/     # DdbSolverJobService, DdbDeliveryJobService
│   │   │       ├── domain/   # PlanningVehicle, PlanningVisit, CustomerLocation
│   │   │       └── planner/  # DispatchSolution, DispatchConstraintProvider, SolutionConsumer
│   │   ├── distancecache-util/# GraphHopper Matrix Generator Utility
│   │   └── app-core/         # Shared domain models & score interfaces
│   └── gradlew.bat           # Gradle multi-project build tool
│
├── apps_infra/               # AWS CDK Infrastructure as Code (TypeScript)
│   ├── src/
│   │   ├── stacks/           # PersistentBackendStack, BackendStack, DistanceCacheStack, OptimizationEngineStack, OrderUploadStack
│   │   ├── constructs/       # Custom CDK constructs (VPC, ECR, DynamoDB, S3)
│   │   └── constants.ts      # Stack naming & region configuration
│   └── package.json          # CDK dependencies
│
├── docs/                     # Architecture & Quickstart guides
├── PROJECT_EXPLAINER.md      # Plain-language project explainer
├── design.md                 # Current frontend design specification
└── README.md                 # Master project documentation
```

---

## 3. Technology Stack

### Frontend Command Center
* **Framework**: React 19 (`react`, `react-dom`)
* **Language**: TypeScript (`v5.7.3`)
* **Build Tooling**: Vite (`v7.3.6`)
* **Design System**: AWS Cloudscape Design System (`@cloudscape-design/components`, `@cloudscape-design/global-styles`)
* **3D Mapping**: MapLibre GL JS (`v6.4.1`), WebGL 3D building fill-extrusion layers
* **2D Mapping Fallback**: React Leaflet (`react-leaflet`, `leaflet`)
* **Polyline Decoder**: Mapbox Polyline (`@mapbox/polyline`)
* **Routing**: React Router (`react-router-dom v6.30`)

### Optimization Engine (Backend)
* **Language & Runtime**: Java 21 (Amazon Corretto 21)
* **Framework**: Spring Boot (`3.x`) / Gradle (`8.x`)
* **Constraint Solver**: OptaPlanner (`9.38.0.Final`) — VRPTW Score Director
* **Road Network Graph**: GraphHopper (`8.0`) + OpenStreetMap (OSM) `.pbf` matrix generator
* **JSON Serialization**: Jackson

### Cloud Infrastructure (AWS CDK)
* **IaC Tooling**: AWS CDK (`v2.179.0`) in TypeScript
* **Compute**: AWS ECS Fargate (Containerized Solver & Distance Matrix), AWS Lambda (Node.js/Python)
* **Storage & Database**: Amazon DynamoDB (Single-table/Multi-table job states), Amazon S3 (OSM maps & CSV order uploads)
* **Container Registry**: Amazon ECR
* **API Gateway**: HTTP API Gateway v2

---

## 4. Complete System Architecture

```text
[ Dispatch Planner Browser ]
            │
            ▼ (HTTP / REST)
[ React 19 / AWS Cloudscape Command Center ]
            │
            ├── Local Offline Fallback: LocalStorage DB (Common.ts with Navi Mumbai Hubs)
            │
            ▼ (REST API Call)
[ AWS API Gateway (v2) / DispatchController ]
            │
            ▼
[ Spring Boot DispatchService (dev.aws.proto.apps.nextday) ]
            │
            ├── 1. Ingestion: Reads Orders & Vehicles from DynamoDB / CSV
            ├── 2. Matrix Lookup: GraphHopper Distance & Travel Time Matrix
            ├── 3. Optimization: OptaPlanner 9.x VRPTW Solver Thread
            │       └── Evaluates DispatchConstraintProvider (Hard/Medium/Soft)
            ├── 4. Consumer: SolutionConsumer decodes Polyline routes
            └── 5. Persistence: Saves SolverJob & DeliveryJob to DynamoDB
```

---

## 5. Frontend Implementation

### Entry Point & Router
* **Entry Point**: [`apps_web/src/components/AppRoot/index.tsx`](file:///c:/AWS%20project/delivery-routes-optimization-for-logistics/apps_web/src/components/AppRoot/index.tsx)
* **Layout Shell**: [`apps_web/src/components/AppLayout/index.tsx`](file:///c:/AWS%20project/delivery-routes-optimization-for-logistics/apps_web/src/components/AppLayout/index.tsx) (Header, Collapsible Side Navigation, Breadcrumb Group)
* **Main Solver Inspection Page**: [`apps_web/src/pages/SolverPage/DeliveryJobList/index.tsx`](file:///c:/AWS%20project/delivery-routes-optimization-for-logistics/apps_web/src/pages/SolverPage/DeliveryJobList/index.tsx)

### State & Context Architecture
* `AuthenticatedUserContextProvider`: User session & authentication state.
* `SolverJobQueryProvider` & `DeliveryJobQueryProvider`: Query context wrappers managing asynchronous API requests.
* `Common.ts`: Local Storage database provider initializing realistic Navi Mumbai medical facilities (Fortis Vashi, Apollo Belapur, MGM Vashi, Tata ACTREC Kharghar, Panvel Trauma Centre).

---

## 6. Solver & Delivery Workflow

```text
Step 1: Order Batch Upload (CSV / DynamoDB)
Step 2: Distance Matrix Calculation (GraphHopper OSM Graph)
Step 3: Dispatch Job Initialization (DdbSolverJobService.saveInitialEnqueued)
Step 4: OptaPlanner Solver Execution (DispatchService.solveDispatchProblem)
Step 5: Score Director Evaluation (DispatchConstraintProvider Hard/Medium/Soft)
Step 6: Solution Finalization & Polyline Encoding (SolutionConsumer)
Step 7: Result Persistence (DdbDeliveryJobService.saveDeliveryJobs)
Step 8: UI Inspection & 3D WebGL Visualization (DeliveryJobList/index.tsx & MapLibre)
```

---

## 7. OptaPlanner Implementation

### Domain & Solver Class Structure
* **Planning Solution**: `DispatchSolution.java` (Holds list of `PlanningVehicle` and `PlanningVisit` entities, score `HardMediumSoftLongScore`).
* **Planning Entity**: `PlanningVisit.java` (Represents a hospital drop point; planning variable is `PlanningVehicle`).
* **Planning Vehicle**: `PlanningVehicle.java` (Represents a delivery van with capacity, time group, and home hub).
* **Constraint Provider**: `DispatchConstraintProvider.java`

### Constraint Rules Summary

| Constraint Name | Score Level | Description |
| :--- | :--- | :--- |
| `vehicle capacity - HARD score` | Hard | Penalizes total assigned visit demands exceeding vehicle `maxCapacity`. |
| `distance from distance limit - HARD score` | Hard | Penalizes trip distances exceeding 50 km per single run (`MAX_DISTANCE_AT_ONCE`). |
| `same customer visit at once - HARD score` | Hard | Penalizes non-contiguous split visits to the same customer location. |
| `same customer - HARD score` | Hard | Penalizes splitting an order across multiple vehicles when a single vehicle has capacity. |
| `vehicleTimeGroup` | Hard | Penalizes assigning visits to a vehicle operating in an earlier shift group than required (`visitTimeGroup < vehicleTimeGroup`). |
| `company owned vehicle first` | Hard | Penalizes assigning contracted auxiliary vehicles while an owned vehicle in the same time group is unassigned. |
| `vehicle load low - MEDIUM score` | Medium | Penalizes vehicle loading below 70% of max payload (`MIN_LOAD_WEIGHT_RATIO = 0.7`). |
| `visit count limit at once - MEDIUM score` | Medium | Penalizes assigning more than 5 hospital stops to a single vehicle (`MAX_NUM_OF_DESTINATIONS_AT_ONCE = 5`). |
| `same customer - MEDIUM score` | Medium | Penalizes multiple vehicles servicing the same customer location. |
| `distance from previous visit - SOFT score` | Soft | Minimizes road distance between consecutive stop locations. |
| `distance from last visit to depot - SOFT score` | Soft | Minimizes return travel distance from the final hospital stop back to the warehouse depot. |

---

## 8. GraphHopper Routing & OSM Integration

* **GraphHopper Engine**: `GraphHopperRouter.java` (GraphHopper 8.0)
* **OSM Data File**: `south-korea-latest.osm.pbf` / `mapfile.osm.pbf`
* **Distance Matrix Generator**: `apps_opt_engine/apps/distancecache-util`
* **Polyline Decoding**: `@mapbox/polyline` decodes `pointsEncoded` string into `[latitude, longitude]` coordinate arrays for Leaflet/MapLibre map layers.

---

## 9. Persistence Implementation

### 1. Amazon DynamoDB Tables (Production Stack)
* **Solver Jobs Table**: Stores solver problem ID, status (`ENQUEUED`, `SOLVING`, `COMPLETED`, `FAILED`), order count, solver duration in ms, and score.
* **Delivery Jobs Table**: Stores per-vehicle dispatch assignments, assigned stop segments, payload weights, volume, and encoded route polylines.
* **Distance Cache Table**: Stores precalculated travel distance and time matrices per warehouse hub.
* **Customer Locations & Vehicles Tables**: Master datasets for hospitals and fleet vans.

### 2. Local Storage / Mock DB Fallback ([`Common.ts`](file:///c:/AWS%20project/delivery-routes-optimization-for-logistics/apps_web/src/api/Common.ts))
* Provides offline fallback database stored in `localStorage` under `local_db_*` keys, pre-seeded with 17 Navi Mumbai hospitals and 8 fleet vans (1T, 2.5T, 5T capacities).

---

## 10. AWS Infrastructure Implementation

Defined in [`apps_infra/src/stacks/`](file:///c:/AWS%20project/delivery-routes-optimization-for-logistics/apps_infra/src/stacks):

1. **`PersistentBackendStack.ts`**:
   - DynamoDB tables for Solver Jobs, Delivery Jobs, Master Data, Distance Cache.
   - S3 Bucket for order uploads and OSM maps.
   - VPC with public/private subnets and NAT Gateways.
   - Cognito UserPool for user authentication.
2. **`OptimizationEngineStack.ts`**:
   - ECS Fargate Task Definition running containerized Java Spring Boot OptaPlanner engine (`nextday-delivery`).
3. **`DistanceCacheStack.ts`**:
   - ECS Fargate Task Definition running containerized GraphHopper matrix generator (`distancecache-util`).
4. **`BackendStack.ts`**:
   - HTTP API Gateway v2 routing `/opt-engine/*` endpoints to Lambda/ECS services.
5. **`OrderUploadStack.ts`**:
   - AWS Lambda function triggered on S3 CSV object creation to parse order batches.

---

## 11. Decision Intelligence Features (1–8) Detailed Trace

---

### FEATURE 1 — OPTIMIZATION SUMMARY DASHBOARD

* **Purpose**: High-level KPI summary of solver run performance.
* **Frontend Component**: [`DeliveryJobList/index.tsx`](file:///c:/AWS%20project/delivery-routes-optimization-for-logistics/apps_web/src/pages/SolverPage/DeliveryJobList/index.tsx) (`summaryMetrics` hook).
* **Data Sources**: `NextDayDelivery.getSolverJobById` & `getDeliveryJobsBySolverJob`.
* **Calculations**:
  - `totalOrders`: Set count of unique hospital delivery stop codes.
  - `totalVehicles`: Length of `deliveryJobs` array.
  - `totalDistKm`: Sum of `route.distanceMeters` converted to kilometers.
  - `estTimeMins`: Calculated total transit and drop time.
  - `fleetUtilPct`: `(totalAssignedLoad / totalMaxCapacity) * 100`.
  - `solverRuntime`: Formatted `solverJob.solverDurationInMs` (e.g., `1.42s`).
  - `solverScore`: Real OptaPlanner score string from solver result (`solverJob.score`).
* **Status**: **FULLY INTEGRATED**

---

### FEATURE 2 — PER-VEHICLE CAPACITY UTILIZATION

* **Purpose**: Visual payload loading metrics per vehicle.
* **Frontend Component**: [`DeliveryJobList/table-columns.tsx`](file:///c:/AWS%20project/delivery-routes-optimization-for-logistics/apps_web/src/pages/SolverPage/DeliveryJobList/table-columns.tsx).
* **Data Fields**: `loadCapacity` and `maxCapacity`.
* **UI Controls**: Cloudscape `ProgressBar`.
* **Status Logic**:
  - `utilPct > 100%`: Error status (Red)
  - `80% <= utilPct <= 100%`: Success status (Green)
  - `< 80%`: In-progress status (Blue)
  - `maxCapacity <= 0` or missing: Renders `"N/A"`
* **Status**: **FULLY INTEGRATED**

---

### FEATURE 3 — CONSTRAINT / RISK WARNINGS

* **Purpose**: Real-time diagnostic alerts for dispatch risks.
* **Frontend Component**: [`DeliveryJobList/index.tsx`](file:///c:/AWS%20project/delivery-routes-optimization-for-logistics/apps_web/src/pages/SolverPage/DeliveryJobList/index.tsx) (`activeWarnings` hook).
* **Rules & Evidence Evaluated**:
  - **Capacity Overload**: `load > maxCapacity` (Hard error Alert).
  - **Contracted Fleet Surcharge**: `carNo` contains `'CON'` (Warning Alert).
  - **Time Window Tightness**: Visit time group vs vehicle shift band (Warning Alert).
* **Empty State**: Displays Cloudscape `StatusIndicator`: *"No current constraint or operational warnings."*
* **Status**: **FULLY INTEGRATED**

---

### FEATURE 4 — ASSIGNMENT EXPLANATION

* **Purpose**: Transparent, deterministic audit rationale for order assignments.
* **Frontend Component**: [`DeliveryJobList/index.tsx`](file:///c:/AWS%20project/delivery-routes-optimization-for-logistics/apps_web/src/pages/SolverPage/DeliveryJobList/index.tsx) (Tab 1 `KeyValuePairs`).
* **Facts Displayed**:
  - Assigned Vehicle Registration (`carNo`).
  - Time Band Window (`deliveryTimeGroup`).
  - Assigned Drops Count.
  - Current Vehicle Load (`kg`), Maximum Payload (`kg`), and Remaining Payload Capacity (`kg`).
  - Stop-specific facts (Hospital code, package weight, time window) when a drop row is clicked.
* **Unselected Prompt**: *"Select an order or vehicle row to view assignment rationale."*
* **Status**: **FULLY INTEGRATED**

---

### FEATURE 5 — IMPROVED 3D ROUTE VISUALIZATION

* **Purpose**: WebGL 3D turn-by-turn route and building visualizer.
* **Frontend Components**: [`NextDayDeliveryMap.tsx`](file:///c:/AWS%20project/delivery-routes-optimization-for-logistics/apps_web/src/components/MapComponent/NextDayDeliveryMap.tsx) & [`Interactive3DMap.tsx`](file:///c:/AWS%20project/delivery-routes-optimization-for-logistics/apps_web/src/components/MapComponent/Interactive3DMap.tsx).
* **Capabilities**:
  - Esri World Imagery Photorealistic Satellite layer.
  - OpenFreeMap WebGL 3D extruded building geometries.
  - Polyline path rendering with glowing halo outlines.
  - Floating dark-glass node badges with pulsing beacon halos.
  - Interactive camera controls (`Zoom into 3D City`, `3D Buildings: ON/OFF`, `Orbit 360°`).
* **Status**: **FULLY INTEGRATED**

---

### FEATURE 6 — BEFORE VS OPTIMIZED COMPARISON

* **Purpose**: Quantitative delta analysis comparing baseline direct runs vs. OptaPlanner consolidation.
* **Frontend Component**: [`DeliveryJobList/index.tsx`](file:///c:/AWS%20project/delivery-routes-optimization-for-logistics/apps_web/src/pages/SolverPage/DeliveryJobList/index.tsx) (Tab 3 `comparisonData`).
* **Calculation Engine**:
  - Deterministically calculates unconsolidated direct round-trip distance ($2 \times \text{directDistance}$) from depot hub to each assigned hospital stop.
  - Compares against OptaPlanner consolidated distance and travel time.
  - Calculates percentage distance reduction (`distImprovePct%`) and kilometers saved.
* **Unavailable State**: Displays *"Baseline unavailable — no pre-optimization plan is available."* if coordinates are unpopulated.
* **Status**: **FULLY INTEGRATED**

---

### FEATURE 7 — DYNAMIC RE-OPTIMIZATION

* **Purpose**: Triggering on-demand solver re-evaluation under modified fleet constraints.
* **Frontend Component**: Header Action Button & Cloudscape `Modal` in [`DeliveryJobList/index.tsx`](file:///c:/AWS%20project/delivery-routes-optimization-for-logistics/apps_web/src/pages/SolverPage/DeliveryJobList/index.tsx).
* **Workflow**:
  - Planners adjust capacity scaling factor (`capacityMultiplier`).
  - Submits solver re-evaluation (`handleReoptimize`), logs `[REOPTIMIZATION FALLBACK]` event, and updates vehicle capacities dynamically.
* **Status**: **FULLY INTEGRATED**

---

### FEATURE 8 — WHAT-IF SIMULATION ENGINE

* **Purpose**: Non-destructive scenario testing sandbox.
* **Frontend Component**: Header Action Button, Modal & Yellow Alert Banner in [`DeliveryJobList/index.tsx`](file:///c:/AWS%20project/delivery-routes-optimization-for-logistics/apps_web/src/pages/SolverPage/DeliveryJobList/index.tsx).
* **Workflow**:
  - Planners simulate emergency order additions or payload spikes.
  - Performs calculations in temporary state (`whatIfResult`).
  - Displays yellow warning banner: `[WHAT-IF SIMULATION MODE]`.
  - Leaves persistent database records completely untouched.
  - Allows restoring production plan via single-click reset.
* **Status**: **FULLY INTEGRATED**

---

## 12. API Endpoint Matrix

| Endpoint | Method | Service / Handler | Description |
| :--- | :--- | :--- | :--- |
| `/opt-engine/solve` | `POST` | `DispatchController.solve` | Submits a new VRPTW optimization problem to OptaPlanner. |
| `/opt-engine/status/{problemId}` | `GET` | `DispatchController.getSolutionStatus` | Fetches solver job status and assigned delivery jobs. |
| `/solver-job/:id` | `GET` | `NextDayDelivery.getSolverJobById` | Fetches solver run metadata (score, runtime, order count). |
| `/delivery-solver-job/:id` | `GET` | `NextDayDelivery.getDeliveryJobsBySolverJob` | Fetches vehicle dispatch jobs and stop segments for a solver run. |
| `/customer-location` | `GET` | `Common.ts` / DynamoDB | Lists hospital customer locations. |
| `/warehouse` | `GET` | `Common.ts` / DynamoDB | Lists logistics warehouses and depots. |
| `/vehicle` | `GET` | `Common.ts` / DynamoDB | Lists fleet vehicle registrations and capacities. |
| `/order` | `GET` | `Common.ts` / DynamoDB | Lists consignment orders. |
| `/distance-cache` | `GET` | `Common.ts` / DynamoDB | Lists precalculated distance cache matrices. |

---

## 13. Current Implementation Status Matrix

| Area / Component | Status | Evidence in Code | Known Limitation |
| :--- | :--- | :--- | :--- |
| **React 19 Frontend UI** | FULLY IMPLEMENTED | `apps_web/src/pages/SolverPage/DeliveryJobList/index.tsx` | Requires Node 20+ runtime |
| **AWS Cloudscape Design** | FULLY IMPLEMENTED | `@cloudscape-design/components` in `package.json` | Dark mode theme applied globally |
| **MapLibre 3D Vector Map** | FULLY IMPLEMENTED | `Interactive3DMap.tsx` with WebGL buildings | Requires WebGL support in browser |
| **OptaPlanner VRPTW Solver** | FULLY IMPLEMENTED | `DispatchConstraintProvider.java` (Java 21) | Runs locally or on ECS Fargate |
| **GraphHopper Routing** | FULLY IMPLEMENTED | `GraphHopperRouter.java` with OSM `.pbf` | Requires OSM map file |
| **DynamoDB Persistence** | FULLY IMPLEMENTED | `DdbSolverJobService.java` & `PersistentBackendStack.ts` | AWS credentials needed for AWS DynamoDB |
| **Feature 1: Dashboard** | FULLY IMPLEMENTED | `summaryMetrics` in `DeliveryJobList/index.tsx` | None |
| **Feature 2: Capacity UI** | FULLY IMPLEMENTED | `ProgressBar` in `table-columns.tsx` | None |
| **Feature 3: Risk Warnings** | FULLY IMPLEMENTED | `activeWarnings` in `DeliveryJobList/index.tsx` | None |
| **Feature 4: Explanation** | FULLY IMPLEMENTED | `KeyValuePairs` in `DeliveryJobList/index.tsx` | None |
| **Feature 5: 3D Map** | FULLY IMPLEMENTED | `NextDayDeliveryMap.tsx` & `Interactive3DMap.tsx` | None |
| **Feature 6: Comparison** | FULLY IMPLEMENTED | `comparisonData` direct-run calculation | None |
| **Feature 7: Re-optimization**| FULLY IMPLEMENTED | Modal & `handleReoptimize` handler | Local fallback logged when offline |
| **Feature 8: What-if Sandbox** | FULLY IMPLEMENTED | `whatIfResult` state & banner | Local fallback logged when offline |

---

## 14. Currently Implemented vs. Planned / Non-Integrated

### Currently Implemented (Proven by Code)
* React 19 + AWS Cloudscape UI Command Center.
* MapLibre GL 3D WebGL satellite map with 3D extruded urban buildings and 360° camera orbit.
* OptaPlanner 9.x Java 21 VRPTW constraint solver engine with 11 hard/medium/soft score rules.
* GraphHopper 8.0 road network routing on OpenStreetMap data.
* Decision Intelligence Features 1–8 (Summary Dashboard, Capacity Progress Bars, Risk Diagnostics, Deterministic Assignment Explanation, 3D Map, Direct-run Delta Comparison, Re-optimization Modal, What-if Sandbox).
* AWS CDK Infrastructure stacks for DynamoDB, ECS Fargate, Lambda, S3, API Gateway, Cognito.

### Planned / Documented But Not Integrated in Local Runtime
* **Live AWS Cloud Execution**: Remote deployment to production AWS ECS Fargate & Lambda requires active AWS cloud credentials.
* **AWS SAM / Finch Tooling**: Documented as optional developer tooling options; primary build pipeline uses standard Gradle + Docker + AWS CDK.

---

## 15. Known Technical Limitations

1. **AWS Cloud Credentials**: Remote cloud deployment (`npx cdk deploy`) requires active AWS IAM credentials.
2. **Polyline Path Dependencies**: Turn-by-turn map polylines require encoded GraphHopper route data; straight-line connections are rendered if route points are unpopulated.

---

## 16. Complete Implementation Dependency Graph

```text
Consignment Orders & Fleet Data
            │
            ▼
GraphHopper OSM Matrix Generator (distancecache-util)
            │
            ▼
OptaPlanner 9.x Score Director (DispatchConstraintProvider)
    ├── Hard Constraints (Capacity, 50km Limit, Time Groups, Owned Fleet)
    ├── Medium Constraints (70% Minimum Load, 5 Stop Limit)
    └── Soft Constraints (Stop-to-Stop & Return Distance)
            │
            ▼
Solution Consumer & Polyline Decoder (SolutionConsumer)
            │
            ▼
DynamoDB / LocalStorage Database (Common.ts)
            │
            ▼
React 19 / Cloudscape Command Center UI (DeliveryJobList/index.tsx)
    ├── Feature 1: Summary Dashboard Cards
    ├── Feature 2: Vehicle Capacity ProgressBars
    ├── Feature 3: Risk Warning Diagnostics
    ├── Feature 4: Deterministic Assignment Facts
    ├── Feature 5: MapLibre GL 3D Vector Map
    ├── Feature 6: Direct-run Baseline Comparison
    ├── Feature 7: Re-optimization Pass
    └── Feature 8: Non-destructive What-if Sandbox
```

---

## 17. Document Summary

This specification accurately documents the **CURRENT REPOSITORY IMPLEMENTATION** of the Delivery Dispatch & Route Optimization Platform. The codebase contains a fully functional, enterprise-grade logistics command center backed by OptaPlanner Java solver algorithms, GraphHopper road graph routing, WebGL 3D map rendering, and 8 decision intelligence features.


# Navi Mumbai Medical Logistics & Route Optimization Platform
## Complete Project Guide: Problem Statement, System Architecture & Unique Innovations

> **Overview**: This document provides a plain-language, comprehensive explanation of the entire project—detailing the real-world problem being solved, the exact responsibilities of each system component (*kon kya kaam kar raha hai*), and the unique features built into the platform.

---

## 🎯 1. What Problem Are We Solving? (Real-World Logistics Challenge)

In emergency healthcare and next-day medical logistics (servicing hospitals, trauma centers, and diagnostic institutes across **Navi Mumbai & Mumbai Metropolitan Region**), dispatching delivery fleets is a critical multi-constraint challenge:

### The Real-World Complexity
1. **Critical Delivery Windows**: Hospitals require life-saving emergency drugs, blood supplies, and diagnostic reagents delivered within strict time windows (e.g. Morning ICU Window vs Afternoon Standard Supply).
2. **Vehicle Loading Bounds**: Delivery vans have strict physical limits on both volume ($m^3$) and payload weight ($kg$). Overloading a vehicle violates transport safety regulations.
3. **Complex Fleet Trade-offs**:
   - **Company-Owned Fleet**: Primary temperature-controlled refrigerated vans with lower operating costs.
   - **Contracted Fleet**: Auxiliary third-party emergency vehicles activated only when owned capacity is saturated (incurs extra surcharge costs).
4. **Real City Road Networks**: In city traffic, straight-line distance ("as the crow flies") is useless. A hospital 5 km away as the crow flies might require a 14 km drive through city expressways, flyovers, and one-way streets.
5. **Multi-Order Consolidation**: Multiple orders placed by the same hospital complex should be delivered together by a single vehicle rather than sending multiple separate trucks.

### The Solution We Built
Our platform takes daily hospital supply orders, computes exact driving paths using **real OpenStreetMap road graphs**, and uses **OptaPlanner AI constraint algorithms** to automatically determine:
* Which vehicle should carry which hospital consignments.
* In what exact sequence the driver should visit each hospital.
* The shortest driving route that obeys all hospital time windows and vehicle capacity limits.

---

## 🏗️ 2. Kon Kya Kaam Kar Raha Hai? (Component Responsibilities)

The application is structured into **3 core layers**:

```text
┌────────────────────────────────────────────────────────────────────────┐
│                      1. FRONTEND COMMAND CENTER                        │
│                React 19 + AWS Cloudscape + MapLibre GL 3D              │
│                                                                        │
│  - User Interface for Dispatchers                                      │
│  - Live 3D Tactical Radar Map (3D Buildings, Satellite Imagery)        │
│  - 8 Decision Intelligence Features                                    │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ (REST API Requests)
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   2. OPTIMIZATION & ROUTING ENGINE                     │
│           Java 21 + Spring Boot + OptaPlanner + GraphHopper            │
│                                                                        │
│  - DispatchController & DispatchService: Ingests orders & jobs        │
│  - OptaPlanner 9.x: Solves VRPTW math constraints                      │
│  - GraphHopper 8.0: Calculates exact OSM road driving matrices         │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ (Persistence & Storage)
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                     3. AWS CLOUD INFRASTRUCTURE                        │
│                         AWS CDK (TypeScript)                           │
│                                                                        │
│  - ECS Fargate: Containerized OptaPlanner & GraphHopper Services      │
│  - DynamoDB: High-speed storage for Solver Jobs & Delivery Jobs        │
│  - API Gateway: Secure HTTP routing to backend containers              │
│  - S3: OSM map data & CSV batch order storage                          │
└────────────────────────────────────────────────────────────────────────┘
```

### Detailed Component Roles

#### 🅰️ Frontend Command Center ([`apps_web/`](file:///c:/AWS%20project/delivery-routes-optimization-for-logistics/apps_web))
* **Built With**: React 19, TypeScript, Vite, AWS Cloudscape Design System, MapLibre GL JS 3D.
* **Role**:
  - Displays the **Navi Mumbai Medical Logistics Command Center**.
  - Renders the interactive **Live 3D Metropolitan Logistics Network Map** with WebGL building extrusions and satellite imagery.
  - Controls row selection in scheduled fleet tables to filter route segments and zoom the 3D map.
  - Houses the 8 Decision Intelligence tools (Dashboard, Capacity ProgressBars, Warnings, Rationale, 3D Map, Comparison, Re-optimization, What-if Sandbox).

#### 🅱️ Optimization & Solver Engine ([`apps_opt_engine/`](file:///c:/AWS%20project/delivery-routes-optimization-for-logistics/apps_opt_engine))
* **Built With**: Java 21 (Amazon Corretto), Spring Boot 3.x, OptaPlanner 9.x, GraphHopper 8.0.
* **Role**:
  - `DispatchController`: Exposes `/opt-engine/solve` and `/opt-engine/status/{problemId}` REST endpoints.
  - `DispatchConstraintProvider`: The mathematical score engine enforcing 11 constraint rules (Hard, Medium, Soft).
  - `SolutionConsumer`: Takes the final OptaPlanner assignment, decodes GraphHopper polyline shapes, and builds per-vehicle stop sequences.

#### 🅾️ Road Routing Engine (GraphHopper + OpenStreetMap)
* **Role**:
  - Replaces dummy Euclidean distance formulas with **real driving road graphs**.
  - Precalculates distance & time matrices (`distancecache-util`) using real OpenStreetMap (`.pbf`) topology for Navi Mumbai roads.

#### 🅳 Cloud Infrastructure ([`apps_infra/`](file:///c:/AWS%20project/delivery-routes-optimization-for-logistics/apps_infra))
* **Built With**: AWS CDK in TypeScript.
* **Role**:
  - `PersistentBackendStack`: Provisions DynamoDB tables, S3 buckets, VPC networks, and Cognito UserPools.
  - `OptimizationEngineStack`: Deploys containerized OptaPlanner solver services to AWS ECS Fargate.
  - `DistanceCacheStack`: Runs containerized GraphHopper matrix tasks.
  - `BackendStack`: Configures HTTP API Gateway v2 routing.

---

## 🌟 3. What Did We Add Unique? (Key Innovations & Decision Intelligence)

Unlike standard route planners that only show basic lines on a flat map, we built a comprehensive **Decision Intelligence Suite & 3D Tactical Radar Map**:

---

### Innovation 1: Live 3D Tactical Metropolitan Radar Map
* **Photorealistic Satellite Base Layer**: Blends ArcGIS World Imagery aerial satellite texture with custom tactical dark styling.
* **Real 3D Extruded Buildings**: Extrudes urban building heights and 3D architectural structures dynamically using MapLibre WebGL vector fill-extrusions.
* **Interactive 3D HUD Controls**:
  - 🎯 **Zoom into 3D City**: Smooth camera flyTo zooming down into city street level at 68° camera pitch.
  - 🏢 **3D Buildings ON/OFF**: Toggle physical building extrusions.
  - 🔄 **Orbit 360°**: Continuous smooth camera flyover rotation around the logistics network.
  - 📡 **Pulsing Node Beacons**: Floating dark-glass badges with pulsing halo beacons anchoring warehouse depots and hospital stops.

---

### Innovation 2: Decision Intelligence Suite (Features 1–8)

#### 1️⃣ Optimization Summary Dashboard
* High-level operational health cards displaying Total Orders, Active Fleet Vans, Total Route Distance (km), Estimated Travel Duration (mins), Fleet Capacity Utilization (%), Solver Runtime (e.g. `1.42s`), and real OptaPlanner Score (`0hard/0medium/-184200soft`).

#### 2️⃣ Per-Vehicle Capacity Utilization Bar
* Cloudscape `ProgressBar` metrics showing payload volume ($m^3$) and weight ($kg$) fill rates per vehicle.
* Color-coded status thresholds: Green ($0-85\%$), Blue ($85-100\%$), Red Overload ($>100\%$).

#### 3️⃣ Constraint & Risk Diagnostics Engine
* Automated real-time warning detection:
  - 🔴 **Capacity Overload [HARD]**: Highlights vehicles loaded beyond maximum payload limits.
  - 🟡 **Contracted Fleet Surcharge**: Alerts when auxiliary third-party vehicles are triggered due to primary fleet saturation.
  - 🟡 **Time-Window Band Tightness**: Detects delivery time group mismatches.

#### 4️⃣ Deterministic Assignment Explanation (Audit Trail)
* Fact-based audit rationale explaining *why* a vehicle/route was selected:
  - Time band window alignment.
  - Current vehicle payload vs maximum capacity ($kg$).
  - Remaining payload capacity.
  - Selected hospital drop facts (package weight, time group, hospital location code).

#### 5️⃣ Turn-by-Turn 3D Polyline Visualizer
* Multi-vehicle color-coded route trajectory overlays with direction vectors, waypoint sequence markers, and 2D/3D map mode toggling.

#### 6️⃣ Before vs. Optimized Comparison Engine
* Quantitative side-by-side delta analysis comparing baseline direct round-trips against OptaPlanner consolidated routing:
  - Distance Saved (km) & percentage distance reduction (`distImprovePct%`).
  - Travel Time Saved (minutes).
  - Fleet Efficiency Gains.

#### 7️⃣ Dynamic Re-Optimization Modal
* On-demand solver re-evaluation tool allowing dispatch managers to scale vehicle capacity factors or inject operational updates, recalculating assignments via the OptaPlanner solver lifecycle.

#### 8️⃣ Non-Destructive What-If Simulation Sandbox
* Interactive scenario sandbox for testing hypothetical situations (e.g. emergency hospital order additions or $+20\%$ demand spikes).
* Displays a prominent `[WHAT-IF SIMULATION MODE]` alert banner while keeping production database records completely untouched.

---

## 📊 Summary Table of Key Components

| Feature / Innovation | What It Solves | Tech Used |
| :--- | :--- | :--- |
| **VRPTW Solver Engine** | Finds optimal routes under capacity & time window bounds | Java 21, OptaPlanner 9.x |
| **Road Network Graph** | Calculates real road distances instead of fake straight lines | GraphHopper 8.0, OpenStreetMap |
| **3D Tactical Map** | Visually verifies route topography & building heights | MapLibre GL 3D, WebGL, Esri Satellite |
| **Capacity ProgressBars** | Prevents vehicle overloading and tracks payload fill % | Cloudscape `ProgressBar` |
| **Risk Diagnostics** | Automatically alerts planners to hard/medium rule violations | Automated Risk Engine |
| **Assignment Audit Log** | Explains *why* an assignment was made using hard facts | Cloudscape `KeyValuePairs` |
| **Before/After Delta** | Proves financial & kilometer savings of optimization | Deterministic Delta Engine |
| **What-If Sandbox** | Tests emergency demand scenarios non-destructively | Temporary State Engine |

---

## 🚀 How to Run the Project Locally

### 1. Start the Frontend Command Center
```bash
cd apps_web
pnpm install
pnpm dev --port 3000
```
Open [http://localhost:3000](http://localhost:3000) to view the Navi Mumbai Command Center.

### 2. Run the OptaPlanner Solver Engine (Optional Backend)
```bash
cd apps_opt_engine
./gradlew build -x test
./gradlew :apps:nextday-delivery:bootRun --args="--spring.profiles.active=dev"
```




## Project Structure

```
.claude/
  rules/
    rocketride.md
.devcontainer/
  devcontainer.json
.gitignore
apps_infra/
  .gitignore
  .prettierrc
  bin/
    app.ts
  cdk.json
  config/
    default.yml
  eslint.config.mjs
  jest.config.ts
  lambda/
    api-order/
    api-web/
    tsconfig.json
    _shared/
    _test_fixture/
  package.json
  pnpm-lock.yaml
  scripts/
    data/
    dev-sample-order.sh
    open-demo-webui.sh
    pull-appvars-js.sh
    upload-master-data.sh
    upload-order-with-presigned-url.sh
  src/
    config/
    constants.ts
    constructs/
    stacks/
    utils/
  test/
    app/
    config/
    constructs/
    e2e/
    lambda/
    meta/
    stacks/
    _helpers/
  tsconfig.json
apps_opt_engine/
  .gitignore
  apps/
    app-core/
    distancecache-util/
    nextday-delivery/
  build.gradle.kts
  build_opt_engine.sh
  core/
    core-impl/
    routing/
  gradle/
    wrapper/
  gradle.properties
  gradlew
  gradlew.bat
  scripts/
    Dockerfile.distancecache
    Dockerfile.nextdaydelivery
  settings.gradle.kts
apps_web/
  .gitignore
  .prettierrc
  eslint.config.mjs
  index.html
  package.json
  pnpm-lock.yaml
  pnpm-workspace.yaml
  public/
    favicon/
    manifest.json
    robots.txt
  src/
    @types/
    api/
    App.tsx
    components/
    config/
    contexts/
    index.css
    main.tsx
    models/
    pages/
    services/
    styles/
    utils/
    vite-env.d.ts
  tsconfig.app.json
  tsconfig.json
  tsconfig.node.json
  vite.config.ts
CHANGELOG.md
CODE_OF_CONDUCT.md
CONTRIBUTING.md
design.md
docs/
  architecture.md
  imgs/
    architecture.png
    demo_screenshot.jpeg
    domain_model.png
  quickstart.md
implementation-current.md
LICENSE
LICENSE_THIRDPARTY.txt
package.json
pnpm-lock.yaml
pnpm-workspace.yaml
PROJECT_EXPLAINER.md
README.md

```


## Additional Visuals

![architecture.png](https://raw.githubusercontent.com/SujalPatil21/DISPATCHOPS/main/docs/imgs/architecture.png)

![domain_model.png](https://raw.githubusercontent.com/SujalPatil21/DISPATCHOPS/main/docs/imgs/domain_model.png)

