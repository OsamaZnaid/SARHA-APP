import joi from 'joi'
import { generalFileds } from '../../middleware/validation.middleware.js'
export const sendMessage =joi.object().keys({
    message:joi.string().min(5).max(50000).required(),
    recipientId:generalFileds.id.required()
}).required()