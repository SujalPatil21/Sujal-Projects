# NWIS
### Nearby Wells Intelligence System

Turn nearby well history into actionable drilling intelligence.

![Python](https://img.shields.io/badge/Python-3.x-blue?style=flat&logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-0.109.0-009688?style=flat&logo=fastapi)
![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat&logo=typescript)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16.x-336791?style=flat&logo=postgresql)
![PostGIS](https://img.shields.io/badge/PostGIS-Enabled-1E8CBE?style=flat&logo=postgresql)
![License](https://img.shields.io/badge/License-Not_yet_specified-lightgray?style=flat)

---

## 1. PROJECT OVERVIEW
Historical drilling knowledge is distributed across wells, reports, events, formations and operational records.

NWIS brings this information together into a spatial intelligence platform that helps engineers:
- understand nearby wells
- inspect historical drilling experience
- identify operational risks
- evaluate proposed well locations
- compare candidate locations
- access supporting evidence

---

## 2. CORE FEATURES

### Spatial Well Intelligence
- Interactive field map
- Active, historical and completed wells
- Field areas/polygons
- Custom well symbols
- Risk visualization
- Well selection and quick intelligence

### Well Intelligence
- Well overview
- Current drilling context
- Formation information
- Historical events
- Nearby wells
- Risk information
- Anomaly information
- Decision-support recommendations

### Historical Intelligence
- Search across historical events and drilling knowledge
- Event/formation context
- Supporting offset-well evidence

### Risk Intelligence
- Field-wide risk aggregation
- Risk distribution
- High-risk operations
- Watchlist
- Operational risk categories

### Candidate Evaluation
- Engineer-selected candidate locations
- NWIS-recommended candidate locations
- Spatial candidate analysis
- Nearby-well evidence
- Suitability scoring
- Drilling-risk scoring
- Supporting wells
- Evidence connections on map
- Explainable recommendations

### Reports
- Well intelligence PDF
- Candidate evaluation PDF
- Structured engineering-style reports

### Engineer Authentication
- Engineer registration
- Engineer login
- Protected platform routes
- Authentication state
- Logout

---

## 3. SYSTEM ARCHITECTURE

```mermaid
graph TD
    User([Engineer]) --> UI[React + TypeScript]
    UI --> API[FastAPI REST API]
    API --> Services[Services / Recommendation Engine]
    Services --> ORM[SQLAlchemy]
    ORM --> DB[(PostgreSQL + PostGIS)]

    subgraph "Core Modules"
        Candidate[Candidate Evaluation]
        WellInt[Well Intelligence]
        HistInt[Historical Intelligence]
        RiskInt[Risk Intelligence]
        Reports[Reports]
    end
    API -.-> Candidate
    API -.-> WellInt
    API -.-> HistInt
    API -.-> RiskInt
    API -.-> Reports
```

---

## 4. TECH STACK

| Layer | Technology | Purpose |
| --- | --- | --- |
| **Frontend** | React, TypeScript, Vite | UI framework and build tooling |
| | Tailwind CSS | Styling |
| | Leaflet, React-Leaflet | Map visualization |
| | Recharts | Data visualization |
| | TanStack Query | Data fetching and caching |
| | Lucide React | Icons |
| **Backend** | FastAPI | REST API framework |
| | SQLAlchemy, GeoAlchemy2 | ORM and spatial queries |
| | Alembic | Database migrations |
| | psycopg2-binary | PostgreSQL adapter |
| | ReportLab | PDF generation |
| **Database** | PostgreSQL | Relational database |
| | PostGIS | Spatial extension |

---

## 5. DATABASE

Core entities in the NWIS database:

- **`engineers`**: Engineer authentication credentials and profiles.
- **`wells`**: Core well header data and geospatial locations.
- **`drilling_observations`**: Depth-based parameter readings during drilling.
- **`drilling_events`**: Recorded historical operational incidents (e.g., mud loss, stuck pipe).
- **`formations`**: Geological formation depths and descriptions.
- **`reports`**: Drilling report metadata and PDF file paths.
- **`report_chunks`**: Parsed text chunks from reports. Note: pgvector is currently optional/disabled locally; embedding fields use JSON fallback.
- **`model_predictions`**: Stored outputs from analytical models.
- **`anomalies`**: Detected deviations in drilling parameters.
- **`candidate_evaluations`**: Saved spatial candidate well locations and calculated suitability scores.

---

## 6. API DOCUMENTATION

### Health
- `GET /health`

### Wells
- `GET /api/wells/`
- `GET /api/wells/{well_id}`
- `GET /api/wells/nearby`
- `GET /api/wells/{well_id}/events`
- `GET /api/wells/{well_id}/observations`
- `GET /api/wells/{well_id}/intelligence`

### Recommendation
- `GET /api/wells/{well_id}/recommendation`

### Risk
- `POST /api/risk/predict`
- `GET /api/risk/overview`

### Historical
- `GET /api/search`
- `POST /api/rag/search`

### Candidates
- `GET /api/candidates/recommended`
- `POST /api/candidates/evaluate`
- `GET /api/candidates/{candidate_id}`

### Dashboard
- `GET /api/dashboard/overview`
- `GET /api/dashboard/risk/overview`

### Reports
- `GET /api/reports/`
- `GET /api/reports/{well_id}/pdf`

### Debug
- `GET /api/debug/data-summary`

### Authentication
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/auth/logout`

---

## 7. RECOMMENDATION ENGINE

The current implementation utilizes a **deterministic, data-driven decision-support logic** to evaluate next-well candidates. It is not currently a trained production ML model.

**Suitability Components & Weights:**
- Geological Suitability: 30%
- Reservoir Quality: 25%
- Formation Continuity: 15%
- Historical Drilling Risk: 15% *(inverted — lower risk = higher score)*
- Offset-Well Evidence: 10%
- Spatial Confidence: 5%

**Features:**
- Field-aware candidate generation (grid scanning)
- Candidate filtering based on min-separation distances
- Nearby-well evidence gathering
- Supporting wells tracking
- Candidate ranking based on total suitability
- Drilling-risk classification (Low / Medium / High based on incident density)

---

## 8. MAP INTELLIGENCE

The platform includes comprehensive spatial operations using **PostGIS**:
- Field bounding boxes
- Active, historical, and completed well markers
- Custom technical markers and risk rings
- Candidate markers with candidate-to-supporting-well evidence lines
- Influencing-well highlighting on hover
- Candidate card ↔ map synchronization
- Map-based well intelligence popups

---

## 9. AUTHENTICATION

Engineer authentication flow:
`Landing Page` → `Engineer Login` → `Register / Login` → `Authenticated Platform`

- **Registration & Login**: Dedicated engineer onboarding.
- **Protected Routes**: Platform features require active authentication.
- **Session**: Managed via JWT/token approach.
- **Security**: Password hashing using standard cryptographic practices.

---

## 10. DEMO DATA

The repository currently uses **SYNTHETIC / DEMONSTRATION DATA**.
This data does not contain real OIL proprietary production records. The synthetic dataset is strictly designed to demonstrate:
- well relationships
- drilling parameters
- historical events
- formations
- operational risks
- candidate evaluation

---

## 11. PROJECT STRUCTURE

```text
nwis/
├── backend/
│   ├── alembic/
│   ├── app/
│   ├── scripts/
│   ├── tests/
│   ├── venv/
│   └── requirements.txt
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── vite.config.ts
├── data/
├── scripts/
├── .env.example
├── README.md
└── run_nwis.bat
```

---

## 12. LOCAL SETUP

### Prerequisites
- Python 3.10+
- Node.js 18+
- PostgreSQL
- PostGIS Extension

### Database Setup
1. Create a local PostgreSQL database named `nwis`.
2. Enable PostGIS: `CREATE EXTENSION postgis;`
3. Configure your `.env` file based on `.env.example`.

### Environment Variables

| Variable | Required | Description |
| --- | --- | --- |
| `DATABASE_URL` | Yes | PostgreSQL connection string (e.g., `postgresql+psycopg://postgres:password@localhost:5432/nwis`) |
| `MODEL_MODE` | No | `demo` or production toggle |
| `ERTMAC_MODE` | No | Integration toggle |
| `EMBEDDING_MODE` | No | Embedding generation toggle |
| `LLM_MODE` | No | LLM enablement toggle |
| `MAP_TILE_URL` | No | Map tile provider URL |

---

## 13. BACKEND RUNNING

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
alembic upgrade head
uvicorn app.main:app --reload
```

---

## 14. FRONTEND RUNNING

```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## 15. API / SWAGGER

Once the backend is running, access the interactive API documentation at:
- **Swagger UI**: `/docs`
- **ReDoc**: `/redoc`

---

## 16. SCREENSHOTS

*Currently, no screenshots are committed to the repository. Placeholders below demonstrate intended screen placements.*

- **Overview / Map Intelligence**
  *(Placeholder: Screenshot of the interactive map with well clusters)*
- **Candidate Evaluation**
  *(Placeholder: Screenshot of the candidate suitability grid and evidence connections)*
- **Well Intelligence & Reports**
  *(Placeholder: Screenshot of the well details drawer and PDF report trigger)*
- **Risk Intelligence**
  *(Placeholder: Screenshot of risk distribution charts and watchlist)*

---

## 17. DEMO WORKFLOW

1. **Engineer Login**: Authenticate into the platform.
2. **Overview**: View the field map and active regions.
3. **Inspect Wells**: Click on active/historical wells to open Well Intelligence.
4. **Review Evidence**: Examine historical drilling events and risk anomalies.
5. **Candidate Evaluation**: Generate recommended locations for next-well drilling.
6. **Inspect Supporting Wells**: Review the spatial logic and offset-well incident history.
7. **Download Report**: Generate a PDF summary of the chosen candidate or well.

---

## 18. DESIGN SYSTEM

- **Aesthetic**: Industrial energy / oil & gas aesthetic.
- **Theme**: Dark interface with minimal high-contrast UI elements.
- **Accents**: Petroleum teal accents for active indicators and selections.
- **Visualization**: Technical geospatial mapping and modern chart visualizations.

---

## 19. CURRENT LIMITATIONS

- **Data**: Exclusively uses synthetic demo data.
- **Recommendation Logic**: Uses deterministic decision-support instead of trained production ML.
- **Embeddings**: pgvector is optional/unavailable locally, currently falling back to JSON storage.
- **Map Tiles**: Dependent on external map tile providers (OpenStreetMap).

---

## 20. FUTURE ROADMAP

- Production ML inference integration.
- Real eRTMAC real-time data integration.
- Document OCR/NLP pipeline for historical daily drilling reports.
- Full pgvector semantic search deployment.
- Richer RAG capabilities across operational manuals.
- PostGIS-native candidate generation optimization.

---

## 21. RESPONSIBLE CLAIMS

This application provides **data-driven decision support** and a **deterministic recommendation engine**. It is designed to integrate predictive ML models in the future, but currently does not run production AI that "predicts drilling with high accuracy". 

It contains **no real OIL proprietary data**, is not a production deployment, and has not been validated for real-world drilling decisions.

---

## 22. CONTRIBUTING

1. Create a feature branch (`git checkout -b feature/my-feature`).
2. Make your changes.
3. Run tests and verify the build.
4. Submit a Pull Request.

---

## 23. LICENSE

License: Not yet specified.

---

## 24. ACKNOWLEDGEMENTS / CONTEXT

This implementation was developed as a hackathon/demo system targeting spatial well intelligence and candidate evaluation.


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.


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




## API Reference

| Method | Endpoint | Description |
|---|---|---|
| POST | `/register` | FastAPI Endpoint |
| POST | `/login` | FastAPI Endpoint |
| GET | `/me` | FastAPI Endpoint |
| POST | `/logout` | FastAPI Endpoint |
| POST | `/evaluate` | FastAPI Endpoint |
| GET | `/recommended` | FastAPI Endpoint |
| GET | `/{candidate_id}` | FastAPI Endpoint |
| GET | `/overview` | FastAPI Endpoint |
| GET | `/risk/overview` | FastAPI Endpoint |
| GET | `/data-summary` | FastAPI Endpoint |
| GET | `/search` | FastAPI Endpoint |
| POST | `/search` | FastAPI Endpoint |
| GET | `/{well_id}/recommendation` | FastAPI Endpoint |
| GET | `/` | FastAPI Endpoint |
| GET | `/{well_id}/pdf` | FastAPI Endpoint |
| POST | `/predict` | FastAPI Endpoint |
| GET | `/{well_id}` | FastAPI Endpoint |
| GET | `/nearby` | FastAPI Endpoint |
| GET | `/{well_id}/events` | FastAPI Endpoint |
| GET | `/{well_id}/observations` | FastAPI Endpoint |
| GET | `/{well_id}/intelligence` | FastAPI Endpoint |
| GET | `/health` | FastAPI Endpoint |


## Project Structure

```
.claude/
  rules/
    rocketride.md
.env.example
.gitignore
backend/
  alembic/
    env.py
    README
    script.py.mako
    versions/
  alembic.ini
  app/
    api/
    db/
    main.py
    models/
    services/
  requirements.txt
  scripts/
    ingest_data.py
  test_auth.py
data/
  nwis_historical_intelligence.csv
  nwis_synthetic_master.csv
frontend/
  .gitignore
  .oxlintrc.json
  index.html
  package-lock.json
  package.json
  public/
    favicon.svg
    icons.svg
  README.md
  src/
    api.ts
    App.css
    App.tsx
    assets/
    components/
    contexts/
    index.css
    lib/
    main.tsx
    pages/
  tsconfig.app.json
  tsconfig.json
  tsconfig.node.json
  vite.config.ts
README.md
run_nwis.bat
scripts/
  test_db.py
  verify_db.py

```


## Additional Visuals

![hero.png](https://raw.githubusercontent.com/SujalPatil21/Drill-Insight/main/frontend/src/assets/hero.png)

![Homepageimage.jpg](https://raw.githubusercontent.com/SujalPatil21/Drill-Insight/main/frontend/src/assets/Homepageimage.jpg)

![Logo.png](https://raw.githubusercontent.com/SujalPatil21/Drill-Insight/main/frontend/src/assets/Logo.png)

