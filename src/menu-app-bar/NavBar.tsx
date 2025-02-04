import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav style={{ padding: "10px", background: "#eee" }}>
      <Link to="/">Home</Link> |{" "}
      <Link to="/scan">Scan QR</Link> |{" "}
      <Link to="/history">Parking History</Link> |{" "}
      <Link to="/login">Login</Link>
    </nav>
  );
};

export default NavBar;
