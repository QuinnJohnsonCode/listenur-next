import { NextResponse } from "next/server";
import { connectToDb } from "@/lib/utils";
import { constructAlbumObj, constructArtistObj, constructGenreObj, constructSongObj } from "@/lib/constructors";
import { Song, Genre, Album, Artist } from "@/lib/models";

import {uint8ArrayToBase64} from 'uint8array-extras';
import EventEmitter from "node:events";
import path from "node:path";
import { inspect } from 'util';

// Ignores for missing type-declarations (could manually declare in future)
// @ts-ignore
import Walk from "@root/walk";
// @ts-ignore
import { parseFile } from "music-metadata";

/* Simple JSON object declarations for document insertion */

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

async function walkDirectories(err: any, pathname: any, dirent: any, localPaths: any) {
    if (err) {
        return false;
    }

    // Add to this list to increase acceptable extensions
    const fileExtensions = new Set(["mp3", "flac", "wav", "ogg"]);

    // Check valid path extension
    const pathExtension = pathname.split(".").slice(-1)[0];
    if (fileExtensions.has(pathExtension)) {
        localPaths.add(pathname);
    }
};

// Adds all paths in paths to the DB
// Extracts metadata and creates documents for each path
async function addToDB(paths: Set<string>) {
    try {
        await connectToDb();
        const batchSongs = [];
        for (const path of paths) {
            try {
                const metadata = await parseFile(path, { duration: true });
                
                // Create or find a Genre
                const genreObj = constructGenreObj(metadata);
                let genre = await Genre.findOne(genreObj);
                if (!genre) {
                    genre = new Genre(genreObj);
                    await genre.save();
                }

                // Create or find an Artist
                const artistObj = constructArtistObj(metadata);
                let artist = await Artist.findOne(artistObj);
                if (!artist) {
                    artist = new Artist(artistObj);
                    await artist.save();
                }
                
                // Create or find an Album
                let album = await Album.findOne({ title: metadata.common.album });
                if (!album) {
                    const albumObj = constructAlbumObj(metadata);
                    album = new Album(albumObj);
                    await album.save();
                }
                
                // Construct new song with matching ids
                const songObj = constructSongObj(path, metadata, album._id, artist._id, genre._id);

                // Push the new song to be batched
                batchSongs.push(songObj);
            } catch (error) {
                console.error("Error:", error);
                console.error(`Failed to add ${path} to DB!`);
            }
        }

        // Insert the batched songs added to the list
        if (batchSongs.length > 0)
            Song.collection.insertMany(batchSongs);

    } catch (error) {
        console.error("Failed to connect to DB!");
    };
};

// Removes all paths in paths from the DB
async function removeFromDB(paths: Set<string>) {
    try {
        await connectToDb();
        for (const path of paths) {
            try {
                const song = await Song.findOneAndDelete({ path: path });
                song.save();
            } catch (error) {
                console.error(`Failed to remove ${path} from DB!`);
            }
        }
    } catch (error) {
        console.error("Failed to connect to DB!");
    };
};

// Scans the /songs/ directory and attempts to extract the metadata from audio files.
// Once extracted, it will attempt to write the new documents to mongodb.
async function scanAndUpdateDB() {
    try {

        // Collect local directory paths
        const localPaths: Set<string> = new Set(); // Set to ignore duplicate paths
        await Walk.walk(path.join("src", "songs"), (err: any, pathname: any, dirent: any) => 
            walkDirectories(err, pathname, dirent, localPaths)
        );

        // Get DB paths to quickly filter paths to add and remove
        let dbSongs;
        let dbAlbum;
        try {
            await connectToDb();
            dbSongs = await Song.find(); // Fetch all songs
            dbAlbum = await Album.findOne({title: "Smash"});
        } catch (error) {
            console.error("Failed to fetch songs!");
            return;
        };

        // Construct a set of paths from the db
        const dbPaths: Set<string> = new Set(dbSongs?.map(song => song.path));



        // Use set operations to determine 3 possibilities:
        // 1. If the path is in both dbPaths and localPaths: ignore path
        // 2. If the path is only in dbPaths: remove path from db (difference: db - local)
        // 3. If the path is only in localPaths: add path to db (difference: local - db)
        const pathsToAdd: Set<string> = new Set([...localPaths].filter(x => !dbPaths.has(x)));
        const pathsToRemove: Set<string> = new Set([...dbPaths].filter(x => !localPaths.has(x)));

        // Add paths to db
        await addToDB(pathsToAdd);

        // Remove paths from db
        await removeFromDB(pathsToRemove);

        console.log("Finished scanning.");
    } catch (error) {
        console.error("Error while scanning: ", error);
    };
};