"use client";
import { MdLoop } from "react-icons/md";
import { useEffect, useState } from "react";

const startScan = async () => {
    // Request a scan from server
    const res = await fetch("http://localhost:3000/api/scan", { method: "POST" });

    if (!res.ok) {
        // Log to the client the error
        const responseData = await res.json();
        console.error(responseData.message);
        
        // Throw error
        throw new Error("Scan failed.");
    }

    return res.json();
};

const ScanButton = () => {
    const [response, setResponse] = useState(null);

    // Will store the response data in response
    const scanButtonClick = async () => {
        const data = await startScan();
        setResponse(data);
    };
    
    // Connect to SSE api endpoint
    useEffect(() => {
        const eventSource = new EventSource("http://localhost:3000/api/scan/notify");

        eventSource.onmessage = (e) => {
            const data = JSON.parse(e.data);
            console.log(data);
        };
    
        eventSource.onerror = (error) => {
            console.error("SSE error:", error);
            eventSource.close();
        };

        return () => {
            eventSource.close();
        }; 
    }, [])

    return (
        <div>
            <button onClick={scanButtonClick}>
                <MdLoop className="h-6 w-6 hover:text-teal-600 cursor-pointer transition-colors" />
            </button>
        </div>
    );
};

export default ScanButton;