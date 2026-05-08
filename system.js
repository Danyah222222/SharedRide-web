// These functions simulate the system logic for the automated tests

const sharedRideSystem = {
    calculateSplitBill: (total, people) => people > 0 ? total / people : total,
    validateLocations: (pickup, dropoff) => (pickup && dropoff) ? "Route Ready" : "Select Locations",
    bookRide: (type) => (type === "instant" || type === "scheduled") ? "Ride Confirmed" : "Error",
    processChatMessage: (msg) => msg.trim().length > 0 ? "Message Sent" : "Empty Message",
    triggerEmergency: (isPressed) => isPressed ? "Alert Sent to Admin" : "System Secure",
    submitRating: (stars) => (stars >= 1 && stars <= 5) ? "Rating Saved" : "Invalid Rating"
};

module.exports = sharedRideSystem;