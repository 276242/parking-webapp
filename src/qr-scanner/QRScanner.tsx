import { useState } from "react";
import { QrReader } from "react-qr-reader";
import { useNavigate } from "react-router-dom";

const QRScanner = () => {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleResult = (result: any, error: any) => {
    if (result?.text) {
      setScanResult(result.text);
      const match = result.text.match(/\/details\/(\d+)$/);
      if (match) {
        navigate(`/details/${match[1]}`);
      } else {
        alert("Invalid QR Code. Please scan a valid parking spot QR code.");
      }
    }

    if (error) {
      console.error("QR Scanner Error:", error);
    }
  };

  return (
    <div>
      <h2>Scan Parking Spot QR Code</h2>
      <div style={{ width: "100%" }}>
        <QrReader
          onResult={handleResult}
          constraints={{ facingMode: "environment" }}
        />
      </div>
      {scanResult && <p>Scanned QR Code: {scanResult}</p>}
    </div>
  );
};

export default QRScanner;

