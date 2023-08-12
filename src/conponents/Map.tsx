import React, { useEffect, useRef, useState } from 'react';
import { locationFormValues } from '../types/posts';
import Input from './Input';
import { styled } from 'styled-components';

const Map: React.FC<{
  onMarkerPosition: locationFormValues | null;
  onMarkerPositionChange: (newPosition: locationFormValues) => void;
}> = ({ onMarkerPosition, onMarkerPositionChange }) => {
  
  const googleMapApiKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [pinMarker, setPinMarker] = useState<google.maps.Marker | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [markerPosition, setMarkerPosition] = useState<google.maps.LatLng | null>(null);
  
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapApiKey}&libraries=places`;
    script.async = true;
    script.onload = initializeMap;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [googleMapApiKey]);

  useEffect(() => {
    if (markerPosition) {
      const data = {
        latitude: markerPosition.lat(),
        longitude: markerPosition.lng(),
      };
      
      onMarkerPositionChange(data);
    }
  }, [markerPosition]);

  const initializeMap = () => {
    if (mapRef.current) {
      const mapOptions: google.maps.MapOptions = {
        zoom: 14,
        center: { lat: 0, lng: 0 },
      };
      const newMap = new google.maps.Map(mapRef.current, mapOptions);
      setMap(newMap);
  
      const geocoder = new google.maps.Geocoder();
  
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const markerPosition = new google.maps.LatLng(latitude, longitude);
            if (markerPosition) {
              const data = {
                latitude: markerPosition.lat(),
                longitude: markerPosition.lng(),
              };
              onMarkerPositionChange(data);
            }
            const marker = new google.maps.Marker({
              position: markerPosition,
              map: newMap,
              title: 'Your Location',
              draggable: true,
            });
  
            marker.addListener('dragend', () => {
              const updatedPosition = marker.getPosition();
              if (updatedPosition) {
                setMarkerPosition(updatedPosition);
  
                geocoder.geocode({ location: updatedPosition }, (results, status) => {
                  if (status === google.maps.GeocoderStatus.OK && results && results[0]) {
                    const address = results[0].formatted_address;
                  } else {
                    console.error('Geocoding failed:', status);
                  }
                });
              }
            });
  
            setMarkerPosition(markerPosition);
            newMap.setCenter(markerPosition);
          },
          (error) => {
            console.error('Error getting geolocation data:', error);
          }
        );
      } else {
        console.error('Geolocation not supported by this browser.');
      }
    }
  };

  const updatePin = (location: google.maps.LatLng) => {
    if (map) {
      if (pinMarker) {
        pinMarker.setMap(null);
        setPinMarker(null); 
      }
  
      const marker = new google.maps.Marker({
        position: location,
        map: map,
        title: 'Custom Pin',
        draggable: true,
      });
  
      marker.addListener('dragend', () => {
        setPinMarker(marker);
        const updatedPosition = marker.getPosition();
        if (updatedPosition) {
          setMarkerPosition(updatedPosition);
      
          // Use a reverse geocoding service to get the address
          const geocoder = new google.maps.Geocoder();
          geocoder.geocode({ location: updatedPosition }, (results, status) => {
            if (status === google.maps.GeocoderStatus.OK && results && results[0]) {
              const address = results[0].formatted_address;
              // Update address state or send data to backend
            } else {
              console.error('Geocoding failed:', status);
            }
          });
        }
      });
  
      setPinMarker(marker);
      setMarkerPosition(location);
  
      // Use a reverse geocoding service to get the address for the initial marker position
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK && results && results[0]) {
          const address = results[0].formatted_address;
          // Update address state or send data to backend for the initial position
        } else {
          console.error('Geocoding failed:', status);
        }
      });
  
      // Update address state or send data to backend for the initial position
      geocoder.geocode({ location: markerPosition }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK && results && results[0]) {
          const address = results[0].formatted_address;
          // Update address state or send data to backend for the initial position
        } else {
          console.error('Geocoding failed:', status);
        }
      });
  
      map.panTo(location);
    }
  };

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (map && searchQuery) {
      const placesService = new google.maps.places.PlacesService(map);
      placesService.textSearch({ query: searchQuery }, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results && results.length > 0) {
          const place = results[0];
          const location = place.geometry?.location;

          if (location) {
            updatePin(location);
          }
        }
      });
    }
  };

  return (
    <div>
      <div>
      <InputContainer>
        <InputField type="text" placeholder="위치에 대한 설명을 적어주세요" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
      </InputContainer>
        <button onClick={handleSearch}>Search</button>
      </div>
      <div ref={mapRef} style={{ width: '100%', height: '480px' }} />
    </div>
  );
};

export default Map;

const InputContainer = styled.div`

  width: 100%;
  height: 70px;
  margin: 40px 0;
  border: 1px solid #cfced7;
  border-radius: 8.53px;
  display: flex;
  align-items: center;
  justify-content: space-between; 
  position: relative;
  /* box-shadow: 3px 0px 15px #c1c1c1; */
`;

const InputField = styled.input`
  margin-left: 16px;
  font-size: 16px;
  color: #403F4E;
  border: none;
  outline: none;
  flex: 1;
  &::placeholder {
    color: #dddce3; 
  }
`;
