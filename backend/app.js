import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import authRoutes from './routes/auth.routes.js';

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/auth',authRoutes)
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