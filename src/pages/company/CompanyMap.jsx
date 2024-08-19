// components/CompanyMap.jsx
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const CompanyMap = ({ mapUrl }) => {
  // Convert the mapUrl to coordinates if necessary
  const center = [51.505, -0.09]; // Default coordinates, replace with your own logic

  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={center}>
        <Popup>A sample marker</Popup>
      </Marker>
    </MapContainer>
  );
};

export default CompanyMap;