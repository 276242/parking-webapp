import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Html5QrcodeScanner } from "html5-qrcode";
import {
  fetchParkingSpotDetails,
  assignParkingByQR,
} from "../services/parkingSpotService";
import {
  Box,
  Button,
  Modal,
  Typography,
  TextField,
  Container,
  Card,
} from "@mui/material";

const ScanQR: React.FC = () => {
  const [qrCode, setQrCode] = useState("");
  const [error, setError] = useState("");
  const [spotDetails, setSpotDetails] = useState<any>(null);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  let scannerInstance: Html5QrcodeScanner | null = null; 

  useEffect(() => {
    scannerInstance = new Html5QrcodeScanner(
      "qr-reader",
      { fps: 10, qrbox: 250 },
      false
    );

    scannerInstance.render(
      (decodedText: string) => {
        handleSpotDetails(decodedText);
        scannerInstance?.clear();
        scannerInstance = null;
      },
      (scanError) => {
        console.error("QR Scanner Error:", scanError);
      }
    );

    return () => {
      if (scannerInstance) {
        scannerInstance
          .clear()
          .catch((err) => console.error("Error clearing scanner: ", err));
        scannerInstance = null;
      }
    };
  }, []);

  const handleSpotDetails = async (qrCode: string) => {
    try {
      const details = await fetchParkingSpotDetails(qrCode);
      setSpotDetails(details);
      setQrCode(qrCode);
      setOpenModal(true);
    } catch (err) {
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
      navigate("/parking-grid");
      setOpenModal(false);
    } catch (err) {
      setError("Failed to assign parking spot.");
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5, textAlign: "center" }}>
      <Card sx={{ p: 3, boxShadow: 3, borderRadius: 3 }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
          Scan Your Parking Spot
        </Typography>
        <Box
          id="qr-reader"
          sx={{
            width: "100%",
            height: "300px",
            margin: "0 auto",
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: 2,
            backgroundColor: "#f9f9f9",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        ></Box>
        <Typography variant="body2" sx={{ mt: 2, color: "#555" }}>
          Point your camera at the QR code or enter it manually below.
        </Typography>
        <TextField
          label="Enter QR Code (e.g., QR1)"
          variant="outlined"
          fullWidth
          value={qrCode}
          onChange={(e) => setQrCode(e.target.value.toUpperCase())}
          sx={{ mt: 3, mb: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleManualEntry}
          sx={{
            backgroundColor: "#000",
            color: "#fff",
            "&:hover": { backgroundColor: "#333" },
          }}
        >
          Confirm
        </Button>
        {error && (
          <Typography sx={{ color: "red", mt: 2, fontWeight: "bold" }}>
            {error}
          </Typography>
        )}
      </Card>

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
            width: "80%",
            maxWidth: 400,
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
              <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleConfirm}
                  sx={{
                    backgroundColor: "#000",
                    "&:hover": { backgroundColor: "#333" },
                  }}
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
    </Container>
  );
};

export default ScanQR;