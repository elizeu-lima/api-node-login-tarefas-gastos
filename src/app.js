import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import expenseRoutes from './routes/expenseRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);
app.use('/contacts', contactRoutes);
app.use('/expenses', expenseRoutes);

export default app;
