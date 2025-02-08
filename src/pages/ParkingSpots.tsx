import React, { useEffect, useState } from "react";
import { getAllParkingSpots, assignParkingSpot, unassignParkingSpot, releaseParkingSpot } from "../services/parkingSpotService";

const ParkingSpots: React.FC = () => {
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
    <div>
      <h2>Parking Spots</h2>
      {message && <p style={{ color: "red" }}>{message}</p>}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "10px" }}>
        {spots.map((spot) => (
          <div key={spot.id || spot.spotId}
            style={{
              padding: "5px",
              border: "1px solid black",
              backgroundColor: spot.isAvailable ? "green" : "red",
              color: "white",
              textAlign: "center",
              fontSize: "12px",
            }}
          >
            <p>Spot: {spot.spotNumber}</p>
            <p>Level: {spot.level}</p>
            <p>Sector: {spot.sector}</p>
            <p>{spot.isAvailable ? "Available" : `Reserved by User ${spot.reservedBy}`}</p>

            {spot.isAvailable && <button onClick={() => handleAssign(spot.id)}>Assign</button>}

            {!spot.isAvailable && spot.reservedBy == userId && (
              <button onClick={() => handleUnassign(spot.id)}>Unassign</button>
            )}

            {!spot.isAvailable && token && <button onClick={() => handleRelease(spot.id)}>Release (Admin)</button>}

          </div>
        ))}
      </div>
    </div>
  );
};

export default ParkingSpots;
