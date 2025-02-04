import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Clock, Scan, LogIn } from 'lucide-react';
import { Box, Grid, Paper, Typography } from '@mui/material';
const parkingImage = require('../assets/parking2.jpeg');

const MenuPage = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="flex-start"
      minHeight="100vh"
      bgcolor="rgba(0, 0, 0, 0.9)"
      p={4}
      pt={2}
    >
      <Box textAlign="center" mb={4}>
        <Typography variant="h4" fontWeight="bold" color="white" fontSize="4rem">
          Welcome!
        </Typography>
        <Typography variant="body1" color="gray" fontSize="2rem">
          Find your perfect parking spot easily.
        </Typography>
      </Box>

      <Box
        component="img"
        src={parkingImage}
        alt="Parking Spot"
        sx={{
          width: '100%',
          maxWidth: '600px',
          borderRadius: '15px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)',
          objectFit: 'cover',
          mb: 4,
        }}
      />

      <Box display="flex" justifyContent="center" gap={4}>

        <Link to="/history" style={{ textDecoration: 'none' }}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              textAlign: 'center',
              borderRadius: 3,
              bgcolor: 'white',
              '&:hover': { bgcolor: '#ddd' },
              minWidth: '120px',
            }}
          >
            <Clock size={40} color="black" />
            <Typography variant="h6" fontWeight="bold" color="black">
              History
            </Typography>
          </Paper>
        </Link>

        <Link to="/scan" style={{ textDecoration: 'none' }}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              textAlign: 'center',
              borderRadius: 3,
              bgcolor: 'white',
              '&:hover': { bgcolor: '#ddd' },
              minWidth: '120px',
            }}
          >
            <Scan size={40} color="black" />
            <Typography variant="h6" fontWeight="bold" color="black">
              Scan QR
            </Typography>
          </Paper>
        </Link>

        <Link to="/login" style={{ textDecoration: 'none' }}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              textAlign: 'center',
              borderRadius: 3,
              bgcolor: 'white',
              '&:hover': { bgcolor: '#ddd' },
              minWidth: '120px',
            }}
          >
            <LogIn size={40} color="black" />
            <Typography variant="h6" fontWeight="bold" color="black">
              Login
            </Typography>
          </Paper>
        </Link>
      </Box>
    </Box>
  );
};

export default MenuPage;