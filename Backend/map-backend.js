// Search for location using external API
async function searchLocation(query) {
const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`;
  const response = await fetch(url);
  const data = await response.json();

  // If no results
  if (data.length === 0) {
    return null;
  }
  // Return useful info
  return {
    lat: data[0].lat,
    lon: data[0].lon,
    displayName: data[0].display_name
  };
}