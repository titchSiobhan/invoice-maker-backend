import express from 'express';
import cors from 'cors';
import authRouter from './routes/authRouter.js';
import companyRouter from './routes/companyRouter.js';
import userRouter from './routes/userRouter.js';
import taskRouter from './routes/taskRouter.js';
import invoiceRouter from './routes/invoiceRouter.js';
import jobRouter from './routes/jobRoutes.js';
import './middleware/passport.js';

import passport from 'passport';
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use("/uploads", cors(), express.static(path.join(__dirname, "middleware",  "uploads")));
app.use(cookieParser());

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
}
app.use(cors(
    corsOptions
));
app.use(express.json());


app.use(passport.initialize());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.use('/api/auth', authRouter);
app.use('/api/company', companyRouter);
app.use('/api/user', userRouter);
app.use('/api/task', taskRouter);
app.use('/api/invoice', invoiceRouter);
app.use('/api/job', jobRouter);

export default app;