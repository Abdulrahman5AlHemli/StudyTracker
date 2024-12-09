const mongoose = require('mongoose');

module.exports = {
    createDbConnection() {
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
}