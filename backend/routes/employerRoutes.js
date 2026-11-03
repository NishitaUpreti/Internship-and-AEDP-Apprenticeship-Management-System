const express = require("express");
const router = express.Router();
const {
    getMyEmployerProfile,
    updateMyEmployerProfile,
    getEmployerDashboard,
    getPublicEmployersList,
    getEmployerById
} = require("../controllers/employerController");
const { authenticate, authorize } = require("../middleware/auth");

// Public list for supervisor onboarding / select dropdowns (MUST be before /:id)
router.get("/public/list", getPublicEmployersList);

// Employer Admin profile routes
router.get("/me", authenticate, authorize("EMPLOYER_ADMIN", "ADMIN"), getMyEmployerProfile);
router.put("/me", authenticate, authorize("EMPLOYER_ADMIN", "ADMIN"), updateMyEmployerProfile);
router.get("/dashboard", authenticate, authorize("EMPLOYER_ADMIN", "ADMIN"), getEmployerDashboard);

// Public / Authenticated read route
router.get("/:id", getEmployerById);

module.exports = router;
