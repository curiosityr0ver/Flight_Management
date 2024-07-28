const express = require('express');
const bodyParser = require('body-parser');
const flightsRouter = require('./routes/flights');
const passengersRouter = require('./routes/passengers');
const configRouter = require('./routes/config');
const cors = require('cors');


const app = express();
app.use(cors());

app.use(bodyParser.json());

app.use('/flights', flightsRouter);
app.use('/passengers', passengersRouter);
app.use('/config', configRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Airline management system listening at http://localhost:${port}`);
});




module.exports = app;
