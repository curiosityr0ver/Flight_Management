const nodemailer = require('nodemailer');


const sendFlightUpdateEmail = async (subject, flightDetails, HTMLformattedFlightDetails, recipients) => {

    try {
        // Create a transporter
        let transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Email options
        let mailOptions = {
            from: process.env.EMAIL_USER,
            bcc: recipients,
            subject,
            html: HTMLformattedFlightDetails,
        };

        // Send email
        let info = await transporter.sendMail(mailOptions);
        return info;
    }
    catch (error) {
        console.error('Error sending email:', error);
        return null;
    };
};

module.exports = { sendFlightUpdateEmail };