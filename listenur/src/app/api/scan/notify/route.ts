import { NextRequest, NextResponse } from "next/server";
import { getScanState, scanStateChangeEmitter } from "../route";

// Link to resource used for SSE implementation in nextjs
// https://dev.to/brinobruno/real-time-web-communication-longshort-polling-websockets-and-sse-explained-nextjs-code-1l43

export async function GET(req: NextRequest, res: NextResponse) {
    const responseStream = new TransformStream();
    const writer = responseStream.writable.getWriter();
    const encoder = new TextEncoder();

    // Tracks if the connection is closed
    let closed = false;
    const closeWriter = () => {
        closed = true;
        writer.close();
    };

    // Send global status of scan
    const sendScanStatus = () => {
        if (!closed) {
            const state = getScanState();
            writer.write(
                encoder.encode(`data: ${JSON.stringify({state: state})}\n\n`)
            );
        }
    };

    // Send initial state
    sendScanStatus();
    console.log("Connected client!");

    // Handle state changes
    scanStateChangeEmitter.on("stateChange", sendScanStatus);

    // Handle client disconnection
    req.signal.addEventListener("abort", () => {
        console.log("Client disconnected.");
        closeWriter();
    });

    // Return SSE response
    return new Response(responseStream.readable, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            Connection: "keep-alive",
            "X-Accel-Buffering": "no",
            "Content-Type": "text/event-stream; charset=utf-8",
            "Cache-Control": "no-cache, no-transform",
            "Content-Encoding": "none",
        },
    });
};