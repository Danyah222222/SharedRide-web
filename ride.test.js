const sharedRideSystem = require('./system');

describe('Functional Tests', () => {

    test('Bill Splitting', () => {
        expect(sharedRideSystem.calculateSplitBill(60, 3)).toBe(20);
    });

    test('Campus Map', () => {
        expect(sharedRideSystem.validateLocations("Building A", "Main Gate")).toBe("Route Ready");
    });

    test('Booking', () => {
        expect(sharedRideSystem.bookRide("scheduled")).toBe("Ride Confirmed");
    });

    test('Chat', () => {
        expect(sharedRideSystem.processChatMessage("Hello")).toBe("Message Sent");
    });

    test('Emergency', () => {
        expect(sharedRideSystem.triggerEmergency(true)).toBe("Alert Sent to Admin");
    });

    test('Rating', () => {
        expect(sharedRideSystem.submitRating(5)).toBe("Rating Saved");
    });

});