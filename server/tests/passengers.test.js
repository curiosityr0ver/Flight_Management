module.exports = (request, expect) => {
    describe('Passengers', () => {
        it('should GET all the passengers', (done) => {
            request
                .get('/passengers')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).to.be.an('array');
                    done();
                });
        });

        it('should GET a passenger by ID', (done) => {
            request
                .get('/passengers/P001')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).to.be.an('object');
                    expect(res.body.id).to.equal('P001');
                    done();
                });
        });

        it('should POST a new passenger', (done) => {
            const newPassenger = {
                name: 'Test Passenger',
                flightId: 'FL123'
            };
            request
                .post('/passengers')
                .send(newPassenger)
                .expect('Content-Type', /json/)
                .expect(201)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('id');
                    done();
                });
        });

        it('should PUT an existing passenger', (done) => {
            const updatedPassenger = {
                id: 'P001',
                name: 'Updated Passenger',
                flightId: 'FL123'
            };
            request
                .put('/passengers/P001')
                .send(updatedPassenger)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).to.be.an('object');
                    expect(res.body.name).to.equal('Updated Passenger');
                    done();
                });
        });

        it('should DELETE a passenger', (done) => {
            request
                .delete('/passengers/P001')
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('id', 'P001');
                    done();
                });
        });

        it('should return 404 for GET non-existing passenger by ID', (done) => {
            request
                .get('/passengers/P999')
                .expect('Content-Type', /json/)
                .expect(404)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('error');
                    done();
                });
        });

        it('should return 404 for PUT non-existing passenger', (done) => {
            const updatedPassenger = {
                id: 'P999',
                name: 'Non-Existing Passenger',
                flightId: 'FL123'
            };
            request
                .put('/passengers/P999')
                .send(updatedPassenger)
                .expect('Content-Type', /json/)
                .expect(404)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('error');
                    done();
                });
        });

        it('should return 404 for DELETE non-existing passenger', (done) => {
            request
                .delete('/passengers/P999')
                .expect(404)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('error');
                    done();
                });
        });
    });
};
