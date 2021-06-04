import axios from 'axios';
import csv from 'csvtojson';

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

/** 
 * Generates the routes with GraphHopper,
 * using batching to avoid overly long URLs.
 * @param {Point[]} points
 */
export async function computeRoutes(points) {
  const batchSize = 25;

  const paths = [];
  let index = 0;

  while(index < points.length) {
    if(index + batchSize === points.length - 1) index++;

    const pointsBatch = points.slice(index, index + batchSize);
    index += pointsBatch.length;

    console.log('Computing route for points', pointsBatch);

    const pointsQ = pointsBatch.map(p => `point=${p.lat},${p.lon}`).join('&'); 
    try {
      const response = await axios.get(
        `https://graphhopper.com/api/1/route?${pointsQ}`,
        {
          params: {
            vehicle: 'foot',
            key: process.env.REACT_APP_GRAPHHOPPER_KEY,
            type: 'json',
            points_encoded: false
          }
        });
      paths.push(...response.data.paths.map(p => p.points));
    } catch(e) {
      if(!e.isAxiosError || !e.response) throw e;
      throw new Error(e.response.data.message);
    }
  }

  console.log(`Computed ${paths.length} routes.`, paths);

  return paths;
}

export async function loadPointsFromCsv(csvString) {
  const warnings = [];

  function parseNumeric(s) {
    if(!s) return null;
    const result = parseFloat(s);
    if(isNaN(result)) {
      warnings.push(`Invalid numeric lat/long: '${s}'`);
    }
    return result;
  }

  return new Promise((resolve, reject) => {
    csv({colParser: {lat: parseNumeric, lon: parseNumeric}})
      .fromString(csvString)
      .then(
        json => {
          if(warnings.length > 0) {
            reject(new Error(`Failed to parse CSV.\n${warnings.join('\n')}`));
          } else {
            resolve(json.filter(f => f.lat && f.lon))
          }
        },
        reject
      );
  });
}
