export default function PointList({points, onPointRemoved}) {
  return (
    <table>
      <thead>
        <tr>
          <td>Latitude</td>
          <td>Longitude</td>
          <td>&nbsp;</td>
        </tr>
      </thead>
      <tbody>
      {
        points.map((p, i) => (
          <tr key={i}>
            <td>{p.lat}</td>
            <td>{p.lon}</td>
            <td><button onClick={() => onPointRemoved(i)}>X</button></td>
          </tr>
        ))
      }
      </tbody>
    </table>
  );
};
