const express = require('express');
const router = express.Router();
const { flightSchema } = require('../utils/schemas');
const { validateFlight } = require('../utils/validation');
let flights = require('../data/flights');
let passengers = require('../data/passengers'); // Assuming you have a passengers data file

const generateFlightId = () => {
    const idPrefix = 'FL';
    const idSuffix = String(Math.floor(Math.random() * 9000) + 1000).padStart(4, '0');
    return `${idPrefix}${idSuffix}`;
};

// Helper function to filter flights based on query parameters
const filterFlights = (flights, query) => {
    return flights.filter(flight => {
        const { status, departureAirport, arrivalAirport, startDate, endDate } = query;
        let matches = true;

        if (status) {
            matches = matches && (flight.status === status);
        }
        if (departureAirport) {
            matches = matches && (flight.departureAirport === departureAirport);
        }
        if (arrivalAirport) {
            matches = matches && (flight.arrivalAirport === arrivalAirport);
        }
        if (startDate) {
            matches = matches && (new Date(flight.departureTime) >= new Date(startDate));
        }
        if (endDate) {
            matches = matches && (new Date(flight.arrivalTime) <= new Date(endDate));
        }

        return matches;
    });
};

// GET route with query parameters
router.get('/', (req, res) => {
    const filteredFlights = filterFlights(flights, req.query);
    res.json(filteredFlights);
});

router.get('/:id', (req, res) => {
    const flight = flights.find(f => f.id === req.params.id);
    if (flight) {
        res.json(flight);
    } else {
        res.status(404).json({ error: 'Flight not found' });
    }
});

router.post('/', (req, res) => {
    const newFlight = req.body;
    newFlight.id = generateFlightId();

    const { error } = flightSchema.validate(newFlight);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const conflictResult = validateFlight(newFlight);
    if (conflictResult) {
        return res.status(400).json(conflictResult);
    }

    flights.push(newFlight);
    res.status(201).json(newFlight);
});

router.put('/:id', (req, res) => {
    const flightId = req.params.id;
    const updatedFlight = req.body;
    updatedFlight.id = flightId;

    const { error } = flightSchema.validate(updatedFlight);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const conflictResult = validateFlight(updatedFlight);
    if (conflictResult) {
        return res.status(400).json(conflictResult);
    }

    const index = flights.findIndex(flight => flight.id === flightId);
    if (index === -1) {
        return res.status(404).json({ error: 'Flight not found' });
    }

    flights[index] = updatedFlight;
    res.json(updatedFlight);
});

router.delete('/:id', (req, res) => {
    const index = flights.findIndex(f => f.id === req.params.id);
    if (index !== -1) {
        const deletedFlight = flights.splice(index, 1)[0];
        res.json(deletedFlight);
    } else {
        res.status(404).json({ error: 'Flight not found' });
    }
});

// GET route to fetch all flights booked by a passenger
router.get('/passenger/:passengerId', (req, res) => {
    const { passengerId } = req.params;
    const flightID = passengers.filter(p => p.id === passengerId).map(p => p.flightId);
    if (flightID.length === 0) {
        return res.status(404).json({ error: 'Passenger not found' });
    }
    const passengerFlights = flights.filter(f => flightID.includes(f.id));
    res.json(passengerFlights);
});


module.exports = router;
