import {Router} from 'express';
import AuthRoutes from './routes/auth.routes.js';
const router = Router();
router.use("/auth", AuthRoutes);

export default router;