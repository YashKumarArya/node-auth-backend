

const apiMiddleware1 = (req,res,next)=>{
   console.log('global middleware1')
      next();
}

export default apiMiddleware1;