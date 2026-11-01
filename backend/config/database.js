const mongoose = require("mongoose");

const connectDB = async (customUri) => {
    const uri = customUri || process.env.MONGODB_URI;

    if (!uri) {
        const message = "MONGODB_URI is not defined in environment variables.";
        if (process.env.NODE_ENV === "test") {
            throw new Error(message);
        }
        console.error("MongoDB connection failed!");
        console.error(message);
        process.exit(1);
    }

    try {
        const connection = await mongoose.connect(uri);

        console.log("MongoDB connected successfully!");
        console.log(`Host: ${connection.connection.host}`);
        return connection;
    } catch (error) {
        console.error("MongoDB connection failed!");
        console.error(error.message);
        if (process.env.NODE_ENV === "test") {
            throw error;
        }
        process.exit(1);
    }
};

module.exports = connectDB;
