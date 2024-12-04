// const crypto = require('crypto');
const ForgotPasswordRequest = require('../models/forgotPasswordRequest');
const User = require('../models/user');
const { v4: uuidv4 } = require('uuid');
const { sendEmail } = require('../utils/emailService');

// Create a forgot password request
exports.createForgotPasswordRequest = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const resetRequest = await ForgotPasswordRequest.create({
      id: uuidv4(),
      user_id: user.id,
      is_active: true,
    });

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetRequest.id}`;

    await sendEmail(email, 'Password Reset Link', `<p>Click <a href="${resetLink}">here</a> to reset your password</p>`);

    res.status(200).json({ message: 'Password reset link sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating forgot password request', error: error.message });
  }
};

// Handle resetting the password
exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    // Find the reset request
    const resetRequest = await ForgotPasswordRequest.findOne({
      where: { id: token, is_active: true },
    });

    if (!resetRequest) {
      return res.status(404).json({ message: 'Invalid or expired reset link' });
    }

    // Find the associated user
    const user = await User.findByPk(resetRequest.user_id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Hash the new password
    const bcrypt = require('bcrypt');
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    user.password_hash = hashedPassword;
    await user.save();

    // Mark the reset request as inactive
    resetRequest.is_active = false;
    await resetRequest.save();

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({
      message: 'Error resetting password',
      error: error.message,
    });
  }
};







// const { v4: uuidv4 } = require('uuid');
// const ForgotPasswordRequest = require('../models/forgotPasswordRequest');
// const User = require('../models/user');
// const { sendResetPasswordEmail } = require('../utils/emailService'); // Import the email service

// // Function to generate a reset password link and store it in the database
// const generateResetPasswordLink = async (req, res) => {
//   try {
//     const { email } = req.body;

//     // Check if the user exists
//     const user = await User.findOne({ where: { email } });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Generate UUID for the request
//     const resetId = uuidv4();

//     // Create the forgot password request in the database
//     const request = await ForgotPasswordRequest.create({
//       id: resetId,
//       userId: user.id,
//       isActive: true
//     });

//     // Generate a reset password link
//     const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetId}`;

//     // Send the reset link via email using the email service
//     await sendResetPasswordEmail(email, resetLink);

//     res.status(200).json({ message: 'Password reset link sent!' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Function to handle resetting the password
// const resetPassword = async (req, res) => {
//   try {
//     const { resetId, newPassword } = req.body;

//     // Find the forgot password request
//     const request = await ForgotPasswordRequest.findOne({ where: { id: resetId, isActive: true } });

//     if (!request) {
//       return res.status(404).json({ message: 'Invalid or expired reset link' });
//     }

//     // Update the user password (assume password is hashed here)
//     const user = await User.findByPk(request.userId);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     user.password = hashPassword(newPassword);  // Assume hashPassword is a function that hashes the password
//     await user.save();

//     // Mark the reset request as inactive
//     request.isActive = false;
//     await request.save();

//     res.status(200).json({ message: 'Password reset successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// module.exports = { generateResetPasswordLink, resetPassword };
