import userModel from "../DB/model/user.model.js";
import { asyncHandler } from "../utils/error/error.js";
import { verifyToken } from "../utils/security/token.js";

export const userRoles={
    user:"User",
    admin:"Admin"
}
export const authentication = ()=>{
 return asyncHandler(
    async(req,res,next)=>{
        const {authorization}=req.headers;
        if (!authorization) {
         return next(new Error('Authorization header is missing',{cause:401})) 
     }
        const [bearer,token]=authorization.split(" ") ||[]
        if(!bearer || !token){
         return next(new Error('In-valid token parts'))
        }
        
        let signature = undefined
        switch (bearer) {
                case 'admin':
                signature= process.env.TOKEN_SIGNATURE_ADMIN
                break;
                case 'Bearer':
                    signature= process.env.TOKEN_SIGNATURE
                break;
            default:
                break;
        }
        
        const decoded = verifyToken({token,signature})
        if(!decoded?.id){
            return next(new Error('In-valid token payload',{cause:400}))
        }
        const user = await userModel.findById(decoded.id)
        if(!user){
            return next(new Error('not register account',{cause:404}))
        }
              
        if(user.changePasswordTime?.getTime()>=decoded.iat *1000){
            return next(new Error("In-valid credentials",{cause:400}))
        }
    
        req.user=user;
        return next()
     } 
 )
       
   }


export const authorization = (accessRoles=[])=>{
    return asyncHandler(
        async(req,res,next)=>{
        if(!accessRoles.includes(req.user.role)){
            return next(new Error('un authorized account',{cause:403}))
        }

         return next()
      }) 
   }