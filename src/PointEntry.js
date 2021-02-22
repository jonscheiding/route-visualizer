import { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import { loadPointsFromCsv } from './routeUtils';

export default function PointEntry({onPointsAdded}) {
  const [text, setText] = useState('lat,lon\n');
  const [message, setMessage] = useState(null);

  async function addPointsFromText() {
    try {
      const json = await loadPointsFromCsv(text);
      onPointsAdded(json);
      setMessage(null);
      setText(text.match(/[^\n]*\n/))
    } catch(e) {
      setMessage(e.toString());
    }
  }

  function applyText() {
    addPointsFromText();
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
    {message == null ? null :
      <Alert severity="warning">{message}</Alert>
    }
  </>);
}