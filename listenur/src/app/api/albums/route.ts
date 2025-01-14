import { Album } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
      connectToDb();

      const albums = await Album.find({});
      return NextResponse.json(albums);
    } catch (err) {
      console.log(err);
      throw new Error("Failed to fetch albums!");
    }
};