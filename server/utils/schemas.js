const Joi = require('joi');
const airports = require('../data/airports');

const getRunwaysByAirportCode = (airportCode) => {
    const airport = airports.find(a => a.code === airportCode);
    return airport ? airport.runways : [];
};

const flightSchema = Joi.object({
    id: Joi.string().required(),
    airline: Joi.string().required(),
    flightNumber: Joi.string().required(),
    departureAirport: Joi.string().required(),
    arrivalAirport: Joi.string().required(),
    departureTime: Joi.date().iso().required(),
    arrivalTime: Joi.date().iso().required(),
    departureRunway: Joi.string().custom((value, helpers) => {
        const runways = getRunwaysByAirportCode(helpers.state.ancestors[0].departureAirport);
        if (!runways.includes(value)) {
            return helpers.message(`Runway ${value} is not valid for departure airport ${helpers.state.ancestors[0].departureAirport}`);
        }
        return value;
    }).required(),
    arrivalRunway: Joi.string().custom((value, helpers) => {
        const runways = getRunwaysByAirportCode(helpers.state.ancestors[0].arrivalAirport);
        if (!runways.includes(value)) {
            return helpers.message(`Runway ${value} is not valid for arrival airport ${helpers.state.ancestors[0].arrivalAirport}`);
        }
        return value;
    }).required(),
    gate: Joi.string().required(),
    terminal: Joi.string().required(),
    delay: Joi.number().integer().min(0).required(),
    status: Joi.string().valid('on-time', 'cancelled', 'delayed').required()
});

const passengerSchema = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
    flightId: Joi.string().required()
});

module.exports = {
    flightSchema,
    passengerSchema
};
