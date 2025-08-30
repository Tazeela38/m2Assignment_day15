// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

const studentRoutes = require('./routes/studentRoutes');

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Day 15 Mongoose Validation server running' });
});

// Routes
app.use('/api', studentRoutes);

// Global error handler (handles Mongoose validation + duplicate key errors)
app.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    const errors = Object.keys(err.errors).reduce((acc, key) => {
      acc[key] = err.errors[key].message;
      return acc;
    }, {});
    return res.status(400).json({ message: 'Validation failed', errors });
  }
  // Duplicate key error from MongoDB (e.g., unique email)
  if (err && (err.code === 11000 || err.code === 11001)) {
    const field = Object.keys(err.keyPattern || err.keyValue || {})[0] || 'email';
    return res.status(409).json({ message: 'Duplicate key error', errors: { [field]: `${field} must be unique` } });
  }

  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('Mongo connection error:', err);
    process.exit(1);
  });
