const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const flightsRouter = require('./routes/flights');
const passengersRouter = require('./routes/passengers');
const configRouter = require('./routes/config');
const userRouter = require('./routes/user');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();


const app = express();
app.use(cors());

app.use(bodyParser.json());

app.use('/flights', flightsRouter);
app.use('/passengers', passengersRouter);
app.use('/config', configRouter);
app.use('/user', userRouter);

app.use(express.static(path.join(__dirname, 'public')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Airline management system listening at http://localhost:${port}`);
});

module.exports = app;
