const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { Newsletter } = require('../models/Newsletter');
const nodemailer = require('nodemailer');

// Create transporter for sending emails
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Validation middleware
const subscribeValidation = [
  body('email').isEmail().normalizeEmail()
];

// Subscribe to newsletter
router.post('/subscribe', subscribeValidation, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;

    // Check if email already exists
    const existingSubscription = await Newsletter.findOne({ where: { email } });
    if (existingSubscription) {
      return res.status(400).json({ error: 'Email already subscribed' });
    }

    // Create new subscription
    await Newsletter.create({ email });

    // Send welcome email
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Welcome to Our Newsletter!',
      html: `
        <h1>Welcome to Our Newsletter!</h1>
        <p>Thank you for subscribing to our newsletter. You'll now receive updates about:</p>
        <ul>
          <li>Latest products and collections</li>
          <li>Exclusive offers and discounts</li>
          <li>Fashion tips and trends</li>
          <li>Special events and sales</li>
        </ul>
        <p>Stay tuned for our next update!</p>
        <p><small>To unsubscribe, click <a href="http://localhost:5173/unsubscribe?email=${email}">here</a></small></p>
      `
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: 'Successfully subscribed to newsletter!' });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({ error: 'Error processing subscription' });
  }
});

// Unsubscribe from newsletter
router.post('/unsubscribe', subscribeValidation, async (req, res) => {
  try {
    const { email } = req.body;

    // Find and delete subscription
    const subscription = await Newsletter.findOne({ where: { email } });
    if (!subscription) {
      return res.status(404).json({ error: 'Subscription not found' });
    }

    await subscription.destroy();

    // Send confirmation email
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Unsubscribed from Newsletter',
      html: `
        <h1>Unsubscription Confirmed</h1>
        <p>You have been successfully unsubscribed from our newsletter.</p>
        <p>We're sorry to see you go! If you change your mind, you can always subscribe again.</p>
      `
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: 'Successfully unsubscribed from newsletter' });
  } catch (error) {
    console.error('Newsletter unsubscription error:', error);
    res.status(500).json({ error: 'Error processing unsubscription' });
  }
});

module.exports = router;
