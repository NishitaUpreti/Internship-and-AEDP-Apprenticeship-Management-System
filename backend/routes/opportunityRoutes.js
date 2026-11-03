const express = require("express");
const router = express.Router();
const {
    createOpportunity,
    getEmployerOpportunities,
    updateOpportunity,
    deleteOpportunity,
    getAllOpportunities,
    getOpportunityById
} = require("../controllers/opportunityController");
const { authenticate, authorize } = require("../middleware/auth");
const { verifyToken } = require("../utils/jwt");
const User = require("../models/User");

// Optional auth helper to check if logged in student has applied
async function optionalAuthenticate(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith("Bearer ")) {
            const token = authHeader.split(" ")[1];
            if (token) {
                const decoded = verifyToken(token);
                if (decoded && decoded.id) {
                    const user = await User.findById(decoded.id);
                    if (user && user.isActive) {
                        req.user = user;
                    }
                }
            }
        }
    } catch (e) {
        // Continue unauthenticated if token is invalid
    }
    next();
}

// Employer CRUD operations
router.post("/", authenticate, authorize("EMPLOYER_ADMIN", "ADMIN"), createOpportunity);
router.get("/employer", authenticate, authorize("EMPLOYER_ADMIN", "ADMIN"), getEmployerOpportunities);
router.put("/:id", authenticate, authorize("EMPLOYER_ADMIN", "ADMIN"), updateOpportunity);
router.delete("/:id", authenticate, authorize("EMPLOYER_ADMIN", "ADMIN"), deleteOpportunity);

// Student & Public discovery operations
router.get("/", optionalAuthenticate, getAllOpportunities);
router.get("/:id", optionalAuthenticate, getOpportunityById);

module.exports = router;

