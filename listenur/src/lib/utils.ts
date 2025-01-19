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

export const findById = (objects: any, id: any) => {
    for (let i = 0; i < objects.length; ++i) {
        if (objects[i]._id == id)
            return objects[i];
    }

    return undefined;
};

export const calculateTime = (secs: number) => {

    if (secs === undefined) {
        return undefined;
    }

    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
};
