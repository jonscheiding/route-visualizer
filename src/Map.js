import React, { useState, useEffect } from 'react';
import { CircularProgress, Grid } from '@material-ui/core';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';

import './Map.css';
import { computeRoutes } from './routeUtils';

function Map({points}) {
  const [paths, setPaths] = useState([]);

  useEffect(() => {
    async function loadPaths() {
      setPaths(await computeRoutes(points));
    }

    setPaths([]);
  
    loadPaths();
  }, [points]);

  const position = points[0];

  if(paths.length === 0) {
    return (
      <Grid container alignItems="center" style={{height: '100vh'}}>
        <Grid item xs={12} style={{textAlign: 'center'}}>
          <CircularProgress />
        </Grid>
      </Grid>
    );
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