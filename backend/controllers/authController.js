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
const { getDemoConnection } = require("../config/demoDatabase");
const { getDemoStudentModel } = require("../models/demo/DemoStudent");

function maskEmail(emailStr) {
    if (!emailStr || typeof emailStr !== "string") return "";
    const [local, domain] = emailStr.split("@");
    if (!domain) return emailStr;
    if (local.length <= 2) {
        return `${local[0]}*@${domain}`;
    }
    return `${local[0]}***${local[local.length - 1]}@${domain}`;
}

/**
 * POST /api/auth/demo-student/request-code
 * Simulates dispatching a one-time verification code to student's demo email
 */
async function requestDemoVerificationCode(req, res) {
    try {
        const { registrationNumber } = req.body;
        const trimmed = (registrationNumber || "").trim();

        if (!/^124\d{5}$/.test(trimmed)) {
            return res.status(400).json({
                success: false,
                message: "Validation Error: Registration number must be an 8-digit numeric string starting with 124 (e.g. 12429384)."
            });
        }

        // Anti-impersonation: Check if an account already claimed this registration number
        const existingClaim = await User.findOne({ universityId: trimmed });
        if (existingClaim) {
            return res.status(409).json({
                success: false,
                message: "Security Notice: An account with this registration number has already been registered. Impersonation of existing student accounts is prohibited."
            });
        }

        const conn = await getDemoConnection();
        const DemoStudent = getDemoStudentModel(conn);
        const record = await DemoStudent.findOne({ registrationNumber: trimmed });

        if (!record) {
            return res.status(404).json({
                success: false,
                message: `No simulated student record found for registration number: ${trimmed}.`
            });
        }

        if (record.academicStatus !== "ACTIVE") {
            return res.status(400).json({
                success: false,
                message: `Simulated student status is '${record.academicStatus}'. Only ACTIVE students are eligible for internship registration.`,
                academicStatus: record.academicStatus
            });
        }

        const masked = maskEmail(record.email);

        return res.status(200).json({
            success: true,
            message: "Simulated verification code generated for demonstration purposes.",
            isDemo: true,
            dataSource: "SIMULATED",
            verificationNotice: "⚠️ DEMO SIMULATION ONLY: This is a demonstration verification mechanism. Not official university identity verification.",
            registrationNumber: record.registrationNumber,
            maskedEmail: masked,
            branch: record.branch,
            demoVerificationCode: record.demoVerificationCode,
            simulationDisclaimer: "In production, this code is delivered exclusively to the student's institutional email address."
        });
    } catch (error) {
        console.error("requestDemoVerificationCode error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to generate simulated verification code.",
            error: error.message
        });
    }
}

/**
 * GET /api/auth/demo-student/:registrationNumber
 * Looks up simulated academic details with identity protection
 */
async function lookupDemoStudent(req, res) {
    try {
        const { registrationNumber } = req.params;
        const trimmed = (registrationNumber || "").trim();

        if (!/^124\d{5}$/.test(trimmed)) {
            return res.status(400).json({
                success: false,
                message: "Validation Error: Registration number must be an 8-digit numeric string starting with 124 (e.g. 12429384)."
            });
        }

        const conn = await getDemoConnection();
        const DemoStudent = getDemoStudentModel(conn);
        const record = await DemoStudent.findOne({ registrationNumber: trimmed });

        if (!record) {
            return res.status(404).json({
                success: false,
                message: `No simulated student record found for registration number: ${trimmed}.`
            });
        }

        if (record.academicStatus !== "ACTIVE") {
            return res.status(400).json({
                success: false,
                message: `Simulated student status is '${record.academicStatus}'. Only ACTIVE students are eligible for internship registration.`,
                academicStatus: record.academicStatus
            });
        }

        const masked = maskEmail(record.email);
        const providedCode = (req.query.code || req.headers["x-demo-code"] || "").trim();

        // If no code is provided, return protected masked summary to prevent enumeration
        if (!providedCode) {
            return res.status(200).json({
                success: true,
                requiresVerificationCode: true,
                message: "Simulated student record located. To protect academic privacy and prevent enumeration, provide demo verification code to view full academic details.",
                isDemo: true,
                dataSource: "SIMULATED",
                verificationNotice: "⚠️ DEMO SIMULATION ONLY: Demonstration verification mechanism.",
                student: {
                    registrationNumber: record.registrationNumber,
                    maskedEmail: masked,
                    branch: record.branch,
                    academicStatus: record.academicStatus,
                    isDemo: true,
                    dataSource: "SIMULATED"
                }
            });
        }

        // Verify code
        if (providedCode !== record.demoVerificationCode) {
            return res.status(401).json({
                success: false,
                message: "Security Error: Invalid demo verification code. Knowing a registration number alone is insufficient to access student academic records."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Simulated student academic details verified successfully.",
            isDemo: true,
            dataSource: "SIMULATED",
            verificationNotice: "⚠️ DEMO SIMULATION ONLY: Verified for demonstration purposes only. Not official university identity verification.",
            student: {
                registrationNumber: record.registrationNumber,
                fullName: record.fullName,
                email: record.email,
                maskedEmail: masked,
                branch: record.branch,
                semester: record.semester,
                cgpa: record.cgpa,
                academicStatus: record.academicStatus,
                admissionYear: record.admissionYear,
                isDemo: true,
                dataSource: "SIMULATED"
            }
        });
    } catch (error) {
        console.error("lookupDemoStudent error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to query simulated university database.",
            error: error.message
        });
    }
}

/**
 * POST /api/auth/signup
 * Registers a new P15 user
 */
async function signup(req, res) {
    try {
        let {
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

        // Validate and retrieve simulated university record if demo registration number is provided
        let demoRecord = null;
        const candidateRegNo = (req.body.demoRegistrationNumber || (assignedRole === "STUDENT" && universityId ? universityId : "")).trim();
        const candidateCode = (req.body.demoVerificationCode || "").trim();

        if (assignedRole === "STUDENT" && (req.body.demoRegistrationNumber || (candidateRegNo && /^124\d{5}$/.test(candidateRegNo)))) {
            if (!/^124\d{5}$/.test(candidateRegNo)) {
                return res.status(400).json({
                    success: false,
                    message: "Validation Error: Registration number must be an 8-digit numeric string starting with 124 (e.g. 12429384)."
                });
            }

            // Anti-Impersonation Check: Ensure registration number is not already registered
            const existingClaim = await User.findOne({ universityId: candidateRegNo });
            if (existingClaim) {
                return res.status(409).json({
                    success: false,
                    message: `Registration rejected: An account with registration number ${candidateRegNo} has already been registered. Student impersonation is prohibited.`
                });
            }

            // Require demo verification code to prevent registration with registration number alone
            if (!candidateCode) {
                return res.status(400).json({
                    success: false,
                    message: "Validation Error: Demo verification code is required to register with a simulated university registration number."
                });
            }

            try {
                const conn = await getDemoConnection();
                const DemoStudent = getDemoStudentModel(conn);
                demoRecord = await DemoStudent.findOne({ registrationNumber: candidateRegNo });

                if (!demoRecord) {
                    return res.status(404).json({
                        success: false,
                        message: `Validation Error: No simulated student record found for registration number: ${candidateRegNo}.`
                    });
                }

                if (demoRecord.academicStatus !== "ACTIVE") {
                    return res.status(400).json({
                        success: false,
                        message: `Registration rejected: Simulated student record status is '${demoRecord.academicStatus}'. Only ACTIVE students are eligible for internship registration.`
                    });
                }

                if (candidateCode !== demoRecord.demoVerificationCode) {
                    return res.status(401).json({
                        success: false,
                        message: `Verification Error: Invalid demo verification code for registration number ${candidateRegNo}. Identity verification failed.`
                    });
                }

                // Prevent student-side manipulation: use database-verified academic information
                fullName = demoRecord.fullName;
                department = demoRecord.branch;
            } catch (demoErr) {
                console.error("Demo student lookup error during signup:", demoErr);
                return res.status(500).json({
                    success: false,
                    message: "Failed to verify registration against simulated university database.",
                    error: demoErr.message
                });
            }
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

        const resolvedUniversityId = demoRecord ? demoRecord.registrationNumber : (universityId ? universityId.trim() : (userType === "INTERNAL" ? `UNIV-${Date.now()}-${Math.floor(Math.random() * 1000)}` : undefined));
        const resolvedExternalRef = req.body.externalIdentityRef ? req.body.externalIdentityRef.trim() : (userType === "EXTERNAL" ? `EXT-${Date.now()}-${Math.floor(Math.random() * 1000)}` : undefined);

        // Create user in MongoDB
        const newUser = await User.create({
            name: fullName.trim(),
            email: normalizedEmail,
            passwordHash,
            role: assignedRole,
            userType,
            universityId: resolvedUniversityId,
            externalIdentityRef: resolvedExternalRef,
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

        let demoAcademicRecord = null;
        if (user.role === "STUDENT" && user.universityId && /^124\d{5}$/.test(user.universityId)) {
            try {
                const conn = await getDemoConnection();
                const DemoStudent = getDemoStudentModel(conn);
                const rec = await DemoStudent.findOne({ registrationNumber: user.universityId });
                if (rec) {
                    demoAcademicRecord = {
                        registrationNumber: rec.registrationNumber,
                        fullName: rec.fullName,
                        branch: rec.branch,
                        semester: rec.semester,
                        cgpa: rec.cgpa,
                        academicStatus: rec.academicStatus,
                        admissionYear: rec.admissionYear,
                        isDemo: true,
                        dataSource: "SIMULATED"
                    };
                }
            } catch (demoErr) {
                console.error("Error retrieving demo academic record in getMe:", demoErr.message);
            }
        }

        return res.status(200).json({
            success: true,
            user: user.toJSON(),
            permissions,
            demoAcademicRecord
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

        // Security check: students cannot alter academic records retrieved from simulated database
        if (user.role === "STUDENT") {
            if (universityId !== undefined && universityId.trim() !== user.universityId) {
                return res.status(403).json({
                    success: false,
                    message: "Security Error: University registration number cannot be altered on an existing account."
                });
            }
            if (user.universityId && /^124\d{5}$/.test(user.universityId)) {
                if (department !== undefined && department.trim() !== user.department) {
                    return res.status(403).json({
                        success: false,
                        message: "Security Error: Academic department retrieved from simulated university database cannot be modified."
                    });
                }
            }
        }

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
    updateProfile,
    lookupDemoStudent,
    requestDemoVerificationCode
};
