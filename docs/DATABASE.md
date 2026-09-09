# Database Design

## Core Collections

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

### Supporting Collections

* `employerVerifications`
* `agreementTemplates`
* `signatures`
* `hourVerifications`
* `workPlans`
* `rubrics`
* `creditApprovals`
* `insuranceRecords`
* `safetyDeclarations`

---

## Main Relationships

```text
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
```

---

## Initial Entities

### User
* `_id`
* `name`
* `email`
* `passwordHash` / external identity reference
* `role`
* `universityId`
* `department`
* `isActive`
* `createdAt`

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

> **Note:** These fields are an initial design and will be refined while implementing the actual Mongoose models.

---

## Data Integrity Principles

* **Reference over duplication:** Use references for relationships where appropriate instead of duplicating large documents.
* **Preserve executed versions:** Always preserve the executed agreement version.
* **Auditability:** Keep verification and approval information auditable.
* **Explicit approvals:** Do not award credits merely because a calculation exists; retain a separate approval state.
* **Traceability:** Use timestamps on all workflow records.

## Data Integrity Principles

* **Reference over duplication:** Use references for relationships where appropriate instead of duplicating large documents.
* **Preserve executed versions:** Always preserve the executed agreement version.
* **Auditability:** Keep verification and approval information auditable.
* **Explicit approvals:** Do not award credits merely because a calculation exists; retain a separate approval state.
* **Traceability:** Use timestamps on all workflow records.