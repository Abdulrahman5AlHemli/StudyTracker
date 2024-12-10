const express = require('express');
const morgan = require('morgan');
const path = require('path')
const cors = require('cors')
const uuid = require('uuid');
const mongoose = require('mongoose');
require('dotenv').config();

const userRouter = require('./modules/user/user.routes');
const courseRouter = require('./modules/course/course.routes');
const eventRouter = require('./modules/event/event.routes');
const passport = require('passport');

const app = express();

// Define the path to your static files
app.use(express.static(path.join(__dirname, 'public')));

// Send the HTML file on a certain route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'Home.html'));
});

app.use(morgan("dev"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

cors({origin: '*'});

// Configuring the request to append a unique id.
app.use((req, res, next) => {
    req.reqId = uuid.v4;
    next();
});

// initialize passport
app.use(passport.initialize());

// Load all routes
app.use('/api', userRouter);
app.use('/api', courseRouter);
app.use('/api', eventRouter);
// app.use('/api', orderRouter);

// Error middleware
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    console.log(`An error occurred in handling the request ${err.stack ? err.stack : JSON.stringify(err)}`);

    if (err.status === 404) {
        return res.json({
            message: 'Not Found.',
            response: 404,
            data: {},
        });
    }
    return res.json({
        message: 'Something went wrong. Please try again.',
        errors: [],
        data: {},
    });
});

function createDbConnection() {
    // Connect to DB
    if (!process.env.MONGO_DB_ADDRESS || process.env.MONGO_DB_ADDRESS === '') {
        console.log('No address provided for mongo DB. Exiting server...');
        process.exit(1);
    }

    const dbUrl = process.env.MONGO_DB_ADDRESS;
    mongoose.connect(dbUrl).catch((error) => {
        console.log('Error while connecting to database. Check .env to verify if the provided address is correct.');
        console.log(error.stack ? error.stack : error);
        process.exit(1);
    });
    // If connection is successful
    mongoose.connection.on('connected', () => {
        console.log('Connected to mongoDB.');
    });
    // If there is an error in connection
    mongoose.connection.on('error', (err) => {
        console.log(err.stack ? err.stack : err);
        process.exit(1);
    });
    // When connection is disconnected
    mongoose.connection.on('disconnected', (err) => {
        console.log('Mongoose connection disconnected.');
    });
}

createDbConnection();

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
    console.log(`Server is listening on  port ${PORT}`)
})

module.exports = app;