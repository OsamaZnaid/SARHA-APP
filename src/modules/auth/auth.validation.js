import joi from 'joi'
import {generalFileds } from "../../middleware/validation.middleware.js"

export const signup =joi.object().keys({
    username:generalFileds.username.required(),
    email:generalFileds.email.required(),
    password:generalFileds.password.required(),
    confirmationPassword:generalFileds.confirmationPassword.valid(joi.ref('password')).required(),
    phone:generalFileds.phone.required(),
    // id:joi.boolean().required(),
    // 'accept-language':joi.string().valid("en","ar"),
    // flag:joi.string().valid("Palestine","Oman")
    // age:joi.number().positive(),
    // flag:joi.boolean().sensitive(true).falsy(0).truthy(1),
    // skills:joi.array().items(joi.string(),joi.number(),joi.object({name:joi.string()})).min(2).max(5).required(),
    // DOB:joi.date().less("now")
}).required().options({allowUnknown:false})


export const signup_custom ={
    body: joi.object().keys({
        username:joi.string().min(2).max(25).required(),
        email:joi.string().email({minDomainSegments:2,maxDomainSegments:2,tlds:{allow:['com','edu']}}).required().messages({
            'string.email':"please enter valid email format like example@gmail.com",
            'string.empty':"email cannot be empty",
            "any.required":"email is required"
        }),
        password:joi.string().pattern(new RegExp()).required(),
        confirmationPassword:joi.string().valid(joi.ref('password')).required(),
        phone:joi.string().pattern(new RegExp(/^(002|\+2)?01[0125][0-9]{8}$/)).required(),
        // age:joi.number().positive(),
        // flag:joi.boolean().sensitive(true).falsy(0).truthy(1),
        // skills:joi.array().items(joi.string(),joi.number(),joi.object({name:joi.string()})).min(2).max(5).required(),
        // DOB:joi.date().less("now")
    }).required().options({allowUnknown:false}),


    params:joi.object().keys({
        id:joi.boolean().required()
    }).required().options({allowUnknown:false}),

    headers:joi.object().keys({
        'accept-language':joi.string().valid("en","ar")
    }).required().options({allowUnknown:true})

}


export const login = joi.object().keys({
    email:generalFileds.email.required(),
    password:generalFileds.password.required(),
}).options({allowUnknown:false}).required()