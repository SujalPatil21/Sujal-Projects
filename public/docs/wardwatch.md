<h1>
  WardWatch |
  <a href="https://ward-watch.vercel.app/" style="font-size: 18px;"> Live Demo</a>
</h1>


<p align="center">
  <b>Know every bed. Every patient. Every second.</b>
</p>

 
<p align="center">
  <img src="https://img.shields.io/badge/Backend-SpringBoot-green?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Database-PostgreSQL-blue?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/RealTime-WebSockets-orange?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Status-Active-success?style=for-the-badge"/>
</p>

---

## 📌 Overview

WardWatch is a **real-time hospital ward management system** that provides complete visibility into bed availability and patient flow.

Instead of relying on manual registers and delayed updates, WardWatch delivers a **live dashboard** that enables hospital staff to make faster, more accurate decisions.

---

## 🎯 Problem

- No real-time visibility of ward and bed status  
- Information scattered across systems and manual records  
- Delayed discharges blocking bed availability  
- Inefficient bed utilization  
- Decisions based on outdated data  

---

## 💡 Solution

WardWatch provides a **centralized, real-time system** for managing ward operations efficiently.

- Live tracking of bed status  
- Automatic bed allocation and updates  
- Multi-ward monitoring  
- Role-based access control  
- Shift handover summaries (printable)  
- Smart alerts for delays and capacity  

---

## 🖼️ System Preview

### 🔐 Login Screens
<p align="center">
  <img src="./login1.jpg" width="45%" />
  <img src="./login2.jpg" width="45%" />
</p>

---

### 👨‍💼 Admin Dashboard
<p align="center">
  <img src="./admin1.jpg" width="45%" />
  <img src="./admin2.jpg" width="45%" />
</p>

---

### 👩‍⚕️ Staff View
<p align="center">
  <img src="./staff1.jpg" width="45%" />
  <img src="./staff2.jpg" width="45%" />
</p>

---

## 🏗️ Architecture

```
Client (Frontend)
        ↓
Spring Boot API Layer
        ↓
Business Logic (Bed Allocation, Queue, Alerts)
        ↓
WebSocket Layer (Real-time Updates)
        ↓
PostgreSQL Database (Local / Supabase)
```





---

## ⚙️ Configuration

### 🔁 Profiles

This project supports multiple environments:

#### ▶️ Local Development
```
spring.profiles.active=local
```

#### ☁️ Production (Supabase)
```
spring.profiles.active=prod
```

---

## 🚀 Running the Project

```bash
# Clone the repository
git clone https://github.com/SujalPatil21/WardWatch.git

# Navigate to project
cd WardWatch

# Run application
./mvnw spring-boot:run
```

---

## 📊 Impact

- ⚡ Faster decision-making  
- 🏥 Improved bed utilization  
- 🔄 Efficient patient flow management  
- 📈 Better operational visibility  

---

## 🔮 Future Enhancements

- AI-based bed prediction  
- Mobile app integration  
- Analytics dashboard  
- Hospital-wide scalability  

---

## 👨‍💻 Author

**Shreya Awari**
**Sujal Patil**
**Tejas Halvankar**


---

## ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub!

---

## 📄 License

This project is for academic and demonstration purposes.


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.




## API Reference

| Method | Endpoint | Description |
|---|---|---|
| GET | `/capacity` | Backend Endpoint |
| GET | `/alerts` | Backend Endpoint |
| GET | `/summary` | Backend Endpoint |
| POST | `/register` | Backend Endpoint |
| POST | `/login` | Backend Endpoint |
| POST | `/{id}/complete` | Backend Endpoint |
| GET | `/debug/test-ws` | Backend Endpoint |
| POST | `/{id}` | Backend Endpoint |


## Database Schema

The following entities were extracted from the data model:

- **Bed**: `id, status, patientName, doctor, lastUpdated, wardId`
- **Queue**: `id, name, type, status, bedId, admittedAt, createdAt`
- **User**: `id, username, password, role`
- **Ward**: `id, name`


## Project Structure

```
.gitignore
admin1.jpg
admin2.jpg
Frontend/
  .gitignore
  eslint.config.js
  index.html
  package-lock.json
  package.json
  public/
    animation.mp4
    favicon.svg
    icons.svg
  README.md
  src/
    api/
    App.css
    App.jsx
    assets/
    components/
    context/
    index.css
    main.jsx
    pages/
    routes/
    services/
    utils/
    websocket/
  vite.config.js
LICENSE
login1.jpg
login2.jpg
package-lock.json
README.md
staff1.jpg
staff2.jpg
wardwatch-backend/
  .gitattributes
  .gitignore
  .mvn/
    wrapper/
  mvnw
  mvnw.cmd
  pom.xml
  src/
    main/
    test/
  startup.log
  test.js
  test_simple.js

```


## Additional Visuals

![hospital_building.png](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/hospital_building.png)

![ezgif-frame-001.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-001.jpg)

![ezgif-frame-002.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-002.jpg)

![ezgif-frame-003.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-003.jpg)

![ezgif-frame-004.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-004.jpg)

![ezgif-frame-005.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-005.jpg)

![ezgif-frame-006.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-006.jpg)

![ezgif-frame-007.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-007.jpg)

![ezgif-frame-008.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-008.jpg)

![ezgif-frame-009.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-009.jpg)

![ezgif-frame-010.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-010.jpg)

![ezgif-frame-011.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-011.jpg)

![ezgif-frame-012.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-012.jpg)

![ezgif-frame-013.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-013.jpg)

![ezgif-frame-014.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-014.jpg)

![ezgif-frame-015.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-015.jpg)

![ezgif-frame-016.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-016.jpg)

![ezgif-frame-017.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-017.jpg)

![ezgif-frame-018.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-018.jpg)

![ezgif-frame-019.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-019.jpg)

![ezgif-frame-020.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-020.jpg)

![ezgif-frame-021.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-021.jpg)

![ezgif-frame-022.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-022.jpg)

![ezgif-frame-023.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-023.jpg)

![ezgif-frame-024.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-024.jpg)

![ezgif-frame-025.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-025.jpg)

![ezgif-frame-026.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-026.jpg)

![ezgif-frame-027.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-027.jpg)

![ezgif-frame-028.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-028.jpg)

![ezgif-frame-029.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-029.jpg)

![ezgif-frame-030.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-030.jpg)

![ezgif-frame-031.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-031.jpg)

![ezgif-frame-032.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-032.jpg)

![ezgif-frame-033.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-033.jpg)

![ezgif-frame-034.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-034.jpg)

![ezgif-frame-035.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-035.jpg)

![ezgif-frame-036.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-036.jpg)

![ezgif-frame-037.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-037.jpg)

![ezgif-frame-038.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-038.jpg)

![ezgif-frame-039.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-039.jpg)

![ezgif-frame-040.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-040.jpg)

![ezgif-frame-041.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-041.jpg)

![ezgif-frame-042.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-042.jpg)

![ezgif-frame-043.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-043.jpg)

![ezgif-frame-044.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-044.jpg)

![ezgif-frame-045.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-045.jpg)

![ezgif-frame-046.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-046.jpg)

![ezgif-frame-047.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-047.jpg)

![ezgif-frame-048.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-048.jpg)

![ezgif-frame-049.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-049.jpg)

![ezgif-frame-050.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-050.jpg)

![ezgif-frame-051.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-051.jpg)

![ezgif-frame-052.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-052.jpg)

![ezgif-frame-053.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-053.jpg)

![ezgif-frame-054.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-054.jpg)

![ezgif-frame-055.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-055.jpg)

![ezgif-frame-056.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-056.jpg)

![ezgif-frame-057.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-057.jpg)

![ezgif-frame-058.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-058.jpg)

![ezgif-frame-059.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-059.jpg)

![ezgif-frame-060.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-060.jpg)

![ezgif-frame-061.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-061.jpg)

![ezgif-frame-062.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-062.jpg)

![ezgif-frame-063.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-063.jpg)

![ezgif-frame-064.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-064.jpg)

![ezgif-frame-065.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-065.jpg)

![ezgif-frame-066.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-066.jpg)

![ezgif-frame-067.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-067.jpg)

![ezgif-frame-068.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-068.jpg)

![ezgif-frame-069.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-069.jpg)

![ezgif-frame-070.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-070.jpg)

![ezgif-frame-071.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-071.jpg)

![ezgif-frame-072.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-072.jpg)

![ezgif-frame-073.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-073.jpg)

![ezgif-frame-074.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-074.jpg)

![ezgif-frame-075.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-075.jpg)

![ezgif-frame-076.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-076.jpg)

![ezgif-frame-077.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-077.jpg)

![ezgif-frame-078.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-078.jpg)

![ezgif-frame-079.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-079.jpg)

![ezgif-frame-080.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-080.jpg)

![ezgif-frame-081.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-081.jpg)

![ezgif-frame-082.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-082.jpg)

![ezgif-frame-083.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-083.jpg)

![ezgif-frame-084.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-084.jpg)

![ezgif-frame-085.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-085.jpg)

![ezgif-frame-086.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-086.jpg)

![ezgif-frame-087.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-087.jpg)

![ezgif-frame-088.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-088.jpg)

![ezgif-frame-089.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-089.jpg)

![ezgif-frame-090.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-090.jpg)

![ezgif-frame-091.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-091.jpg)

![ezgif-frame-092.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-092.jpg)

![ezgif-frame-093.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-093.jpg)

![ezgif-frame-094.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-094.jpg)

![ezgif-frame-095.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-095.jpg)

![ezgif-frame-096.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-096.jpg)

![ezgif-frame-097.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-097.jpg)

![ezgif-frame-098.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-098.jpg)

![ezgif-frame-099.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-099.jpg)

![ezgif-frame-100.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-100.jpg)

![ezgif-frame-101.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-101.jpg)

![ezgif-frame-102.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-102.jpg)

![ezgif-frame-103.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-103.jpg)

![ezgif-frame-104.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-104.jpg)

![ezgif-frame-105.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-105.jpg)

![ezgif-frame-106.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-106.jpg)

![ezgif-frame-107.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-107.jpg)

![ezgif-frame-108.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-108.jpg)

![ezgif-frame-109.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-109.jpg)

![ezgif-frame-110.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-110.jpg)

![ezgif-frame-111.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-111.jpg)

![ezgif-frame-112.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-112.jpg)

![ezgif-frame-113.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-113.jpg)

![ezgif-frame-114.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-114.jpg)

![ezgif-frame-115.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-115.jpg)

![ezgif-frame-116.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-116.jpg)

![ezgif-frame-117.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-117.jpg)

![ezgif-frame-118.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-118.jpg)

![ezgif-frame-119.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-119.jpg)

![ezgif-frame-120.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-120.jpg)

![ezgif-frame-121.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-121.jpg)

![ezgif-frame-122.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-122.jpg)

![ezgif-frame-123.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-123.jpg)

![ezgif-frame-124.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-124.jpg)

![ezgif-frame-125.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-125.jpg)

![ezgif-frame-126.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-126.jpg)

![ezgif-frame-127.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-127.jpg)

![ezgif-frame-128.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-128.jpg)

![ezgif-frame-129.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-129.jpg)

![ezgif-frame-130.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-130.jpg)

![ezgif-frame-131.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-131.jpg)

![ezgif-frame-132.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-132.jpg)

![ezgif-frame-133.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-133.jpg)

![ezgif-frame-134.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-134.jpg)

![ezgif-frame-135.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-135.jpg)

![ezgif-frame-136.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-136.jpg)

![ezgif-frame-137.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-137.jpg)

![ezgif-frame-138.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-138.jpg)

![ezgif-frame-139.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-139.jpg)

![ezgif-frame-140.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-140.jpg)

![ezgif-frame-141.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-141.jpg)

![ezgif-frame-142.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-142.jpg)

![ezgif-frame-143.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-143.jpg)

![ezgif-frame-144.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-144.jpg)

![ezgif-frame-145.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-145.jpg)

![ezgif-frame-146.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-146.jpg)

![ezgif-frame-147.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-147.jpg)

![ezgif-frame-148.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-148.jpg)

![ezgif-frame-149.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-149.jpg)

![ezgif-frame-150.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-150.jpg)

![ezgif-frame-151.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-151.jpg)

![ezgif-frame-152.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-152.jpg)

![ezgif-frame-153.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-153.jpg)

![ezgif-frame-154.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-154.jpg)

![ezgif-frame-155.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-155.jpg)

![ezgif-frame-156.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-156.jpg)

![ezgif-frame-157.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-157.jpg)

![ezgif-frame-158.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-158.jpg)

![ezgif-frame-159.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-159.jpg)

![ezgif-frame-160.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-160.jpg)

![ezgif-frame-161.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-161.jpg)

![ezgif-frame-162.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-162.jpg)

![ezgif-frame-163.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-163.jpg)

![ezgif-frame-164.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-164.jpg)

![ezgif-frame-165.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-165.jpg)

![ezgif-frame-166.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-166.jpg)

![ezgif-frame-167.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-167.jpg)

![ezgif-frame-168.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-168.jpg)

![ezgif-frame-169.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-169.jpg)

![ezgif-frame-170.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-170.jpg)

![ezgif-frame-171.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-171.jpg)

![ezgif-frame-172.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-172.jpg)

![ezgif-frame-173.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-173.jpg)

![ezgif-frame-174.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-174.jpg)

![ezgif-frame-175.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-175.jpg)

![ezgif-frame-176.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-176.jpg)

![ezgif-frame-177.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-177.jpg)

![ezgif-frame-178.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-178.jpg)

![ezgif-frame-179.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-179.jpg)

![ezgif-frame-180.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-180.jpg)

![ezgif-frame-181.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-181.jpg)

![ezgif-frame-182.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-182.jpg)

![ezgif-frame-183.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-183.jpg)

![ezgif-frame-184.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-184.jpg)

![ezgif-frame-185.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-185.jpg)

![ezgif-frame-186.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-186.jpg)

![ezgif-frame-187.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-187.jpg)

![ezgif-frame-188.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-188.jpg)

![ezgif-frame-189.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-189.jpg)

![ezgif-frame-190.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-190.jpg)

![ezgif-frame-191.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-191.jpg)

![ezgif-frame-192.jpg](https://raw.githubusercontent.com/SujalPatil21/WardWatch/main/Frontend/src/assets/Landing Page Frames/ezgif-frame-192.jpg)

