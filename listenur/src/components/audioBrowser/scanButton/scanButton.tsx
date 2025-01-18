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
  const [isScanning, setIsScanning] = useState(false);

  // Will store the response data in response
  const scanButtonClick = async () => {
    const data = await startScan();
    setResponse(data);
  };

  // Connect to SSE api endpoint
  useEffect(() => {
    const eventSource = new EventSource(
      "http://localhost:3000/api/scan/notify"
    );

    eventSource.onopen = () => {
      console.log("Connected to message server!");
    };

    eventSource.onmessage = (e) => {
      const data = JSON.parse(e.data);

      // Change local state of a scan
      if (data.state == "INACTIVE") {
        setIsScanning(false);
      } else if (data.state == "SCANNING") {
        setIsScanning(true);
      }
    };

    eventSource.onerror = (error) => {
      console.error("SSE error:", error);
      eventSource.close();
    };

    // Fixes interrupt error on FF
    window.onbeforeunload = () => {
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div>
      <button disabled={isScanning} onClick={scanButtonClick}>
        {isScanning ? (
          <MdLoop className="h-6 w-6 animate-spin opacity-50" />
        ) : (
          <MdLoop className="h-6 w-6 hover:text-teal-600 cursor-pointer transition-colors" />
        )}
      </button>
    </div>
  );
};

export default ScanButton;
