const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const {
    authenticate,
    authorize,
    preventRoleTampering
} = require("../middleware/auth");

// Public Authentication Endpoints (Issue 1 & Issue 2)
router.post("/signup", authController.signup);
router.post("/login", authController.login);

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
