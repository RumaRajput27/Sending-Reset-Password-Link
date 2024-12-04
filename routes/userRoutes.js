const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Define the route to create a new user
router.post('/', userController.createUser);
// Route to fetch all users
router.get('/users', userController.getAllUsers);

// Optional: Route to fetch a specific user by ID
router.get('/users/:id', userController.getUserById);

module.exports = router;
