const NAMESPACE = 'CREATE ROOM'
const mongoose = require('mongoose')
const config = require('../config/mongoose')

const {get} = require('lodash')

const {STATUS_CODES} = require('../constants')

const CreateRoom = require('../models/createRoom')

const {CreateRoomRequestValidators}= require('../utility/validators')
const {BadRequestError} = require('../utility/customErrors')


const  saveRoom = async(req,res) =>{
    try{
        const requestBody= get(req,'body')
        const   numberOfSeats=  get(requestBody,'numberOfSeats')
        const amenities= get(requestBody,'amenities')
        const oneHourPrice = get(requestBody,'oneHourPrice')

        // validation for requestbody
        const validationErrors= CreateRoomRequestValidators.validateCreateRoomRequest(requestBody)

        if(Array.isArray(validationErrors) && validationErrors.length>0){
            throw new BadRequestError(
                'validation failed',
                STATUS_CODES.BAD_REQUEST,
                validationErrors
            )
        }

        // Connect to mongodb using config file
        await mongoose.connect(config.mongoDbUri,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        
        const roomCreate = new CreateRoom({
            numberOfSeats:numberOfSeats,
            amenities:amenities,
            oneHourPrice:oneHourPrice,
        })
        await roomCreate.save()

        // close mongodb
        await mongoose.disconnect()

        // respond

        res.status(STATUS_CODES.CREATED).json({
            message:'ROOM RECORD SAVED SUCCESSFULLY'
        })
    }catch(error){
        if(error instanceof BadRequestError){
            return res.status(STATUS_CODES.BAD_REQUEST).json({
                message:error.message,
                errors:error.errors,
            })
        }

        // send error response
        console.error(error)

        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            message:'Internal server error',
        })
    } finally{
        // close mongodb connection
        mongoose.connection.close()
    }
}

module.exports ={
    saveRoom
}