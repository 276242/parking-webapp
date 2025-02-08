import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AssignParking from "./pages/AssignParking";
import ParkingSpots from "./pages/ParkingSpots";
import NavBar from "./components/NavBar";
import ScanQR from "./pages/ScanQR";

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/assign-parking" element={<AssignParking />} />
        <Route path="/parking-spots" element={<ParkingSpots />} />
        <Route path="/scan-qr" element={<ScanQR />} />
      </Routes>
    </Router>
  );
};

export default App;
