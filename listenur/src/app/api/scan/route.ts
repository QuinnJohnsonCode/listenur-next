import { NextResponse } from "next/server";


// Used to track whether a scan has started
let scanInProgress = false;

export async function POST() {

    // Reject scan request if scan is already running
    if (scanInProgress) {
        return NextResponse.json(
            { message: "Scan already running."},
            { status: 429 },
        );
    }

    scanInProgress = true;

    try {
        // Notify API caller that the server action has begun
        const response = NextResponse.json({ message: "Scan started." });

        scanAndUpdateDB().finally(() => {
            scanInProgress = false; // Scan finished.
        });

        return response;
    } catch (error) {
        console.error("Error in scan process:", error);
        scanInProgress = false; // Scan not begun
        return NextResponse.json(
            { message: "An error occurred beginning a scan." },
            { status: 500 },
        );  
    }
};

// Scans the /songs/ directory and attempts to extract the metadata from audio files.
// Once extracted, it will attempt to write the new documents to mongodb.
async function scanAndUpdateDB() {
    try {
        console.log("Finished scanning.");
    } catch (error) {
        console.error("Error while scanning: ", error);
    }
};