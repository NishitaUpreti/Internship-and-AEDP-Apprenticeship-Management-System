# Architecture — Internship, Apprenticeship and Credit-Mapped Work Experience Management Platform

## 1. Overview

The platform uses a simple three-layer full-stack architecture:

```text
Browser
   ↓
Next.js Frontend
   ↓ HTTP / REST API
Node.js + Express Backend
   ↓ Mongoose
MongoDB
```

- **Next.js** — UI, pages, routing, forms, dashboards.
- **Node.js + Express** — APIs, business logic, authentication, authorization, validation.
- **MongoDB + Mongoose** — data storage and database access.

## 2. Frontend Architecture

The frontend is built with Next.js and provides role-based interfaces.

Main areas include:

```text
/student
/employer
/supervisor
/faculty
/coordinator
/admin
```

The frontend communicates with the backend through REST APIs.

The frontend must not connect directly to MongoDB.

## 3. Backend Architecture

The backend uses Node.js and Express.

A typical request follows:

```text
Request
   ↓
Route
   ↓
Authentication
   ↓
Authorization
   ↓
Controller
   ↓
Business Logic
   ↓
Mongoose
   ↓
MongoDB
   ↓
Response
```

The backend is responsible for enforcing business rules and permissions.

## 4. Database Architecture

MongoDB stores the main application data.

Core collections include:

```text
users
employers
opportunities
applications
offers
agreements
hourLogs
tasks
evaluations
creditMappings
certificates
incidents
auditEntries
```

Additional collections may be added when required.

Main relationships:

```text
Employer
   ↓
Opportunity
   ↓
Application
   ↓
Offer
   ↓
Agreement
   ↓
Hour Logs
   ↓
Verification
   ↓
Evaluation
   ↓
Credit Mapping
   ↓
Credit Approval
   ↓
Certificate
```

## 5. Authentication & Authorization

Authentication determines who the user is.

Authorization determines what the user can access.

Internal university users and external employer users should have separate authentication boundaries.

The backend must check:

```text
User
 ↓
Role
 ↓
Permission
 ↓
Specific Resource
```

For example, an Industry Supervisor can access only students assigned to them.

## 6. Workflow Architecture

The system contains business workflows in addition to normal CRUD operations.

Core workflow:

```text
Opportunity
   ↓
Application
   ↓
Offer
   ↓
Agreement
   ↓
Internship
   ↓
Hours
   ↓
Verification
   ↓
Evaluation
   ↓
Credit Computation
   ↓
Faculty Approval
   ↓
Certificate
```

Important workflow actions should be recorded in the audit trail.

## 7. Key Architecture Rules

- Frontend and backend remain separate applications.
- Frontend never connects directly to MongoDB.
- Backend enforces authentication and authorization.
- External users receive scoped and revocable access.
- Executed agreements remain immutable.
- Credit computation and credit approval are separate steps.
- Important actions are auditable.
- Credit frameworks, rubrics, and agreement templates should be configurable where required.

## 8. Project Structure

```text
internship-management-platform/
├── frontend/          # Next.js application
├── backend/           # Node.js + Express API
├── docs/              # Project documentation
├── README.md
├── PRD.md
└── .gitignore
```

This architecture is intentionally kept simple for the initial implementation and can be expanded as new requirements are implemented.
