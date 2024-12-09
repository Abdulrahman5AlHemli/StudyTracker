const express = require('express');
const morgan = require('morgan');
const path = require('path')
const cors = require('cors')
const uuid = require('uuid');
require('dotenv').config();

const { createDbConnection } = require('./config/dbConnection');
const userRouter = require('./modules/user/user.routes');
const courseRouter = require('./modules/course/course.routes');
const eventRouter = require('./modules/event/event.routes');

const app = express();

// Define the path to your static files
app.use(express.static(path.join(__dirname, 'public')));

// Send the HTML file on a certain route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Home.html'));
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
// app.use(passport .initialize());

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

createDbConnection();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on  port ${PORT}`)
})
