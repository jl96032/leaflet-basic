import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';

/**
 * @see https://stackoverflow.com/a/69701974/15165070 - Stack Overflow post
 */

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

  var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
});

var osm1 = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
});

  const mapStyles = {
    overflow: 'hidden',
    width: '100%',
    height: '100vh',
  };

  // Options for our map instance:
  const mapParams = {
    center: [37.0902, -95.7129], // USA
    zoom: 3,
    zoomControl: true,
    minZoom: 0,
    maxZoom: 17,
    zoomSnap: 0.75,
    maxBounds: L.latLngBounds(L.latLng(-150, -240), L.latLng(150, 240)),
    closePopupOnClick: false,
    layers: [osm, osm1], // Start with just the base layer
  };

  var baseMaps = {
    "OpenStreetMap": osm,
    "Mapbox Streets": osm1
};

// var overlayMaps = {
//     "Cities": cities
// };
  //var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);
  


  // Map creation:
  useEffect(() => {
    mapRef.current = L.map('map', mapParams);

    var layerControl = L.control.layers(baseMaps).addTo(mapRef.current);
    // mapRef.current.on('click', () => {
    //   alert('map clicked');
    // });
    // Set map instance to state:
    setMapInstance(mapRef.current);
  }, []);

  // If you want to use the mapInstance in a useEffect hook,
  // you first have to make sure the map exists. Then, you can add your logic.
  useEffect(() => {
    // Check for the map instance before adding something (ie: another event handler).
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
