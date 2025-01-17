import { Song } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

// Route will return relevant album information with corresponding songs
export const GET = async () => {
    try {
      connectToDb();
      
      const songs = await Song.find({}).populate("artist", "name").populate("album", "name").populate("genre", "name");
      return NextResponse.json(songs);
    } catch (err) {
      console.log(err);
      throw new Error("Failed to fetch songs!");
    }
};