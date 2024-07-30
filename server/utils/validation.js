const flights = require('../data/flights');


function validateFlight(newFlight) {

    let conflictingFlights = [];

    for (const existingFlight of flights) {
        const conflict = isConflict(newFlight, existingFlight);
        if (conflict) {
            conflictingFlights.push({
                flightNumber: existingFlight.flightNumber,
                conflict: conflict,
                departureAirport: existingFlight.departureAirport,
                departureRunway: existingFlight.departureRunway,
                departureTime: existingFlight.departureTime,
                arrivalAirport: existingFlight.arrivalAirport,
                arrivalRunway: existingFlight.arrivalRunway,
                arrivalTime: existingFlight.arrivalTime
            });
        }
    }

    if (conflictingFlights.length > 0) {
        return {
            error: `Flight conflicts detected with ${conflictingFlights.length} flight(s)`,
            conflictingFlights: conflictingFlights,
            conflict: true
        };
    }

    return {
        error: null,
        conflictingFlights: null,
        conflict: false
    };
}

function isConflict(flight1, flight2) {
    if (flight1.id === flight2.id) return null;

    const departureConflict = checkTimeConflict(
        flight1.departureTime,
        flight2.departureTime,
        flight1.departureAirport === flight2.departureAirport &&
        flight1.departureRunway === flight2.departureRunway
    );

    const arrivalConflict = checkTimeConflict(
        flight1.arrivalTime,
        flight2.arrivalTime,
        flight1.arrivalAirport === flight2.arrivalAirport &&
        flight1.arrivalRunway === flight2.arrivalRunway
    );

    if (departureConflict) {
        return 'departure';
    } else if (arrivalConflict) {
        return 'arrival';
    }

    return null;
}

function checkTimeConflict(time1, time2, sameAirportAndRunway) {
    if (!sameAirportAndRunway) return false;

    const date1 = new Date(time1);
    const date2 = new Date(time2);
    const diffInMinutes = Math.abs((date1 - date2) / (1000 * 60));

    return diffInMinutes < 2;
}


module.exports = { validateFlight };