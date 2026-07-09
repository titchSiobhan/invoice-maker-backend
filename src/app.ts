import express from 'express';
import cors from 'cors';
import authRouter from './routes/authRouter.js';
import companyRouter from './routes/companyRouter.js';
import userRouter from './routes/userRouter.js';
import taskRouter from './routes/taskRouter.js';
import invoiceRouter from './routes/invoiceRouter.js';

const app = express();

const corsOptions = {
    origin: 'http://localhost:5173'
}
app.use(cors(
    corsOptions
));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/auth', authRouter);
app.use('/api/company', companyRouter);
app.use('/api/user', userRouter);
app.use('/api/task', taskRouter);
app.use('/api/invoice', invoiceRouter);

export default app;