import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './AppealsMap.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function AppealsMap({ appeals, onMarkerClick }) {
  if (!appeals || appeals.length === 0) {
    return (
      <div className="map-container">
        <div className="map-placeholder">
          Нет данных для отображения на карте
        </div>
      </div>
    );
  }

  const centerLat =
    appeals.reduce((sum, a) => sum + a.latitude, 0) / appeals.length;
  const centerLng =
    appeals.reduce((sum, a) => sum + a.longitude, 0) / appeals.length;

  const getStatusColor = (status) => {
    switch (status) {
      case 'В работе':
        return '#ffc107';
      case 'Решено':
        return '#28a745';
      case 'Отклонено':
        return '#dc3545';
      default:
        return '#007bff';
    }
  };

  // Create custom icon based on status
  const createCustomIcon = (status) => {
    return L.divIcon({
      className: 'custom-marker',
      html: `<div style="background-color: ${getStatusColor(
        status
      )}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    });
  };

  return (
    <div className="map-container">
      <MapContainer
        center={[centerLat, centerLng]}
        zoom={13}
        style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {appeals.map((appeal) => (
          <Marker
            key={appeal.id}
            position={[appeal.latitude, appeal.longitude]}
            icon={createCustomIcon(appeal.status)}
            eventHandlers={{
              click: () => onMarkerClick(appeal),
            }}>
            <Popup>
              <div className="map-popup">
                <strong>ID: {appeal.id}</strong>
                <p>
                  <strong>Категория:</strong> {appeal.category}
                </p>
                <p>
                  <strong>Адрес:</strong> {appeal.address}
                </p>
                <p>
                  <strong>Статус:</strong> {appeal.status}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default AppealsMap;
