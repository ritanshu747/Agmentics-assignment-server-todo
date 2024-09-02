const express = require('express');
const cors= require('cors');
require('dotenv').config();
const DbConnection = require('./config/DB');
const TaskRoutes = require('./Routes/TaskRoutes')
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to the database
DbConnection();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/tasks', TaskRoutes);



// Start the server
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});