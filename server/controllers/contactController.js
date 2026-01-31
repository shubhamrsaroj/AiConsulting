import Contact from '../models/Contact.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Configure Nodemailer Transporter
// Configure Nodemailer Transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports (upgrades to TLS)
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false // Helps if server has certificate issues
    },
    logger: true, // Log specific transaction details
    debug: true, // Include SMTP traffic in logs
    connectionTimeout: 30000 // 30 seconds
});

export const submitContactForm = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Save to Database
        const newContact = new Contact({ name, email, message });
        await newContact.save();

        // Send Email Notification - REMOVED
        // We now handle emails on the frontend using EmailJS to avoid server-side SMTP issues.
        // The backend is solely responsible for saving the contact to MongoDB.

        console.log('Contact saved to MongoDB');

        res.status(201).json({ message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error saving contact:', error);
        res.status(500).json({ error: 'Server Error' });
    }
};
