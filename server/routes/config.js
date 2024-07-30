const express = require('express');
const router = express.Router();
const airports = require('../data/airports');

router.get('/', (req, res) => {
    res.json(airports);
});





module.exports = router;
