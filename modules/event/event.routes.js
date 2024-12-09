const express = require('express');
const { createEvent, deleteEvent, updateEvent, getAllEvents } = require('./event.controller');
const { isAuthenticated } = require('../../config/passport');

const eventRouter = express.Router();

eventRouter.post('/event/create', isAuthenticated, createEvent);
eventRouter.delete('/event/delete/:id', isAuthenticated, deleteEvent);
eventRouter.post('/event/update/:id', isAuthenticated, updateEvent);
eventRouter.get('/event/getAll', isAuthenticated, getAllEvents);

module.exports = eventRouter;