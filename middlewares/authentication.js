const jwt=require("jsonwebtoken")
require("dotenv").config();

const authenticateJWT=(req,res,next)=>{
    //console.log(req);
    const token=req.header('Authorization').split(' ')[1];
    console.log(token);
    if(!token)
        return res.status(403).json({message : "No token provideds,authorization denied"});
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        next();
    }catch(error){
        return res.status(401).json({message : "Invalid token,authorization denied"});
    }
};

module.exports=authenticateJWT;