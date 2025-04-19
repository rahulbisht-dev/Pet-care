import mongoose from "mongoose"

const crew_schema = new mongoose.Schema({
    firstname:{type:String , required:true},
    lastname:{type:String , required:true},
    email:{type:String , required:true},
    password:{type:String , required:true},
    image:{type:String , required:true},
    speciality:{type:String , required:true},
    experience:{type:Number , default:1},
    degree:{type:String},
    fees:{type:Number , required:true},
    about:{type:String},
    available:{type:Boolean , default:true},
    address:{
        street:{type:String , required:true},
        pincode:{type:Number , required:true},
        country:{type:String , required:true}
    },
    date:{type:Number , required:true},
    slots_booked:{type:Map , of:[String] , default:{}},
    appointment:{type:mongoose.Schema.ObjectId , ref:"appointment" , default:null}
},{minimize:false})



const Crew =   mongoose.model("crew" , crew_schema);

export default Crew;