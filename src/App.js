import { useState } from 'react';

import Map from './Map';
import PointList from './PointList'

function App() {
  const [points, setPoints] = useState([
    {lat: 49.932707, lon: 11.588051},
    {lat: 50.3404, lon: 11.64705},
    {lat: 50.1405, lon: 11.5777}
  ]);

  function onPointRemoved(i) {
    points.splice(i, 1);
    setPoints([...points]);
  }

  console.log(points);
  return (
    <div>
      <PointList points={points} onPointRemoved={onPointRemoved} />
      <Map points={points} />
    </div>
  );
}

export default App;
