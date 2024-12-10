const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    courseId: { type: String },
    courseName: { type: String },
    credit: { type: Number },
    term: { type: String },
    color: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Course = mongoose.model('Course', CourseSchema);
module.exports = Course;
