import mongoose from 'mongoose';

const appointmentschema = new mongoose.Schema({
    userid:{type:mongoose.Schema.ObjectId , ref:"User" , required:true},
    crewid:{type:mongoose.Schema.ObjectId , ref:"crew" , required:true},
    slotdate:{type:String, required:true},
    slottime:{type:String , required:true},
    date:{type:Number , required:true},
    cancelled:{type:Boolean , default:false},
    payment:{type:Boolean , default:false},
    iscompleted:{type:Boolean , default:false}
});


const AppointmentModel = new mongoose.model('appointment' , appointmentschema);


export default AppointmentModel;