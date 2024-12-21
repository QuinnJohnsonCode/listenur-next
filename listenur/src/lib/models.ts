import mongoose, { Schema } from "mongoose";

const artistSchema: Schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: String,
    }
);

const albumCoverSchema: Schema = new mongoose.Schema(
    {
        data: {
            type: Buffer,
            required: true,
        },
        imageType: {
            type: String,
            required: true,
            enum: ["jpeg", "png", "gif"],
        },
    }
);

const albumSchema: Schema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            index: true,
        },

        cover: {
            type: Schema.Types.ObjectId,
            ref: "AlbumCover",
        },
        artist: {
            type: Schema.Types.ObjectId,
            ref: "Artist",
        }
    }
);

const genreSchema: Schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
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
export const AlbumCover = mongoose.models?.AlbumCover || mongoose.model("AlbumCover", albumCoverSchema);
export const Album = mongoose.models?.Album || mongoose.model("Album", albumSchema);
export const Genre = mongoose.models?.Genre || mongoose.model("Genre", genreSchema);
export const Song = mongoose.models?.Song || mongoose.model("Song", songSchema);

