import {Router} from 'express';
import  Login from '../controllers/auth/login.js';
import Register from '../controllers/auth/register.js';
import ValidateLogDetails from '../middlewares/auth/login.validate.js';
import validateRegDetails from '../middlewares/auth/reg.validate.js';
import validateMail from '../controllers/auth/validateMail.js';
import resendCode from '../controllers/auth/resendCode.js';

const router = Router();

router.post('/signup',validateRegDetails, Register);
router.post('/signin',ValidateLogDetails, Login);
router.post('/confirm-email', validateMail);
router.post('/reset-password', (req,res) => {
    res.status(502).json({message: "Not implemented"});
});
router.post("/resend-verification-code", resendCode );

export default router;