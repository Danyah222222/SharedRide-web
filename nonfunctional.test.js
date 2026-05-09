const sharedRideSystem = require('./system');
describe('Non-Functional Tests', () => {

  test('Performance - bill splitting should execute quickly', () => {
    const startTime = Date.now();

    sharedRideSystem.calculateSplitBill(60, 3);

    const endTime = Date.now();
    const executionTime = endTime - startTime;

    expect(executionTime).toBeLessThan(100);
  });

  test('Reliability - booking should work repeatedly without failure', () => {
    for (let i = 0; i < 10; i++) {
      expect(sharedRideSystem.bookRide("scheduled")).toBe("Ride Confirmed");
    }
  });

  test('Security - empty locations should not be accepted', () => {
    expect(sharedRideSystem.validateLocations("", "")).not.toBe("Route Ready");
  });

  test('Usability - rating should accept valid user rating', () => {
    expect(sharedRideSystem.submitRating(5)).toBe("Rating Saved");
  });

});