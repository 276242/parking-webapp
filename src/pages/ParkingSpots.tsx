import React, { useEffect, useState } from "react";
import { getAllParkingSpots } from "../services/parkingSpotService";

const ParkingSpots: React.FC = () => {
  const [spots, setSpots] = useState<any[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSpots = async () => {
      try {
        const data = await getAllParkingSpots();
        setSpots(data);
      } catch (err: any) {
        setError("Failed to load parking spots.");
      }
    };

    fetchSpots();
  }, []);

  return (
    <div>
      <h2>Parking Spots</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "10px" }}>
        {spots.map((spot) => (
          <div
            key={spot.spotId}
            style={{
              padding: "10px",
              border: "1px solid black",
              backgroundColor: spot.isAvailable ? "green" : "red",
              color: "white",
              textAlign: "center",
            }}
          >
            <p>Spot: {spot.spotNumber}</p>
            <p>Level: {spot.level}</p>
            <p>Sector: {spot.sector}</p>
            <p>{spot.isAvailable ? "Available" : "Reserved"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParkingSpots;
