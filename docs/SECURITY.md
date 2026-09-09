# Security

## Authentication

Internal university users and external employer users use separate authentication boundaries. External employer users must not be placed inside the internal university SSO trust boundary.

## Authorization

Every protected API request must verify:

```text
Who is the user?
        ↓
What role do they have?
        ↓
Are they allowed to perform this action?
        ↓
Are they allowed to access this specific resource?
```

### External Supervisor Access

Industry supervisors receive:

* Scoped access
* Access only to assigned students
* Time-limited access
* Revocable access

> **Rule:** A supervisor attempting to access an unassigned student must be rejected.

---

## Immutable Records

Once executed:

* Agreements cannot be silently edited.
* Signatures cannot be silently altered.
* The executed agreement version must be retained.

---

## Hour Security

The backend validates hour submissions and flags:

* More than 12 hours in one day
* Hours conflicting with scheduled classes when timetable data is available

---

## Credit Security

Credit computation and credit approval are separate operations:

```text
Verified hours
      ↓
Credit computation
      ↓
Faculty approval
      ↓
Credits awarded
```

> **Rule:** The system must prevent credit award without faculty sign-off.

---

## Incident Reporting

Incident information is restricted to authorized users and must route to the designated safeguarding contact.

---

## Audit Trail

Important actions should create audit entries containing enough information to establish:

* **Who:** User identity and role
* **What:** Action attempted/performed
* **When:** UTC timestamp
* **Which resource:** Target entity identifier
* **What decision/change:** Delta or approval status

---

## Secrets Management

Secrets and environment-specific configuration belong in `.env` or the deployment secret manager and must never be committed to Git.

---

## Testing Requirements

At minimum, test that:

* External supervisors cannot access unassigned students.
* Credits cannot be awarded without faculty approval.
* Hour anomalies are flagged.
* Executed agreements remain immutable.
* Incident routing reaches the safeguarding contact.