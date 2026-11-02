const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const {
    authenticate,
    authorize,
    preventRoleTampering
} = require("../middleware/auth");
const { demoRateLimiter } = require("../middleware/demoRateLimiter");

// Public Authentication Endpoints (Issue 1 & Issue 2)
router.post("/signup", authController.signup);
router.post("/login", authController.login);

// Simulated University Demo Endpoints (Rate-limited to prevent enumeration)
router.post(
    "/demo-student/request-code",
    demoRateLimiter({ maxRequests: 5, windowMs: 60000 }),
    authController.requestDemoVerificationCode
);
router.get(
    "/demo-student/:registrationNumber",
    demoRateLimiter({ maxRequests: 10, windowMs: 60000 }),
    authController.lookupDemoStudent
);

// Authenticated User Profile Endpoints (Issue 3)
router.get("/me", authenticate, authController.getMe);
router.put("/profile", authenticate, preventRoleTampering, authController.updateProfile);

// Role-Protected Endpoints (Issue 3: RBAC verification)
router.get(
    "/student-only",
    authenticate,
    authorize("STUDENT"),
    (req, res) => {
        res.status(200).json({
            success: true,
            message: `Hello ${req.user.name}, you have successfully accessed the Student-only portal!`,
            userRole: req.user.role
        });
    }
);

router.get(
    "/faculty-only",
    authenticate,
    authorize("FACULTY_SUPERVISOR", "HOD", "DEAN", "INTERNSHIP_COORDINATOR"),
    (req, res) => {
        res.status(200).json({
            success: true,
            message: `Hello ${req.user.name}, you have successfully accessed the Faculty portal!`,
            userRole: req.user.role
        });
    }
);

router.get(
    "/employer-only",
    authenticate,
    authorize("EMPLOYER_ADMIN", "INDUSTRY_SUPERVISOR"),
    (req, res) => {
        res.status(200).json({
            success: true,
            message: `Hello ${req.user.name}, you have successfully accessed the Employer & Industry portal!`,
            userRole: req.user.role
        });
    }
);

router.get(
    "/admin-only",
    authenticate,
    authorize("ADMIN"),
    (req, res) => {
        res.status(200).json({
            success: true,
            message: `Hello ${req.user.name}, you have successfully accessed the System Administration portal!`,
            userRole: req.user.role
        });
    }
);

module.exports = router;
