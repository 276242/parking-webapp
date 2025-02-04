import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth-form/AuthContext";
import { useApi } from "../api/ApiProvider";
import { getAvailability } from "./FirebaseService";
import MapComponent from "./MapComponent";

const ParkingDetails = () => {
  const { parkingSpotId } = useParams();
  const { user } = useContext(AuthContext)!;
  const navigate = useNavigate();
  const apiClient = useApi();

  const [spot, setSpot] = useState<any>(null);
  const [availability, setAvailability] = useState<boolean | null>(null);

  useEffect(() => {
    if (!user) {
      navigate(`/login?redirect=/details/${parkingSpotId}`);
    } else {
      apiClient.getParkingSpot(parkingSpotId!).then(setSpot);
      getAvailability(parkingSpotId!, setAvailability);
    }
  }, [parkingSpotId, user, navigate, apiClient]);

  const handleConfirm = async () => {
    try {
      await apiClient.confirmParking(parkingSpotId!);
      alert("Parking confirmed!");
    } catch (error) {
      console.error("Error confirming parking:", error);
      alert("Failed to confirm parking.");
    }
  };
  

  if (!spot) return <p>Loading...</p>;

  return (
    <div>
      <h2>Parking Spot Details</h2>
      <p><strong>Location:</strong> {spot.location}</p>
      <p><strong>Level:</strong> {spot.level}</p>
      <p><strong>Number:</strong> {spot.number}</p>
      <p><strong>Availability:</strong> {availability ? "Available" : "Occupied"}</p>
      <MapComponent latitude={spot.latitude} longitude={spot.longitude} />
      <button onClick={handleConfirm}>Confirm Parking</button>
    </div>
  );
};

export default ParkingDetails;
