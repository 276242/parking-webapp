import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import ParkingGrid from "./pages/ParkingGrid";
import NavBar from "./components/NavBar";
import ScanQR from "./pages/ScanQR";
import ParkingConsole from "./pages/ParkingConsole";

const App = () => {
  const role = localStorage.getItem("role");

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        {role === "ROLE_ADMIN" ? (
        <Route path="/parking-console" element={<ParkingConsole />} />
        ) : (
        <Route path="/parking-console" element={<Navigate to="/parking-grid" />} />
        )}
        <Route path="/parking-grid" element={<ParkingGrid />} />
        <Route path="/scan-qr" element={<ScanQR />} />
      </Routes>
    </Router>
  );
};

export default App;
