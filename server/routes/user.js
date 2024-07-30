const { Router } = require('express');
const jwt = require('jsonwebtoken');
const users = require('../data/users');
const router = Router();



const login = (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        const token = jwt.sign({ id: user.id }, process.env.JWT_PRIVATE_KEY);
        res.json({
            message: 'Login successful',
            token,
            clearance: user.clearance
        });
    } else {
        res.status(401).json({ error: 'Invalid username or password' });
    }
};


router.post('/register', (req, res) => {
    console.log('register');

    const { email, password, phone } = req.body;
    if (!email || !password || !phone) {
        res.status(400).json({ error: 'Email, password and phone are required' });
    };
    const user = users.find(u => u.email === email);
    if (user) {
        res.status(400).json({ error: 'User already exists' });
    } else {
        const newUser = {
            id: users.length + 1,
            email, password,
            phone,
            clearance: 'user'
        };
        users.push(newUser);
        res.json({ message: 'User created successfully' });
    }
});

router.post('/login', login);


module.exports = router;


