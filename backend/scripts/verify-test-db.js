require("dotenv").config();

function parseMongoUri(uriStr) {
    if (!uriStr || typeof uriStr !== "string") {
        throw new Error("Invalid URI: empty or not a string");
    }
    const trimmed = uriStr.trim();

    try {
        const u = new URL(trimmed);
        if (u.protocol === "mongodb:" || u.protocol === "mongodb+srv:") {
            return {
                protocol: u.protocol,
                username: u.username || "",
                password: u.password || "",
                hostname: u.hostname || "",
                database: u.pathname ? u.pathname.replace(/^\//, "").split("?")[0] : ""
            };
        }
    } catch {
        // Fallback robust parser for non-standard URIs
    }

    const schemeMatch = trimmed.match(/^(mongodb(?:\+srv)?):\/\/(.*)$/);
    if (!schemeMatch) {
        throw new Error("URI must start with mongodb:// or mongodb+srv://");
    }
    const protocol = schemeMatch[1] + ":";
    const withoutScheme = schemeMatch[2];

    const qIdx = withoutScheme.indexOf("?");
    const pathAndCreds = qIdx !== -1 ? withoutScheme.substring(0, qIdx) : withoutScheme;

    const firstSlash = pathAndCreds.indexOf("/");
    const preSlash = firstSlash !== -1 ? pathAndCreds.substring(0, firstSlash) : pathAndCreds;
    const database = firstSlash !== -1 ? pathAndCreds.substring(firstSlash + 1) : "";

    const lastAt = preSlash.lastIndexOf("@");
    if (lastAt === -1) {
        throw new Error("URI missing '@' separator between credentials and hostname");
    }

    const creds = preSlash.substring(0, lastAt);
    const hostname = preSlash.substring(lastAt + 1);

    const firstColon = creds.indexOf(":");
    if (firstColon === -1) {
        throw new Error("URI missing ':' separator between username and password");
    }

    const username = creds.substring(0, firstColon);
    const password = creds.substring(firstColon + 1);

    return { protocol, username, password, hostname, database };
}

function maskUriComponents(uriString) {
    if (!uriString) return null;
    try {
        const parsed = parseMongoUri(uriString);
        const user = parsed.username || "";
        const maskedUser = user.length > 2 ? user.slice(0, 2) + "***" : (user ? "***" : "(none)");
        const host = parsed.hostname || "(unknown)";
        const db = parsed.database || "(none)";

        // Note: Query parameters are strictly excluded to avoid leaking sensitive options
        const maskedString = `${parsed.protocol}//${maskedUser}:****@${host}/${db}`;

        return {
            valid: true,
            protocol: parsed.protocol,
            maskedUser,
            hostname: host,
            database: db,
            maskedString
        };
    } catch (e) {
        return {
            valid: false,
            error: e.message
        };
    }
}

function verifyConfiguration() {
    console.log("============================================================");
    console.log(" MONGODB CONFIGURATION & SAFETY VERIFICATION CHECK          ");
    console.log("============================================================");

    const testUri = process.env.MONGODB_TEST_URI;
    const appUri = process.env.MONGODB_URI;

    let hasError = false;

    // 1. Check MONGODB_TEST_URI presence
    if (!testUri || testUri.trim() === "") {
        console.error("\n❌ CRITICAL: MONGODB_TEST_URI is missing or empty in backend/.env.");
        console.error("A dedicated test URI targeting 'internship_management_test' is required.");
        process.exit(1);
    }

    // 2. Parse and Validate MONGODB_TEST_URI
    const maskedTest = maskUriComponents(testUri);
    if (!maskedTest.valid) {
        console.error(`\n❌ CRITICAL: Failed to parse MONGODB_TEST_URI: ${maskedTest.error}`);
        process.exit(1);
    }

    console.log("\n1. Dedicated Test Database (MONGODB_TEST_URI):");
    console.log(`   - Host: ${maskedTest.hostname}`);
    console.log(`   - Target Database: '${maskedTest.database}'`);
    console.log(`   - Masked String: ${maskedTest.maskedString}`);

    if (maskedTest.database !== "internship_management_test") {
        console.error(`   ❌ SAFETY FAILURE: MONGODB_TEST_URI targets database '${maskedTest.database}'.`);
        console.error("   It must target strictly 'internship_management_test' to protect application data.");
        hasError = true;
    } else {
        console.log("   ✓ SAFETY CONFIRMED: Database strictly targets 'internship_management_test'.");
    }

    // 3. Parse and Validate MONGODB_URI
    let maskedApp = null;
    if (appUri && appUri.trim() !== "") {
        maskedApp = maskUriComponents(appUri);
        console.log("\n2. Application Database (MONGODB_URI):");
        if (maskedApp.valid) {
            console.log(`   - Host: ${maskedApp.hostname}`);
            console.log(`   - Target Database: '${maskedApp.database}'`);
            console.log(`   - Masked String: ${maskedApp.maskedString}`);

            // 4. Verify both URIs point to the same Atlas cluster hostname
            if (maskedApp.hostname.toLowerCase() !== maskedTest.hostname.toLowerCase()) {
                console.error(`   ❌ HOST MISMATCH: MONGODB_URI (${maskedApp.hostname}) and MONGODB_TEST_URI (${maskedTest.hostname}) point to different hosts.`);
                console.error("   Both must point to the same Atlas cluster.");
                hasError = true;
            } else {
                console.log(`   ✓ CLUSTER CONFIRMED: Both URIs target the same cluster '${maskedTest.hostname}'.`);
            }
        } else {
            console.log(`   - Configured: YES (Parse error: ${maskedApp.error})`);
        }
    } else {
        console.log("\n2. Application Database (MONGODB_URI):");
        console.log("   - Configured: NOT SET (Optional for integration test execution)");
    }

    console.log("\n============================================================");

    if (hasError) {
        console.error("\n❌ Configuration safety checks failed. Exiting with non-zero code.");
        process.exit(1);
    } else {
        console.log("\n✓ All database configuration safety checks passed successfully.\n");
    }
}

verifyConfiguration();
