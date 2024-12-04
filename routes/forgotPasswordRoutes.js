const express = require('express');
const forgotPasswordController = require('../controllers/forgotPasswordController'); // Import the controller

const router = express.Router();

// POST endpoint to generate a reset password link
// router.post('/forgot-password', generateResetPasswordLink);
router.post('/forgot-password', forgotPasswordController.createForgotPasswordRequest);

// Route to reset password
router.post('/reset-password', forgotPasswordController.resetPassword);

// POST endpoint to reset the password
// router.post('/reset-password', resetPassword);

module.exports = router;
