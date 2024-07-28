const request = require('supertest');
const app = require('../app');
const flights = require('../data/flights');

describe('Airline Management System', () => {
    describe('Flights', () => {
        it('should GET all the flights', done => {
            request(app)
                .get('/flights')
                .expect('Content-Type', /json/)
                .expect(200, flights, done);
        });

        it('should GET a flight by ID', done => {
            request(app)
                .get('/flights/FL123')
                .expect('Content-Type', /json/)
                .expect(200, flights[0], done);
        });

        it('should POST a new flight', done => {
            const newFlight = {
                airline: 'Test Airline',
                flightNumber: 'TA999',
                departureAirport: 'JFK',
                arrivalAirport: 'LAX',
                departureTime: '2024-07-26T14:10:00Z',
                arrivalTime: '2024-07-26T17:10:00Z',
                departureRunway: '4L',
                arrivalRunway: '25R',
                gate: 'B23',
                terminal: '4',
                delay: 0
            };

            request(app)
                .post('/flights')
                .send(newFlight)
                .expect('Content-Type', /json/)
                .expect(201)
                .end((err, res) => {
                    if (err) return done(err);
                    newFlight.id = res.body.id;
                    request(app)
                        .get(`/flights/${res.body.id}`)
                        .expect('Content-Type', /json/)
                        .expect(200, newFlight, done);
                });
        });

        it('should return 400 for POST conflicting flight', done => {
            const conflictingFlight = {
                airline: 'Test Airline',
                flightNumber: 'TA999',
                departureAirport: 'JFK',
                arrivalAirport: 'LAX',
                departureTime: '2024-07-26T10:01:00Z',
                arrivalTime: '2024-07-26T13:01:00Z',
                departureRunway: '4L',
                arrivalRunway: '25R',
                gate: 'B23',
                terminal: '4',
                delay: 0
            };

            request(app)
                .post('/flights')
                .send(conflictingFlight)
                .expect('Content-Type', /json/)
                .expect(400)
                .end((err, res) => {
                    if (err) return done(err);
                    res.body.should.have.property('error');
                    res.body.should.have.property('conflictingFlight');
                    done();
                });
        });

        it('should return 400 for POST flight with invalid runway', done => {
            const invalidRunwayFlight = {
                airline: 'Test Airline',
                flightNumber: 'TA999',
                departureAirport: 'JFK',
                arrivalAirport: 'LAX',
                departureTime: '2024-07-26T14:10:00Z',
                arrivalTime: '2024-07-26T17:10:00Z',
                departureRunway: '99X',
                arrivalRunway: '25R',
                gate: 'B23',
                terminal: '4',
                delay: 0
            };

            request(app)
                .post('/flights')
                .send(invalidRunwayFlight)
                .expect('Content-Type', /json/)
                .expect(400)
                .end((err, res) => {
                    if (err) return done(err);
                    res.body.should.have.property('error');
                    done();
                });
        });

        it('should PUT an existing flight', done => {
            const updatedFlight = {
                id: 'FL123',
                airline: 'Updated Airline',
                flightNumber: 'UA123',
                departureAirport: 'JFK',
                arrivalAirport: 'LAX',
                departureTime: '2024-07-26T10:30:00Z',
                arrivalTime: '2024-07-26T13:30:00Z',
                departureRunway: '4L',
                arrivalRunway: '25R',
                gate: 'B23',
                terminal: '4',
                delay: 0
            };

            request(app)
                .put('/flights/FL123')
                .send(updatedFlight)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    request(app)
                        .get(`/flights/FL123`)
                        .expect('Content-Type', /json/)
                        .expect(200, updatedFlight, done);
                });
        });

        it('should return 400 for PUT conflicting flight', done => {
            const conflictingUpdate = {
                airline: 'Conflicting Airline',
                flightNumber: 'CA124',
                departureAirport: 'JFK',
                arrivalAirport: 'LAX',
                departureTime: '2024-07-26T10:01:00Z',
                arrivalTime: '2024-07-26T13:01:00Z',
                departureRunway: '4L',
                arrivalRunway: '25R',
                gate: 'B23',
                terminal: '4',
                delay: 0
            };

            request(app)
                .put('/flights/FL124')
                .send(conflictingUpdate)
                .expect('Content-Type', /json/)
                .expect(400)
                .end((err, res) => {
                    if (err) return done(err);
                    res.body.should.have.property('error');
                    res.body.should.have.property('conflictingFlight');
                    done();
                });
        });

        it('should DELETE a flight', done => {
            request(app)
                .delete('/flights/FL123')
                .expect('Content-Type', /json/)
                .expect(200, done);
        });

        it('should return 404 for GET non-existing flight by ID', done => {
            request(app)
                .get('/flights/FL999')
                .expect('Content-Type', /json/)
                .expect(404, done);
        });

        it('should return 404 for PUT non-existing flight', done => {
            const nonExistingUpdate = {
                airline: 'Non-existing Airline',
                flightNumber: 'NA123',
                departureAirport: 'JFK',
                arrivalAirport: 'LAX',
                departureTime: '2024-07-26T10:30:00Z',
                arrivalTime: '2024-07-26T13:30:00Z',
                departureRunway: '4L',
                arrivalRunway: '25R',
                gate: 'B23',
                terminal: '4',
                delay: 0
            };

            request(app)
                .put('/flights/FL999')
                .send(nonExistingUpdate)
                .expect('Content-Type', /json/)
                .expect(404, done);
        });

        it('should return 404 for DELETE non-existing flight', done => {
            request(app)
                .delete('/flights/FL999')
                .expect('Content-Type', /json/)
                .expect(404, done);
        });
    });
});
