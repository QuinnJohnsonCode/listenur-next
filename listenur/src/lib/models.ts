import mongoose, { Schema } from "mongoose";

const artistSchema: Schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
    }
);

const albumSchema: Schema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },

        data: {
            type: String,
        },
        
        imageType: {
            type: String,
        },
    }
);

const genreSchema: Schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
    }
);

const songSchema: Schema = new mongoose.Schema(
    {
        path: {
            type: String,
            required: true,
            unique: true,
        },
        title: {
            type: String,
            default: "Unknown Title",
        },
        duration: {
            type: Number,
            min: 0,
        },
        yearReleased: {
            type: Number,
            min: 1700,
        },
        trackNumber: {
            type: Number,
            min: 1,
        },

        album: {
            type: Schema.Types.ObjectId,
            ref: "Album",
            index: true,
        },
        artist: {
            type: Schema.Types.ObjectId,
            ref: "Artist",
            index: true,
        },
        genre: {
            type: Schema.Types.ObjectId,
            ref: "Genre",
            index: true,
        },
    },
    { timestamps: true }
);

export const Artist = mongoose.models?.Artist || mongoose.model("Artist", artistSchema);
export const Album = mongoose.models?.Album || mongoose.model("Album", albumSchema);
export const Genre = mongoose.models?.Genre || mongoose.model("Genre", genreSchema);
export const Song = mongoose.models?.Song || mongoose.model("Song", songSchema);

