const Joi = require('joi')


const validator = require('express-joi-validation').createValidator({})

//create a simple schema for validating message requests
const messageSchema = Joi.object({
    message : Joi.string().required()
})

module.exports.messageSchema = messageSchema