# PRD — Internship, Apprenticeship and Credit-Mapped Work Experience Management Platform

## 1. Product Overview

The platform manages the complete internship and apprenticeship lifecycle for an institution.

It replaces fragmented spreadsheet- and email-based tracking with a structured system for managing employers, opportunities, applications, offers, agreements, working hours, supervision, assessments, academic credits, compliance, certificates, and reporting.

The system is designed to ensure that every work-based learning engagement is properly documented, hours are verified, students are assessed, and eligible work experience is mapped to academic credits.

---

## 2. Objectives

The platform should:

- Maintain a verified employer and opportunity registry.
- Allow employers to create and manage internship/apprenticeship opportunities.
- Allow students to discover and apply for opportunities.
- Manage application, shortlisting, selection, offer, and acceptance workflows.
- Generate and manage tripartite agreements between the student, institution, and employer.
- Support agreement signing and maintain an immutable executed version.
- Allow students to log working hours.
- Allow industry supervisors to verify submitted hours.
- Detect suspicious or invalid hour entries.
- Track tasks, milestones, work plans, and deliverables.
- Capture industry supervisor evaluations.
- Capture faculty assessment and moderation.
- Calculate academic credits from verified working hours.
- Require faculty sign-off before credits are awarded.
- Maintain internship and work-experience records.
- Support compliance, insurance, safety, and incident management.
- Generate completion certificates.
- Provide dashboards and reports for academic and accreditation purposes.

---

## 3. Users and Roles

The system contains both internal university users and external employer users.

### 3.1 Student

Students can:

- View available opportunities.
- Search and filter opportunities.
- Apply for opportunities.
- Track application status.
- View offers.
- Accept or reject offers.
- View and sign agreements.
- View assigned supervisors.
- View work plans and tasks.
- Log working hours.
- View hour verification status.
- Submit required internship information.
- View evaluations.
- View credit calculation and approval status.
- Access certificates and internship records.

### 3.2 Industry Supervisor

Industry supervisors are external users.

They can:

- Access only students assigned to them.
- View relevant internship information.
- Review submitted working hours.
- Approve or reject hour logs.
- Provide remarks on hour logs.
- Evaluate students using the configured rubric.
- Report workplace incidents where applicable.

Their access must be:

- Scoped to assigned students.
- Time-limited.
- Revocable.

### 3.3 Faculty Supervisor

Faculty supervisors can:

- View assigned students.
- Monitor internship progress.
- Review work plans and deliverables.
- Perform academic assessment.
- Moderate industry evaluations where required.
- Review credit calculations.
- Approve credits.

### 3.4 Internship Coordinator

The Internship Coordinator manages the operational internship workflow.

Responsibilities include:

- Managing employers.
- Reviewing employer verification.
- Managing opportunities.
- Monitoring applications and selections.
- Monitoring agreements.
- Monitoring hour verification.
- Monitoring evaluations.
- Monitoring compliance.
- Handling escalations.
- Monitoring incidents.
- Generating operational reports.

### 3.5 Head of Department

The HoD can:

- View department-level internship participation.
- Monitor student progress.
- View credit information.
- View evaluation information.
- Monitor compliance within the department.
- Access relevant reports.

### 3.6 Dean / Academic Office

The Dean or Academic Office can:

- View institution-wide internship information.
- Monitor credits.
- View compliance information.
- Access accreditation-related reports.
- Review institution-level statistics.

### 3.7 Employer Admin

Employer administrators manage their organisation's participation in the platform.

They can:

- Manage their organisation's opportunities.
- Manage employer-side supervisors.
- View applications for their opportunities.
- Participate in selection workflows.
- Manage assigned students where applicable.
- Manage relevant internship information.

### 3.8 Administrator

The platform administrator manages system-level configuration.

Responsibilities include:

- Credit framework configuration.
- Rubric configuration.
- Agreement template management.
- Template versioning.
- Platform settings.
- External user access management.
- System-level administration.

---

## 4. Functional Modules

The platform is divided into ten major modules.

### M1 — Employer & Opportunity Registry

This module manages employers and opportunities.

Features include:

- Employer registration.
- Employer verification.
- Employer profile.
- Opportunity creation.
- Opportunity editing.
- Eligibility criteria.
- Skill tags.
- Opportunity status.
- Opportunity duration.
- Location and engagement details.

One employer can have multiple opportunities.

Therefore, employers and opportunities are separate entities.

---

### M2 — Application & Selection

Students can apply to published opportunities.

The module manages:

- Applications.
- Application status.
- Shortlisting.
- Interviews where required.
- Selection.
- Offers.
- Offer acceptance/rejection.

A student can apply to multiple opportunities.

An opportunity can receive applications from multiple students.

The application is therefore a separate entity connecting a student with a specific opportunity.

---

### M3 — Tripartite Agreement

After a student is selected and the offer is accepted, the system manages the tripartite agreement.

The agreement involves:

- Student.
- Institution.
- Employer.

Features include:

- Agreement generation.
- Agreement templates.
- Template versioning.
- Agreement terms.
- Signature workflow.
- E-signature integration.
- Signature audit trail.
- Executed document storage.

Once an agreement is executed, its executed version must remain immutable.

---

### M4 — Hour Logging & Verification

Students log their internship working hours.

Each hour entry can contain:

- Date.
- Number of hours.
- Description/work performed.
- Internship/agreement reference.
- Submission status.

The assigned industry supervisor verifies the submitted hours.

Possible verification states include:

```text
Submitted
    ↓
Pending Verification
    ↓
Verified / Rejected
```

The system should also detect hour anomalies.

Examples include:

- More than 12 hours logged in one day.
- Hours overlapping with scheduled university classes, when timetable information is available.

Anomalies should be flagged for review rather than silently accepted.

---

### M5 — Task & Milestone Tracking

This module manages the student's planned and completed work.

It supports:

- Work plans.
- Tasks.
- Milestones.
- Deliverables.
- Due dates.
- Progress tracking.
- Completion status.

The work plan provides a structured view of what the student is expected to accomplish during the internship.

---

### M6 — Evaluation

The platform supports both industry and academic evaluation.

Industry supervisors can evaluate students using configured rubrics.

Faculty supervisors can perform academic assessment and moderation.

The evaluation system should support:

- Configurable rubrics.
- Evaluation criteria.
- Scores.
- Remarks.
- Industry evaluation.
- Faculty assessment.
- Moderation where applicable.
- Evaluation deadlines/status.

---

### M7 — Credit Mapping & Sign-Off

The platform calculates academic credits based on verified internship/work-experience hours and the configured credit framework.

For example, a configured framework might specify:

```text
30 verified hours = 1 academic credit
```

This is only an example. The actual framework must be configurable.

The credit calculation must be auditable.

The system should retain information such as:

- Verified hours used.
- Credit framework.
- Framework version.
- Calculation result.
- Calculation timestamp.
- Approval status.
- Approving faculty member.

The workflow is:

```text
Verified Hours
      ↓
Credit Computation
      ↓
Faculty Review
      ↓
Faculty Approval
      ↓
Credits Awarded
```

A calculated credit must not automatically become an awarded academic credit.

Faculty sign-off is required.

---

### M8 — Compliance & Safety

The platform manages compliance-related information.

Features include:

- Insurance records.
- Safety declarations.
- Incident reporting.
- Incident escalation.
- Compliance monitoring.
- Missing-document tracking.
- Expiry monitoring.

Incident information must be restricted to authorized users.

The system should be able to identify compliance gaps such as:

- Missing agreement.
- Pending agreement signature.
- Unverified hours.
- Overdue evaluation.
- Expired insurance.
- Missing safety declaration.
- Unresolved incident.

---

### M9 — Certificates & Records

After successful completion and required approvals, the system can generate a completion certificate.

The system should maintain verifiable work-experience records containing relevant information such as:

- Student.
- Employer.
- Opportunity.
- Internship period.
- Verified hours.
- Supervisor.
- Evaluation/assessment information.
- Academic credits where applicable.

---

### M10 — Dashboards & Reporting

The platform provides dashboards for different roles.

Examples include:

Student dashboard:

- Applications.
- Offers.
- Current internship.
- Hours.
- Tasks.
- Evaluations.
- Credits.
- Certificate.

Employer dashboard:

- Opportunities.
- Applications.
- Selected students.
- Assigned supervisors.
- Internship progress.

Coordinator dashboard:

- Employer verification queue.
- Applications.
- Agreements.
- Pending hour verification.
- Pending evaluations.
- Compliance gaps.
- Incidents.

Institution-level dashboards can provide:

- Student participation.
- Verified hours.
- Credits.
- Employer participation.
- Evaluation statistics.
- Compliance status.
- Accreditation information.

---

## 5. Core Lifecycle

The complete lifecycle is:

```text
Employer Registration
        ↓
Employer Verification
        ↓
Opportunity Creation
        ↓
Opportunity Publication
        ↓
Student Application
        ↓
Shortlisting / Selection
        ↓
Offer
        ↓
Offer Acceptance
        ↓
Tripartite Agreement
        ↓
Agreement Signing
        ↓
Internship Begins
        ↓
Work Plan + Tasks
        ↓
Hour Logging
        ↓
Supervisor Verification
        ↓
Industry Evaluation
        ↓
Faculty Assessment
        ↓
Credit Computation
        ↓
Faculty Approval
        ↓
Certificate / Academic Record
        ↓
Compliance & Reporting
```

---

## 6. Key Business Rules

### Employer Verification

Employers must pass the institution's configured verification process before participating.

The exact internal approval authority can be configured according to the institution's workflow.

### Opportunity Relationship

An employer can create multiple opportunities.

Each opportunity belongs to one employer.

### Applications

A student can apply to multiple opportunities.

An opportunity can have applications from multiple students.

Each application belongs to one student and one opportunity.

### Offers

An offer is associated with a selected application.

The student must accept the offer before the internship proceeds to the agreement stage.

### Agreements

An accepted offer leads to the required tripartite agreement.

Executed agreements must remain immutable.

### Hour Verification

Industry supervisors verify hours for students assigned to them.

### Hour Anomalies

The system must flag:

```text
Hours > 12 in one day
```

and, when timetable data is available:

```text
Hours overlapping scheduled classes
```

### Credit Calculation

Credit computation must use the configured credit framework and its version.

### Credit Approval

Credits cannot be awarded without the required faculty sign-off.

### External Access

Industry supervisors can only access students assigned to them.

Their access must be:

- Scoped.
- Time-boxed.
- Revocable.

### Incident Access

Incident information must only be accessible to authorized users.

### Auditability

Important actions such as verification, approval, signing, and configuration changes must be auditable.

---

## 7. Main Data Entities

The platform requires entities such as:

```text
User
Employer
EmployerVerification
Opportunity
Application
Offer
Agreement
AgreementTemplate
Signature
HourLog
HourVerification
WorkPlan
Task
Evaluation
Rubric
CreditMapping
CreditApproval
InsuranceRecord
SafetyDeclaration
Incident
Certificate
AuditEntry
```

These are logical entities. They do not necessarily mean every entity must become a separate MongoDB collection.

The final database structure will be decided during implementation.

---

## 8. Main API Areas

The backend will expose REST APIs for the major modules.

Main areas include:

```text
/employers
/opportunities
/applications
/agreements
/hours
/hours/:id/verify
/evaluations
/credits/compute
/credits/approve
/certificates
/reports/compliance
```

The APIs will contain both normal CRUD operations and workflow operations.

CRUD example:

```text
Create opportunity
Read opportunity
Update opportunity
```

Workflow examples:

```text
Apply
Shortlist
Select
Offer
Accept
Sign
Verify
Evaluate
Compute Credits
Approve Credits
```

Business rules must be enforced by the backend rather than relying on the frontend.

---

## 9. Integrations

The platform may integrate with external institutional and third-party systems.

Potential integrations include:

### ERP / SIS

Used for:

- Student enrolment information.
- Academic information.
- Credit write-back.

### Timetable System

Used to detect working hours that conflict with scheduled university classes.

### Skill Profile System

Can provide student skill information for opportunity matching.

### E-Signature Provider

Possible providers include:

- DocuSign.
- Zoho Sign.
- Equivalent self-hosted/approved solution.

The system must maintain an audit trail for signatures.

### Email / SMS

Used for notifications such as:

- Application status.
- Agreement availability.
- Hour verification requests.
- Evaluation deadlines.
- Credit approval.
- Compliance alerts.

### Authentication

Internal university users may use institutional SSO.

External employer users should use a separate authentication domain and must not be placed inside the internal university SSO trust boundary.

---

## 10. Notifications

The platform should support notifications for important workflow events.

Examples:

```text
Opportunity matching
        ↓
Application status change
        ↓
Agreement ready for signing
        ↓
Hours awaiting verification
        ↓
Evaluation due
        ↓
Credit approved
        ↓
Insurance expiring
        ↓
Incident escalation
```

Notifications may be delivered through supported channels such as email, SMS, or in-app notifications.

---

## 11. Reporting

The system should provide reports covering:

- Internship participation.
- Student participation.
- Logged hours.
- Verified hours.
- Academic credits.
- Employer participation.
- Repeat employer participation.
- Evaluation results.
- Internship-to-job offer conversion.
- Compliance gaps.
- Agreement status.
- Supervisor information.
- Assessment information.

The system should also support accreditation-ready reporting.

An accreditation report should be able to connect:

```text
Student
   ↓
Internship
   ↓
Employer
   ↓
Supervisor
   ↓
Verified Hours
   ↓
Assessment
   ↓
Academic Credits
```

---

## 12. Compliance and Accreditation

The system should make it possible to track whether required documentation and approvals exist for each internship.

The compliance system should identify missing or incomplete requirements.

Examples:

```text
Agreement missing
Agreement unsigned
Hours pending verification
Evaluation pending
Insurance expired
Safety declaration missing
Incident unresolved
Credit approval pending
```

The system should support reports that demonstrate compliance with the configured institutional and academic framework.

Each relevant feature should eventually be mapped to the applicable UGC AEDP / NCrF requirement.

---

## 13. Security Requirements

### Authentication

Internal and external users must have appropriate authentication boundaries.

### Authorization

Every protected request must verify:

```text
Who is the user?
       ↓
What role do they have?
       ↓
What action are they trying to perform?
       ↓
Are they allowed to access this specific resource?
```

### External Supervisor Security

An industry supervisor must not be able to access an unrelated student's information simply by changing an ID in a URL or API request.

The backend must verify the supervisor-to-student assignment.

### Immutable Agreements

Executed agreements and signatures must not be silently modified.

### Credit Protection

The backend must prevent credit award without the required faculty approval.

### Audit Trail

Important actions should record:

```text
Who
What
When
Which resource
What decision/change occurred
```

---

## 14. Dashboards

Different users should see information relevant to their role.

### Student

```text
Applications
Offers
Current Internship
Tasks
Hours
Evaluations
Credits
Certificate
```

### Employer

```text
Opportunities
Applications
Selected Students
Supervisors
Internship Progress
```

### Coordinator

```text
Employer Verification
Applications
Agreements
Hour Verification
Evaluations
Compliance
Incidents
```

### Academic Administration

```text
Participation
Hours
Credits
Assessments
Employers
Compliance
Accreditation Reports
```

---

## 15. Technical Requirements

The Track J implementation uses:

```text
Frontend
    ↓
Next.js

Backend
    ↓
Node.js + Express

Database
    ↓
MongoDB

ODM
    ↓
Mongoose
```

The frontend should be mobile-first where appropriate, especially for hour logging.

The supervisor hour-verification experience should be simple and quick, ideally requiring minimal interaction.

The employer portal should provide a simplified external interface.

The coordinator interface should provide a compliance-focused monitoring board.

---

## 16. Development Milestones

The project can be developed incrementally.

### Milestone 1 — Discovery & Framework Mapping

- Understand institutional requirements.
- Map UGC AEDP / NCrF requirements.
- Review legal/compliance requirements.
- Finalize architecture.

### Milestone 2 — Registry & Applications

- Employer registry.
- Employer verification.
- Opportunity management.
- Student applications.
- Selection workflow.

### Milestone 3 — Agreements

- Agreement templates.
- Versioning.
- Agreement generation.
- E-signature integration.
- Executed agreement storage.

### Milestone 4 — Internship Tracking

- Work plans.
- Tasks.
- Milestones.
- Hour logging.
- Hour verification.
- Anomaly detection.

### Milestone 5 — Evaluation & Credits

- Industry evaluation.
- Faculty assessment.
- Credit computation.
- Credit approval.

### Milestone 6 — Compliance & Records

- Insurance.
- Safety.
- Incident reporting.
- Certificates.
- Compliance dashboard.

### Milestone 7 — Reporting & Production

- Institution reports.
- Accreditation reports.
- UAT.
- Production deployment.

---

## 17. Testing Requirements

The system must test important business rules and security boundaries.

### Credit Testing

Test credit computation with:

- Different framework configurations.
- Different framework versions.
- Different engagement types.
- Different verified-hour values.

### Authorization Testing

Verify that:

```text
Supervisor A
      ↓
Cannot access
      ↓
Student assigned to Supervisor B
```

### Hour Testing

Test:

- Normal hour entries.
- More than 12 hours/day.
- Timetable conflicts.
- Rejected hours.
- Re-submitted hours.

### Agreement Testing

Verify that:

```text
Executed Agreement
       ↓
Cannot be silently modified
```

### Incident Testing

Verify that incidents are routed to the appropriate safeguarding contact and are visible only to authorized users.

---

## 18. Acceptance Criteria

The platform is considered functionally complete when it can support the complete lifecycle:

```text
Opportunity
    ↓
Application
    ↓
Offer
    ↓
Signed Agreement
    ↓
Verified Hours
    ↓
Evaluation
    ↓
Credit Computation
    ↓
Faculty Approval
    ↓
Certificate / Record
```

The system must also satisfy the following:

1. Employers can be verified before participation.
2. Students can apply to opportunities.
3. Employers can shortlist/select students and issue offers.
4. Accepted offers can proceed to tripartite agreements.
5. Agreements can be signed and the executed version preserved.
6. Students can log working hours.
7. Supervisors can verify hours.
8. Hour anomalies are detected.
9. Industry evaluations can be submitted.
10. Faculty assessments can be completed.
11. Credits are calculated from verified hours using the configured framework.
12. Credits cannot be awarded without faculty approval.
13. External supervisors cannot access unassigned students.
14. External access can be revoked and time-limited.
15. Compliance gaps can be identified.
16. Incidents are access-restricted.
17. Certificates can be generated after completion.
18. Reports can connect students with employers, supervisors, hours, assessments, and credits.
19. Important workflow actions are auditable.

---

## 19. Future AI / ML Features

AI/ML should not be part of the initial core implementation unless required.

Possible future features include:

### Opportunity Matching

Match students with opportunities based on:

- Skills.
- Eligibility.
- Academic profile.
- Previous experience.
- Opportunity requirements.

### Completion-Risk Prediction

Identify students who may be at risk of incomplete internships based on patterns such as:

- Low hour logging.
- Missed milestones.
- Delayed submissions.
- Pending evaluations.

### Learning Outcome Extraction

Use evaluation text to identify and summarize learning outcomes achieved during the internship.

These features can be added after the core platform is stable.

---

## 20. Documentation Requirements

The project documentation should maintain traceability between requirements and implementation.

Important requirements should eventually be mapped to:

```text
Requirement
     ↓
PRD
     ↓
Module
     ↓
Database Entity
     ↓
API
     ↓
Frontend
     ↓
Test
```

The documentation should also map applicable features to the relevant UGC AEDP / NCrF requirements.

The technical documentation will be maintained separately in:

```text
docs/
├── ARCHITECTURE.md
├── DATABASE.md
├── API.md
└── SECURITY.md
```

---

## 21. Scope Boundary

The initial implementation should focus on the core internship lifecycle:

```text
Employer
→ Opportunity
→ Application
→ Offer
→ Agreement
→ Hours
→ Verification
→ Evaluation
→ Credits
→ Approval
→ Certificate
```

Advanced integrations and AI/ML features should be added after the core workflow is functional.

The exact implementation of institutional SSO, ERP/SIS integration, timetable integration, e-signature provider, notification provider, and credit-framework configuration will be finalized during development.