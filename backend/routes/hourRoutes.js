const express = require("express");
const router = express.Router();
const hourLogController = require("../controllers/hourLogController");
const { authenticate, authorize } = require("../middleware/auth");

// Student endpoints
router.post(
    "/",
    authenticate,
    authorize("STUDENT", "ADMIN"),
    hourLogController.logHours
);

router.get(
    "/my",
    authenticate,
    authorize("STUDENT", "ADMIN"),
    hourLogController.getMyHours
);

// Supervisor / Evaluator verification endpoints
router.get(
    "/pending",
    authenticate,
    authorize("INDUSTRY_SUPERVISOR", "FACULTY_SUPERVISOR", "ADMIN", "EMPLOYER_ADMIN", "COORDINATOR"),
    hourLogController.getPendingHours
);

router.put(
    "/:id/verify",
    authenticate,
    authorize("INDUSTRY_SUPERVISOR", "FACULTY_SUPERVISOR", "ADMIN", "EMPLOYER_ADMIN", "COORDINATOR"),
    hourLogController.verifyHourLog
);

module.exports = router;

