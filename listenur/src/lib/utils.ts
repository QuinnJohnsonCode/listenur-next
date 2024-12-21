import mongoose from "mongoose";

const connection: { isConnected?: boolean; } = {};

export const connectToDb = async () => {

    // Validate no other connection instances exist
    if (connection.isConnected) {
        console.log("Using existing connection.");
        return;
    }

    // Attempt to read MONGO_URL from .env
    const mongo: string = process.env.MONGO_URL || "";
    if (!mongo) {
        throw new Error("MONGO_URL environment variable is not set (in .env).");
    }


    // Connect to the db
    try {
        const db = await mongoose.connect(mongo);
        connection.isConnected = db.connections[0].readyState !== 0;
    } catch (error: any) {
        console.error("Database connection failed: ", error);
        throw error;
    }
};