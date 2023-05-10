import React, { useEffect, useRef, useState, mapParams } from 'react';
import L from 'leaflet';

const MapComponent = (props) => {
  // Map state:
  const [mapInstance, setMapInstance] = useState(null);
  const [marker, setMarker] = useState(null);

  // Map refs:
  const mapRef = useRef(null);
  const tileRef = useRef(null);
  const markerRef = useRef(null);

  // Base tile for the map:
  tileRef.current = L.tileLayer(
    `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`,
    {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }
  );

  const mapStyles = {
    overflow: 'hidden',
    width: '100%',
    height: '100vh',
  };

  // Options for our map instance:
  const mapParams = {
    center: [37.0902, -95.7129], // USA
    zoom: 3,
    zoomControl: false,
    zoomSnap: 0.75,
    layers: [tileRef.current], // Start with just the base layer
  };

  // Map creation:
  useEffect(() => {
    mapRef.current = L.map('map', mapParams);
    // Add an event listener:
    mapRef.current.on('click', () => {
      alert('map clicked');
    });
    // Set map instance to state:
    setMapInstance(mapRef.current);
  }, []); // <- Empty dependency array, so it only runs once on the first render.

  // If you want to use the mapInstance in a useEffect hook,
  // you first have to make sure the map exists. Then, you can add your logic.
  useEffect(() => {
    // Check for the map instance before adding something (ie: another event listener).
    // If no map, return:
    if (!mapInstance) return;
    if (mapInstance) {
      mapInstance.on('zoomstart', () => {
        console.log('Zooming!!!');
      });
    }
  }, [mapInstance]);

  // Toggle marker on button click:
  const handleClick = () => {
    if (marker) {
      marker.removeFrom(mapInstance);
      markerRef.current = null;
    } else {
      markerRef.current = L.marker([40.7128, -74.006]).addTo(mapInstance);
    }
    setMarker(markerRef.current);
  };

  return (
    <>
      <button onClick={handleClick}>
        {`Click to ${marker ? 'remove' : 'add'} marker`}
      </button>
      <div id="map" style={mapStyles} />
    </>
  );
};

export default MapComponent;