const { Router } = require('express');
const { sendEmail } = require('../utils/emailUtils');


const sendEmailHandler = async (req, res) => {
    const { recipients, subject, text } = req.body;

    // Validate input
    if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
        return res.status(400).json({ message: 'Recipients array is required and cannot be empty' });
    }

    try {
        const info = await sendEmail({ recipients, subject, text });
        res.status(200).json({ message: 'Email sent', info });
    } catch (error) {
        res.status(500).json({ message: 'Error sending email', error });
    }
};

const router = Router();
router.post('/', sendEmailHandler);

module.exports = router;