const mongoose = require("mongoose");
const dns = require("dns");

// Use reliable public DNS in local development to prevent querySrv ECONNREFUSED on restrictive Wi-Fi routers
if (process.env.NODE_ENV !== "production") {
    dns.setServers(["8.8.8.8", "1.1.1.1"]);
}

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI);

        console.log("MongoDB connected successfully!");
        console.log(`Host: ${connection.connection.host}`);
    } catch (error) {
        console.error("MongoDB connection failed!");
        console.error(error.message);
        process.exit(1);
    }
};

module.exports = connectDB;