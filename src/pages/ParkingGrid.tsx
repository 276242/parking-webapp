import React, { useEffect, useState } from "react";
import { getAllParkingSpots, unassignParkingSpot } from "../services/parkingSpotService";

const ParkingGrid: React.FC = () => {
  const [spots, setSpots] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchSpots();
  }, []);

  const fetchSpots = async () => {
    try {
      const data = await getAllParkingSpots();
      setSpots(data);
    } catch (err: any) {
      setMessage("Failed to load parking spots.");
    }
  };

  const handleUnassign = async (spotId: number) => {
    try {
      if (!userId) {
        setMessage("You need to log in to unassign a spot.");
        return;
      }
      await unassignParkingSpot(spotId, Number(userId));
      fetchSpots();
    } catch (err: any) {
      setMessage(err.message || "Failed to unassign parking spot.");
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Parking Grid</h2>
      {message && <p style={{ color: "red", textAlign: "center" }}>{message}</p>}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(10, 1fr)",
          gap: "20px",
          padding: "20px",
        }}
      >
        {spots.map((spot) => (
          <div
            key={spot.id}
            style={{
              backgroundColor: "#d3d3d3",
              width: "80px",
              height: "120px",
              borderRadius: "5px",
              padding: "20px",
              textAlign: "center",
              position: "relative",
              fontSize: "16px",
            }}
          >
            <p style={{ margin: 0, fontWeight: "bold" }}>{spot.spotNumber}</p>
            <div
              style={{
                width: "10px",
                height: "10px",
                backgroundColor: spot.isAvailable ? "green" : "red",
                borderRadius: "50%",
                position: "absolute",
                bottom: "10px",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            ></div>
              {!spot.isAvailable && spot.reservedBy == userId && (
                <button
                  onClick={() => handleUnassign(spot.id)}
                  style={{
                    marginTop: "10px",
                    backgroundColor: "orange",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    padding: "5px 10px",
                    cursor: "pointer",
                  }}
                >
                  Unassign
                </button>
              )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParkingGrid;
