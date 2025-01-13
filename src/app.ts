import express from 'express';
import lookupRoutes from './routes/lookupRoutes';

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api', lookupRoutes);

export default app;
