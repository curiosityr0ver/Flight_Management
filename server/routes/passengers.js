const express = require('express');
const router = express.Router();
const { passengerSchema } = require('../utils/schemas');
let passengers = require('../data/passengers');

const generatePassengerId = () => {
    const idPrefix = 'P';
    const idSuffix = String(Math.floor(Math.random() * 9000) + 1000).padStart(3, '0');
    return `${idPrefix}${idSuffix}`;
};

router.get('/', (req, res) => {
    res.json(passengers);
});

router.get('/:id', (req, res) => {
    const passenger = passengers.find(p => p.id === req.params.id);
    if (passenger) {
        res.json(passenger);
    } else {
        res.status(404).json({ error: 'Passenger not found' });
    }
});

router.post('/', (req, res) => {
    const newPassenger = req.body;
    newPassenger.id = generatePassengerId(); // Autogenerate passenger ID

    const { error } = passengerSchema.validate(newPassenger);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    passengers.push(newPassenger);
    res.status(201).json(newPassenger);
});

router.put('/:id', (req, res) => {
    const index = passengers.findIndex(p => p.id === req.params.id);
    if (index !== -1) {
        const updatedPassenger = req.body;
        updatedPassenger.id = req.params.id; // Ensure the ID remains unchanged

        const { error } = passengerSchema.validate(updatedPassenger);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        passengers[index] = updatedPassenger;
        res.json(updatedPassenger);
    } else {
        res.status(404).json({ error: 'Passenger not found' });
    }
});

router.delete('/:id', (req, res) => {
    const index = passengers.findIndex(p => p.id === req.params.id);
    if (index !== -1) {
        const deletedPassenger = passengers.splice(index, 1)[0];
        res.json(deletedPassenger);
    } else {
        res.status(404).json({ error: 'Passenger not found' });
    }
});

module.exports = router;
