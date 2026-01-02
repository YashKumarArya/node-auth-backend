import {registerUser, loginUser} from '../services/auth.service.js';

// BASIC VALIDATION (email,password pressent or not) -> TRY REGISTER USER OR CATCH ERROR-> 
export async function register(req,res){

    const {email,password,name} =req.body;
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
        console.error(err);
        if(err.message === 'EMAIL_ALREADY_EXISTS' ){
            return res.status(err.statusCode).json({
                ok:false,
                message:'User already Exists'
            });
        }
        console.error(err);

        return res.status(500).json({
            ok:false,
            message:'Internal server error'
        }); 
    }
}
export async function login(req,res){
    const {email,password}=req.body;
    if(!email || !password){
        res.status(400).json({
            ok:false,
            message:'Email and password are required'
        })
    }
    try {
        const user = await loginUser({email,password});
        return res.status(200).json({
            ok:true,
            message:'Login successful',
            user
        })
        
    } catch (err) {
        if(err.message === 'INVALID_CREDENTIALS'){
        return res.status(401).json({
            ok:false,
            message:'Invalid email or password'
        });
    }
    console.error('Login error:',err);
    return res.status(500).json({
        ok:false,
        message:"Internal server error"
    })
        
    }
}