import { Table, TableBody, TableCell, TableHead, TableRow, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

export default function PointList({points, onPointRemoved}) {
  return (
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
              <IconButton onClick={() => onPointRemoved(i)} size="small">
                <DeleteIcon fontSize="small" />
              </IconButton>
            </TableCell>
          </TableRow>
        ))
      }
      </TableBody>
    </Table>
  );
};
