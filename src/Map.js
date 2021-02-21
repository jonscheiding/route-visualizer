import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import axios from 'axios';

import './Map.css';

const points = [
  [49.932707, 11.588051],
  [50.3404, 11.64705],
  [50.1405, 11.5777]
];

function Map() {
  const [paths, setPaths] = useState([]);

  async function loadPaths() {
    const pointsQ = points.map(p => `point=${p}`).join('&'); 
    const response = await axios.get(`https://graphhopper.com/api/1/route?${pointsQ}&vehicle=car&debug=true&key=${process.env.REACT_APP_GRAPHHOPPER_KEY}&type=json&points_encoded=false`);
    setPaths(response.data.paths.map(p => p.points));
  }

  useEffect(() => {
    loadPaths();
  }, []);

  const position = points[0];
  console.log(paths);

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