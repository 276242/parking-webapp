import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Html5QrcodeScanner } from "html5-qrcode";
import { fetchParkingSpotDetails, assignParkingSpot, assignParkingByQR } from "../services/parkingSpotService";
import { Box, Button, Modal, Typography } from "@mui/material";

const ScanQR: React.FC = () => {
  const [qrCode, setQrCode] = useState("");
  const [error, setError] = useState("");
  const [spotDetails, setSpotDetails] = useState<any>(null);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      { fps: 70, qrbox: 250 },
      false
    );

    scanner.render(
        (decodedText) => {
          handleSpotDetails(decodedText);
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

  const handleSpotDetails = async (qrCode: string) => {
    try {
      const details = await fetchParkingSpotDetails(qrCode);
      setSpotDetails(details);
      setQrCode(qrCode);
      setOpenModal(true);
    } catch (err: any) {
      setError("Failed to fetch parking spot details.");
    }
  };
  
  const handleManualEntry = async () => {
    if (!qrCode.startsWith("QR") || qrCode.length < 3) {
      setError("Invalid QR code format. Use format like 'QR1'.");
      return;
    }
    await handleSpotDetails(qrCode);
  };

  const handleConfirm = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        setError("You need to log in first.");
        return;
      }
      await assignParkingByQR(qrCode, Number(userId));
      alert(`Parking spot assigned: ${qrCode}`);
      navigate("/parking-grid");
      setOpenModal(false);
    } catch (err: any) {
      setError("Failed to assign parking spot.");
    }
  };

  return (
    <div>
      <h2>Scan QR Code</h2>

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
        Confirm
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "white",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          {spotDetails && (
            <>
              <Typography variant="h6" gutterBottom>
                Confirm Parking Spot
              </Typography>
              <Typography>Spot Number: {spotDetails.spotNumber}</Typography>
              <Typography>Level: {spotDetails.level}</Typography>
              <Typography>Sector: {spotDetails.sector}</Typography>
              <Box sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleConfirm}
                  sx={{ mr: 2 }}
                >
                  Confirm
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => setOpenModal(false)}
                >
                  Cancel
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default ScanQR;
