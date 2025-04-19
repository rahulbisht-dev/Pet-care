import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId , ref:"user"},
    addressLine1:{type:String , required:true , default:""},
    addressLine2:{type:String , default:""},
    city:{type:String , required:true , default:""},
    pincode:{type:Number , required:true , default:""},
    state:{type:String , required:true , default:""},
    phoneNumber:{type:Number , required:true , default:""}
});

export const Address = mongoose.model("address" , AddressSchema);