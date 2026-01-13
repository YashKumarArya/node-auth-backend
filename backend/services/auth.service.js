import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../db/index.js';

export async function registerUser({email,password,name}){
    const hasedPassword = await bcrypt.hash(password,10);

    try {
        const result =await pool.query(
            `INSERT INTO users(email,password_hash,name)
             VALUES ($1,$2,$3) 
             RETURNING id, email, name, created_at`,
             [email.trim().toLowerCase(),hasedPassword,name?.trim() || null]
        )
        // success response
        return result.rows[0];
    } catch (err) {
        if(err.code === '23505'){
            const error= new Error('EMAIL_ALREADY_EXISTS');
            error.statusCode = 400;
            throw error;
        }

       throw err;
        
    }


}
export async function loginUser({email,password}){
   const result = await pool.query(
    `
    SELECT id, email, password_hash, name, created_at
    FROM users
    WHERE email = $1
    `,
    [email.toLowerCase()]
  );
if (result.rows.length === 0){
    const error= new Error("INVALID_CREDENTIALS");
    error.statusCode=401;
    throw error;
}
    const user=result.rows[0];
    const isMatch= await bcrypt.compare(password,user.password_hash);
    
    if(!isMatch){
        const error=new Error("INVALID_CREDENTIALS")
        error.statusCode=401;
        throw error;
    }
    const token =jwt.sign({
        id:user.id,
        email:user.email
    },process.env.JWT_SECRET,{
        expiresIn:'1h'
    });
    return({
        token,
        user:{
            id:user.id,
            email:user.email,
            name:user.name,
        },
    });

}