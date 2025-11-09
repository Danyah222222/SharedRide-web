function initCampusMap() {
  const campusCenter = { lat: 24.7136, lng: 46.6753 };
  const map = new google.maps.Map(document.getElementById("campus-map"), {
    zoom: 16,
    center: campusCenter,
  });

  const carLocations = [
    { lat: 24.7145, lng: 46.6765 },
    { lat: 24.7128, lng: 46.6748 },
    { lat: 24.7139, lng: 46.6760 },
  ];

  carLocations.forEach((location, index) => {
    new google.maps.Marker({
      position: location,
      map: map,
      title: `Car ${index + 1}`,
      icon: 'https://maps.google.com/mapfiles/kml/shapes/cabs.png',
    });
  });
}
