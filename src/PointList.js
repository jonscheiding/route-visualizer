import { Table, TableBody, TableCell, TableHead, TableRow, IconButton, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

export default function PointList({points, onPointsRemoved}) {
  return (
    <>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Latitude</TableCell>
            <TableCell>Longitude</TableCell>
            <TableCell>&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {
          points.map((p, i) => (
            <TableRow key={i}>
              <TableCell>{p.lat}</TableCell>
              <TableCell>{p.lon}</TableCell>
              <TableCell>
                <IconButton onClick={() => onPointsRemoved(i)} size="small">
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))
        }
        </TableBody>
      </Table>
      <Button onClick={() => onPointsRemoved(0, points.length)} color="primary">Clear</Button>
    </>
  );
};
