const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    phone: { type: Number },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, default: null}
});

// Encrypt password before saving
UserSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
