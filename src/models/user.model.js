import mongoose,{Schema} from "mongoose"
import bcrypt from "bcrypt"
const userSchema = new Schema({
    name:{
        type:String,
        required:[true,"name is required"],
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:[true,"email should be unique"]
    },
    password:{
        type:String,
        required:[true,"password is required"],

    }
},{timestamps:true})

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
  
    this.password = await bcrypt.hash(this.password, 10);
    next();
  });

export default mongoose.model("User",userSchema)