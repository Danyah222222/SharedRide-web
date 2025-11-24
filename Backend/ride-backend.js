// Search for locations using Nominatim API
async function searchLocation(query) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(query)}`;
  const response = await fetch(url);
  const data = await response.json();
  if (!data || data.length === 0) return null;
  return {
    lat: parseFloat(data[0].lat),
    lon: parseFloat(data[0].lon),
    displayName: data[0].display_name
  };
}
// Generate a random point around a specific center
function randomPointAround(centerLat, centerLon, minDist, maxDist) {
  const distance = Math.random() * (maxDist - minDist) + minDist;
  const angle = Math.random() * Math.PI * 2;
  const offsetLat = Math.cos(angle) * distance;
  const offsetLon = Math.sin(angle) * distance;
  return {
    lat: centerLat + offsetLat,
    lon: centerLon + offsetLon
  };
}
// Fetch a real street route from OSRM
async function getRoadRoute(startLat, startLon, endLat, endLon) {
  try {
    const url =
      `https://router.project-osrm.org/route/v1/driving/` +
      `${startLon},${startLat};${endLon},${endLat}?overview=full&geometries=geojson`;
    const response = await fetch(url);
    const data = await response.json();
    if (!data.routes || data.routes.length === 0) return [];
    const coords = data.routes[0].geometry.coordinates;
    return coords.map(([lon, lat]) => ({ lat, lon }));
  } catch (err) {
    console.error("OSRM route error:", err);
    return [];
  }
}
// Build a random route around a location
async function buildRandomRouteNear(centerLat, centerLon) {
  const minDist = 0.008;
  const maxDist = 0.015;
  for (let attempt = 0; attempt < 4; attempt++) {  
    const start = randomPointAround(centerLat, centerLon, minDist, maxDist);
    const end = randomPointAround(centerLat, centerLon, minDist, maxDist);
    const route = await getRoadRoute(start.lat, start.lon, end.lat, end.lon);
    if (route.length > 10) {
      return route;
    }
  }
  const start = randomPointAround(centerLat, centerLon, minDist, maxDist);
  const end = randomPointAround(centerLat, centerLon, minDist, maxDist);
  return await getRoadRoute(start.lat, start.lon, end.lat, end.lon);
}
// Export functions to the frontend
window.searchLocation = searchLocation;
window.buildRandomRouteNear = buildRandomRouteNear;