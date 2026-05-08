// These functions simulate the system logic for the automated tests

const sharedRideSystem = {
    // Bill Splitting : Ensuring fair cost sharing among passengers
    calculateSplitBill: (total, people) => people > 0 ? total / people : total,
    
    //Campus Map :Validating that pickup and drop-off are selected
    validateLocations: (pickup, dropoff) => (pickup && dropoff) ? "Route Ready" : "Select Locations",
    
    //Instant and Scheduled Booking - Handling different booking types
    bookRide: (type) => (type === "instant" || type === "scheduled") ? "Ride Confirmed" : "Error",
    
    //In app chat :Ensuring coordination messages are not empty
    processChatMessage: (msg) => msg.trim().length > 0 ? "Message Sent" : "Empty Message",
    
    //Emergency Button :Notifying admin immediately in case of danger
    triggerEmergency: (isPressed) => isPressed ? "Alert Sent to Admin" : "System Secure",
    
    //Rating & Reviews :Validating star ratings between 1 and 5
    submitRating: (stars) => (stars >= 1 && stars <= 5) ? "Rating Saved" : "Invalid Rating"
};

// Automated Functional Tests

describe('Functional Tests', () => {

    test('Bill Splitting - Should divide 60 SAR fairly between 3 passengers', () => {
        expect(sharedRideSystem.calculateSplitBill(60, 3)).toBe(20);
    });

    test('Campus Map - Should ensure both pickup and drop-off are selected', () => {
        expect(sharedRideSystem.validateLocations("Building A", "Main Gate")).toBe("Route Ready");
    });

    test('Booking - Should successfully schedule a future ride', () => {
        expect(sharedRideSystem.bookRide("scheduled")).toBe("Ride Confirmed");
    });

    test('Chat - Should prevent sending empty coordination messages', () => {
        expect(sharedRideSystem.processChatMessage("I am waiting at the pickup point")).toBe("Message Sent");
    });

    test('Emergency - Should inform the app admin immediately on danger', () => {
        expect(sharedRideSystem.triggerEmergency(true)).toBe("Alert Sent to Admin");
    });

    test('Rating - Should accept valid feedback stars (1-5)', () => {
        expect(sharedRideSystem.submitRating(5)).toBe("Rating Saved");
    });

});