import React, { useState } from 'react';
import QrScanner from 'react-qr-scanner';
import { useNavigate } from 'react-router-dom';

const QRScanner: React.FC = () => {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleScan = (data: string | null) => {
    if (data) {
      setScanResult(data);
      navigate(`/details/${data}`);
    }
  };

  const handleError = (err: any) => {
    console.error(err);
  };

  return (
    <div className="container">
      <h2>📸 Scan QR Code</h2>
      <div className="qr-container">
        <QrScanner
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: '80%', maxWidth: '400px' }}
        />
      </div>
      {scanResult && <p>✅ Scanned: {scanResult}</p>}
    </div>
  );
};

export default QRScanner;
