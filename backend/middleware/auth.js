const User = require("../models/User");
const { verifyToken } = require("../utils/jwt");
const { ROLE_PERMISSIONS } = require("../config/roles");

/**
 * Authentication Middleware
 * Extracts and verifies JWT from Authorization header.
 * Identifies and loads the authenticated user.
 * Returns 401 for unauthenticated or invalid requests.
 */
async function authenticate(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Authentication required. Please provide a Bearer token in the Authorization header."
            });
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Authentication token missing."
            });
        }

        let decoded;
        try {
            decoded = verifyToken(token);
        } catch (err) {
            return res.status(401).json({
                success: false,
                message: "Invalid or expired token.",
                error: err.name === "TokenExpiredError" ? "Token expired" : "Invalid token"
            });
        }

        // Identify authenticated user in MongoDB
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Authentication failed. User no longer exists."
            });
        }

        // Verify account is active
        if (!user.isActive) {
            return res.status(403).json({
                success: false,
                message: "Account is inactive or blocked. Please contact an administrator."
            });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Authentication server error.",
            error: error.message
        });
    }
}

/**
 * Role-Checking Middleware Factory
 * Protects routes by requiring one or more specific roles.
 * Returns 403 for unauthorized roles.
 *
 * @param  {...string|string[]} roles - Allowed roles (e.g. 'STUDENT', 'FACULTY_SUPERVISOR')
 */
function authorize(...roles) {
    const allowedRoles = roles.flat();

    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required before role authorization."
            });
        }

        // ADMIN has superuser privileges across all routes
        if (req.user.role === "ADMIN") {
            return next();
        }

        if (allowedRoles.length > 0 && !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: `Forbidden: Role '${req.user.role}' is not authorized to access this resource.`,
                requiredRoles: allowedRoles
            });
        }

        next();
    };
}

/**
 * Permission-Checking Middleware Factory
 * Checks fine-grained permissions defined in ROLE_PERMISSIONS
 *
 * @param {string} requiredPermission
 */
function requirePermission(requiredPermission) {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required."
            });
        }

        const userPermissions = ROLE_PERMISSIONS[req.user.role] || [];
        const hasPermission = userPermissions.includes("*") || userPermissions.includes(requiredPermission);

        if (!hasPermission) {
            return res.status(403).json({
                success: false,
                message: `Forbidden: Missing required permission '${requiredPermission}'.`
            });
        }

        next();
    };
}

/**
 * Role Tampering Prevention Middleware
 * Prevents users from escalating privileges or altering their own role/userType via normal requests
 */
function preventRoleTampering(req, res, next) {
    if (req.body && (req.body.role !== undefined || req.body.userType !== undefined)) {
        return res.status(403).json({
            success: false,
            message: "Security violation: Modifying your own role or user type through normal requests is not permitted."
        });
    }
    next();
}

module.exports = {
    authenticate,
    authorize,
    requirePermission,
    preventRoleTampering
};
