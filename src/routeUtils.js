/**
 * @typedef {Object} Point
 * @property {Number} lat
 * @property {Number} lon
 */

/**
 * Consolidates points to eliminate duplicates within a small radius
 * 
 * @param {Point[]} points 
 * @param {Number} threshold
 */
export function consolidatePoints(points, threshold) {
  const newPoints = [];

  /** @type {Point} */
  let lastPoint = null;

  for(const point of points) {
    if(lastPoint === null) {
      newPoints.push(point);
      lastPoint = point;
      continue;
    }

    const distance = calculateDistance(lastPoint, point);
    if(distance < threshold) continue;

    newPoints.push(point);
    lastPoint = point;
  }

  return newPoints;
}

/** 
 * Calculates the distance between two latitude/longitude points.
 * @param {Point} pointA
 * @param {Point} pointB
 */
export function calculateDistance(pointA, pointB) {
  const { lat: lat1, lon: lon1 } = pointA;
  const { lat: lat2, lon: lon2 } = pointB;

  if ((lat1 === lat2) && (lon1 === lon2)) {
    return 0;
  }
  else {
    var radlat1 = Math.PI * lat1/180;
    var radlat2 = Math.PI * lat2/180;
    var theta = lon1-lon2;
    var radtheta = Math.PI * theta/180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = dist * 180/Math.PI;
    dist = dist * 60 * 1.1515;
    return dist;
  }
}