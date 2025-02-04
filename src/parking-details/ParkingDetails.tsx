import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ParkingClient } from '../api/ParkingClient';
import { updateAvailability, getAvailability } from '../firebase';
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
    if (!spotId) {
      console.error("Spot ID is missing");
      return;
    }

    const fetchParkingDetails = async () => {
      try {
        const parkingClient = new ParkingClient();
        const response = await parkingClient.getParkingSpot(spotId);
        setDetails(response);

        await getAvailability(spotId, (status) => {
          setDetails((prevDetails) => {
            return prevDetails ? { ...prevDetails, available: status } : null;
          });
        });
      } catch (error) {
        console.error("Error fetching parking details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchParkingDetails();
  }, [spotId]);

  const markAsOccupied = async (spotId: string) => {
    if (!spotId) {
      console.error("Spot ID is missing");
      return;
    }

    try {
      await updateAvailability(spotId, false);

      setDetails((prevDetails) => {
        if (prevDetails) {
          return { ...prevDetails, available: false };
        }
        return prevDetails;
      });
    } catch (error) {
      console.error("Error marking parking spot as occupied:", error);
    }
  };

  const markAsAvailable = async (spotId: string) => {
    if (!spotId) {
      console.error("Spot ID is missing");
      return;
    }

    try {
      await updateAvailability(spotId, true);

      setDetails((prevDetails) => {
        if (prevDetails) {
          return { ...prevDetails, available: true };
        }
        return prevDetails;
      });
    } catch (error) {
      console.error("Error marking parking spot as available:", error);
    }
  };

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
        {details.available ? (
          <span className="available">Available</span>
        ) : (
          <span className="unavailable">Occupied</span>
        )}
      </p>
      <button
        onClick={() => {
          if (spotId) {
        markAsOccupied(spotId);
        window.history.pushState({}, '', `/api/parkingspots/${spotId}/reserve`);
          }
        }}
        disabled={!details.available}
      >
        Mark as Occupied
      </button>
      
      <button
        onClick={() => {
          if (spotId) {
        markAsAvailable(spotId);
        window.history.pushState({}, '', `/api/parkingspots/${spotId}/release`);
          }
        }}
        disabled={details.available}
      >
        Mark as Available
      </button>
    </div>
  );
};

export default ParkingDetails;
