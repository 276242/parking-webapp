import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ApiProvider from './api/ApiProvider';
import { AuthProvider } from './auth-form/AuthContext';
import NavBar from './menu-app-bar/NavBar';
import LoginForm from './auth-form/LoginForm';
import ParkingHistory from './parking-history/ParkingHistory';
import ParkingDetails from './parking-details/ParkingDetails';
import QRScanner from './qr-scanner/QRScanner';


function App() {
  return (
    <ApiProvider>
      <AuthProvider>
          <NavBar />
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/history" element={<ParkingHistory />} />
            <Route path="/details/:spotId" element={<ParkingDetails />} />
            <Route path="/scan" element={<QRScanner />} />
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="*" element={<h1>404 - Page Not Found</h1>} />
          </Routes>
      </AuthProvider>
    </ApiProvider>
  );
}

export default App;