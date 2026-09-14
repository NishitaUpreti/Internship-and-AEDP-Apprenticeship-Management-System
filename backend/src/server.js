require("dotenv").config();

const connectDB = require("./config/database");

const startServer = async () => {
    await connectDB();
    console.log("Database setup successful!");
};

startServer();