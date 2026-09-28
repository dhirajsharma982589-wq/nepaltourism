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

## Capacitor mobile app

The existing Vite build is packaged with Capacitor for Android and iOS. Set `VITE_API_BASE_URL` before building so a device can reach the Spring Boot server; do not use `localhost` for a physical device because it refers to the device itself.

```bash
# Web development
export VITE_API_BASE_URL=http://localhost:8080

# Android/iOS development on the same LAN (replace with this computer's LAN IP)
export VITE_API_BASE_URL=http://192.168.1.10:8080
npm run build
npx cap sync android
npx cap sync ios
```

Open Android with `npx cap open android`. The Android build requires Android Studio and an Android SDK. The iOS project is prepared by `npx cap sync ios`, but final compilation and signing require macOS and Xcode.

## Notes

- The frontend was verified with `npm run build`.
- The backend was verified with `mvn test`.
- The default JWT secret is a placeholder and should be changed in production.
