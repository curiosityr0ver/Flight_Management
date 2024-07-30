const express = require('express');
const router = express.Router();
const { flightSchema } = require('../utils/schemas');
const { validateFlight } = require('../utils/validation');
let flights = require('../data/flights');
let passengers = require('../data/passengers'); // Assuming you have a passengers data file
const nodemailer = require('nodemailer');
const { authMiddleWare } = require('../middleware/authMiddleWare');
const { sendFlightUpdateEmail } = require('../utils/emailUtils');

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

    try {
        const newFlight = req.body;
        newFlight.id = generateFlightId();
        const { error } = flightSchema.validate(newFlight);
        if (error) {
            return res.status(400).json(error);
        }
        const conflictResult = validateFlight(newFlight);
        if (conflictResult.conflict) {
            return res.status(400).json(conflictResult);
        }
        flights.push(newFlight);
        res.status(201).json(newFlight);

    }
    catch (error) {
        console.log("error", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/:id', async (req, res) => {
    const { arrivalAirport, departureAirport, delay, arrivalRunway, departureRunway, status, passengers } = req.body;
    const flightId = req.params.id;

    const currentFlight = flights.find(f => f.id === flightId);

    if (!currentFlight) {
        return res.status(404).json({ error: 'Flight not found' });
    }

    let updatedFlight = {
        ...currentFlight,
        arrivalAirport: arrivalAirport || currentFlight.arrivalAirport,
        departureAirport: departureAirport || currentFlight.departureAirport,
        delay: delay || currentFlight.delay,
        arrivalRunway: arrivalRunway || currentFlight.arrivalRunway,
        departureRunway: departureRunway || currentFlight.departureRunway,
        status: status || currentFlight.status,
        passengers: passengers || currentFlight.passengers
    };


    if (delay && delay > 0) {
        const arrivalTime = new Date(currentFlight.arrivalTime);
        const departureTime = new Date(currentFlight.departureTime);
        arrivalTime.setMinutes(arrivalTime.getMinutes() + delay);
        departureTime.setMinutes(departureTime.getMinutes() + delay);
        updatedFlight = {
            ...updatedFlight, arrivalTime, departureTime,
            status: 'delayed'
        };
    }

    const { error } = flightSchema.validate(updatedFlight);
    console.log(error);

    if (error) {
        return res.json({
            status: 400,
            error: error.details[0].message
        });
    }



    const conflictResult = validateFlight(updatedFlight);
    if (conflictResult.conflict) {
        return res.status(400).json(conflictResult);
    }

    const index = flights.findIndex(f => f.id === flightId);
    flights[index] = updatedFlight;
    console.log("heree 3", delay);

    if (delay || status || arrivalAirport || departureAirport) {
        const toSend = process.env.EMAIL_SERVICE ? true : false;
        if (!toSend) {
            return res.json(updatedFlight);
        }
        const subject = `Flight ${flightId} Update`;
        const flightDetails = `Flight ${flightId} has been updated.\nStatus: ${status || updatedFlight.status},\nDelay: ${delay || updatedFlight.delay} minutes,\nArrival airport: ${arrivalAirport || updatedFlight.arrivalAirport},\nDeparture airport: ${departureAirport || updatedFlight.departureAirport}`;
        const HTMLformattedFlightDetails = `<h1>Flight ${flightId} Update</h1><p>Flight ${flightId} has been updated.</p><ul><li><b>Status:</b> ${status || updatedFlight.status}</li><li><b>Delay:</b> ${delay || updatedFlight.delay} minutes</li><li><b>Arrival Airport:</b> ${arrivalAirport || updatedFlight.arrivalAirport}</li><li><b>Departure Airport:</b> ${departureAirport || updatedFlight.departureAirport}</li></ul>`;
        const info = await sendFlightUpdateEmail(subject, flightDetails, HTMLformattedFlightDetails, flights[index].passengers.map(p => p.email));
        return res.json(
            info ? { ...updatedFlight, emailInfo: info } : updatedFlight
        );
    }

    return res.json(updatedFlight);
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
