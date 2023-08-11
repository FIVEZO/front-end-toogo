import React, { useState, useRef } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

interface GogleMapProps {
  latitude: number;
  longitude: number;
}

const googleMapApiKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

const GogleMap: React.FC<GogleMapProps> = ({ latitude, longitude }) => {
  const [zoomLevel, setZoomLevel] = useState(15);
  const coordinates = { lat: latitude, lng: longitude };
  const mapRef = useRef<google.maps.Map | null>(null);


  const handleZoomChanged = () => {
    if (mapRef.current) {
      const newZoomLevel = mapRef.current.getZoom();
      if (newZoomLevel !== undefined) {
        setZoomLevel(newZoomLevel);
      }
    }
  };
  if (!googleMapApiKey) {
    return <div>Google Maps API key is missing.</div>;
  }

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <LoadScript googleMapsApiKey={googleMapApiKey}>
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={coordinates}
          zoom={zoomLevel} // 줌 레벨 상태를 사용하여 동적으로 변경
          onZoomChanged={handleZoomChanged} // 줌 레벨 변경 이벤트 핸들러 설정
        >
          <Marker position={coordinates} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default GogleMap;
