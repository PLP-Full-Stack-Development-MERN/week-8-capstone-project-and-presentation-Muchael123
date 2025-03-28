import User from "../../models/user.js";

export default async function validateMail(req,res){
    const {email, token} = req.body;
    if(!email || !token) return res.status(400).json({message: "Email and token are required"});
    try{
        const user = await User.findOne({email});
        if(!user) return res.status(404).json({message: "User not found"});
        if(user.AuthCode.token !== token) return res.status(401).json({message: "Invalid token"});
        const currentTime = new Date();
        if(user.AuthCode.expiry < currentTime) return res.status(401).json({message: "Token expired"});
        user.verified = true;
        user.AuthCode.token = null;
        user.AuthCode.expiry = null;
        await user.save();
        res.status(200).json({message: "User verified successfully"});
        return;
    } catch(e){
        console.log("An error occured", e.message);
        res.status(500).json({error: "An error occured. Try again later"})
    }
}