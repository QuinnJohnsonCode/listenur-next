import { createReadStream, promises, ReadStream } from "node:fs";
import path from "node:path";

/* 
Helpful information about nodejs to nextjs streaming process found here:
    https://www.ericburel.tech/blog/nextjs-stream-files
*/

// Uses await for loop to chunk through a given ReadStream
async function* fileChunkGenerator(readableStream: ReadStream, start: number, end: number) {
    try {
        // Loop through the chunk
        for await (const chunk of readableStream) {
            yield chunk;

            // Adjust start
            start += chunk.length;

            // If we've read the chunk we're looking for, prematurely exit the loop
            if (start > end) break;
        }
    } catch (err) {
        console.log(err);
        throw new Error("Failed to chunk audio file!");
    }
};

// https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream#convert_async_iterator_to_stream
// Bridge between generator (iterator) and stream.
const iteratorToStream = (iterator: any): ReadableStream => {
    return new ReadableStream({
        async pull(controller) {
            // Awaits the next chunk
            const { value, done } = await iterator.next();
            if (done) {
                // If no more chunks, close the stream queue
                controller.close();
            } else {
                // Add chunk to the stream queue
                controller.enqueue(value);
            }
        },
    });
};

// Returns the ready to use stream for responses.
const streamFile = (filePath: string, start: number, end: number): ReadableStream => {
    // Create a read stream from the filePath and seek to the start byte
    const readableStream = createReadStream(filePath, {start: start});

    // Get the data stream from the converted generator stream
    const data: ReadableStream = iteratorToStream(
        fileChunkGenerator(
            readableStream,
            start,
            end
        )
    );

    return data;
};

// Used to serve any HTTP GET requests to /api/stream/[id] with
// an audio file matching the id within the database,
// while using the range byte header provided by the request.
export const GET = async (request: any) => {
    const rangeHeader: any = request.headers.get("Range");
    const filePath: any = path.join('src', 'songs', 'test_song.mp3');

    let stats: any;
    // Check to see if the file exists
    // Get the stats if so, return 404 not found otherwise
    try {
        stats = await promises.stat(filePath);
    } catch (err) {
        return new Response("File not found.", {
            status: 404,
        })
    }

    // Get the size of the file provided in bytes
    const size: number = stats.size;

    let start, end;
    // Get start/end bytes
    if (rangeHeader) {
        // Extract start/end from the range header at -
        [start, end] = rangeHeader.replace(/bytes=/, "").split("-");

        // Convert start/end to int
        start = parseInt(start, 10);
        end = end ? parseInt(end, 10) : size - 1;
    } else {
        // No range header exists, thus not partial content, but full stream
        start = 0;
        end = size - 1;
    }

    // Handle invalid range header
    if (start >= size || start > end || end >= size) {
        return new Response("Requested Range Not Satisfiable", {
            status: 416,
        });
    }

    // Get the stream
    const stream: ReadableStream = streamFile(filePath, start, end);


    // Return the response
    return new Response(stream, {
        status: 206,
        headers: new Headers({
            "Content-Disposition": `inline; filename=${path.basename(filePath)}`,
            "Cache-Control": "no-store",
            "Content-Length": `${end - start + 1}`,
            "Accept-Ranges": "bytes",
            "Content-Range": `bytes ${start}-${end}/${size}`,
        })
    });
};