import { useState } from 'react';

import Map from './Map';
import PointList from './PointList'
import PointEntry from './PointEntry';

import { consolidatePoints } from './routeUtils';

function App() {
  const [points, setPoints] = useState([
    {lat: 49.932707, lon: 11.588051},
    {lat: 50.3404, lon: 11.64705},
    {lat: 50.1405, lon: 11.5777}
  ]);

  function onPointsAdded(newPoints) {
    setPoints([...points, ...consolidatePoints(newPoints, 0.25)]);
  }

  function onPointRemoved(i) {
    points.splice(i, 1);
    setPoints([...points]);
  }

  console.log(points);
  return (
    <div>
      <Map points={points} />
      <PointEntry onPointsAdded={onPointsAdded} />
      <PointList points={points} onPointRemoved={onPointRemoved} />
    </div>
  );
}

export default App;
