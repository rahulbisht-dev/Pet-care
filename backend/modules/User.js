import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    firstname:{type:String , required:true},
    lastname:{type:String },
    email:{type:String, required:true , unique:true},
    password:{type:String },
    image:{type:String , default:null},
    address:{type:mongoose.Schema.Types.ObjectId , ref:"address" , default:null},
    gender:{type:String , default:null},
    dob:{type:String , default:null},
    isEmailVerified:{type:Boolean , default:false},

},{minimize:false , timestamps:true})


const User = new mongoose.model("User" , Schema);

export default User;