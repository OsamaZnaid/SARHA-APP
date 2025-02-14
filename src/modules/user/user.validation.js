import joi from 'joi'
import {generalFileds} from '../../middleware/validation.middleware.js'


export const shareProfile=joi.object().keys({ 
   userId:generalFileds.id.required()
}).required()

export const updateProfile=joi.object().keys({
    username:generalFileds.username,
    phone:generalFileds.phone,
    DOB:joi.date().less("now")
}).required()


export const updatePassword=joi.object().keys({
    oldPassword:generalFileds.password.required(),
    password:generalFileds.password.not(joi.ref("oldPassword")).required(),
    confirmationPassword:generalFileds.confirmationPassword.valid(joi.ref("password")).required(),

}).required()