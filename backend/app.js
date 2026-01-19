// app.js
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';

const app = express();

app.use(morgan('dev'));
app.use(cors({
  origin: "http://localhost:3000", // frontend URL
  credentials: true,
}));
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.use('/auth',authRoutes);
app.use('/user',userRoutes);
//  basic health check of server
 app.get('/',(req,res)=>{
    res.status(200).json({ok:true, message:'server is running'})
 });

 app.use((req,res)=>{
    res.status(404).json({error:'not found'});
    
 })
 app.use((err,req,res,next)=>{
    res.status(500).json({error:err.message});
    
 })
 export default app;