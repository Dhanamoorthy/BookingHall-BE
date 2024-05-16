const  express = require('express')
const router =express.Router()
const controller = require('../controllers/createRoom')

router.post('/',controller.saveRoom)

module.exports= router