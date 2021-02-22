import { useState } from 'react';
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import Map from './Map';
import PointList from './PointList'
import PointEntry from './PointEntry';

import { consolidatePoints } from './routeUtils';

const useStyles = makeStyles({
  pointEntry: {
    height: '100vh',
    overflow: 'auto',
    padding: '1rem'
  }
});

function App() {
  const classes = useStyles();

  const [points, setPoints] = useState([]);

  function onPointsAdded(newPoints) {
    setPoints([...points, ...consolidatePoints(newPoints, 0.25)]);
  }

  function onPointRemoved(i) {
    points.splice(i, 1);
    setPoints([...points]);
  }

  return (
    <Grid container>
      <Grid item xs={12} md={8}>
        <Map points={points} />
      </Grid>
      <Grid item xs={12} md={4} className={classes.pointEntry}>
        <PointEntry onPointsAdded={onPointsAdded} />
        <PointList points={points} onPointRemoved={onPointRemoved} />
      </Grid>
    </Grid>
  );
}

export default App;
