import mongoose, { Schema } from "mongoose";
import { userRoles } from "../../middleware/auth.middleware.js";
export const genderTypes={male:"male",female:"female"}
export const roleTypes={user:"user",admin:"admin"}
const userSchema = new Schema({
    username:{
        type:String,
        minlength:2,
        maxlength:25,
        trim:true,
        required:[true,'username is required']
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        enum:Object.values(genderTypes),
        default:genderTypes.male
    },
    DOB:Date,
    address:String,
    phone:String,
    image:String,
    confirmEmail:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        enum:Object.values(roleTypes),
        default:roleTypes.user,
        },
        changePasswordTime: {
            type: Date,
            default: Date.now 
        },
    isDeleted:{type:Boolean,default:false}
},{timestamps:true})

const userModel =mongoose.models.User || mongoose.model("User",userSchema)
export default userModel