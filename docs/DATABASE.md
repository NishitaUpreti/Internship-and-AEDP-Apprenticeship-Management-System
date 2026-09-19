# Database Design

## Core Collections

* `users`
* `employers`
* `opportunities`
* `applications`
* `offers`
* `agreements`
* `hourLogs`
* `tasks`
* `evaluations`
* `creditMappings`
* `certificates`
* `incidents`
* `auditEntries`

## Supporting Collections

* `employerVerifications`
* `agreementTemplates`
* `signatures`
* `hourVerifications`
* `workPlans`
* `rubrics`
* `creditApprovals`
* `insuranceRecords`
* `safetyDeclarations`

## Main Relationships

Employer
↓ employerId
Opportunity
↓ opportunityId
Application
↓ applicationId
Offer
↓ offerId
Agreement
↓ agreementId
HourLog
↓ hourLogId
HourVerification

Evaluation
↓
CreditMapping
↓
CreditApproval
↓
Certificate

## Initial Entities

### User

* `_id`
* `name`
* `email`
* `passwordHash`
* `externalIdentityRef`
* `role`
* `userType`
* `universityId`
* `department`
* `isActive`
* `lastLogin`
* `createdAt`
* `updatedAt`

#### User Roles

* `STUDENT`
* `INDUSTRY_SUPERVISOR`
* `FACULTY_SUPERVISOR`
* `INTERNSHIP_COORDINATOR`
* `HOD`
* `DEAN`
* `EMPLOYER_ADMIN`
* `ADMIN`

#### User Types

* `INTERNAL`
* `EXTERNAL`

#### User Validation Rules

* `name` is required.
* `name` must contain between 2 and 100 characters.
* `email` is required.
* `email` is converted to lowercase.
* `email` must follow a valid email format.
* `email` must be unique.
* `role` is required and must match one of the defined user roles.
* `userType` is required and must be either `INTERNAL` or `EXTERNAL`.
* `universityId` is required for `INTERNAL` users.
* `externalIdentityRef` is required for `EXTERNAL` users.
* `isActive` defaults to `true`.
* `lastLogin` defaults to `null`.
* `passwordHash` is excluded from normal query results.
* `createdAt` and `updatedAt` are maintained automatically.

#### User Indexes

* `email`
* `role`
* `userType`
* `universityId`

### Employer

* `_id`
* `organisationName`
* `description`
* `website`
* `address`
* `verificationStatus`
* `createdAt`

### Opportunity

* `_id`
* `employerId`
* `title`
* `description`
* `skills`
* `eligibility`
* `location`
* `duration`
* `startDate`
* `endDate`
* `status`
* `createdAt`

### Application

* `_id`
* `opportunityId`
* `studentId`
* `status`
* `appliedAt`
* `updatedAt`

### Offer

* `_id`
* `applicationId`
* `studentId`
* `opportunityId`
* `employerId`
* `status`
* `offeredAt`
* `acceptedAt`

### Agreement

* `_id`
* `offerId`
* `studentId`
* `employerId`
* `facultySupervisorId`
* `templateVersion`
* `status`
* `executedDocument`
* `signedAt`

### HourLog

* `_id`
* `studentId`
* `agreementId`
* `date`
* `hours`
* `description`
* `status`
* `submittedAt`

### HourVerification

* `_id`
* `hourLogId`
* `supervisorId`
* `decision`
* `remarks`
* `verifiedAt`

---

## Data Integrity Principles

- **Reference over duplication:** Use references for relationships where appropriate instead of duplicating large documents.
- **Preserve executed versions:** Always preserve the executed agreement version.
- **Auditability:** Keep verification and approval information auditable.
- **Explicit approvals:** Do not award credits merely because a calculation exists; retain a separate approval state.
- **Traceability:** Use timestamps on all workflow records.