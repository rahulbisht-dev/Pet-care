import mongoose from "mongoose";

const url = process.env.DATABASE_URL;

const connection = async() =>{
    await mongoose.connect(url);
    console.log("database connected successfully.")
}


export default connection;