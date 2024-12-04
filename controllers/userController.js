const bcrypt = require('bcrypt');
const User = require('../models/user');

exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required: name, email, password' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user
    const user = await User.create({
      name,
      email,
      password_hash: hashedPassword, // Use the correct column name
    });

    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({
      message: 'Error creating user',
      error: error.message,
    });
  }
};


// Get all users
exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.findAll({
        attributes: ['id', 'name', 'email'], // Select only required fields
      });
  
      res.status(200).json({
        message: 'Users fetched successfully',
        users,
      });
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({
        message: 'Error fetching users',
        error: error.message,
      });
    }
  };
  
  // Get a user by ID
  exports.getUserById = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id, {
        attributes: ['id', 'name', 'email'], // Select only required fields
      });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({
        message: 'User fetched successfully',
        user,
      });
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({
        message: 'Error fetching user',
        error: error.message,
      });
    }
  };
  




// const User = require('../models/user');

// // Create a new user
// exports.createUser = async (req, res) => {
//   const { name, email, password } = req.body;
  
//   if (!name || !email || !password) {
//     return res.status(400).json({ message: 'All fields are required: name, email, password' });
//   }

//   try {
//     // Check if the user already exists
//     const existingUser = await User.findOne({ where: { email } });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User with this email already exists' });
//     }

//     // Create a new user
//     const newUser = await User.create({ name, email, password });
//     res.status(201).json({
//       message: 'User created successfully',
//       user: { id: newUser.id, name: newUser.name, email: newUser.email },
//     });
//   } catch (err) {
//     res.status(500).json({ message: 'Error creating user', error: err.message });
//   }
// };
