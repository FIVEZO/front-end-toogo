import React, { useEffect, useRef, useState } from 'react';



const Map: React.FC = () => {
  const googleMapApiKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    // Load Google Maps API
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapApiKey}&libraries=places`;
    script.async = true;
    script.onload = initializeMap;
    document.head.appendChild(script);

    return () => {
      // Clean up the script when the component unmounts
      document.head.removeChild(script);
    };
  }, [googleMapApiKey]);

  const initializeMap = () => {
    if (mapRef.current) {
      const mapOptions: google.maps.MapOptions = {
        zoom: 14,
        center: { lat: 0, lng: 0 }, // Default center before geolocation data
      };
      const newMap = new google.maps.Map(mapRef.current, mapOptions);
      setMap(newMap);

      // Request geolocation data
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            new google.maps.Marker({
              position: { lat: latitude, lng: longitude },
              map: newMap,
              title: 'Your Location',
            });
            newMap.setCenter({ lat: latitude, lng: longitude });
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

  return (
    <div ref={mapRef} style={{ width: '100%', height: '400px' }} />
  );
};

export default Map;
