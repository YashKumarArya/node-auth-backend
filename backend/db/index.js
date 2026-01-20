// backend/db/index.js
import pkg from 'pg';
import { env } from "../config/env.js";


const {Pool}= pkg;
const pool =new Pool(
    {
        host:env.DB.HOST,
        port:env.DB.PORT,
        user:env.DB.USER,
        password:env.DB.PASSWORD,
        database:env.DB.NAME
    }
);
pool.on('connect',()=>{
    console.log('Postgres is connected');   
})

export default pool;