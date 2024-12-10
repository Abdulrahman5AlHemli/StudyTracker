const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    date: { type: String },
    name: { type: String },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    type: { type: String },
    time: { type: String },
    completed: { type: Boolean, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Event = mongoose.model('Event', EventSchema);
module.exports = Event;
