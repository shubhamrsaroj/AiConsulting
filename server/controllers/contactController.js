import Contact from '../models/Contact.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Configure Nodemailer Transporter
const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use other services or generic SMTP
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
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

        // Send Email Notification
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // Sending to yourself/admin
            subject: `New Contact Form Submission from ${name}`,
            text: `
        You have a new message from your website:
        
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
            html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `
        };

        // Attempt to send email, but don't block response if it fails (or handle as needed)
        try {
            if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
                await transporter.sendMail(mailOptions);
                console.log('Email notification sent');
            } else {
                console.log('Email credentials not found, skipping email notification.');
            }
        } catch (emailError) {
            console.error('Error sending email:', emailError);
            // Continue to send success response to user even if email fails
        }

        res.status(201).json({ message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error saving contact:', error);
        res.status(500).json({ error: 'Server Error' });
    }
};
