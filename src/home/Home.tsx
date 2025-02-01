import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="container">
      <h1>🚗 Parking Spot Finder</h1>
      <p>Find and save your parking spot easily with QR scanning!</p>

      {/* Hero Section */}
      <div className="hero">
        <img
          src="/parking2.jpeg"
          alt="Parking Lot"
          style={{ width: '100%', borderRadius: '10px', marginBottom: '15px' }}
        />
      </div>

      <nav>
        <Link to="/scan">📸 Scan QR Code</Link>
        <Link to="/history">📜 Parking History</Link>
      </nav>

      <button>
        <Link to="/scan" style={{ color: 'white', textDecoration: 'none' }}>Scan Now</Link>
      </button>
    </div>
  );
};

export default Home;
