const flights = require('../data/flights');

// Check for runway conflicts based on adjusted times
function isRunwayConflict(existingFlight, newFlight, adjustedDepartureTime, adjustedArrivalTime) {
    const existingDepartureTime = new Date(existingFlight.departureTime).getTime() + existingFlight.delay * 60000; // Convert delay to milliseconds
    const existingArrivalTime = new Date(existingFlight.arrivalTime).getTime() + existingFlight.delay * 60000; // Convert delay to milliseconds

    const isDepartureConflict = existingFlight.departureRunway === newFlight.departureRunway &&
        Math.abs(existingDepartureTime - adjustedDepartureTime) < 2 * 60 * 1000; // 2 minutes in milliseconds

    const isArrivalConflict = existingFlight.arrivalRunway === newFlight.arrivalRunway &&
        Math.abs(existingArrivalTime - adjustedArrivalTime) < 2 * 60 * 1000; // 2 minutes in milliseconds

    return isDepartureConflict || isArrivalConflict;
}

// Main function to validate flight
function validateFlight(newFlight) {
    const adjustedDepartureTime = new Date(newFlight.departureTime).getTime() + newFlight.delay * 60000; // Convert delay to milliseconds
    const adjustedArrivalTime = new Date(newFlight.arrivalTime).getTime() + newFlight.delay * 60000; // Convert delay to milliseconds

    for (const existingFlight of flights) {
        if (existingFlight.id === newFlight.id || !existingFlight.status) {
            continue; // Skip the flight if it is the same flight or cancelled
        }

        if (isRunwayConflict(existingFlight, newFlight, adjustedDepartureTime, adjustedArrivalTime)) {
            return { error: 'Runway conflict detected', conflictingFlight: existingFlight };
        }
    }

    return null;
}

module.exports = { validateFlight };
