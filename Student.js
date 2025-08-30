// models/Student.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'name is required'],
      minlength: [3, 'name must be at least 3 characters'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'email is required'],
      unique: true, // creates a unique index
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'email must be valid'],
    },
    course: {
      type: String,
      required: [true, 'course is required'],
      trim: true,
    },
  },
  { timestamps: true }
);

// Ensure unique index exists for email
studentSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model('Student', studentSchema);
