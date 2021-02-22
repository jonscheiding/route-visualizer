import { calculateDistance, consolidatePoints } from './routeUtils';

describe('calculateDistance', () => {
  it('returns correct distance for one mile', () => {
    const pointA = { lat: 39.29376471196126, lon: -84.39075175073766 };
    const pointB = { lat: 39.30148408869706, lon: -84.37493049419907 };

    const distance = calculateDistance(pointA, pointB);

    expect(distance).toBe(0.9999999986397494);
  })
})

describe('consolidatePoints', () => {
  it('returns single point when there is only one', () => {
    const points = [
      {lat: 39.2934635, lon: -84.3920166}
    ];

    const newPoints = consolidatePoints(points, 0.25);

    expect(newPoints).toEqual(points);
  });

  it('returns single point when all points are the same', () => {
    const points = [
      {lat: 39.2934635, lon: -84.3920166},
      {lat: 39.2934635, lon: -84.3920166},
      {lat: 39.2934635, lon: -84.3920166}
    ];

    const newPoints = consolidatePoints(points, 0.25);

    expect(newPoints).toEqual([points[0]]);
  });

  it('returns single point when all points are within the threshold', () => {
    const points = [
      {lat: 39.2934635, lon: -84.3920166},
      {lat: 39.29327525144703, lon: -84.39022876852253},
      {lat: 39.292952080824854, lon: -84.38990444212155}
    ];

    const newPoints = consolidatePoints(points, 0.25);

    expect(newPoints).toEqual([points[0]]);
  });

  it('returns all point when distances are outside the threshold', () => {
    const points = [
      {lat: 39.2934635, lon: -84.3920166},
      {lat: 39.3134635, lon: -84.3720166},
      {lat: 39.3334635, lon: -84.3520166},
    ];

    const newPoints = consolidatePoints(points, 0.25);

    expect(newPoints).toEqual(points);
  });

  it('returns correct points when distances are cumulatively outside the threshold', () => {
    const points = [
      {lat: 39.2934635, lon: -84.3920166},
      {lat: 39.2954635, lon: -84.3920166},
      {lat: 39.2974635, lon: -84.3920166},
      {lat: 39.2994635, lon: -84.3920166},
    ];

    const newPoints = consolidatePoints(points, 0.25);

    expect(newPoints).toEqual([points[0], points[2]]);
  });
});
