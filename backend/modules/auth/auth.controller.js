// backend/modules/auth/auth.controller.js
import {registerUser, loginUser, logoutUser, refreshAccessToken, logoutAllDevices} from './auth.service.js';
import { generateAccessToken } from '../../utils/token.js';
import {env} from '../../config/env.js';


// BASIC VALIDATION (email,password pressent or not) -> TRY REGISTER USER OR CATCH ERROR-> 
export async function register(req,res,next){

    const {email,password,name} = req.body;
    if(!email || !password){
        return res.status(400).json({
            ok:false,
            message:'email and password are required'
        })
    }
    try {
        const user = await registerUser({email,password,name});

        res.status(201).json({
            ok:true,
            message:'User created successfully',
            user:user});
            
    } catch (err) {
      console.error("[Auth:Register]", err);
      next(err);
  }
}

export async function login(req,res,next){
    const {email,password}=req.body;
    if(!email || !password){
        return res.status(400).json({
            ok:false,
            message:'Email and password are required'
        })
    }
    try {
        const {accessToken,refreshToken,user} = await loginUser({email,password});
        res.cookie('refreshToken',refreshToken,{
            httpOnly: true,
            sameSite: "strict",
            secure: env.NODE_ENV === "production",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        return res.status(200).json({
            ok:true,
            message:'Login successful',
            accessToken,
            user
        })
        
    } catch (err) {
       console.error("[Auth:Login]", err);
       next(err); 
  }
}
export async function refresh(req, res, next) {
  try {
    const incomingToken = req.cookies?.refreshToken;

    const { userId, refreshToken } =
      await refreshAccessToken(incomingToken);

    const accessToken = generateAccessToken({ id: userId });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      ok: true,
      accessToken,
    });
  } catch (err) { 
    console.error("[Auth:Refresh]", err);
    next(err);
  }
}

export async function logout(req, res, next) {
  try {
    await logoutUser(req.cookies?.refreshToken);
    res.clearCookie("refreshToken");
    return res.json({ ok: true });
    
  } catch (err) {
    console.error("[Auth:Logout]", err);
    next(err);
  }

}
export async function logoutAll(req, res, next) {
  try {
    const userId = req.user.id; // comes from access token

    await logoutAllDevices(userId);

    // Clear cookie for THIS device
    res.clearCookie("refreshToken");

    return res.json({
      ok: true,
      message: "Logged out from all devices",
    });
  } catch (err) {
    console.error("[Auth:LogoutAll]", err);
    next(err);
  }
}