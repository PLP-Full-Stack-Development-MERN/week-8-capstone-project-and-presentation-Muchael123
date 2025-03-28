import express, {json} from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import appRoutes from './routes.js';
import morgan from 'morgan';
const app = express();
//allow all cors origins
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
app.use(json());

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB', err));

app.use('/api', appRoutes);
app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`);
});
