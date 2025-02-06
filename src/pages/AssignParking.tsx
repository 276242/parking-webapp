import React, { useState } from "react";
import { assignParkingSpot } from "../services/parkingSpotService";

const AssignParking: React.FC = () => {
  const [spotId, setSpotId] = useState("");
  const [message, setMessage] = useState("");

  const handleAssign = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        setMessage("User not logged in.");
        return;
      }

      const response = await assignParkingSpot(Number(spotId), Number(userId));
      setMessage(response.message || "Spot assigned successfully!");
    } catch (error: any) {
      setMessage(error || "Error assigning spot.");
    }
  };

  return (
    <div>
      <h2>Assign Parking Spot</h2>
      <input
        type="text"
        placeholder="Enter Spot ID"
        value={spotId}
        onChange={(e) => setSpotId(e.target.value)}
      />
      <button onClick={handleAssign}>Assign Spot</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AssignParking;
