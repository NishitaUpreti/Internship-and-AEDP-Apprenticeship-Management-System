/**
 * Centralized error handling middleware for Express and Mongoose/MongoDB errors
 */
function errorHandler(err, req, res, next) {
    console.error("Global Error Handler caught:", err);

    let statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    let message = err.message || "Internal Server Error";

    // Mongoose CastError (e.g. invalid ObjectId format)
    if (err.name === "CastError") {
        statusCode = 400;
        message = `Resource not found with invalid ${err.path}: ${err.value}`;
    }

    // Mongoose duplicate key error (code 11000)
    if (err.code === 11000) {
        statusCode = 409;
        const field = Object.keys(err.keyValue || {})[0] || "field";
        message = `Duplicate value entered for ${field}: ${err.keyValue ? err.keyValue[field] : ""}`;
    }

    // Mongoose Schema ValidationError
    if (err.name === "ValidationError") {
        statusCode = 400;
        message = Object.values(err.errors)
            .map((val) => val.message)
            .join(", ");
    }

    return res.status(statusCode).json({
        success: false,
        message,
        error: process.env.NODE_ENV === "development" ? err.stack : undefined
    });
}

module.exports = errorHandler;
