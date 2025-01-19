import { Song } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

// Route will return all Songs, no albums
export const GET = async (req: any) => {
  // Get query parameters
  const { searchParams } = new URL(req.url);
  const offset = searchParams.get("offset") || '0';
  const limit = searchParams.get("limit") || '10';

  try {
    connectToDb();
    
    const songs = await Song.find({}).populate("artist", "name").populate("album").populate("genre", "name");
    return NextResponse.json(songs.slice(Number(offset), Number(limit) + Number(offset)));
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch songs!");
  }
};