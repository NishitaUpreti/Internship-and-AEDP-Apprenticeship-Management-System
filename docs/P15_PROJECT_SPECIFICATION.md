# P15 – Internship and AEDP Apprenticeship Management System

## 1. Project Title
**Internship, Apprenticeship and Credit-Mapped Work Experience Management Platform**
* **Track J:** Next.js + Node.js + MongoDB
* **Track P:** Django + PostgreSQL

---

## 2. Project Overview

### Description
Manages the full internship and apprenticeship lifecycle:
* An employer and opportunity registry
* Student applications and matching
* The tripartite agreement required under UGC’s Apprenticeship Embedded Degree Programme (AEDP) framework
* Hour logging
* Supervisor evaluation
* Faculty assessment
* Automatic mapping of logged hours to academic credits under the National Credit Framework (NCrF)

### Problem Statement
Currently, internships are tracked on fragmented spreadsheets and emails. Nobody can answer, per student:
* How many hours were completed?
* Who supervised?
* What was assessed?
* What credit was earned?

UGC’s AEDP framework makes structured tripartite records and hour-to-credit mapping a compliance requirement, not a nicety — and no existing institutional system produces them.

### Target Users
* **Students**
* **Faculty Supervisors**
* **Industry Supervisors**
* **Internship and Placement Coordinators**
* **Heads of Department (HoDs)**
* **Deans and Academic Office**
* **Employers**

### Expected Outcome
Every work-based learning engagement documented, hour-verified, assessed, and credit-mapped, with the audit-ready records an accreditation visit will demand.

> **Why this ranks second in the portfolio:**
> It is directly tied to a regulatory framework with a stated implementation date, it is genuinely absent from most institutions, and every institution that adopts AEDP will need exactly this. That combination is what makes a product.

---

## 3. Project Objectives
* **Employer & Opportunity Registry:** Maintain a verified registry of employers and opportunities.
* **Selection Workflow:** Manage the application, shortlist, and offer workflow.
* **Tripartite Agreements:** Generate and track the tripartite institution–employer–student agreement with legal validity.
* **Hour Logging & Verification:** Log and verify working hours with supervisor confirmation.
* **Rubric Evaluations:** Capture industry supervisor and faculty evaluations against standardized rubrics.
* **Credit Mapping (30 hrs = 1 credit):** Map verified hours to credits per the configured framework (e.g. 30 hours to 1 credit) with faculty sign-off.
* **Compliance & Accreditation:** Support compliance, UGC AEDP, and accreditation reporting requirements.
* **Safety & Incident Management:** Handle stipends, insurance, safety declarations, and incident reporting.

---

## 4. Key Features
* **Employer Registry:** Verification, profile management, and rating system.
* **Opportunity Posting:** Skill tags, eligibility rules, and department filtering.
* **Application & Offer Workflow:** End-to-end recruitment cycle with status tracking.
* **Tripartite Agreement Generation:** Dynamic template generation, version control, and e-signatures.
* **Hour Logging:** Mobile-friendly student log and 2-tap supervisor verification.
* **Milestone & Task Tracking:** Deliverables, work plans, and progress checklists.
* **Evaluation Rubrics:** Industry supervisor evaluation and faculty moderation rubrics.
* **Automatic Credit Computation:** Pure computation function with an immutable faculty sign-off gate.
* **Attendance & Leave:** Tracking attendance, sick leave, and leaves during placement.
* **Stipend Records:** Recording stipend disbursements and currencies.
* **Insurance & Safety:** Compliance declaration checklists and risk tracking.
* **Incident Reporting Channel:** Secure, confidential incident reporting with escalation to safeguarding contacts.
* **Completion Certificates:** Digital, verifiable completion certificates with tamper-proof records.
* **Compliance Dashboards:** Institution, department, employer, and student dashboards.

---

## 5. Functional Modules

| # | Module | Functionality | Dependency |
|---|---|---|---|
| **M1** | **Employer & Opportunity Registry** | Employers, verification status, opportunities, eligibility criteria | **Independent (Build first)** |
| **M2** | **Application & Selection** | Apply, shortlist, interview scheduling, offer, acceptance | Depends on **M1** |
| **M3** | **Tripartite Agreement** | Template generation, terms, e-signature, immutable versioning | Depends on **M2** |
| **M4** | **Hour Logging & Verification** | Student hour logging, supervisor verification, disputes, hour caps | Depends on **M3** |
| **M5** | **Task & Milestone Tracking** | Work plans, deliverables, progress tracking | Depends on **M3** |
| **M6** | **Evaluation** | Industry supervisor rubric, faculty assessment, moderation | Depends on **M4, M5** |
| **M7** | **Credit Mapping & Sign-Off** | Hours to credits per framework; faculty approval gate; write-back | Depends on **M4, M6** |
| **M8** | **Compliance & Safety** | Insurance, safety declarations, incident reporting, escalation | Depends on **M3** |
| **M9** | **Certificates & Records** | Completion certificates, verifiable records, transcripts | Depends on **M7** |
| **M10** | **Dashboards & Reporting** | Student, department, institution, employer views; accreditation reports | **Depends on all (M1–M9)** |

---

## 6. User Roles & Permissions

| Role | Access & Permissions |
|---|---|
| **Student** | Own profile, browse/apply opportunities, view agreements, log working hours, view tasks, evaluations, and certificates. |
| **Industry Supervisor** | External user with restricted, time-boxed access. Only assigned students; verify hours (2-tap), submit evaluations, report incidents. |
| **Faculty Supervisor** | Assigned students; review work plans, assess progress, moderate supervisor evaluations, approve academic credit. |
| **Internship Coordinator** | Manage employers, approve opportunities, track agreements, compliance monitoring, and incident escalations. |
| **Head of Department (HoD)** | Department-wide participation tracking, credit allocation, and compliance reporting. |
| **Dean & Academic Office** | Institution-wide compliance, accreditation audits, and regulatory reporting. |
| **Employer Admin** | Own organization's profile, job opportunities, supervisors, and student placements. |
| **Administrator** | Credit framework configuration, rubric builders, agreement templates, and user access management. |

---

## 7. Technology Stack

### TRACK J (Current Implementation)
* **Frontend:** Next.js (App Router, Tailwind CSS, Lucide Icons)
* **Backend:** Node.js + Express
* **Database:** MongoDB (Mongoose ODM)
* **E-Signature:** Integration via DocuSign, Zoho Sign, or self-hosted audit-trailed signature module.
* **Document Generation:** PDF generation for tripartite agreements and certificates.
* **External Authentication:** Separate authentication domain for industry supervisors and employers (not inside internal university SSO).

### TRACK P (Alternative)
* **Stack:** Python + Django + PostgreSQL
* **Document Generation:** WeasyPrint for agreements and certificates.
* **Permission Enforcement:** Strict Django permission classes and middleware ensuring external users hitting internal views receive HTTP 403.
* **Background Tasks:** Celery for reminders and notifications.

---

## 8. Technical Requirements

### Frontend (Both Tracks)
* **Mobile-First Hour Logging:** Designed for students logging hours from a phone at the workplace.
* **2-Tap Supervisor Verification:** Quick, low-friction mobile verification for industry supervisors.
* **Employer Portal:** Dedicated, simplified workspace distinct from internal university interfaces.
* **Coordinator Compliance Board:** Real-time dashboard showing compliance bottlenecks and missing documentation.

### Backend (Both Tracks)
* **Hour Logging Safeguards:**
  * Configurable daily hour caps (e.g. maximum 12 hours/day).
  * Timetable conflict anomaly flags (hours logged during scheduled university classes cross-checked against timetable data).
* **Credit Computation Engine:**
  * Pure, auditable function with framework versioning (e.g. 30 hours = 1 credit).
  * Strictly separated from database writes for exhaustive unit testing.
* **Agreement Immutability:**
  * Agreement template versioning.
  * Executed versions and digital signatures immutably locked upon signing.

### Data Models
* `Employer`
* `EmployerVerification`
* `Opportunity`
* `Application`
* `Offer`
* `Agreement`
* `AgreementTemplate`
* `Signature`
* `HourLog`
* `HourVerification`
* `WorkPlan`
* `Task`
* `Evaluation`
* `Rubric`
* `CreditMapping`
* `CreditApproval`
* `InsuranceRecord`
* `SafetyDeclaration`
* `Incident`
* `Certificate`
* `AuditEntry`

### Core API Endpoints
* `/employers`
* `/opportunities`
* `/applications`
* `/agreements`
* `/hours`
* `/hours/:id/verify`
* `/evaluations`
* `/credits/compute`
* `/credits/approve`
* `/certificates`
* `/reports/compliance`

### Security Standards
* External supervisors receive scoped, time-boxed, revocable access to assigned students only.
* Incident reports route directly to a designated safeguarding contact and remain access-restricted.
* Executed tripartite agreements and audit entries are tamper-proof and immutable.

---

## 9. Admin Dashboard
* **Employer Verification Queue:** Review and verify employer registrations and ratings.
* **Agreement Template Management:** Version-controlled agreement terms.
* **Credit Framework Configuration:** Configurable hours per credit, semester caps, and eligible engagement types.
* **Rubric Builder:** Custom evaluation criteria and weightages for different industries.
* **Compliance Monitor:** Real-time visibility into missing agreements, unverified hours, overdue evaluations, and expired insurance.
* **Incident Board:** Confidential escalation tracking.
* **External User Access Management:** Revoke, extend, or reassign external supervisor privileges.

---

## 10. Reporting & Analytics
* **Participation Rates:** Segmented by academic programme and year.
* **Verified Work Hours:** Aggregated by student, cohort, and employer.
* **Credits Awarded:** Distributed by framework type and department.
* **Employer Metrics:** Repeat hiring rate, rating distribution, and participation.
* **Evaluation Scores:** Performance distribution against rubrics.
* **Job Offer Conversion:** Percentage of internships converted into full-time offers.
* **Accreditation Packets:** Ready-to-export reports mapping each student to hours, credits, supervisors, and assessments.

---

## 11. Notifications & Communication
* **Opportunity Matches:** Alerts when matching internships open based on student skills.
* **Application Status Updates:** Real-time status changes (Under Review, Shortlisted, Offered).
* **Signature Reminders:** Alerts when an agreement is generated and pending signature.
* **Hours Awaiting Verification:** Weekly prompts to industry supervisors.
* **Evaluation Due Reminders:** Notifications to supervisors before internship conclusion.
* **Credit Approval Notifications:** Sign-off confirmation alerts to students and faculty.
* **Insurance Expiry & Incident Escalations:** High-priority safeguarding alerts.

---

## 12. Third-Party Integrations
* **ERP / SIS:** Student enrollment and credit grade write-back.
* **Timetable System (P13):** Timetable cross-checking to prevent hour logging during class hours.
* **Skill Enrichment (P06):** Student skill profile synchronization.
* **E-Signature:** DocuSign / Zoho Sign / Audit-trailed digital signing.
* **Communication:** Transactional email and SMS gateways.
* **SSO:** Institutional Single Sign-On for internal staff and students, with isolated authentication for external employers.

---

## 13. Expected Deliverables
* Configured agreement templates approved by legal.
* Configured credit framework engine.
* Standardized evaluation rubrics for at least 3 engagement types.
* Production-ready web applications for all user roles.

---

## 14. Development Milestones

```
M0: Discovery, AEDP framework mapping, legal review (3 weeks)
 │
 ▼
M1: Registry, opportunities, and applications (3 weeks)
 │
 ▼
M2: Tripartite agreements and e-signature (3 weeks)
 │
 ▼
M3: Hour logging and task tracking (3 weeks)
 │
 ▼
M4: Evaluations and credit mapping (4 weeks)
 │
 ▼
M5: Compliance, incident channel, certificates (3 weeks)
 │
 ▼
M6: Reporting, accreditation exports, UAT, production (3 weeks)
```

---

## 15. Testing & Verification Requirements
* **Credit Computation Correctness:** Exhaustive tests across multiple framework settings (e.g. 30 hrs/credit, 45 hrs/credit).
* **Access Boundary Tests:** Negative tests proving external supervisors cannot access unassigned students.
* **Faculty Sign-off Gate:** Verification that credits cannot be awarded without explicit faculty sign-off.
* **Anomaly Detection:** Verification that logging >12 hours or during scheduled class hours triggers anomaly flags.
* **Immutability Tests:** Verification that executed agreements cannot be updated or deleted.
* **Incident Routing:** Confirmation that incident alerts route strictly to the designated safeguarding officer.

---

## 16. Deployment Specifications
* **Track J:** Separate session domains for internal and external portals to maintain strict trust boundaries.
* **Track P:** Distinct authentication backends, session cookie scopes, and permission groups.

---

## 17. Accreditation & Regulatory Compliance Mapping
Detailed mapping demonstrating direct satisfaction of:
* **UGC AEDP Guidelines:** Structured tripartite documentation and tripartite legal execution.
* **National Credit Framework (NCrF):** Formulaic mapping of 30 verified work hours to 1 academic credit.

---

## 18. Student Skills & Team Breakdown

### Skills (Track J)
TypeScript · Next.js · Node.js · Express · MongoDB · Workflow & Approval Engines · E-Signature · Document Generation · Compliance & Security.

### Team Structure (5 Members)
1. **Technical Lead:** Architecture, security boundaries, and review workflows.
2. **Backend Developer 1:** Registry, applications, and tripartite agreements.
3. **Backend Developer 2:** Hour logging, anomaly detection, evaluations, and credit computation.
4. **Frontend Developer:** Internal dashboards, mobile-first hour logging, and external employer portal.
5. **QA & Documentation Engineer:** Testing matrices, accreditation mapping, and API specifications.

---

## 19. Acceptance Criteria
- [x] Full lifecycle supported: Opportunity &rarr; Application &rarr; Offer &rarr; Tripartite Agreement &rarr; Hours Logged & Verified &rarr; Evaluations &rarr; Credit Computation & Sign-Off &rarr; Certificate.
- [ ] Credit computation matches configured framework without rounding errors.
- [ ] Credits blocked from awarding without faculty approval.
- [ ] External supervisor access strictly scoped to assigned students.
- [ ] Hour anomalies flagged for overtime and timetable overlaps.
- [ ] Compliance dashboard identifies missing agreements, unverified hours, and overdue evaluations.
- [ ] Accreditation-ready report exportable for an entire academic year.

### AI / ML Enhancements (Optional Roadmap)
* Skill-based opportunity-to-student matching.
* Risk prediction for internship dropouts based on hour logging trends.
* Automated extraction of learning outcomes from supervisor text evaluations.

