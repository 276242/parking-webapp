import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface MapProps {
  latitude: number;
  longitude: number;
}

const MapComponent = ({ latitude, longitude }: MapProps) => {
  return (
    <MapContainer center={[latitude, longitude]} zoom={16} style={{ height: "300px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[latitude, longitude]}>
        <Popup>Parking Spot Location</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
