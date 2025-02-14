import userModel from "../../../DB/model/user.model.js";
import { emailEvent } from "../../../utils/events/email.event.js";
import { Error } from "mongoose";
import { asyncHandler } from "../../../utils/error/error.js";
import { successResponse } from "../../../utils/response/success.response.js";
import {  generateHash } from "../../../utils/security/hash.js";
import { generateEncryption } from "../../../utils/security/encryption.js";
import {  verifyToken } from "../../../utils/security/token.js";
 
export const signup =asyncHandler(  
    async(req,res,next)=>{

    const {username,email,password,confirmationPassword,phone}=req.body;

    if(password !== confirmationPassword){
        return next(new Error("password and confirmationPassword misMatch",{cause:400}))
    }
   
    if(await userModel.findOne({email})){
        return next(new Error("Email exist",{cause:409}))
    }
    const hashPassword = generateHash({plaintext:password ,salt:10})
    const encryptPhone = generateEncryption({plaintext:phone})
    const user = await userModel.create({username,email,password:hashPassword,phone:encryptPhone})

    emailEvent.emit("sendConfirmEmail",{email})
    return successResponse({res,message:"Done",data:{user},status:201})
})

export const confirmEmail =asyncHandler(
    async(req,res,next)=>{
    
        const {authorization}=req.headers;
        const decoded = verifyToken({token:authorization,signature:process.env.EMAIL_TOKEN_SIGNATURE})
        const user = await userModel.findOneAndUpdate({email:decoded.email},{confirmEmail:true},{new:true})
       return successResponse({res,message:"Done",data:{user}})
    
 }
)


