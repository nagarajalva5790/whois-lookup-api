import express from 'express';
import lookupRoutes from './routes/lookupRoutes';
import cors from 'cors';

const app = express();

// Use CORS middleware
app.use(cors({
    origin: ['http://localhost:3000', 'https://whois-app-ui-alva.vercel.app'], // Allow your frontend's origin
    methods: ['GET', 'POST'], // Specify allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
  }));

// Middleware
app.use(express.json());

// Routes
app.use('/api', lookupRoutes);

export default app;
