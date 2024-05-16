const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {
    connectToMongoDB,
    generateCustomIDs,

}= require('./utils/customIdGenerator')

const createRoomSchema= new Schema ({
    numberOfSeats:String,
    amenities: Schema.Types.Mixed,
    oneHourPrice:String,
    roomName:{type:String,unique:true}
})



createRoomSchema.pre('save', async function (next) {
    if (!this.roomName) {
        const prefix = 'RoomNo'
        const seqFieldName = 'roomId'

        try {
            const customIDs = await generateCustomIDs(
                prefix,
                'room',
                seqFieldName
            )
            this.roomName = customIDs.customIDReference
            this.roomId = customIDs.customIDNumber
        } catch (error) {
            console.error('Error generating custom IDs:', error)
            throw error
        }
    }

    next()
})
const CreateRoom = mongoose.model('Rooms',createRoomSchema)

module.exports =CreateRoom