import User from "../modules/User.js";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "../config/emailConfig.js";
import Appointment from "../modules/Appointment.js"
import generateToken from "../utils/tokenGenerator.js"
import Store from "../modules/Store.js";
import { Address } from "../modules/Address.js";
import cloudinary from "../config/Cloudinary.js";
import streamifier from "streamifier"


//$function to log in the user...
export const loginUser = async(req , res) =>{

    try{
        const {email , password} = req.body;

        const user = await User.findOne({email}).populate("address");
        
        if(!user){
            return res.status(401).send({success:false , message:"Invailed Email or Password"});
        }
    
        const isPassword = await bcrypt.compare(password , user.password);
    
        if(!isPassword){
            return res.status(401).send({success:false , message:"Invailed Email or Password"});
        }
    
        const userToken = generateToken(user);
        res.cookie("userToken" , userToken ,{httpOnly:true , secure:true , sameSite:"None" , maxAge:1000*60*60*48});
    
        return res.status(200).send({success:true, message:"Logged In Successfully" , data:user});
    }
    catch(error){
        console.log(error);
        res.status(501).send({success:false , message:"Internal Server Error , Please try Again Later."})
    }
}


//$function to sign up the user...
export const userSignUp = async(req , res) =>{
    try{
        const userId = req.userId;
        const {firstname , lastname , email , password} = req.body;
        console.log(req.body);
    
        const isEmail = await User.findOne({email});
    
        if(isEmail){
            return res.status(401).send({success:false , message:"Email Already Exists"});
        }
    
        const salt = await bcrypt.genSalt(10);
        const hashed_pass = await bcrypt.hash(password , salt);
    
        const newUser = new User({firstname , lastname , email , password:hashed_pass});
        await newUser.save();
    
    
        const token = generateToken(newUser);
        const verificationUrl = await sendVerificationEmail(email , token);
        res.cookie("userToken" , token , {httpOnly:true , secure:true ,sameSite:"None" ,  maxAge:1000*60*60*48});
    
        return res.status(200).send({success:true , message:"User Registered Successfully , Please Check Your Gmail to verify your Email Address." , data:newUser});
    }
    catch(error){
        console.log(error);
        res.status(501).send({success:false , message:"Internal Server Error , Please try Again Later."})
    }
}


//$ function to get all the appointments by user Id...
export const getAllAppointmentsByUserId = async(req , res) =>{
    try{
        const userId = req.userId;
        console.log("userid :- " , userId)
        const appointments = await Appointment.find({userid:userId}).populate("crewid");

        return res.status(200).send({success:true , data:appointments})
    }
    catch(error){
        console.log(error);
        res.status(501).send({success:false , message:"Internal Server Error , Please try Again Later."})
    }
}




export const getAllProducts = async(req , res) =>{

    try{
        const products = await Store.find({});
        res.status(200).send({success:true , data:products});
    }
    catch(error){
        console.log(error);
        res.status(501).send({success:false , message:"Internal Server Error , Please try Again Later."})
    }
}


export const updateUser = async(req , res) =>{

    try{
        const userId = req.userId;
        const {firstname , lastname ,  dob , gender , addressLine1 , addressLine2 , state , city , pincode , phoneNumber} = req.body;
        const user = await User.findById(userId).populate("address");
        const image_file = req.file;
        
 //  Upload image to Cloudinary if it exists
        if (image_file) {
          const streamUpload = (buffer) => {
            return new Promise((resolve, reject) => {
              const stream = cloudinary.uploader.upload_stream(
                { resource_type: "image", folder: "your_folder_name" }, // optional: set folder
                (error, result) => {
                  if (result) resolve(result);
                  else reject(error);
                }
              );
              streamifier.createReadStream(buffer).pipe(stream);
            });
          };

          const imageUpload = await streamUpload(image_file.buffer);
          const imageurl = imageUpload.secure_url;
          user.image = imageurl;
        }

        if(user){
            user.firstname = firstname;
            user.lastname = lastname;
            user.dob = dob || null;
            user.gender = gender || null;
            const useraddress = user.address;
            useraddress.addressLine1 = addressLine1 || null;
            useraddress.addressLine2 = addressLine2 || null;
            useraddress.state = state || null;
            useraddress.city = city || null;
            useraddress.pincode = pincode || null;
            useraddress.phoneNumber = phoneNumber || null;
            await useraddress.save();
        }
        await user.save();
        res.send({success:true , message:"User Profile Updated Successfully.." , data:user})
    }
    catch(error){
        console.log(error);
        res.status(501).send({success:false , message:"Internal Server Error , Please try Again Later."})  
    }
}

export const updateUserAddress = async(req , res) =>{
    try{
        const userId = req.userId;
        const {addressLine1 , addressLine2 , city , state , pincode , phoneNumber} = req.body;

        const address = await Address.findOne({user:userId});
        if(address){
            address.addressLine1 = addressLine1;
            address.addressLine2 = addressLine2;
            address.city = city;
            address.state = state;
            address.pincode = pincode;
            address.phoneNumber = phoneNumber;
        }
        await address.save();
        return res.send({success:true , message:"User Address Updated Successfully"});
    }
    catch(error){
        console.log(error);
        res.status(501).send({success:false , message:"Internal Server Error , Please try Again Later."}) 
    }
}


export const logOut = async(req , res) =>{

    try{
        res.clearCookie("userToken" , {httpOnly:true ,sameSite:"None" ,  secure:true});
        return res.status(200).send({success:true , message:"Successfully Logged Out.."})
    }
    catch(error){
        console.log(error);
        res.status(501).send({success:false , message:"Internal Server Error , Please try Again Later."})        
    }
}


export const getUserData = async(req , res) =>{

    try{
        const userId = req.userId;
        const user = await User.findById(userId).populate("address");
        return res.status(200).send({success:true , data:user});
    }
    catch(error){
        console.log(error);
        res.status(501).send({success:false , message:"Internal Server Error , Please try Again Later."})    
    }
}


export const cancelAppointment = async(req , res) =>{

    try{
        const appointmentId = req.params.appointmentId;
        const appointment = await Appointment.findByIdAndDelete(appointmentId);
        return res.status(200).send({success:true , message:"Appointment Cancelled Successfully..."})
    }
    catch(error){
        console.log(error);
        res.status(501).send({success:false , message:"Internal Server Error , Please try Again Later."})    
    }
}








