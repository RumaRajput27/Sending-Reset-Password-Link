const nodemailer = require('nodemailer');

// Define the function to send email
const sendEmail = async (to, subject, body) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or another email service
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender email address
      to,
      subject,
      html: body, // Email content in HTML
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error(`Error sending email: ${error.message}`);
    throw error;
  }
};

// Export the function
module.exports = {
  sendEmail,
};
