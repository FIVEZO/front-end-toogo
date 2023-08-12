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
  const [apiLoaded, setApiLoaded] = useState(false);

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
     <LoadScript googleMapsApiKey={googleMapApiKey} onLoad={() => setApiLoaded(true)}>
      {apiLoaded && (
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={coordinates}
          zoom={zoomLevel}
          onZoomChanged={handleZoomChanged}
        >
          {coordinates && (
            <Marker
              position={coordinates}
              icon={{
                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                  <svg width="70" height="82" viewBox="0 0 70 82" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M70 35C70 15.67 54.33 0 35 0C15.67 0 0 15.67 0 35C0 39.7852 0.960288 44.346 2.69867 48.5004C9.90889 68.1867 35.1839 81.6667 35.1839 81.6667C35.1839 81.6667 66.2315 65.108 69.3213 41.8936C69.7665 39.6648 70 37.3597 70 35Z" fill="white"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M64.4181 41.3082L64.3863 41.469L64.3649 41.6314C63.0709 51.4605 55.7378 60.4659 47.8246 67.3794C43.9687 70.7482 40.1875 73.436 37.3666 75.2818C36.547 75.8181 35.812 76.281 35.1839 76.6667C34.7665 76.4104 34.3018 76.12 33.7964 75.7965C31.4358 74.2857 28.2143 72.0721 24.7865 69.2735C17.8006 63.57 10.5297 55.8958 7.39361 47.2393L7.35472 47.1319L7.31108 47.0265C5.82394 43.4335 4.99994 39.485 4.99994 35.3292C4.99994 18.5788 18.4314 5 34.9999 5C51.5685 5 64.9999 18.5788 64.9999 35.3292C64.9999 37.3804 64.7992 39.3793 64.4181 41.3082Z" fill="#2BDE97"/>
                    <path d="M48.3334 35C48.3334 27.6362 42.3638 21.6667 35 21.6667C27.6362 21.6667 21.6667 27.6362 21.6667 35C21.6667 42.3638 27.6362 48.3333 35 48.3333C42.3638 48.3333 48.3334 42.3638 48.3334 35Z" fill="white"/>
                  </svg>
                `),
                scaledSize: new window.google.maps.Size(40, 40) // 마커 크기 조정
              }}
            />
          )}
        </GoogleMap>
      )}
      </LoadScript>
    </div>
  );
};

export default GogleMap;
