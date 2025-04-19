import mongoose from "mongoose";

const product_schema = new mongoose.Schema({
    name:{type:String},
    brand:{type:String},
    pet:{type:String},
    stock:{type:String},
    category:{type:String},
    policy:{type:String},
    description:{type:String},
    image:{type:String}
})


const Store = new mongoose.model("product" , product_schema);

export default Store;