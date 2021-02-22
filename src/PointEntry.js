import { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
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
    setText(text.match(/[^\n]*\n/));
  }

  return (<>
    <div>
      <TextField
        id="standard-multiline-flexible"
        label="Add Points"
        multiline
        rowsMax={20}
        value={text}
        onChange={e => setText(e.target.value)}
        fullWidth
      />
    </div>
    <Button onClick={applyText} color="primary">Add</Button>
  </>);
}