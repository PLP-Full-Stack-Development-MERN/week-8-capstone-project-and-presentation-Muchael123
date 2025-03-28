
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type:String, required: true},
    password: {type: String,required: true},
    coins: {type: Number, default: 0, required: true},
    verified: {type:Boolean, default:false, required: true},
    AuthCode: {
        token: String,
        expiry: Date
    },

}, {versionKey: false, timestamps: true});

const User = mongoose.model('User', userSchema);
export default User;