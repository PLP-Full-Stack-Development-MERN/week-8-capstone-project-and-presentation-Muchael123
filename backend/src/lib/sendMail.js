import nodemailer from "nodemailer";

export default async function SendEmail(
    email, 
    subject = "Care-Connect User Verification", 
    message = null,  
) {
   

    const emailContent = message || defaultMessage;

  try{
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
      },
  });

  const mailOptions = {
      from: `"Care-Connect" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: subject,
      html: emailContent
  };

  const info = await transporter.sendMail(mailOptions);
  console.log("Email sent successfully: " + info.response);
  } catch(err){
    console.log("Error sending email", err.message);
  }
}