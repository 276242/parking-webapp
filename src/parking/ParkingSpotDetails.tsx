import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface ParkingSpot {
  id: number;
  qrCode: string;
  isAvailable: boolean;
  level: string;
  sector: string;
  localization: string;
}

const ParkingSpotDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [spotDetails, setSpotDetails] = useState<ParkingSpot | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get<ParkingSpot>(`http://localhost:8080/api/parking-spots/${id}`);
        setSpotDetails(response.data);
      } catch (error) {
        console.error('Error fetching parking spot details:', error);
      }
    };

    fetchDetails();
  }, [id]);

  if (!spotDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      <h2>Parking Spot Details</h2>
      <p>📌 <strong>QR Code:</strong> {spotDetails.qrCode}</p>
      <p>🟢 <strong>Availability:</strong> {spotDetails.isAvailable ? 'Available' : 'Occupied'}</p>
      <p>🏢 <strong>Level:</strong> {spotDetails.level}</p>
      <p>📍 <strong>Sector:</strong> {spotDetails.sector}</p>
      <p>🗺 <strong>Location:</strong> {spotDetails.localization}</p>
    </div>
  );
};

export default ParkingSpotDetails;
