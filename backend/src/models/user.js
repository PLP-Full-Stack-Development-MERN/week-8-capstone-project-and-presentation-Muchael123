import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    coins: Number,
    verified: Boolean,
    AuthCode: {
        token: String,
        expiry: Date
    },

}, {versionKey: false, timestamps: true});

const User = mongoose.model('User', userSchema);
export default User;