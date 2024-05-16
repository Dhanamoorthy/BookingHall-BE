const  Joi = require('joi')


class CreateRoomRequestValidators {

    static validateCreateRoomRequest(requestBody){

        // schema define for validation
        const schema =Joi.object ({
            numberOfSeats:Joi.string().required().messages({
                'string.empty':'number of seats is Required',
            }),
            amenities:Joi.object().required().messages({
                'object.empty':'amenities is Required'
            }),
            oneHourPrice:Joi.string().required().messages({
                'string.empty':'one Hour price for is Required',
            }),
        }) 

        // validate requestbody against schema
        const {error} =schema.validate(requestBody,{abortEarly:false})
        // return validate result
        return error ? error.details.map((err)=> err.message):true
    }
}


module.exports = CreateRoomRequestValidators