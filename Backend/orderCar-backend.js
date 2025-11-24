//car initial location
let driver = {
  lat: 24.7145,
  lng: 46.6765
};
let pickupTarget = null;  
let dropoffTarget = null;
let stage = "idle";
// Gradual movement toward a target
function moveTowards(current, target) {
  const step = 0.003; 
  let dLat = target.lat - current.lat;
  let dLng = target.lng - current.lng;
  current.lat += dLat * step;
  current.lng += dLng * step;
  return { lat: current.lat, lng: current.lng };
}
// User selected a pickup location
function setPickup(lat, lng) {
  pickupTarget = { lat, lng };
  stage = "pickup";
}
// User selected a drop-off location
function setDropoff(lat, lng) {
  dropoffTarget = { lat, lng };
}
// Returns the driver's updated location each time
function getDriverLocation() {
  let target = null;
  if (stage === "pickup" && pickupTarget) {
    target = pickupTarget;
  } 
  else if (stage === "dropoff" && dropoffTarget) {
    target = dropoffTarget;
  } 
  else {
    return driver;
  }
  driver = moveTowards(driver, target);
  const dLat = Math.abs(driver.lat - target.lat);
  const dLng = Math.abs(driver.lng - target.lng);
  const reached = dLat < 0.00005 && dLng < 0.00005;

  if (reached) {
    if (stage === "pickup") {
      if (dropoffTarget) stage = "dropoff";
      else stage = "idle";
    } 
    else if (stage === "dropoff") {
      stage = "idle";
    }
  }
  return driver;
}