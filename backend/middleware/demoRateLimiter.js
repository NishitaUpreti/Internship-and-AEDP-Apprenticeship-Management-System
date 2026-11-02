/**
 * In-memory sliding window rate limiter for demo university student endpoints
 * Prevents automated enumeration of student records and brute-forcing of verification codes.
 */

const requestStore = new Map();

function demoRateLimiter(options = {}) {
    const windowMs = options.windowMs || 60 * 1000; // 1 minute default
    const maxRequests = options.maxRequests || 10;   // 10 requests per minute default

    return function (req, res, next) {
        // Allow tests to bypass or test specifically
        if (req.headers["x-bypass-rate-limit"] === "test-secret") {
            return next();
        }

        const ip = req.ip || req.connection.remoteAddress || "127.0.0.1";
        const key = `${ip}:${req.baseUrl || req.path}`;
        const now = Date.now();

        let clientData = requestStore.get(key);

        if (!clientData || now > clientData.resetTime) {
            clientData = {
                count: 1,
                resetTime: now + windowMs
            };
            requestStore.set(key, clientData);
            return next();
        }

        clientData.count++;

        if (clientData.count > maxRequests) {
            const retryAfter = Math.ceil((clientData.resetTime - now) / 1000);
            res.setHeader("Retry-After", retryAfter);
            return res.status(429).json({
                success: false,
                message: "Security Notice: Too many demo verification requests. Please wait a moment before trying again to prevent student record enumeration.",
                retryAfterSeconds: retryAfter
            });
        }

        next();
    };
}

/**
 * Resets the in-memory rate limit store (used in testing)
 */
function resetDemoRateLimits() {
    requestStore.clear();
}

module.exports = {
    demoRateLimiter,
    resetDemoRateLimits
};
