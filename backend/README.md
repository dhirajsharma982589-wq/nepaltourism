# Nepal Tourism Guide backend

Spring Boot 3.3 / Java 21 REST API with JPA, MySQL and JWT authentication.

## Run locally

1. Install Java 21, Maven and MySQL.
2. Create the database: `CREATE DATABASE nepal_tourism;`
3. Copy `.env.example` values into your shell or IDE environment (never commit real credentials).
4. From `backend/`, run `mvn spring-boot:run`.

For a database-free smoke test, run with `--spring.profiles.active=h2`.
The development initializer creates regions, categories, 24 destinations (including an image path matching each destination), and a development admin (`admin@example.com` / `ChangeMe123!`). Change this password before sharing the environment.

## API overview

Public GET endpoints: `/api/destinations`, `/api/destinations/{id}`, `/api/destinations/slug/{slug}`, `/api/regions`, `/api/categories`, `/api/experiences`, `/api/festivals`, `/api/foods`, `/api/travel-guide`, and `/api/emergency-contacts`.

Authentication: `POST /api/auth/register` and `POST /api/auth/login`; send the returned JWT as `Authorization: Bearer <token>`.

Authenticated user endpoints include favorites (`/api/favorites`), reviews (`/api/destinations/{id}/reviews`), trips (`/api/trips`) and trip items. Admin-only destination mutations are under `/api/admin` when enabled for the deployment.

Destination list supports `search`, `region`, and `category`, for example `/api/destinations?search=pokhara&region=Hill`.
