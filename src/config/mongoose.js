const dotenv = require('dotenv')
dotenv.config()


const config ={
    hostname:process.env.Host || 'localhost',
    port: process.env.PORT || 8000,
    mongoDbUri: process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/BookingHall'
}

module.exports= config