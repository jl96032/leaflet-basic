import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate, useLocation, useSearchParams  } from 'react-router-dom'

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

  let navigate = useNavigate();
  const [lng, setLng] = useState(12.549);
  const [lat, setLat] = useState(55.666);
  const [zoom, setZoom] = useState(15);

  // Base tile for the map:
  tileRef.current = L.tileLayer(
    `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`,
    {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }
  );

  var skippoProd = L.tileLayer('https://map.eniro.com/geowebcache/service/tms1.0.0/hydrographica2x/{z}/{x}/{-y}.png', {
    maxZoom: 17
});

var skippoTest = L.tileLayer('https://test-map.eniro.com/geowebcache/service/tms1.0.0/hydrographica2x/{z}/{x}/{-y}.png', {
    maxZoom: 17
});

  const mapStyles = {
    overflow: 'hidden',
    width: '100%',
    height: '100vh',
  };

  var baseMaps = {
    "Skippo Prod": skippoProd,
    "Skippo Test": skippoTest
  };

  // Options for our map instance:
  const mapParams = {
    center: [59.355596,17.973633], // USA
    zoom: 6,
    zoomControl: true,
    minZoom: 0,
    maxZoom: 17,
    zoomSnap: 0.75,
    maxBounds: L.latLngBounds(L.latLng(-150, -240), L.latLng(150, 240)),
    closePopupOnClick: false,
    layers: [skippoProd, skippoTest], // Start with just the base layer
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
    
    mapRef.current.on('moveend', () => {
      var tmpZ= mapRef.current.getZoom().toFixed(2);
      var tmpLat = mapRef.current.getCenter().lat.toFixed(4);
      var tmpLng = mapRef.current.getCenter().lng.toFixed(4);
      
      setZoom(mapRef.current.getZoom().toFixed(2));
      setLat(mapRef.current.getCenter().lat.toFixed(4));
      setLng(mapRef.current.getCenter().lng.toFixed(4));
      
    //  console.log("move end, temp z",tmpZ, tmpLat, tmpLng);
    //  console.log("move end, zoom ",zoom, lat, lng);
      navigate(`../${tmpZ}/${tmpLat}/${tmpLng}`);
      });
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
