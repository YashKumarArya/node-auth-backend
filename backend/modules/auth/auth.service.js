// backend/modules/auth/auth.service.js
import bcrypt from 'bcrypt';
import pool from '../../db/index.js';
import {  generateRefreshTokenPlain, hashRefreshToken, compareRefreshToken } from '../../utils/refreshToken.js';
import { generateAccessToken } from '../../utils/accessToken.js';
import AppError from '../../utils/AppError.js';

export async function registerUser({email,password,name}){
    const hashedPassword = await bcrypt.hash(password,10);

    try {
        const result =await pool.query(
            `INSERT INTO users(email,password_hash,name)
             VALUES ($1,$2,$3) 
             RETURNING id, email, name, created_at`,
             [email.trim().toLowerCase(),hashedPassword,name?.trim() || null]
        )
        // success response
        return result.rows[0];
    } catch (err) {
        if(err.code === '23505'){
          throw new AppError('EMAIL_ALREADY_EXISTS',400)
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
    throw new AppError('INVALID_CREDENTIALS',401);
    // const error= new Error("INVALID_CREDENTIALS");
    // error.statusCode=401;
    // throw error;
}
    const user=result.rows[0];
    const isMatch= await bcrypt.compare(password,user.password_hash);
    
    if(!isMatch){
       throw new AppError('INVALID_CREDENTIALS',401);
    }
    const accessToken = generateAccessToken({ id: user.id });
    const refreshToken = generateRefreshTokenPlain();
    const hashedRefreshToken = await hashRefreshToken(refreshToken); 
    
    await pool.query(
        `
        INSERT INTO refresh_tokens(user_id,token_hash,expires_at)
        VALUES ($1,$2, NOW() + INTERVAL '7 days')`,
        [user.id,hashedRefreshToken]
    )
    return({
        accessToken,
        refreshToken,
        user:{
            id:user.id,
            email:user.email,
            name:user.name,
        },
    });

}
export async function refreshAccessToken(incomingToken) {
  if (!incomingToken) {
   throw new AppError('NO_REFRESH_TOKEN',401);
  }

  const result = await pool.query(
    `
    SELECT id, user_id, token_hash
    FROM refresh_tokens
    WHERE expires_at > NOW()
    `
  );

  let matchedRow = null;

  for (const row of result.rows) {
    const isMatch = await compareRefreshToken(
      incomingToken,
      row.token_hash
    );
    if (isMatch) {
      matchedRow = row;
      break;
    }
  }

  if (!matchedRow) {
    throw new AppError("INVALID_REFRESH_TOKEN", 401);
  }

  // Rotate token
  await pool.query(
    `DELETE FROM refresh_tokens WHERE id = $1`,
    [matchedRow.id]
  );

  const newPlain = generateRefreshTokenPlain();
  const newHashed = await hashRefreshToken(newPlain);

  await pool.query(
    `
    INSERT INTO refresh_tokens (user_id, token_hash, expires_at)
    VALUES ($1, $2, NOW() + INTERVAL '7 days')
    `,
    [matchedRow.user_id, newHashed]
  );

  return {
    userId: matchedRow.user_id,
    refreshToken: newPlain,
  };
}

export async function logoutUser(incomingToken) {
  if (!incomingToken) return;

  const result = await pool.query(
    `SELECT id, token_hash FROM refresh_tokens`
  );

  for (const row of result.rows) {
    const isMatch = await compareRefreshToken(
      incomingToken,
      row.token_hash
    );
    if (isMatch) {
      await pool.query(
        `DELETE FROM refresh_tokens WHERE id = $1`,
        [row.id]
      );
      break;
    }
  }
}
export async function logoutAllDevices(userId) {
  if (!userId) {
    throw new AppError("USER_ID_REQUIRED", 400);
  }

  await pool.query(
    `
    DELETE FROM refresh_tokens
    WHERE user_id = $1
    `,
    [userId]
  );
}
