/**
 * Role Definitions, Types, and Initial Permissions for P15 Architecture
 */

const USER_ROLES = [
    "STUDENT",
    "INDUSTRY_SUPERVISOR",
    "FACULTY_SUPERVISOR",
    "INTERNSHIP_COORDINATOR",
    "HOD",
    "DEAN",
    "EMPLOYER_ADMIN",
    "ADMIN"
];

const USER_TYPES = [
    "INTERNAL",
    "EXTERNAL"
];

// Map each role to internal university trust boundary vs external employer boundary
const ROLE_USER_TYPE_MAP = {
    STUDENT: "INTERNAL",
    FACULTY_SUPERVISOR: "INTERNAL",
    INTERNSHIP_COORDINATOR: "INTERNAL",
    HOD: "INTERNAL",
    DEAN: "INTERNAL",
    ADMIN: "INTERNAL",
    INDUSTRY_SUPERVISOR: "EXTERNAL",
    EMPLOYER_ADMIN: "EXTERNAL"
};

// Roles that can be self-registered via public signup
// Note: Administrative roles (ADMIN, HOD, DEAN, INTERNSHIP_COORDINATOR) cannot be self-assigned
const ALLOWED_PUBLIC_SIGNUP_ROLES = [
    "STUDENT",
    "EMPLOYER_ADMIN",
    "INDUSTRY_SUPERVISOR",
    "FACULTY_SUPERVISOR"
];

// Friendly alias mappings (e.g., from frontend select dropdowns)
const ROLE_ALIASES = {
    student: "STUDENT",
    employer: "EMPLOYER_ADMIN",
    supervisor: "INDUSTRY_SUPERVISOR",
    faculty: "FACULTY_SUPERVISOR",
    STUDENT: "STUDENT",
    EMPLOYER_ADMIN: "EMPLOYER_ADMIN",
    INDUSTRY_SUPERVISOR: "INDUSTRY_SUPERVISOR",
    FACULTY_SUPERVISOR: "FACULTY_SUPERVISOR"
};

/**
 * Normalizes input role string to canonical enum value if allowed for public signup.
 * Returns null if role is not recognized or not permitted.
 */
function normalizeSignupRole(inputRole) {
    if (!inputRole || typeof inputRole !== "string") {
        return "STUDENT"; // Default fallback role
    }
    const trimmed = inputRole.trim();
    const mapped = ROLE_ALIASES[trimmed] || ROLE_ALIASES[trimmed.toLowerCase()];
    if (mapped && ALLOWED_PUBLIC_SIGNUP_ROLES.includes(mapped)) {
        return mapped;
    }
    return null;
}

// Initial Role Permissions Matrix (Issue 3 Task 5: Define initial role permissions)
const ROLE_PERMISSIONS = {
    STUDENT: [
        "profile:read",
        "profile:update",
        "opportunities:browse",
        "applications:create",
        "applications:read_own",
        "agreements:read_own",
        "hours:submit",
        "hours:read_own"
    ],
    EMPLOYER_ADMIN: [
        "profile:read",
        "profile:update",
        "organisation:manage",
        "opportunities:create",
        "opportunities:manage",
        "applications:review",
        "offers:issue"
    ],
    INDUSTRY_SUPERVISOR: [
        "profile:read",
        "profile:update",
        "assigned_students:read",
        "hours:verify",
        "evaluations:submit"
    ],
    FACULTY_SUPERVISOR: [
        "profile:read",
        "profile:update",
        "assigned_students:read",
        "agreements:review",
        "credits:approve",
        "evaluations:review"
    ],
    INTERNSHIP_COORDINATOR: [
        "profile:read",
        "agreements:manage",
        "supervisors:assign",
        "reports:view",
        "audits:read"
    ],
    HOD: [
        "profile:read",
        "department_approvals:manage",
        "department_reports:view"
    ],
    DEAN: [
        "profile:read",
        "institutional_oversight:view",
        "analytics:view"
    ],
    ADMIN: [
        "*" // Superuser access
    ]
};

module.exports = {
    USER_ROLES,
    USER_TYPES,
    ROLE_USER_TYPE_MAP,
    ALLOWED_PUBLIC_SIGNUP_ROLES,
    ROLE_ALIASES,
    ROLE_PERMISSIONS,
    normalizeSignupRole
};
