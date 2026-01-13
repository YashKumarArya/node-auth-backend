import jwt from 'jsonwebtoken';

export function authenticate(req,res,next){
     const authHeader = req.headers.authorization;

     if (!authHeader || !authHeader.startsWith('Bearer ')) {
return res.status(401).json({
    ok:false,
    message:"Authorization is missing"});
      }
    const token = auth.Header.split(" ")[1];
// Attach User info to request
      try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
      } catch (err) {
        return res.status(401).json({
            ok:false,
            message:"Invalid or expired token"
        })
      }
}