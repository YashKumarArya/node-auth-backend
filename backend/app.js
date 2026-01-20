// backend/app.js
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import authRoutes from './modules/auth/auth.routes.js';
import userRoutes from './modules/users/user.routes.js';
import { env } from "./config/env.js";
import { globalErrorHandler } from "./middleware/error.middleware.js";
import homepageRoutes from './modules/homepage/homepage.routes.js';

const app = express();

app.use(morgan('dev'));
app.use(cors({
  origin: env.CLIENT_ORIGIN, // frontend URL
  credentials: true,
}));
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/auth',authRoutes);
app.use('/user',userRoutes);
app.use('/homepage',homepageRoutes);
// basic health check of server
 app.get('/',(req,res)=>{
    res.status(200).json({ok:true, message:'server is running'})
 });

// 404 handler
 app.use((req,res)=>{
    res.status(404).json({error:'not found'});
    
 })
 // Global error handler (LAST)
 app.use(globalErrorHandler);
 export default app;