import {Router} from 'express';
import createStory from '../controllers/stories/createStrory.js';
import ValidateUserToken from '../middlewares/validateUser.js';
import validateStory from '../middlewares/stories/genstory.validate.js';

const router = Router();

router.post('/create',ValidateUserToken,validateStory, createStory);


export default router;