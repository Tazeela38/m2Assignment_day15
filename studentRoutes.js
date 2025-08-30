// routes/studentRoutes.js
const express = require('express');
const Student = require('../models/Student');

const router = express.Router();

// POST /api/add-student
router.post('/add-student', async (req, res, next) => {
  try {
    const { name, email, course } = req.body;
    const student = await Student.create({ name, email, course });
    res.status(201).json({ message: 'Student created', data: student });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
