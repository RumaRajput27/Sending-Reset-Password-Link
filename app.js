const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const forgotPasswordRoutes = require('./routes/forgotPasswordRoutes');
const sequelize = require('./database/connection'); // DB connection
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use('/', forgotPasswordRoutes);
app.use('/', userRoutes);

// Use the forgot password routes
// app.use('/api', forgotPasswordRoutes);
// Add user routes
// app.use('/', userRoutes);
// app.use('/forgot-password', forgotPasswordRoutes);
// app.use('/users', userRoutes); // Register the /users route


// Database connection
sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.error('Database connection error:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
