// backend/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' }, // Add role field with default value
    aadhaarNumber: { type: String, required: true, unique: true }, // Aadhaar number field
    email: { type: String, required: true, unique: true }, // Email field
    phone: { type: String, required: true }, // Phone number field
    address: { type: String }, // Address field (optional)
    dateOfBirth: { type: Date }, // Date of birth field (optional)
    incomeSource: { type: String, required: true }, // Source of income
    annualIncome: { type: Number, required: true } // Annual income
});

const User = mongoose.model('User', userSchema);
module.exports = User;
