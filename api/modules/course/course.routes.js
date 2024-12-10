const express = require('express');
const { createCourse, deleteCourse, updateCourse, getAllCourses, getCourse } = require('./course.controller');
const { isAuthenticated } = require('../../config/passport');

const courseRouter = express.Router();

courseRouter.post('/course/create', isAuthenticated, createCourse);
courseRouter.delete('/course/delete/:id', isAuthenticated, deleteCourse);
courseRouter.post('/course/update/:id', isAuthenticated, updateCourse);
courseRouter.get('/course/getAll', isAuthenticated, getAllCourses);
courseRouter.get('/course/:id', isAuthenticated, getCourse);

module.exports = courseRouter;