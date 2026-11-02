const mongoose = require("mongoose");
const dns = require("dns");

// Use reliable public DNS in local development if needed
if (process.env.NODE_ENV !== "production") {
    try {
        dns.setServers(["8.8.8.8", "1.1.1.1"]);
    } catch {
        // Ignore if restricted
    }
}

let demoConnection = null;

/**
 * Derives a dedicated university_demo database URI from base MongoDB URI
 * @param {boolean} isTest - Whether to target the test database university_demo_test
 * @returns {string} Fully formed MongoDB URI
 */
function getDemoDatabaseUri(isTest = false) {
    // 1. Check for explicit environment override
    if (isTest && process.env.UNIVERSITY_DEMO_TEST_URI) {
        return process.env.UNIVERSITY_DEMO_TEST_URI.trim();
    }
    if (!isTest && process.env.UNIVERSITY_DEMO_URI) {
        return process.env.UNIVERSITY_DEMO_URI.trim();
    }

    // 2. Base URI: use test URI if test mode, else standard application URI
    const baseUri = (isTest ? (process.env.MONGODB_TEST_URI || process.env.MONGODB_URI) : process.env.MONGODB_URI);
    if (!baseUri) {
        throw new Error("Cannot derive university demo URI: Neither MONGODB_URI nor MONGODB_TEST_URI is set.");
    }

    const targetDb = isTest ? "university_demo_test" : "university_demo";

    try {
        const u = new URL(baseUri.trim());
        u.pathname = `/${targetDb}`;
        return u.toString();
    } catch {
        // Fallback replacement if URL parsing fails on custom format
        const match = baseUri.trim().match(/^(mongodb(?:\+srv)?:\/\/[^/]+)(?:\/([^?]*))?(\?.*)?$/);
        if (!match) {
            throw new Error(`Invalid MongoDB connection string: ${baseUri}`);
        }
        const hostPart = match[1];
        const queryPart = match[3] || "";
        return `${hostPart}/${targetDb}${queryPart}`;
    }
}

/**
 * Retrieves or establishes an isolated Mongoose connection to the simulated university database
 * @param {string} [customUri]
 * @returns {Promise<mongoose.Connection>}
 */
async function getDemoConnection(customUri) {
    if (demoConnection && demoConnection.readyState === 1) {
        return demoConnection;
    }

    const isTest = process.env.NODE_ENV === "test";
    const uri = customUri || getDemoDatabaseUri(isTest);

    demoConnection = mongoose.createConnection(uri);

    await demoConnection.asPromise();

    return demoConnection;
}

/**
 * Closes the isolated demo database connection
 */
async function closeDemoConnection() {
    if (demoConnection && demoConnection.readyState !== 0) {
        await demoConnection.close();
        demoConnection = null;
    }
}

module.exports = {
    getDemoConnection,
    closeDemoConnection,
    getDemoDatabaseUri
};
