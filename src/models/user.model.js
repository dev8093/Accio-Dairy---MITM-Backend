import mongoose, { Schema } from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "name is required"],
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: [true, "email should be unique"]
    },
    password:{
        type:String,
        // required:[true,"password is required"],
    },
    profilePicture: {
        type: String,
        default: ''
    },
    verified:{
        type:Boolean,
        default:false
    }
}, { timestamps: true })

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            name:this.name,
    },
    process.env.ACCESS_TOKEN_SECRATE,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id:this._id
    },
    process.env.REFRESH_TOKEN_SECRATE,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
    )
    
}

export default mongoose.model("User",userSchema)
