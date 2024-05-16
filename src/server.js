const bodyParser = require('body-parser');
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const config = require('./config/mongoose');
const { STAUS_CODES } = require('./constants');



const rooms=require('./routes/createRoom')


const app = express();
dotenv.config();

mongoose.connect(config.mongoDbUri, {});
const db = mongoose.connection;
db.on('error', (err) => {
    console.error('Connection error:', err);
});

db.once('open', () => {
    console.log('Successfully connected to MongoDB');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Health check Route
app.get('/', (req, res) => {
    res.status(STAUS_CODES.OK).send('Hello World\n');
});


app.use('/rooms',rooms)

// Error Handling
app.use((req, res) => {
    const error = new Error('URL NOT FOUND');
    res.status(STAUS_CODES.NOT_FOUND).json({
        message: error.message
    });
});

app.listen(config.port, config.hostname, () => {
    console.log(`Server is listening on http://${config.hostname}:${config.port}`);
});

app.use(express.json())
