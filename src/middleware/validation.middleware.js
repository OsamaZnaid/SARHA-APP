import joi from 'joi';
import { Types } from 'mongoose'

export const validateObjectId=(value,helper)=>{
    return Types.ObjectId.isValid(value)
    ?true
    :helper.message("In-valid object Id")
}


export const generalFileds={
    username:joi.string().min(2).max(25).required().messages({
            'string.min':"min is 2",
            'strinf.empty':"userName cannot be empty ",
            'any.required':"userNaem i required"
        }),
        email:joi.string().email({minDomainSegments:2,maxDomainSegments:2,tlds:{allow:['com','edu']}}).required().messages({
            'string.email':"please enter valid email format like example@gmail.com",
            'string.empty':"email cannot be empty",
            "any.required":"email is required"
        }),
        password:joi.string().pattern(new RegExp()).required(),
        confirmationPassword:joi.string(),
        phone:joi.string().pattern(new RegExp(/^(002|\+2)?01[0125][0-9]{8}$/)).required(),
        id:joi.string().custom(validateObjectId),
        'accept-language':joi.string().valid("en","ar"),
}

export const validation =(schema)=>{
    return (req,res,next)=>{
        const inputData={...req.body,...req.query,...req.params}
        if(req.headers['accept-language']){
            inputData['accept-language']=req.headers['accept-language']
        }
        console.log({inputData});
        
    const validationResult=schema.validate(inputData,{abortEarly:false})
        if(validationResult.error){
            return res.status(400).json({message:"validation result",validationResult:validationResult.error.details})
        }
        return next()
    }
}


export const validation_custom =(schema)=>{
    return (req,res,next)=>{
        const validationResult=[]
        for (const key of Object.keys(schema)) {
                const validationError=schema[key].validate(req[key],{abortEarly:false})
                if(validationError.error){
                    validationResult.push(validationError.error.details)
        }
    }

    if(validationResult.length>0){
     return res.status(400).json({message:"validation result",validationResult})
    } 
    return next()
    // const validationError=schema.validate(req.body,{abortEarly:false})
        // if(validationError.error){
        //     return res.status(400).json({message:"validation result",validationError:validationError.error.details})
        // }

        // const validationErrorQuery=schema.validate(req.query,{abortEarly:false})
        // if(validationErrorQuery.error){
        //     return res.status(400).json({message:"validation result query",validationError:validationErrorQuery.error.details})
        // }
        // return next()
    }
}