export default function CodeEmail(
    username,
    verificationCode,expiryTime = new Date(Date.now() + 15 * 60000),) {
    const now = new Date();
    const timeDifference = expiryTime - now;
    const minutes = Math.floor(timeDifference / 60000);
    const seconds = Math.floor((timeDifference % 60000) / 1000);
    const defaultMessage = `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; text-align: center; }
    .container { background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); max-width: 400px; margin: auto; }
    .code { font-size: 32px; font-weight: bold; color: #007bff; margin: 20px 0; }
    .timer { font-size: 18px; font-weight: bold; color: #d9534f; margin: 10px 0; }
    .footer { margin-top: 20px; font-size: 14px; color: #555; }
    .disclaimer { font-size: 12px; color: #888; margin-top: 20px; text-align: left; }
  </style>
</head>
<body>
  <div class="container">
    <h2>Welcome to Story-Yetu! 🎉</h2>
    <img 
    src="https://res.cloudinary.com/dk5bvgq20/image/upload/v1633666824/Story-Yetu/Story-Yetu_Logo_2x" 
    alt="Story-Yetu Logo" 
    width="100" 
    height="100">
    <p>Hello <b>${username}</b>,</p>
    <p>We're thrilled to have you on board! 🚀 Let's re-imagine Story creation again</p>
    <p>To get started, use the verification code below to activate your account:</p>
    <div class="code">${verificationCode}</div>
    <p class="timer">Your verification code expires in <b>${minutes} minutes and ${seconds} seconds</b>.</p>
    <p>If you didn’t sign up, just ignore this email.</p>
    <div class="footer">
      <p>Regards,</p>
      <p><b>Story-Yetu Team</b></p>
    </div>
    <div class="disclaimer">
      <p><b>Disclaimer:</b> This email is intended for the recipient only. If you received it in error, please delete it immediately. Do not share your verification code with anyone. Story-Yetu will never ask for your password or personal details via email.</p>
    </div>
  </div>
</body>
</html>
`;

return defaultMessage;
}