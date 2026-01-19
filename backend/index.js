// import app from './app.js';
// import dotenv from 'dotenv';
// import  apiMiddleware from './middleware/apiMiddleware.js';

// dotenv.config();
// const port = process.env.PORT ;

// // global middlewares


// // root route (NO middleware here)
// app.get('/', (req, res) => {
//   res.json({ ok: true, message: 'API is running' });
// });

// // 👇 middleware applied ONLY to /api routes
// app.use('/api', apiMiddleware);

// // api route\
// app.get('/api',(req, res) => {
//   console.log('her i am /api route')
  

//   res.set('Cache-Control', 'no-store').send('hey i am api route');
// });

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
// index.js
import app from './app.js';
import dotenv from 'dotenv';
import pool from './db/index.js';

dotenv.config();
const port = process.env.PORT ;
async function startServer() {
  
  try {
    await pool.query('SELECT 1');
    console.log('Database is Ready');
    app.listen(port,()=>{
      console.log(`Server is running on http://localhost:${port}`);
    })
  } catch (err) {
       console.error('Failed to connect to database:',err.message);
       process.exit(1);
  }

}
startServer();