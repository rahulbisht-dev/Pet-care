import {z} from "zod";
import jwt from "jsonwebtoken"

export const validateUser = (req , res , next) =>{
    
    const token = req.cookies.userToken;
    if(!token){
        return res.status(400).send({success:false , message:"Please Log In To Access Petcare Services"});
    }
    
    const {userid} = jwt.verify(token , process.env.JWT_SECRET);
    req.userId = userid;
    next();

}



