import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import L from "leaflet";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const availableIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
  iconSize: [32, 32],
});

const occupiedIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
  iconSize: [32, 32],
});

interface ParkingSpot {
  id: number;
  qrCode: string;
  isAvailable: boolean;
  level: string;
  sector: string;
  localization: { lat: number; lng: number };
}

const ParkingMap: React.FC = () => {
  const [parkingSpots, setParkingSpots] = useState<ParkingSpot[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/parking-spots")
      .then((response) => {
        setParkingSpots(response.data);
      })
      .catch((error) => {
        console.error("Error fetching parking spots:", error);
      });
  }, []);

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={16}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {parkingSpots.map((spot) => (
        <Marker
          key={spot.id}
          position={[spot.localization.lat, spot.localization.lng]}
          icon={spot.isAvailable ? availableIcon : occupiedIcon}
        >
          <Popup>
            <strong>QR Code:</strong> {spot.qrCode} <br />
            <strong>Availability:</strong>{" "}
            {spot.isAvailable ? "✅ Available" : "❌ Occupied"} <br />
            <strong>Level:</strong> {spot.level} <br />
            <strong>Sector:</strong> {spot.sector} <br />
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default ParkingMap;