const nodemailer = require('nodemailer');

// Create a test account for development
let transporter = null;

async function initializeTransporter() {
  if (!transporter) {
    // For development, we'll use ethereal.email
    const testAccount = await nodemailer.createTestAccount();

    transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    });

    console.log('Test email account:', {
      user: testAccount.user,
      pass: testAccount.pass,
      preview: 'https://ethereal.email'
    });
  }
  return transporter;
}

async function sendPasswordResetEmail(email, resetToken, firstName) {
  const transport = await initializeTransporter();
  
  const resetUrl = `http://localhost:5173/reset-password?token=${resetToken}`;
  
  const mailOptions = {
    from: '"E-commerce Support" <support@ecommerce.com>',
    to: email,
    subject: 'Password Reset Request',
    html: `
      <h1>Password Reset Request</h1>
      <p>Hello ${firstName},</p>
      <p>You requested to reset your password. Click the link below to reset it:</p>
      <p><a href="${resetUrl}" style="padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">Reset Password</a></p>
      <p>This link will expire in 1 hour.</p>
      <p>If you didn't request this, please ignore this email.</p>
      <p>Best regards,<br>E-commerce Support Team</p>
    `
  };

  const info = await transport.sendMail(mailOptions);
  console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
  return info;
}

module.exports = {
  sendPasswordResetEmail
};
