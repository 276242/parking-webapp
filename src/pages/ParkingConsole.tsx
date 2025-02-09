import React, { useEffect, useState } from "react";
import { getAllParkingSpots, assignParkingSpot, unassignParkingSpot, releaseParkingSpot } from "../services/parkingSpotService";

const ParkingConsole: React.FC = () => {
  const [spots, setSpots] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchSpots();
  }, []);

  const fetchSpots = async () => {
    try {
      console.log("Fetching parking spots...");
      const data = await getAllParkingSpots();
      console.log("Fetched spots:", data);
      setSpots(data);
    } catch (err: any) {
      console.error("Error fetching spots:", err);
      setMessage("Failed to load parking spots.");
    }
  };
  

  const handleAssign = async (spotId: number) => {
    console.log("Assigning spot:", spotId, "to user:", userId);
    if (!userId) {
      setMessage("You need to log in to assign a spot.");
      return;
    }
    try {
      const response = await assignParkingSpot(spotId, Number(userId));
      console.log("Assign response:", response);
      setMessage(`Spot ${spotId} assigned successfully!`);
      fetchSpots();
    } catch (error: any) {
      console.error("Error assigning spot:", error);
      setMessage(error);
    }
  };
  

  const handleUnassign = async (spotId: number) => {
    console.log("Unassigning spot:", spotId, "by user:", userId);
    if (!userId) {
      setMessage("You need to log in to unassign a spot.");
      return;
    }
    try {
      const response = await unassignParkingSpot(spotId, Number(userId));
      console.log("Unassign response:", response); 
      setMessage(`Spot ${spotId} unassigned successfully!`);
      fetchSpots();
    } catch (error: any) {
      console.error("Error unassigning spot:", error);
      setMessage(error);
    }
  };
  

  const handleRelease = async (spotId: number) => {
    if (!token) {
      setMessage("You need to log in as an admin to release a spot.");
      return;
    }
    try {
      await releaseParkingSpot(spotId);
      setMessage("Spot released successfully!");
      fetchSpots();
    } catch (error: any) {
      setMessage(error);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
  <h2 style={{ textAlign: "center", marginBottom: "20px", fontSize: "24px", color: "#333" }}>
    Parking Spots
  </h2>
  {message && (
    <p style={{ color: "red", textAlign: "center", marginBottom: "20px" }}>{message}</p>
  )}
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "20px",
    }}
  >
    {spots.map((spot) => (
      <div
        key={spot.id || spot.spotId}
        style={{
          padding: "15px",
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          backgroundColor: spot.isAvailable ? "#e8f5e9" : "#ffebee",
          textAlign: "center",
          fontSize: "14px",
        }}
      >
        <p style={{ fontWeight: "bold", marginBottom: "10px" }}>Spot: {spot.spotNumber}</p>
        <p>Level: {spot.level}</p>
        <p>Sector: {spot.sector}</p>
        <p style={{ fontSize: "14px", color: spot.isAvailable ? "#388e3c" : "#d32f2f" }}>
          {spot.isAvailable ? "Available" : `Reserved by User ${spot.reservedBy}`}
        </p>

        <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "10px" }}>
          {spot.isAvailable && (
            <button
              onClick={() => handleAssign(spot.id)}
              style={{
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              Assign
            </button>
          )}
          {!spot.isAvailable && spot.reservedBy == userId && (
            <button
              onClick={() => handleUnassign(spot.id)}
              style={{
                backgroundColor: "#ffc107",
                color: "black",
                border: "none",
                padding: "10px 20px",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              Unassign
            </button>
          )}
          {!spot.isAvailable && token && (
            <button
              onClick={() => handleRelease(spot.id)}
              style={{
                backgroundColor: "#d32f2f",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              Release (Admin)
            </button>
          )}
        </div>
      </div>
    ))}
  </div>
</div>
  );
};

export default ParkingConsole;
