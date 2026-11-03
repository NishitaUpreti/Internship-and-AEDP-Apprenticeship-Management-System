const express = require("express");
const router = express.Router();
const { authenticate, authorize } = require("../middleware/auth");
const { getStudentDashboard } = require("../controllers/studentController");

// All student routes require authentication and STUDENT (or ADMIN) role
router.use(authenticate);
router.use(authorize("STUDENT", "ADMIN"));

// GET /api/student/dashboard - Fetch real-time student dashboard data
router.get("/dashboard", getStudentDashboard);

module.exports = router;

