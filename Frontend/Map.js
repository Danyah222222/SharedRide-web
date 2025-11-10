
  function initCampusMap() {
  // Riyadh Campus Center (for example)
  const campusCenter = [24.7136, 46.6753];

  // Initialize the map
  const map = L.map("map").setView(campusCenter, 16);

  // Add OpenStreetMap tiles
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  // Car locations
  const carLocations = [
    [24.7145, 46.6765],
    [24.7128, 46.6748],
    [24.7139, 46.6760],
  ];

  // Add markers for each car
  carLocations.forEach((location, index) => {
    L.marker(location)
      .addTo(map)
      .bindPopup(`<b>Car ${index + 1}</b>`)
      .openPopup();
  });
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", initCampusMap);
