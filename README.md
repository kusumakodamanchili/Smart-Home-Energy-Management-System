# SmartHome Backend API

Spring Boot 4 (Java 17) backend that powers a smart‑home dashboard. It provides OTP-based user onboarding, password resets, mock device controls, and energy analytics data that a React/Next.js frontend can consume.

## Features
- OTP-based registration & email verification; fallback to log delivery for local dev.
- Password reset with verified reset window.
- Device catalogue with toggle endpoint (in-memory list of common appliances).
- Energy analytics endpoints: summary, savings, weekly usage, charts, and per-device consumption.
- MySQL persistence for users; Lombok DTOs for lean responses.
- CORS preconfigured for `http://localhost:3000` / `127.0.0.1:3000`.

## Tech Stack
- Java 17, Spring Boot 4.0.3
- Spring Web MVC, Spring Data JPA, Spring Mail
- MySQL 8+
- Lombok (compile-time only)
- Maven Wrapper (`mvnw`, `mvnw.cmd`)

## Project Layout
- `src/main/java/com/example/smarthome` – application code  
  - `auth` – OTP flows, JPA entity `UserAccount`, repository, service, controller  
  - `energy` – mock energy stats/services, device endpoints  
  - `config` – mail sender, password encoder, CORS
- `src/main/resources/application.properties` – runtime config (override with env vars in production)
- `src/test/java` – Spring Boot context smoke test

## Prerequisites
- JDK 17+
- MySQL server running and reachable
- Maven (wrapper included; no global install required)

## Configuration (recommended for public repos)
Do **not** commit real secrets. Use environment variables or a `application.properties` that is ignored by git. Example configuration:
```properties
server.port=8081
spring.datasource.url=jdbc:mysql://localhost:3306/smarthomeDB
spring.datasource.username=your_db_user
spring.datasource.password=your_db_password
spring.jpa.hibernate.ddl-auto=update

# Mail (set app passwords when using Gmail)
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your_email@example.com
spring.mail.password=your_app_password
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true

# OTP & energy tuning
app.otp.validity-minutes=5
app.reset.validity-minutes=10
app.otp.delivery-mode=log   # use "email" in prod, "log" for local dev
app.energy.price-per-kwh=8.0
```
Environment variables with the same keys will override these values.

## Running Locally
```bash
./mvnw spring-boot:run
# or
./mvnw clean install && ./mvnw spring-boot:run
```
The API listens on port `8081` by default.

## Database
1. Create a schema (default `smarthomeDB`).
2. Set `spring.datasource.*` credentials.
3. `spring.jpa.hibernate.ddl-auto=update` will create the `user_accounts` table on first run.

## API Reference (v1)
Base URL: `http://localhost:8081/api`

- **Auth**
  - `POST /auth/register` – body: `fullName`, `email`, `password`, `primaryInterest`
  - `POST /auth/verify-otp` – body: `email`, `otp`
  - `POST /auth/forgot-password` – body: `email`
  - `POST /auth/reset-password` – body: `email`, `newPassword`, `confirmPassword`
  - Errors return `{"message": "reason"}` with `400 Bad Request`.

- **Devices**
  - `GET /devices` – returns the in-memory device list.
  - `POST /devices/{id}/toggle` – flips `on` state; `404` if id not found.

- **Energy**
  - `GET /energy/summary`
  - `GET /energy/savings`
  - `GET /energy/charts`
  - `GET /energy/weekly`
  - `GET /energy/devices/consumption`
  - Responses are mock, randomized per request but shaped for dashboard widgets.

### Sample cURL (register flow)
```bash
curl -X POST http://localhost:8081/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{ "fullName": "Ada Lovelace", "email": "ada@example.com", "password": "Secret123!", "primaryInterest": "Solar" }'
```

## Development Notes
- CORS allows frontends on `localhost:3000`; edit `config/WebConfig.java` if you host elsewhere.
- Device state is stored in-memory; restart resets the list.
- OTP emails require valid SMTP creds. For local testing set `app.otp.delivery-mode=log` to avoid mail errors.

## Testing
```bash
./mvnw test
```

## Deployment Tips
- Externalize all secrets (DB, SMTP) as environment variables or use a secrets manager.
- Consider enabling Spring Security for authentication/authorization if exposing beyond trusted networks.
- Configure logging and health checks for your target platform (e.g., Actuator).

## License
Specify your project license here (e.g., MIT, Apache 2.0). Remove this note after choosing one.
