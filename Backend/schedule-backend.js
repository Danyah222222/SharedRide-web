let schedulePickup = null;
let scheduleDestination = null;
// Storing the pickup location
function setSchedulePickup(lat, lon) {
  schedulePickup = { lat, lon };
}
// Storing the destination location
function setScheduleDestination(lat, lon) {
  scheduleDestination = { lat, lon };
}
// Saving the scheduled ride in localStorage
function saveScheduledRide(dateStr, timeStr) {
  if (!dateStr || !timeStr) {
    return { ok: false, message: "Please select date and time." };
  }
  if (!schedulePickup) {
    return { ok: false, message: "Please set pickup location (drag the pickup marker)." };
  }
  if (!scheduleDestination) {
    return { ok: false, message: "Please click on the map to choose destination." };
  }
  const scheduled = {
    pickup: schedulePickup,
    destination: scheduleDestination,
    date: dateStr,
    time: timeStr,
    createdAt: new Date().toISOString()
  };
// Save in localStorage
  localStorage.setItem("scheduledRide", JSON.stringify(scheduled));
  return { ok: true, message: "Ride scheduled successfully!" };
}
// Load the saved ride
function getScheduledRide() {
  const raw = localStorage.getItem("scheduledRide");
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (e) {
    console.error("Error parsing scheduledRide:", e);
    return null;
  }
}
// Export functions to the frontend
window.setSchedulePickup = setSchedulePickup;
window.setScheduleDestination = setScheduleDestination;
window.saveScheduledRide = saveScheduledRide;
window.getScheduledRide = getScheduledRide;
