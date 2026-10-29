const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { generateToken } = require("../utils/jwt");
const {
    ROLE_USER_TYPE_MAP,
    ROLE_PERMISSIONS,
    normalizeSignupRole,
    ALLOWED_PUBLIC_SIGNUP_ROLES
} = require("../config/roles");

const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

/**
 * POST /api/auth/signup
 * Registers a new P15 user
 */
async function signup(req, res) {
    try {
        const {
            name,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            role,
            universityId,
            department
        } = req.body;

        // Resolve name if split into firstName / lastName
        let fullName = name;
        if (!fullName && (firstName || lastName)) {
            fullName = [firstName, lastName].filter(Boolean).join(" ").trim();
        }

        // Validate required fields
        if (!fullName || !fullName.trim()) {
            return res.status(400).json({
                success: false,
                message: "Validation Error: Full name is required."
            });
        }

        if (fullName.trim().length < 2 || fullName.trim().length > 100) {
            return res.status(400).json({
                success: false,
                message: "Validation Error: Name must be between 2 and 100 characters."
            });
        }

        if (!email || !email.trim()) {
            return res.status(400).json({
                success: false,
                message: "Validation Error: Email is required."
            });
        }

        const normalizedEmail = email.toLowerCase().trim();
        if (!EMAIL_REGEX.test(normalizedEmail)) {
            return res.status(400).json({
                success: false,
                message: "Validation Error: Please provide a valid email address."
            });
        }

        if (!password) {
            return res.status(400).json({
                success: false,
                message: "Validation Error: Password is required."
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Validation Error: Password must be at least 6 characters long."
            });
        }

        if (confirmPassword && password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Validation Error: Passwords do not match."
            });
        }

        // Validate and normalize role
        let assignedRole = "STUDENT";
        if (role) {
            const normalized = normalizeSignupRole(role);
            if (!normalized) {
                return res.status(400).json({
                    success: false,
                    message: "Validation Error: Invalid or prohibited role selected for public registration.",
                    allowedRoles: ["Student", "Employer", "Supervisor", "Faculty"]
                });
            }
            assignedRole = normalized;
        }

        // Check for existing email in MongoDB
        const existingUser = await User.findOne({ email: normalizedEmail });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "An account with this email address already exists. Please login instead."
            });
        }

        // Hash the password securely
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // Derive userType based on trust boundary (INTERNAL vs EXTERNAL)
        const userType = ROLE_USER_TYPE_MAP[assignedRole] || "INTERNAL";

        // Create user in MongoDB
        const newUser = await User.create({
            name: fullName.trim(),
            email: normalizedEmail,
            passwordHash,
            role: assignedRole,
            userType,
            universityId: universityId ? universityId.trim() : undefined,
            department: department ? department.trim() : undefined,
            isActive: true
        });

        // Generate authentication token
        const token = generateToken(newUser);

        return res.status(201).json({
            success: true,
            message: "User registered successfully.",
            token,
            user: newUser.toJSON()
        });
    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to register user due to an internal server error.",
            error: error.message
        });
    }
}

/**
 * POST /api/auth/login
 * Authenticates existing P15 users
 */
async function login(req, res) {
    try {
        const { email, password } = req.body;

        // Validate input fields
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide both email and password."
            });
        }

        const normalizedEmail = email.toLowerCase().trim();

        // Find user by email, explicitly including passwordHash for verification
        const user = await User.findOne({ email: normalizedEmail }).select("+passwordHash");

        // Invalid credentials if user not found
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password."
            });
        }

        // Verify password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password."
            });
        }

        // Handle inactive or blocked accounts
        if (!user.isActive) {
            return res.status(403).json({
                success: false,
                message: "Your account is deactivated or blocked. Please contact an administrator."
            });
        }

        // Update last login timestamp
        user.lastLogin = new Date();
        await user.save();

        // Generate authentication token
        const token = generateToken(user);

        return res.status(200).json({
            success: true,
            message: "Login successful.",
            token,
            user: user.toJSON()
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to authenticate user due to an internal server error.",
            error: error.message
        });
    }
}

/**
 * GET /api/auth/me
 * Returns authenticated user information and permissions
 */
async function getMe(req, res) {
    try {
        const user = req.user;
        const permissions = ROLE_PERMISSIONS[user.role] || [];

        return res.status(200).json({
            success: true,
            user: user.toJSON(),
            permissions
        });
    } catch (error) {
        console.error("getMe error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch user profile.",
            error: error.message
        });
    }
}

/**
 * PUT /api/auth/profile
 * Allows user to update basic profile info while preventing role tampering
 */
async function updateProfile(req, res) {
    try {
        const user = req.user;
        const { name, universityId, department } = req.body;

        if (name && name.trim()) {
            user.name = name.trim();
        }
        if (universityId !== undefined) {
            user.universityId = universityId.trim();
        }
        if (department !== undefined) {
            user.department = department.trim();
        }

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully.",
            user: user.toJSON()
        });
    } catch (error) {
        console.error("updateProfile error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update profile.",
            error: error.message
        });
    }
}

module.exports = {
    signup,
    login,
    getMe,
    updateProfile
};
