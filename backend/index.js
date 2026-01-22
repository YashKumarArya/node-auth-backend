// backend/index.js
import app from './app.js';
import pool from './db/index.js';
import { env } from "./config/env.js";

async function startServer() {
  
  try {
    await pool.query('SELECT 1');
    console.log('Database is Ready');
    app.listen(env.PORT,()=>{
      console.log(`Server is running on http://localhost:${env.PORT}`);
    })
  } catch (err) {
       console.error('Failed to connect to database:',err);
       process.exit(1);
  }

}
startServer();