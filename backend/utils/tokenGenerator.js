import jwt from "jsonwebtoken";


const generateToken = (user) =>{
    return jwt.sign({userid:user._id} , process.env.JWT_SECRET , {expiresIn:"2d"})
}


export default generateToken;