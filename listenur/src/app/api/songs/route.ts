import { Song } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

// Route will return all Songs, no albums
export const GET = async (req: any) => {
  // Get query parameters
  const { searchParams } = new URL(req.url);
  const offset = searchParams.get("offset") || "0";
  const limit = searchParams.get("limit") || "20";
  const filter = searchParams.get("filter") || "none";
  const order = searchParams.get("order") || "asc";

  try {
    await connectToDb();

    const sortOrder = order === "asc" ? 1 : -1;

    // const songs = await Song.find(query)
    //   .populate("artist", "name")
    //   .populate("album")
    //   .populate("genre", "name")
    //   .sort({ title: -1, _id: 1 })
    //   .skip(Number(offset))
    //   .limit(Number(limit));

    const query: any = filter !== "none" ? { [filter]: { $exists: true } } : {};

    let sort: { [key: string]: 1 | -1 } = {};
    if (filter === "duration") {
      sort = { duration: sortOrder, _id: 1 };
    } else if (filter === "title") {
      sort = { title: sortOrder, _id: 1 };
    } else if (filter === "albumTitle") {
      sort = { albumTitle: sortOrder, _id: 1 };
    } else {
      sort = { _id: 1 }; // Default sort by _id if no specific filter is provided
    }

    const songs = await Song.find(query)
      .populate("artist", "name")
      .populate("album", "title coverPath")
      .populate("genre", "name")
      .sort(sort as any)
      .skip(Number(offset))
      .limit(Number(limit));

    return NextResponse.json(songs);
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch songs!");
  }
};
