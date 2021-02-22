import React, { useState, useEffect } from 'react';
import { CircularProgress, Grid } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';

import './Map.css';
import { computeRoutes } from './routeUtils';

function Map({points}) {
  const [paths, setPaths] = useState([]);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if(points.length < 2) {
      setPaths([]);
      setMessage('Please enter at least two points.');
      return;
    }

    async function loadPaths() {
      try {
        const routes = await computeRoutes(points);
        setPaths(routes);
      } catch(e) {
        setPaths([]);
        setMessage(`Failed to compute routes. ${e}`);
        return;
      }
    }

    setPaths([]);
    setMessage(null);
  
    loadPaths();
  }, [points]);

  const position = points[0];

  if(message )

  if(paths.length === 0 || message != null) {
    return (
      <Grid container alignItems="center" justify="center" style={{height: '100vh'}}>
        <Grid item xs={12} md={6} style={{textAlign: 'center'}}>{
          message == null 
            ? <CircularProgress />
            : <Alert severity="warning">{message}</Alert>
        }</Grid>
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