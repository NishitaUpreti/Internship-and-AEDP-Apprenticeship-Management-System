const express = require("express");
const router = express.Router();
const {
    submitApplication,
    getMyApplications,
    getEmployerApplications,
    updateApplicationStatus,
    acceptOffer
} = require("../controllers/applicationController");
const { authenticate, authorize } = require("../middleware/auth");

// Student application routes
router.post("/", authenticate, authorize("STUDENT", "ADMIN"), submitApplication);
router.get("/my", authenticate, authorize("STUDENT", "ADMIN"), getMyApplications);
router.put("/:id/accept", authenticate, authorize("STUDENT", "ADMIN"), acceptOffer);

// Employer candidate review routes
router.get("/employer", authenticate, authorize("EMPLOYER_ADMIN", "ADMIN"), getEmployerApplications);
router.put("/:id/status", authenticate, authorize("EMPLOYER_ADMIN", "ADMIN"), updateApplicationStatus);

module.exports = router;
