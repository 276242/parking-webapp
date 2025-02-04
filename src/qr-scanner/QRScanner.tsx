import React, { useState } from 'react';
import QrScanner from 'react-qr-scanner';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Paper } from '@mui/material';

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
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="start"
      minHeight="100vh"
      bgcolor="black"
      p={4}
      pt={8}
    >
      <Typography
        variant="h3"
        fontWeight="bold"
        color="white"
        mb={2}
        textAlign="center"
      >
        Scan QR Code
      </Typography>
      <Typography
        variant="body1"
        color="gray"
        mb={4}
        textAlign="center"
      >
        Align the QR code within the scanner to fetch details.
      </Typography>

      <Paper
        elevation={3}
        sx={{
          p: 2,
          bgcolor: 'white',
          borderRadius: '12px',
          width: '90%',
          maxWidth: '400px',
        }}
      >
        <QrScanner
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{
            width: '100%',
            height: 'auto',
            borderRadius: '12px',
          }}
        />
      </Paper>

      {scanResult && (
        <Box mt={4} textAlign="center">
          <Typography
            variant="h6"
            fontWeight="bold"
            color="white"
          >
            Scanned Data:
          </Typography>
          <Typography
            variant="body1"
            color="gray"
            sx={{ wordBreak: 'break-word' }}
          >
            {scanResult}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default QRScanner;
