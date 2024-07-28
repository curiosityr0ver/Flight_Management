module.exports = (request, expect) => {
    describe('Config', () => {
        it('should GET all the airports', (done) => {
            request
                .get('/config/airports')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).to.be.an('array');
                    done();
                });
        });
    });
};
