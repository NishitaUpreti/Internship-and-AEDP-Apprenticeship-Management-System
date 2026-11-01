const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "internship_aedp_jwt_super_secret_key_2026_secure";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

/**
 * Generate a signed JWT token for an authenticated user
 * @param {Object} user - User document or user object
 * @returns {String} JWT token
 */
function generateToken(user) {
    const payload = {
        id: user._id || user.id,
        email: user.email,
        role: user.role,
        userType: user.userType
    };

    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN
    });
}

/**
 * Verify a JWT token
 * @param {String} token
 * @returns {Object} Decoded payload
 */
function verifyToken(token) {
    return jwt.verify(token, JWT_SECRET);
}

module.exports = {
    generateToken,
    verifyToken
};
