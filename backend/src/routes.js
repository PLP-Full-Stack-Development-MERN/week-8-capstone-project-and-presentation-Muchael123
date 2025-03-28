import {Router} from 'express';
import AuthRoutes from './routes/auth.routes.js';
import StoryRoutes from './routes/stories.routes.js';

const router = Router();
router.use("/auth", AuthRoutes);
router.use("/stories", StoryRoutes);

export default router;