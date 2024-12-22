import { NextResponse } from "next/server";
import { parseFile } from "music-metadata";
import path from "node:path";
import EventEmitter from "node:events";

// Tracking states
enum State {
    Inactive = "INACTIVE",
    Scanning = "SCANNING",
};

const status: { scanInProgress: boolean; state: State; } = { 
    scanInProgress: false, 
    state: State.Inactive,
};

// Control states
const stateEmitter = new EventEmitter();

// Called when the scan starts
const startScan = () => {
    status.scanInProgress = true;
    changeState(State.Scanning);
};

// Called when the scan finishes (due to error or successful completion)
const stopScan = () => {
    status.scanInProgress = false;
    changeState(State.Inactive);
};

// Updates the state of the status object and notifies any listeners
const changeState = (newState: State) => {
    status.state = newState;
    stateEmitter.emit("stateChange");
}

export const isScanning = () => {
    return status.scanInProgress;
};

export const getScanState = () => {
    return status.state;
};

// Export emitter for listening to changes
export const scanStateChangeEmitter = stateEmitter;

export async function POST() {

    // Reject scan request if scan is already running
    if (isScanning()) {
        return NextResponse.json(
            { message: "Scan already running."},
            { status: 429 },
        );
    }

    startScan();
    getScanState();

    try {
        // Notify API caller that the server action has begun
        const response = NextResponse.json({ message: "Scan started." });

        scanAndUpdateDB().finally(() => {
            stopScan();
        });

        return response;
    } catch (error) {
        console.error("Error in scan process:", error);
        stopScan();
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
        const filePath: any = path.join('src', 'songs', 'test_song.mp3');
        const metadata = await parseFile(filePath);
        // console.log(inspect(metadata, { showHidden: false, depth: null }));

        console.log("Finished scanning.");
    } catch (error) {
        console.error("Error while scanning: ", error);
    }
};