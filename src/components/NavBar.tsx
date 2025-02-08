import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <nav style={styles.navbar}>
      <h1 style={styles.title}>Parking Spot Finder</h1>
      <div style={styles.navLinks}>
        <Link to="/parking-spots" style={styles.link}>View Parking Spots</Link>
        <Link to="/assign-parking" style={styles.link}>Assign Parking</Link>
        <Link to="/scan-qr" style={styles.link}>Scan QR Code</Link>
        {token ? (
          <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
        ) : (
          <Link to="/login" style={styles.link}>Login</Link>
        )}
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "black",
    padding: "15px",
  },
  title: {
    color: "white",
    fontSize: "20px",
    fontWeight: "bold",
  },
  navLinks: {
    display: "flex",
    gap: "15px",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "16px",
  },
  logoutButton: {
    backgroundColor: "red",
    color: "white",
    border: "none",
    padding: "8px 12px",
    cursor: "pointer",
  },
};

export default NavBar;
