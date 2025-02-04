import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { QrReader } from "react-qr-scanner";

const QRScanner = () => {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleScan = (data: any) => {
    if (data) {
      setScanResult(data.text);
      const match = data.text.match(/\/details\/(\d+)$/);
      if (match) {
        navigate(`/details/${match[1]}`);
      } else {
        alert("Invalid QR Code. Please scan a valid parking spot QR code.");
      }
    }
  };

  const handleError = (error: any) => {
    console.error("QR Scanner Error:", error);
  };

  return (
    <div>
      <h2>Scan Parking Spot QR Code</h2>
      <QrReader
        delay={300}
        constraints={{ facingMode: "environment" }}
        onScan={handleScan}
        onError={handleError}
        style={{ width: "100%" }}
      />
      {scanResult && <p>Scanned QR Code: {scanResult}</p>}
    </div>
  );
};

export default QRScanner;
