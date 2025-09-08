// Create Server

const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const authRoutes = require('./routes/auth.routes');
const foodRoutes = require('./routes/food.routes');

// This is a middle ware that is responsible for the data that we see through teh req.body

app.use(express.json());

// Cookie Parser
app.use(cookieParser());
app.get('/', (req, res) => {
  res.send('Hello World');
});

// It tells that the API is related to authentication
app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);

module.exports = app;
