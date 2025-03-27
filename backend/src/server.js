import express, {json} from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import appRoutes from './routes.js';
const app = express();
app.use(cors());
app.use(json());

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB', err));

app.use('/api', appRoutes);
app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`);
});
