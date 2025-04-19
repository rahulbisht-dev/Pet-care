import Crew from "../modules/Member.js";
import Appointment from "../modules/Appointment.js"





//$ function to get all the appointments List
export const allAppointments = async(req , res) =>{

    try{
        const crew = await Crew.find({}).select("-password");
        res.status(200).send({success:true , data:crew});
    }
    catch(error){
        console.log(error);
        res.status(501).send({success:false , message:"Internal Server Error , Please Try Again Later."});
    }
    

}


//$ function to get the selected appointment
export const getSelectedAppointment = async(req , res) =>{

    try{
        const {appointmentid} = req.params;
        const appointment = await Crew.findById(appointmentid);
        return res.status(200).send({success:true , data:appointment});

    }
    catch(error){
        console.log(error);
        res.status(501).send({success:false , message:"Internal Server Error , Please try Again Later."})
    }
}



//$ function to book the selected appointment
export const bookAppointment = async(req , res) =>{
    const userid = req.userId;

    try{
        const {slotdate , slottime , id:crewId} =  req.body;

        if(!slotdate || !slottime){
            return res.status(400).send({success:false , message:"Please Choose Your Booking Slots Day And Time"})
        }

        const crew = await Crew.findById(crewId);
        console.log(crew);

        if(crew.slots_booked.has(slotdate)){
            crew.slots_booked.get(slotdate).push(slottime);
        }
        else{
            crew.slots_booked.set(slotdate , [slottime]);
        }
        await crew.save();

        const newappointment = new Appointment({userid:userid , crewid:crewId , slotdate:slotdate , slottime:slottime , date:Date.now()});
        await newappointment.save();
        return res.status(200).send({success:true , message:"Appointment Booked Successfully" , })
    }
    catch(error){
        console.log(error);
        res.status(501).send({success:false , message:"Internal Server Error , Please try Again Later."})
    }
}




