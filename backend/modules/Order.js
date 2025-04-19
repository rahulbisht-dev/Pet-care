import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId , ref:"User" , required:true},
    items:[{
        productId:{type:mongoose.Schema.Types.ObjectId ,  ref:"product" , required:true},
        quantity:{type:Number , required:true}
    }],

    totalAmount:{type:Number},
    shippingAddress:{type:mongoose.Schema.Types.ObjectId , ref:"address"},
    paymentStatus:{type:String , enum:["processing" , "completed"] , default:"processing"}
} , {timestamps:true});


export const Order =  mongoose.model("order" , orderSchema);

