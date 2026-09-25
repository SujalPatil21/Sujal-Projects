# GlobeTrotter

GlobeTrotter is a full-stack travel planning and destination discovery platform designed to help users plan, organize, explore, and share trips from one place.

The application combines itinerary planning, destination recommendations, budget tracking, seasonal travel guidance, and community experiences into a single travel workspace.

---

## What GlobeTrotter Does

GlobeTrotter supports the complete travel-planning workflow:

```text
Discover a destination
        ↓
Create a trip
        ↓
Set dates + budget + interests
        ↓
Add destinations
        ↓
Get place / food recommendations
        ↓
Build day-by-day itinerary
        ↓
View seasonal travel conditions
        ↓
Track expenses and budget
        ↓
Share / publish the trip
        ↓
Discover community experiences
        ↓
Use another user's trip as your own editable copy
```

---

## Core Features

### Destination Discovery

Explore destinations dynamically from the backend city dataset.

Each destination can display:

- Destination imagery
- City and state
- Destination information
- Recommended places
- Food recommendations
- Community experiences

The frontend uses a shared image-resolution system so destination cards can display destination-specific imagery.

### Trip Planning

Users can create trips with:

- Trip name
- Start date
- End date
- Budget limit
- Budget tier
- Travel interests
- Description

Supported budget tiers:

```text
Budget
Mid-Range
Luxury
```

Supported travel interests:

```text
Heritage
Nature
Adventure
Food
Religious
Shopping
```

---

## Trip Workspace

Every trip has a dedicated workspace with four primary sections:

```text
Overview
Itinerary
Budget
Timeline
```

### Overview

Provides a read-only summary of the trip:

- Duration
- Number of destinations
- Budget
- Interests
- Destination cards
- Planned activities
- Typical seasonal conditions

### Itinerary

The main trip-building surface.

Users can:

- Add destinations
- Add places
- Add food/restaurants
- Add activities
- Assign dates
- Add custom activities
- View destination recommendations
- Build the trip day by day

### Budget

Tracks:

- Budget limit
- Total spent
- Remaining budget
- Average spending per day
- Category breakdown
- Manual expenses
- Reference budget estimates

Categories include:

```text
Activities
Transport
Accommodation
Meals
Other
```

### Timeline

Provides a chronological view of the planned trip and destinations.

---

# Recommendation Engine

GlobeTrotter includes a deterministic recommendation engine for travel planning.

Recommendations can include:

- Places
- Food / restaurants
- Activities

Recommendations use trip context such as:

- Destination
- Travel interests
- Budget tier
- Trip dates
- Category

Example:

```text
Trip Interests:
Heritage + Food

Destination:
Mumbai

        ↓

Recommended:
Gateway of India
Bademiya
Siddhivinayak Temple
...
```

The recommendation engine assists planning while keeping the final choice with the user.

---

# Typical Seasonal Conditions

GlobeTrotter provides typical seasonal travel guidance for destinations.

This is reference information, not live weather.

The feature uses:

```text
TripStop
   ↓
city_id
   ↓
travel start date
   ↓
travel month
   ↓
seasonal conditions API
   ↓
Seasonal Conditions Card
```

The backend uses static reference data for supported destinations.

API:

```http
GET /api/cities/{city_id}/seasonal-check?month={month}
```

Example response:

```json
{
  "season": "Monsoon",
  "typical_conditions": "Warm, humid and frequently rainy",
  "suitability": "moderate",
  "travel_tip": "Carry rain protection and allow extra travel time during heavy showers."
}
```

For destinations without seasonal reference data, the application uses a graceful fallback instead of blocking trip planning.

---

# Community Experiences

Users can publish trips as public community experiences.

The community workflow is:

```text
Create Trip
    ↓
Build Itinerary
    ↓
Publish to Community
    ↓
Other users discover it
    ↓
View Experience
    ↓
Like
    ↓
Use This Trip
    ↓
New editable trip copy
```

A published experience can expose:

- Trip title
- Creator
- Destinations
- Duration
- Itinerary
- Activities
- Food / restaurants
- Budget/reference information
- Interests
- Likes
- Uses

### Use This Trip

Use This Trip creates a new trip owned by the current user.

The original trip remains unchanged.

The copy operation preserves applicable planning data while excluding private information such as the original owner's ownership and actual expenses.

---

# Public Travel Profiles

GlobeTrotter supports public travel profiles for community creators.

Public profile route:

```text
/profile/:username
```

A public travel profile can display:

- Avatar
- Username
- Full name
- Bio
- Published experience count
- Published experiences
- Share Profile
- Use This Trip

Community creator attribution links back to the creator's public travel profile.

The private profile page remains separate:

```text
/profile
```

and is used for account/profile settings.

---

# Authentication

The authentication flow includes:

```text
Login
Register
OTP Verification
Forgot Password
Reset Password
Logout
```

The frontend uses the backend authentication APIs while maintaining authentication state for protected application routes.

---

# Destination Image System

Destination imagery is handled through a shared resolver rather than separate image logic for every page.

Typical flow:

```text
Backend city data
       ↓
city + state
       ↓
resolveCityImage(...)
       ↓
destination-specific image
       ↓
UI card
```

Images can be used across:

- Dashboard
- Destination discovery
- Trip destinations
- Upcoming trips
- Community experiences

The resolver supports destination-specific assets and graceful fallback behavior.

---

# Architecture

GlobeTrotter follows a conventional full-stack architecture.

```text
React + Vite
     |
     | HTTP / JSON
     v
FastAPI Backend
     |
     v
PostgreSQL
```

The backend provides authentication, city/master data, trips, recommendations, seasonal conditions, community experiences, and public profiles.

The new frontend is the primary user interface.

---

# Tech Stack

## Frontend

- React
- Vite
- JavaScript
- React Router
- Axios
- Lucide icons / existing project icon system
- CSS / component-based styling

## Backend

- Python
- FastAPI
- SQLAlchemy
- Pydantic

## Database

- PostgreSQL

## Development

- Node.js
- npm
- Python virtual environment

---

# Getting Started

## Prerequisites

Install:

- Python 3.12+
- Node.js
- npm
- PostgreSQL

## 1. Clone the Repository

```bash
git clone <your-repository-url>
cd GlobeTrotter
```

## 2. Backend Setup

Navigate to the backend:

```bash
cd backend
```

Create a Python virtual environment.

Example using uv:

```bash
uv venv --python 3.12
```

Activate on Windows:

```powershell
.venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Configure the required environment variables according to the backend configuration.

Start FastAPI:

```bash
uvicorn app.main:app --reload --port 8000
```

Backend:

```text
http://localhost:8000
```

API documentation:

```text
http://localhost:8000/docs
```

## 3. Frontend Setup

Navigate to the primary frontend:

```bash
cd "new frontend"
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

# API Areas

### Authentication

```text
/auth/*
```

### Cities / Master Data

```text
/api/cities
/api/cities/{city_id}
/api/cities/{city_id}/seasonal-check
```

### Trips

Trip creation, trip settings, destinations, itinerary, budget, and timeline APIs.

### Recommendations

Destination-aware recommendation endpoints for places, food, and activities.

### Community

```text
/api/community/experiences
/api/community/experiences/{experience_id}
/api/community/experiences/{experience_id}/like
/api/community/experiences/{experience_id}/copy
```

### Public Profiles

```text
/api/users/{username}
```

---

# Development Verification

A basic verification flow is:

```text
Register
    ↓
Verify OTP
    ↓
Login
    ↓
Open Dashboard
    ↓
Explore destinations
    ↓
Create a trip
    ↓
Add a destination
    ↓
Add recommended places / food / activities
    ↓
Check seasonal conditions
    ↓
Review itinerary
    ↓
Add expenses
    ↓
Check budget
    ↓
Review timeline
    ↓
Publish trip
    ↓
Open Community
    ↓
Open creator profile
    ↓
Use This Trip
    ↓
Verify a new editable trip is created
```

For a production/demo build:

```bash
npm run build
```

---

# Privacy Model

Public travel content is separated from private account information.

Public-facing areas should not expose:

- Passwords
- Private account information
- Private expenses
- Internal ownership/security information

A Community Experience becomes public only after the owner explicitly publishes it.

---

# Design System

The new frontend follows a unified travel-editorial visual direction.

The Landing Page, Sign In, and Sign Up pages act as the primary design references for the rest of the application.

The same visual language extends to:

- Dashboard
- Destination discovery
- Trip workspace
- Itinerary
- Budget
- Timeline
- Community
- Public profiles

Design principles include:

- Strong editorial headings
- Clean neutral surfaces
- Travel-focused imagery
- Consistent buttons
- Consistent cards
- Controlled spacing
- Responsive layouts
- Minimal visual noise

---

# Product Principles

### Plan

Give users the tools to create a complete trip.

### Explore

Help users discover destinations, places, and food.

### Personalize

Recommendations use trip context without removing user control.

### Organize

Keep itinerary, budget, and timeline connected.

### Share

Let users publish useful travel experiences.

### Reuse

Allow other travelers to use published trips as editable starting points.

---

# Current Scope

The current application focuses on:

- Travel planning
- Destination discovery
- Recommendations
- Itinerary management
- Budget management
- Seasonal travel guidance
- Community experiences
- Public travel profiles
- Trip cloning

The following are intentionally not part of the current scope:

- Messaging
- Real-time collaboration
- Complex social networking
- Comments
- Followers/Following
- Custom social groups
- Real-time weather APIs

---

# Contributing

1. Create a feature branch.
2. Make focused changes.
3. Keep frontend and backend contracts consistent.
4. Avoid unnecessary dependencies.
5. Run the relevant build/tests.
6. Open a pull request with a clear description.

Example:

```bash
git checkout -b feature/your-feature
```

---

# License

Add the project's chosen license here.

---

# GlobeTrotter

Plan. Explore. Experience.

A travel planning platform built to turn destination ideas into organized, personalized journeys.


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.




## API Reference

| Method | Endpoint | Description |
|---|---|---|
| GET | `/experiences` | FastAPI Endpoint |
| GET | `/experiences/{experience_id}` | FastAPI Endpoint |
| POST | `/experiences/{experience_id}/like` | FastAPI Endpoint |
| DELETE | `/experiences/{experience_id}/like` | FastAPI Endpoint |
| POST | `/experiences/{experience_id}/copy` | FastAPI Endpoint |
| GET | `` | FastAPI Endpoint |
| POST | `/{trip_id}/expenses` | FastAPI Endpoint |
| PUT | `/{trip_id}/expenses/{expense_id}` | FastAPI Endpoint |
| DELETE | `/{trip_id}/expenses/{expense_id}` | FastAPI Endpoint |
| GET | `/cities` | FastAPI Endpoint |
| GET | `/cities/{city_id}/seasonal-check` | FastAPI Endpoint |
| GET | `/cities/{city_id}` | FastAPI Endpoint |
| GET | `/tourist-spots` | FastAPI Endpoint |
| GET | `/tourist-spots/{spot_id}` | FastAPI Endpoint |
| GET | `/restaurants` | FastAPI Endpoint |
| GET | `/restaurants/{restaurant_id}` | FastAPI Endpoint |
| GET | `/budget-estimates` | FastAPI Endpoint |
| GET | `/budget-estimates/{estimate_id}` | FastAPI Endpoint |
| GET | `/activities` | FastAPI Endpoint |
| GET | `/{share_id}` | FastAPI Endpoint |
| GET | `/cities/{city_id}/places` | FastAPI Endpoint |
| GET | `/cities/{city_id}/restaurants` | FastAPI Endpoint |
| GET | `/budget` | FastAPI Endpoint |
| POST | `/budget/multi-city` | FastAPI Endpoint |
| GET | `/trips/{trip_id}` | FastAPI Endpoint |
| POST | `/{city_id}` | FastAPI Endpoint |
| DELETE | `/{city_id}` | FastAPI Endpoint |
| POST | `/{stop_id}/activities` | FastAPI Endpoint |
| DELETE | `/{stop_id}/activities/{activity_id}` | FastAPI Endpoint |
| PUT | `/{stop_id}/activities/{activity_id}` | FastAPI Endpoint |
| POST | `` | FastAPI Endpoint |
| GET | `/{trip_id}` | FastAPI Endpoint |
| PUT | `/{trip_id}` | FastAPI Endpoint |
| DELETE | `/{trip_id}` | FastAPI Endpoint |
| POST | `/{trip_id}/publish` | FastAPI Endpoint |
| POST | `/{trip_id}/unpublish` | FastAPI Endpoint |
| POST | `/{trip_id}/stops` | FastAPI Endpoint |
| DELETE | `/{trip_id}/stops/{stop_id}` | FastAPI Endpoint |
| PUT | `/{trip_id}/stops/{stop_id}` | FastAPI Endpoint |
| GET | `/{trip_id}/budget` | FastAPI Endpoint |
| GET | `/{username}` | FastAPI Endpoint |
| POST | `/register` | FastAPI Endpoint |
| POST | `/verify-otp` | FastAPI Endpoint |
| POST | `/login` | FastAPI Endpoint |
| POST | `/resend-otp` | FastAPI Endpoint |
| POST | `/forgot-password` | FastAPI Endpoint |
| POST | `/reset-password` | FastAPI Endpoint |
| GET | `/me` | FastAPI Endpoint |
| PUT | `/me` | FastAPI Endpoint |
| DELETE | `/me` | FastAPI Endpoint |
| GET | `/` | FastAPI Endpoint |


## Project Structure

```
backend/
  .env.example
  .gitignore
  alter_db.py
  alter_db2.py
  app/
    api/
    auth/
    core/
    db/
    main.py
    models/
    schemas/
    services/
  backend_server.log
  Datasets/
    Budget_Estimates.csv
    gen.py
    generate.py
    restaurant_dataset.csv
    Tourist_Spots_Complete (1).csv
    wiki_gen.py
  requirements.txt
  seed_community.py
  seed_data.py
  templates/
    forgot_password.html
    login.html
    registration.html
LICENSE
new frontend/
  .gitignore
  .oxlintrc.json
  image/
    GOA1.jpg
    GOA2.jpeg
    Images/
    Jaipur 1.jpg
    Kerala Backwaters Bliss_ A Tranquil Houseboat Cruise.jpeg
    ladak 1.jpg
    LADAK2.jpg
    landing page image.jpeg
    Taj Mahal.jpg
  index.html
  jsconfig.json
  package-lock.json
  package.json
  postcss.config.js
  public/
    favicon.svg
    icons.svg
  README.md
  src/
    api/
    App.css
    App.jsx
    assets/
    components/
    data/
    index.css
    main.jsx
    pages/
    utils/
  tailwind.config.js
  vite.config.js
README.md

```


## Additional Visuals

![GOA1.jpg](https://raw.githubusercontent.com/SujalPatil21/Globe-Trotter/main/new frontend/image/GOA1.jpg)

![GOA2.jpeg](https://raw.githubusercontent.com/SujalPatil21/Globe-Trotter/main/new frontend/image/GOA2.jpeg)

![Abbey Falls.jpg](https://raw.githubusercontent.com/SujalPatil21/Globe-Trotter/main/new frontend/image/Images/karnataka/Abbey Falls.jpg)

![Bangalore Palace.jpg](https://raw.githubusercontent.com/SujalPatil21/Globe-Trotter/main/new frontend/image/Images/karnataka/Bangalore Palace.jpg)

![Chamundi Hills.jpg](https://raw.githubusercontent.com/SujalPatil21/Globe-Trotter/main/new frontend/image/Images/karnataka/Chamundi Hills.jpg)

![Lalbagh Botanical Garden.jpg](https://raw.githubusercontent.com/SujalPatil21/Globe-Trotter/main/new frontend/image/Images/karnataka/Lalbagh Botanical Garden.jpg)

![MTR (Mavalli Tiffin Room).jpg](https://raw.githubusercontent.com/SujalPatil21/Globe-Trotter/main/new frontend/image/Images/karnataka/MTR (Mavalli Tiffin Room).jpg)

![Mysore Palace.jpg](https://raw.githubusercontent.com/SujalPatil21/Globe-Trotter/main/new frontend/image/Images/karnataka/Mysore Palace.jpg)

![Alleppey Backwaters Houseboat.jpg](https://raw.githubusercontent.com/SujalPatil21/Globe-Trotter/main/new frontend/image/Images/kerla/Alleppey Backwaters Houseboat.jpg)

![Eravikulam National Park.jpg](https://raw.githubusercontent.com/SujalPatil21/Globe-Trotter/main/new frontend/image/Images/kerla/Eravikulam National Park.jpg)

![Fort Kochi & Chinese Fishing Nets.jpg](https://raw.githubusercontent.com/SujalPatil21/Globe-Trotter/main/new frontend/image/Images/kerla/Fort Kochi & Chinese Fishing Nets.jpg)

![Kayees Rahmathulla Cafe.jpg](https://raw.githubusercontent.com/SujalPatil21/Globe-Trotter/main/new frontend/image/Images/kerla/Kayees Rahmathulla Cafe.jpg)

![Kumarakom Bird Sanctuary.jpg](https://raw.githubusercontent.com/SujalPatil21/Globe-Trotter/main/new frontend/image/Images/kerla/Kumarakom Bird Sanctuary.jpg)

![Mattancherry Palace.jpg](https://raw.githubusercontent.com/SujalPatil21/Globe-Trotter/main/new frontend/image/Images/kerla/Mattancherry Palace.jpg)

![Munnar Tea Gardens.jpg](https://raw.githubusercontent.com/SujalPatil21/Globe-Trotter/main/new frontend/image/Images/kerla/Munnar Tea Gardens.jpg)

![bademiya.jpg](https://raw.githubusercontent.com/SujalPatil21/Globe-Trotter/main/new frontend/image/Images/maharashtra/bademiya.jpg)

![gate of india.jpg](https://raw.githubusercontent.com/SujalPatil21/Globe-Trotter/main/new frontend/image/Images/maharashtra/gate of india.jpg)

![shaniwar wada.jpg](https://raw.githubusercontent.com/SujalPatil21/Globe-Trotter/main/new frontend/image/Images/maharashtra/shaniwar wada.jpg)

![sidhi vinayk.jpg](https://raw.githubusercontent.com/SujalPatil21/Globe-Trotter/main/new frontend/image/Images/maharashtra/sidhi vinayk.jpg)

![Sinhagad Fort viewpoint.jpg](https://raw.githubusercontent.com/SujalPatil21/Globe-Trotter/main/new frontend/image/Images/maharashtra/Sinhagad Fort viewpoint.jpg)

![Sula Vineyards.jpg](https://raw.githubusercontent.com/SujalPatil21/Globe-Trotter/main/new frontend/image/Images/maharashtra/Sula Vineyards.jpg)

![Vaishali.jpg](https://raw.githubusercontent.com/SujalPatil21/Globe-Trotter/main/new frontend/image/Images/maharashtra/Vaishali.jpg)

![Amber Fort.jpg](https://raw.githubusercontent.com/SujalPatil21/Globe-Trotter/main/new frontend/image/Images/rajesthan/Amber Fort.jpg)

![City Palace Udaipur.jpg](https://raw.githubusercontent.com/SujalPatil21/Globe-Trotter/main/new frontend/image/Images/rajesthan/City Palace Udaipur.jpg)

![Hawa Mahal.jpg](https://raw.githubusercontent.com/SujalPatil21/Globe-Trotter/main/new frontend/image/Images/rajesthan/Hawa Mahal.jpg)

![Lake Pichola.jpg](https://raw.githubusercontent.com/SujalPatil21/Globe-Trotter/main/new frontend/image/Images/rajesthan/Lake Pichola.jpg)

![Laxmi Misthan Bhandar.jpg](https://raw.githubusercontent.com/SujalPatil21/Globe-Trotter/main/new frontend/image/Images/rajesthan/Laxmi Misthan Bhandar.jpg)

![Mehrangarh Fort.jpg](https://raw.githubusercontent.com/SujalPatil21/Globe-Trotter/main/new frontend/image/Images/rajesthan/Mehrangarh Fort.jpg)

![d83db9a13b6bf286725ddf6881b14278.jpg](https://raw.githubusercontent.com/SujalPatil21/Globe-Trotter/main/new frontend/image/Images/tamil nadu/d83db9a13b6bf286725ddf6881b14278.jpg)

![Doddabetta Peak.png](https://raw.githubusercontent.com/SujalPatil21/Globe-Trotter/main/new frontend/image/Images/tamil nadu/Doddabetta Peak.png)

![Kapaleeshwarar Temple.jpg](https://raw.githubusercontent.com/SujalPatil21/Globe-Trotter/main/new frontend/image/Images/tamil nadu/Kapaleeshwarar Temple.jpg)

![Marina Beach.jpg](https://raw.githubusercontent.com/SujalPatil21/Globe-Trotter/main/new frontend/image/Images/tamil nadu/Marina Beach.jpg)

![Meenakshi Amman Temple.jpg](https://raw.githubusercontent.com/SujalPatil21/Globe-Trotter/main/new frontend/image/Images/tamil nadu/Meenakshi Amman Temple.jpg)

![Murugan Idli Shop.jpg](https://raw.githubusercontent.com/SujalPatil21/Globe-Trotter/main/new frontend/image/Images/tamil nadu/Murugan Idli Shop.jpg)

![Nahar's Nilgiris Bakery.jpg](https://raw.githubusercontent.com/SujalPatil21/Globe-Trotter/main/new frontend/image/Images/tamil nadu/Nahar's Nilgiris Bakery.jpg)

![Ooty Botanical Garden.jpg](https://raw.githubusercontent.com/SujalPatil21/Globe-Trotter/main/new frontend/image/Images/tamil nadu/Ooty Botanical Garden.jpg)

![Agra Fort.jpg](https://raw.githubusercontent.com/SujalPatil21/Globe-Trotter/main/new frontend/image/Images/uttar pradesh/Agra Fort.jpg)

![Bara Imambara.jpg](https://raw.githubusercontent.com/SujalPatil21/Globe-Trotter/main/new frontend/image/Images/uttar pradesh/Bara Imambara.jpg)

![Blue Lassi Shop.jpg](https://raw.githubusercontent.com/SujalPatil21/Globe-Trotter/main/new frontend/image/Images/uttar pradesh/Blue Lassi Shop.jpg)

![Dashashwamedh Ghat.jpg](https://raw.githubusercontent.com/SujalPatil21/Globe-Trotter/main/new frontend/image/Images/uttar pradesh/Dashashwamedh Ghat.jpg)

![e40118b51e95b5130251019cdce8cd00.jpg](https://raw.githubusercontent.com/SujalPatil21/Globe-Trotter/main/new frontend/image/Images/uttar pradesh/e40118b51e95b5130251019cdce8cd00.jpg)

![Kashi Vishwanath Temple.jpg](https://raw.githubusercontent.com/SujalPatil21/Globe-Trotter/main/new frontend/image/Images/uttar pradesh/Kashi Vishwanath Temple.jpg)

![Taj Mahal.jpg](https://raw.githubusercontent.com/SujalPatil21/Globe-Trotter/main/new frontend/image/Images/uttar pradesh/Taj Mahal.jpg)

![Jaipur 1.jpg](https://raw.githubusercontent.com/SujalPatil21/Globe-Trotter/main/new frontend/image/Jaipur 1.jpg)

![Kerala Backwaters Bliss_ A Tranquil Houseboat Cruise.jpeg](https://raw.githubusercontent.com/SujalPatil21/Globe-Trotter/main/new frontend/image/Kerala Backwaters Bliss_ A Tranquil Houseboat Cruise.jpeg)

![ladak 1.jpg](https://raw.githubusercontent.com/SujalPatil21/Globe-Trotter/main/new frontend/image/ladak 1.jpg)

![LADAK2.jpg](https://raw.githubusercontent.com/SujalPatil21/Globe-Trotter/main/new frontend/image/LADAK2.jpg)

![landing page image.jpeg](https://raw.githubusercontent.com/SujalPatil21/Globe-Trotter/main/new frontend/image/landing page image.jpeg)

![Taj Mahal.jpg](https://raw.githubusercontent.com/SujalPatil21/Globe-Trotter/main/new frontend/image/Taj Mahal.jpg)

![hero.png](https://raw.githubusercontent.com/SujalPatil21/Globe-Trotter/main/new frontend/src/assets/hero.png)

