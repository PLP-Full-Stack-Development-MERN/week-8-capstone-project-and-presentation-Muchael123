import SendEmail from "../../lib/sendMail.js";
import CodeEmail from "../../static/codeEmail.js";
import User from "../../models/user.js";
import bcrypt from "bcryptjs";
import generateVerificationCode from "../lib/gencode.js";

export default async function RegisterUser(req, res){
   try{
   const {email, password, username} = req.body;
   const userExist = await User
   .findOne({username})
   if(userExist) return res.status(409).json({message: "Username already exists"})

   const userExists = await User.findOne({ email });
   

   if (userExists) return res.status(409).json({ message: 'User with the Email already exists' });

  
    const token = generateVerificationCode();

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    
    const expiryTime = new Date();
    expiryTime.setMinutes(expiryTime.getMinutes() + 30);

    // Create the new user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      AuthCode: {
        token,
        expiry: expiryTime
      }
    });
    console.log(user, expiryTime)
    await user.save()

    res.status(201).json({
      message: `User ${user.username} registered successfully. Check your email for verification code.`,
    });
    const meaasage = CodeEmail(user.username, token, expiryTime);
    return SendEmail(user.email, "Story-Yetu User Verification", meaasage);
  
   }
   catch(e){
      res.status(500).json({error: "An error occured. Try again"})
   }
}