import "dotenv/config"
import express from "express";
import connection from "./config/Database.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/UserRoute.js";
import appointmentRouter from "./routes/appointmentRoute.js";
import orderRoute from "./routes/orderRoute.js";
import passport from "./strategy/googleStrategy.js";

// variables
const app = express();
const port = process.env.PORT;


// middlewares
app.use(cors({origin:process.env.FRONTEND_URL , credentials:true}));
app.use(express.json());
app.use(cookieParser());
app.use("/user" , userRouter);
app.use("/appointment" , appointmentRouter);
app.use("/order" , orderRoute);
app.use(passport.initialize());






app.get("/" , (req , res) =>{
    res.send("api working")
})



const server  = async() =>{
    try{
        await connection();
        app.listen(port , console.log("server started sucessfully on the port " , port));
    }
    catch(error){
        console.log(error);
    }
}

server();
