import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../auth-form/AuthContext";
import { useApi } from "../api/ApiProvider"; 
import MapComponent from "../parking-details/MapComponent";

const ParkingHistory = () => {
  const { user } = useContext(AuthContext)!;
  const apiClient = useApi();
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      apiClient.getParkingHistory().then(setHistory);
    }
  }, [user, apiClient]);

  return (
    <div>
      <h2>Parking History</h2>
      {history.length === 0 ? (
        <p>No parking history available.</p>
      ) : (
        history.map((entry) => (
          <div key={entry.id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
            <p><strong>Location:</strong> {entry.location}</p>
            <p><strong>Level:</strong> {entry.level}</p>
            <p><strong>Number:</strong> {entry.number}</p>
            <p><strong>Parked On:</strong> {new Date(entry.timestamp).toLocaleString()}</p>
            <MapComponent latitude={entry.latitude} longitude={entry.longitude} />
          </div>
        ))
      )}
    </div>
  );
};

export default ParkingHistory;
