# Internship, Apprenticeship and Credit-Mapped Work Experience Management Platform

A full-stack platform for managing the complete internship and apprenticeship lifecycle: employer verification, opportunity publishing, student applications, offers, tripartite agreements, hour logging and verification, evaluations, academic credit mapping, compliance, certificates, and reporting.

## Track

**Track J — Next.js + Node.js + MongoDB**

## Core Lifecycle

Employer
→ Opportunity
→ Application
→ Offer
→ Tripartite Agreement
→ Work Plan / Tasks
→ Hour Logging
→ Supervisor Verification
→ Industry Evaluation
→ Faculty Assessment
→ Credit Computation
→ Faculty Approval
→ Certificate / Record
→ Compliance & Reporting

## Main Users

- Student
- Employer Admin
- Industry Supervisor
- Faculty Supervisor
- Internship Coordinator
- Head of Department
- Dean / Academic Office
- Administrator

External employer users are kept separate from internal university authentication and receive scoped access.

## Technology

- Frontend: Next.js
- Backend: Node.js + Express
- Database: MongoDB
- ODM: Mongoose
- Authentication: Internal university authentication for internal users and a separate authentication domain for external users
- E-signature: Provider such as DocuSign / Zoho Sign or an equivalent
- PDF generation: Agreements and certificates

## Project Structure

```text
internship-management-platform/
├── frontend/          # Next.js application
├── backend/           # Node.js + Express API
├── docs/              # Technical documentation
├── README.md
├── PRD.md
└── .gitignore