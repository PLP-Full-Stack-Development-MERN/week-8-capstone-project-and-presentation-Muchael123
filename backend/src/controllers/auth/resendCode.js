import generateVerificationCode from "../../lib/gencode.js";
import SendEmail from "../../lib/sendMail.js";
import User from "../../models/user.js";
import CodeEmail from "../../static/codeEmail.js";

export default async function resendCode(req, res) {
    const {email} = req.body;
    if(!email) return res.status(400).json({message: "Email is required"});
    try{
        const user = await User.findOne({email});
        if(!user) return res.status(404).json({message: "User not found"});
        if(user.verified === true) return res.status(400).json({message: "User already verified"});
        const token = generateVerificationCode();
        const expiryTime = new Date();
        expiryTime.setMinutes(expiryTime.getMinutes() + 30);
        user.AuthCode.token = token;
        user.AuthCode.expiry = expiryTime;
        const message = CodeEmail(user.username, token,expiryTime);
        await user.save();
        await SendEmail(user.email, "Story-Yetu User Verification", message);
        return res.status(200).json({message: `Verification code sent to ${user.email}`});
    }catch(e){
        console.log("An error occured", e.message);
        return res.status(500).json({error: "An error occured. Try again later"})
    }
}