import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="container">
      <h1>Welcome to Parking Spot Finder</h1>
      <p>Find and save your parking spot easily!</p>
      <nav>
        <Link to="/scan">🚗 Scan QR Code</Link>
        <Link to="/history">📜 View Parking History</Link>
      </nav>
    </div>
  );
};

export default Home;