import { MapContainer, TileLayer } from 'react-leaflet';

import './Map.css';
import Route from './Route';

function Map() {
  const position = [50.2, 11.7833333]

  return (
    <MapContainer center={position} zoom={11} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Route />
    </MapContainer>
  );
}

export default Map;