import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import axios from 'axios';

import './Map.css';

function Map({points}) {
  const [paths, setPaths] = useState([]);

  useEffect(() => {
    async function loadPaths() {
      const pointsQ = points.map(p => `point=${p.lat},${p.lon}`).join('&'); 
      const response = await axios.get(`https://graphhopper.com/api/1/route?${pointsQ}&vehicle=car&debug=true&key=${process.env.REACT_APP_GRAPHHOPPER_KEY}&type=json&points_encoded=false`);
      setPaths(response.data.paths.map(p => p.points));
    }

    setPaths([]);
  
    loadPaths();
  }, [points]);

  const position = points[0];
  console.log(paths);

  if(paths.length === 0) {
    return <div />;
  }

  return (
    <MapContainer center={position} zoom={11} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {paths.map((path, i) =>
        <GeoJSON data={path} key={i} />)
      }
    </MapContainer>
  );
}

export default Map;