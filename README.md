# Nepal Tourism Guide

A beginner-friendly tourism platform for Nepal built with a React frontend and a Spring Boot backend.

## Project structure

- Frontend
  - `index.html` – main HTML entry
  - `src/main.jsx` – React app entry and landing page content
  - `src/styles.css` – all styling for the tourism UI
- Backend
  - `backend/pom.xml` – Spring Boot project config
  - `backend/src/main/java/com/nepal/tourismguide/` – application, controllers, services, security, models
  - `backend/src/main/resources/application.properties` – backend configuration

## What is included

- Beautiful responsive landing page for Nepal Tourism Guide
- Destination, experience, planner, and travel-guide sections
- Spring Boot REST APIs for public content and authentication
- JWT-based login and role-based security
- Admin endpoints for dashboard/content access
- User profile endpoint
- MySQL-ready JPA configuration

## Frontend run

```bash
cd /home/dhiraj/Desktop/Nepal-Tourism-Guide
npm install
npm run dev -- --host
```

Then open the local Vite URL shown in the terminal.

## Backend run

1. Start MySQL.
2. Create a database named `nepal_tourism_guide`.
3. Update database credentials in `backend/src/main/resources/application.properties`.
4. Start the backend:

```bash
cd /home/dhiraj/Desktop/Nepal-Tourism-Guide/backend
mvn spring-boot:run
```

## Notes

- The frontend was verified with `npm run build`.
- The backend was verified with `mvn test`.
- The default JWT secret is a placeholder and should be changed in production.
