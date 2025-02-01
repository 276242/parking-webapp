import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './home/Home';
import QRScanner from './qrscanner/QRScanner';
import ParkingSpotDetails from './parking/ParkingSpotDetails';
import ParkingHistory from './parking/ParkingHistory';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scan" element={<QRScanner />} />
          <Route path="/details/:id" element={<ParkingSpotDetails />} />
          <Route path="/history" element={<ParkingHistory />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
