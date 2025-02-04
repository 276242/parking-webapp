import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ParkingClient } from '../api/ParkingClient';
import './ParkingDetails.css';

interface ParkingSpotDetails {
  id: number;
  level: string;
  sector: string;
  spotNumber: string;
  qrCode: string;
  available: boolean;
}

const ParkingDetails: React.FC = () => {
  const { spotId } = useParams<{ spotId: string }>();
  const [details, setDetails] = useState<ParkingSpotDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParkingDetails = async () => {
      try {
        const parkingClient = new ParkingClient();
        const response = await parkingClient.getParkingSpot(spotId || "");
        setDetails(response);
      } catch (error) {
        console.error("Error fetching parking details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchParkingDetails();
  }, [spotId]);

  if (loading) return <p>Loading parking details...</p>;
  if (!details) return <p>Parking spot not found.</p>;

  return (
    <div className="parking-details-container">
      <h2>Parking Spot Details</h2>
      <p><strong>Level:</strong> {details.level}</p>
      <p><strong>Sector:</strong> {details.sector}</p>
      <p><strong>Spot Number:</strong> {details.spotNumber}</p>
      <p><strong>QR Code:</strong> {details.qrCode}</p>
      <p>
        <strong>Availability:</strong>{' '}
        {details.available ? <span className="available">Available</span> : <span className="unavailable">Occupied</span>}
      </p>
    </div>
  );
};

export default ParkingDetails;
