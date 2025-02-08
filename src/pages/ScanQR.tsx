import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Html5QrcodeScanner } from "html5-qrcode";
import { assignParkingByQR, assignParkingSpot } from "../services/parkingSpotService";

const ScanQR: React.FC = () => {
  const [qrCode, setQrCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      { fps: 70, qrbox: 250 },
      false
    );

    scanner.render(
        (decodedText) => {
          setQrCode(decodedText);
          handleAssign(decodedText);
          scanner.clear();
        },
        (error) => {
          console.error("QR Scanner Error:", error);
        }
      );
  
      const interval = setInterval(() => {
        const dropdowns = document.querySelectorAll(
          "#qr-reader select"
        ) as NodeListOf<HTMLSelectElement>;
        if (dropdowns.length > 1) {
          dropdowns[1]?.remove();
          clearInterval(interval);
        }
      }, 100);
  
      return () => {
        const readerDiv = document.getElementById("qr-reader");
        if (readerDiv) readerDiv.innerHTML = "";
        clearInterval(interval);
      };
    }, []);


  const handleManualEntry = async () => {
    if (!qrCode.startsWith("QR") || qrCode.length < 3) {
      setError("Invalid QR code format. Use format like 'QR1'.");
      return;
    }
    await handleAssign(qrCode);
  };


  const handleAssign = async (spotId: string) => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        postMessage("You need to log in first.");
        return;
      }
      const response = await assignParkingSpot(Number(spotId.replace("QR", "")), Number(userId));
      postMessage(response.message || `Parking spot assigned: ${spotId}`);
      setTimeout(() => navigate("/parking-spots"), 2000);
    } catch (error: any) {
      postMessage(error || "Failed to assign parking spot.");
    }
  };

  return (
    <div>
      <h2>Scan QR Code or Enter Manually</h2>
      <div id="qr-reader" style={{ width: "50%", margin: "0 auto" }}></div>

      <input
        type="text"
        style={{ display: "block", margin: "20px auto" }}
        placeholder="Enter QR Code (e.g., QR1)"
        value={qrCode}
        onChange={(e) => setQrCode(e.target.value.toUpperCase())}
      />
      <button
        onClick={handleManualEntry}
        style={{ display: "block", margin: "20px auto" }}
      >
        Assign Spot
      </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default ScanQR;
