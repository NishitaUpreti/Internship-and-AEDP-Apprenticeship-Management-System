const express = require("express");
const router = express.Router();
const {
    getMyEmployerProfile,
    updateMyEmployerProfile,
    getEmployerDashboard,
    getEmployerById
} = require("../controllers/employerController");
const { authenticate, authorize } = require("../middleware/auth");

// Employer Admin profile routes
router.get("/me", authenticate, authorize("EMPLOYER_ADMIN", "ADMIN"), getMyEmployerProfile);
router.put("/me", authenticate, authorize("EMPLOYER_ADMIN", "ADMIN"), updateMyEmployerProfile);
router.get("/dashboard", authenticate, authorize("EMPLOYER_ADMIN", "ADMIN"), getEmployerDashboard);

// Public / Authenticated read route
router.get("/:id", getEmployerById);

module.exports = router;
