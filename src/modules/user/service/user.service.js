import userModel from "../../../DB/model/user.model.js";
import messageModel from "../../../DB/model/message.model.js";
import { asyncHandler } from "../../../utils/error/error.js";
import { successResponse } from "../../../utils/response/success.response.js";
import { generateDecryption } from "../../../utils/security/encryption.js";
import {compareHash, generateHash} from "../../../utils/security/hash.js"
export const profile =asyncHandler(
    async(req,res,next)=>{
    
        req.user.phone = generateDecryption({cipherText:req.user.phone})
        const messages = await messageModel.find({recipientId:req.user._id}).populate([//يستخدم لعمل join بين models
            {path:"recipientId",select:"-password"}
        ])
        return successResponse({res,data:{user:req.user,messages}})
}
)
export const shareProfile =asyncHandler(
    async(req,res,next)=>{
      const user =await userModel.findOne({_id:req.params.userId,isDeleted:false}).select("username email image")
        return user ? successResponse({res,data:{user}}): next(new Error("In-valid account Id",{cause:404}))
}
)

export const updateProfile =asyncHandler(
    async(req,res,next)=>{
        const user = await userModel.findByIdAndUpdate(req.user._id,req.body,{new:true,runValidators:true})
        return successResponse({res,data:{user}})
}
)

export const updatePassword =asyncHandler(
    async(req,res,next)=>{
        const {password,oldPassword}=req.body;
        if(!compareHash({plaintext:oldPassword,hashValue:req.user.password} )){
            return next(new Error("In-valid old password",{cause:409}))
        }
        const hashPassword= generateHash({plaintext:password})
        const user = await userModel.findByIdAndUpdate(req.user._id,{password:hashPassword,changePasswordTime:Date.now()},{new:true,runValidators:true})
        return successResponse({res,data:{user}})
}
)


export const freezeProfile =asyncHandler(
    async(req,res,next)=>{
        
        const user = await userModel.findByIdAndUpdate(req.user._id,{isDeleted:true,changePasswordTime:Date.now()},{new:true,runValidators:true})
        return successResponse({res,data:{user}})
}
)