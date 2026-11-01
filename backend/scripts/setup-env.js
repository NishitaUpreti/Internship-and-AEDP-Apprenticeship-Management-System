const fs = require("fs");
const path = require("path");
const readline = require("readline");

function parseMongoUri(uriStr) {
    if (!uriStr || typeof uriStr !== "string") {
        throw new Error("Invalid URI: input must be a non-empty string");
    }
    const trimmed = uriStr.trim();

    // 1. Try standard URL parser first
    try {
        const u = new URL(trimmed);
        if (u.protocol === "mongodb:" || u.protocol === "mongodb+srv:") {
            return {
                protocol: u.protocol,
                username: u.username || "",
                password: u.password || "",
                hostname: u.hostname || "",
                database: u.pathname ? u.pathname.replace(/^\//, "").split("?")[0] : "",
                search: u.search || ""
            };
        }
    } catch {
        // Fallback robust splitter for non-standard or unencoded chars
    }

    // 2. Fallback robust decomposition
    const schemeMatch = trimmed.match(/^(mongodb(?:\+srv)?):\/\/(.*)$/);
    if (!schemeMatch) {
        throw new Error("URI must begin with mongodb:// or mongodb+srv://");
    }
    const protocol = schemeMatch[1] + ":";
    const withoutScheme = schemeMatch[2];

    const qIndex = withoutScheme.indexOf("?");
    const pathAndCreds = qIndex !== -1 ? withoutScheme.substring(0, qIndex) : withoutScheme;
    const search = qIndex !== -1 ? withoutScheme.substring(qIndex) : "";

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

    return { protocol, username, password, hostname, database, search };
}

function safeEncode(val) {
    if (!val) return "";
    try {
        // Decode first in case it was already percent-encoded, then encode once
        return encodeURIComponent(decodeURIComponent(val));
    } catch {
        return encodeURIComponent(val);
    }
}

function prompt(question, isPassword = false) {
    return new Promise((resolve) => {
        if (isPassword && !process.stdin.isTTY) {
            console.error("\n❌ ERROR: Secure password entry requires an interactive TTY terminal.");
            console.error("Masking cannot be guaranteed in non-TTY environments. Aborting to protect credentials.\n");
            process.exit(1);
        }

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        if (isPassword) {
            process.stdout.write(question);
            let input = "";

            process.stdin.setRawMode(true);
            process.stdin.resume();
            process.stdin.setEncoding("utf8");

            const onData = (chunk) => {
                for (const char of chunk) {
                    if (char === "\n" || char === "\r" || char === "\u0004") {
                        process.stdin.setRawMode(false);
                        process.stdin.pause();
                        process.stdin.removeListener("data", onData);
                        rl.close();
                        process.stdout.write("\n");
                        return resolve(input);
                    } else if (char === "\u0008" || char === "\x7f") {
                        if (input.length > 0) {
                            input = input.slice(0, -1);
                            process.stdout.write("\b \b");
                        }
                    } else if (char === "\u0003") {
                        // Ctrl+C
                        process.exit(1);
                    } else {
                        input += char;
                        process.stdout.write("*");
                    }
                }
            };

            process.stdin.on("data", onData);
        } else {
            rl.question(question, (answer) => {
                rl.close();
                resolve(answer.trim());
            });
        }
    });
}

function updateEnvFile(envPath, newVars) {
    let existingContent = "";
    if (fs.existsSync(envPath)) {
        existingContent = fs.readFileSync(envPath, "utf8");
    }

    if (!existingContent) {
        let content = `# Server Configuration\nPORT=5000\n\n`;
        content += `# Application Database Configuration (Development / Production)\nMONGODB_URI=${newVars.MONGODB_URI}\n\n`;
        content += `# Dedicated Integration Test Database (Strictly 'internship_management_test')\nMONGODB_TEST_URI=${newVars.MONGODB_TEST_URI}\n`;
        fs.writeFileSync(envPath, content, "utf8");
        return;
    }

    const lines = existingContent.split(/\r?\n/);
    const updatedLines = [];
    const keysHandled = new Set();

    for (const line of lines) {
        const trimmed = line.trim();
        const match = trimmed.match(/^([A-Za-z0-9_]+)\s*=(.*)$/);

        if (match) {
            const key = match[1];
            if (key === "MONGODB_URI") {
                if (newVars.MONGODB_URI) {
                    updatedLines.push(`MONGODB_URI=${newVars.MONGODB_URI}`);
                } else {
                    updatedLines.push(line);
                }
                keysHandled.add("MONGODB_URI");
            } else if (key === "MONGODB_TEST_URI") {
                if (newVars.MONGODB_TEST_URI) {
                    updatedLines.push(`MONGODB_TEST_URI=${newVars.MONGODB_TEST_URI}`);
                } else {
                    updatedLines.push(line);
                }
                keysHandled.add("MONGODB_TEST_URI");
            } else {
                // Preserve unrelated environment variables untouched
                updatedLines.push(line);
            }
        } else {
            // Preserve comments and empty lines
            updatedLines.push(line);
        }
    }

    if (newVars.MONGODB_URI && !keysHandled.has("MONGODB_URI")) {
        updatedLines.push(`MONGODB_URI=${newVars.MONGODB_URI}`);
    }
    if (newVars.MONGODB_TEST_URI && !keysHandled.has("MONGODB_TEST_URI")) {
        updatedLines.push(`MONGODB_TEST_URI=${newVars.MONGODB_TEST_URI}`);
    }

    fs.writeFileSync(envPath, updatedLines.join("\n"), "utf8");
}

async function setupEnv() {
    console.log("============================================================");
    console.log(" SECURE MONGODB ATLAS .ENV CONFIGURATION TOOL              ");
    console.log("============================================================\n");

    const envPath = path.resolve(__dirname, "../.env");

    let existingAppUri = "";
    let preserveAppUri = false;

    if (fs.existsSync(envPath)) {
        const existingContent = fs.readFileSync(envPath, "utf8");
        const match = existingContent.match(/^MONGODB_URI\s*=\s*(.+)$/m);
        if (match && match[1].trim()) {
            existingAppUri = match[1].trim();
            console.log("Existing MONGODB_URI found in backend/.env.");
            const preserveAnswer = await prompt("Do you want to preserve the existing MONGODB_URI exactly? (Y/n) [Y]: ");
            if (preserveAnswer.toLowerCase() !== "n" && preserveAnswer.toLowerCase() !== "no") {
                preserveAppUri = true;
                console.log("✓ Existing MONGODB_URI will be preserved exactly.\n");
            } else {
                console.log("Existing MONGODB_URI will be reconfigured.\n");
            }
        }
    }

    console.log("Choose configuration method:");
    console.log("  1) Paste Atlas connection URI (mongodb+srv://...)");
    console.log("  2) Enter Cluster hostname, username, and password step-by-step");
    console.log("");

    const choice = await prompt("Select option (1 or 2) [1]: ");

    let protocol = "mongodb+srv:";
    let username = "";
    let password = "";
    let hostname = "";
    let appDb = "internship_management";
    let extraParams = "retryWrites=true&w=majority";

    if (choice === "2") {
        hostname = await prompt("Atlas Cluster Hostname (e.g. cluster0.abcde.mongodb.net): ");
        username = await prompt("Atlas Username: ");
        password = await prompt("Atlas Password (masked): ", true);

        if (!preserveAppUri) {
            const customAppDb = await prompt("Application Database Name [internship_management]: ");
            if (customAppDb) appDb = customAppDb;
        }
    } else {
        const fullUri = await prompt("Paste your MongoDB Atlas connection URI: ", true);
        if (!fullUri) {
            console.error("❌ No URI provided. Exiting.");
            process.exit(1);
        }

        try {
            const parsed = parseMongoUri(fullUri);
            protocol = parsed.protocol;
            username = parsed.username;
            password = parsed.password;
            hostname = parsed.hostname;
            if (parsed.database && !preserveAppUri) {
                appDb = parsed.database;
            }
            if (parsed.search) {
                extraParams = parsed.search.replace(/^\?/, "");
            }
        } catch (e) {
            console.error(`❌ Failed to parse connection string: ${e.message}`);
            process.exit(1);
        }
    }

    if (!hostname || !username || !password) {
        console.error("❌ Missing required Atlas configuration fields.");
        process.exit(1);
    }

    const safeUser = safeEncode(username);
    const safePass = safeEncode(password);

    const queryPart = extraParams ? `?${extraParams}` : "";
    const generatedAppUri = `${protocol}//${safeUser}:${safePass}@${hostname}/${appDb}${queryPart}`;
    const generatedTestUri = `${protocol}//${safeUser}:${safePass}@${hostname}/internship_management_test${queryPart}`;

    const newVars = {
        MONGODB_URI: preserveAppUri ? existingAppUri : generatedAppUri,
        MONGODB_TEST_URI: generatedTestUri
    };

    updateEnvFile(envPath, newVars);

    console.log("\n✓ backend/.env successfully updated!");
    console.log(`✓ Application database configured (${preserveAppUri ? "preserved existing" : `'${appDb}'`}).`);
    console.log("✓ Dedicated test database configured for 'internship_management_test'.");
    console.log("✓ Passwords and special characters safely handled.\n");

    console.log("Running safety verification check...\n");
    require("./verify-test-db");
}

setupEnv().catch((err) => {
    console.error("Setup error:", err.message);
    process.exit(1);
});
