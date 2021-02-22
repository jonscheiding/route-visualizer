import { useState } from 'react';
import csv from 'csvtojson';

export default function PointEntry({onPointsAdded}) {
  const [text, setText] = useState('lat,lon\n');

  async function loadCsvToPoints(data) {
    const json = await csv()
      .fromString(data);
    
    onPointsAdded(json.filter(f => f.lat && f.lon));
  }

  function applyText() {
    loadCsvToPoints(text);
    setText('lat,lon\n');
  }

  return <>
    <textarea value={text} onChange={e => setText(e.target.value)} />
    <button onClick={applyText}>Add</button>
  </>;
}