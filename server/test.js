const request = require('supertest');
const app = require('./app'); // Import the Express app
const chai = require('chai');
const expect = chai.expect;

describe('Airline Management System', () => {
    require('./tests/flights.test')(request(app), expect);
    require('./tests/passengers.test')(request(app), expect);
    require('./tests/config.test')(request(app), expect);
});
