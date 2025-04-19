import mongoose from "mongoose";


const cart_schema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId , ref:"User" , required:true},
    products:[{
        productId:{type:mongoose.Schema.Types.ObjectId , ref:"product"},
        quantity:{type:Number , default:0}
    }],
    totalAmount:{type:Number , default:null}
})

export const Cart = mongoose.model("cart" , cart_schema);

