import { useEffect, useState } from "react";
import { useCancelappointmentMutation, useGetuserappointmentsQuery } from "../../store/Api/Api";
import { toast } from "react-toastify";
import { FiTrash } from "react-icons/fi";
import { IoPawSharp } from "react-icons/io5";
import { Loader } from "../../components/Loader";
import { NoData } from "../../components/noData";
import {useNavigate} from "react-router-dom"
import { assets } from "../../assets/frontend_assets/assets";


export const MyAppointments = () =>{


    const {data , isLoading} = useGetuserappointmentsQuery();
    const [Appointments , setAppointments] = useState([]);
    const [cancelappointment] = useCancelappointmentMutation();
    const [iscancelling , setiscancelling] = useState(false);
    const Navigate = useNavigate();


    useEffect(() =>{
        if(data && data?.success){
            setAppointments(data?.data);
        }
    } ,[Appointments , data])




  //$ function to cancel the appointment...

  const handleCancelAppointment = async(id) =>{
    setiscancelling(true)
    try{
      const result = await cancelappointment(id).unwrap();
      if(result.success){
        toast.success(result.message);
        setiscancelling(false);
      }
    }
    catch(error){
      toast.error(error.data.message);
    }
    finally{
        setiscancelling(false);
    }
  }
    



    if(isLoading) return <Loader/>
    if(Appointments?.length === 0) return <NoData message="No Appointment Booked" 
     description="You Dont Booked any appointment Yet Book Appointment Now." onClick={()=>Navigate("/allappointments")} buttonText="Book Appointment Now" imageUrl={assets.no_appointment}/>

    return(
        <section className="lg:px-32 mt-16">

            {/* Top section */}

            <div className="flex flex-col gap-8">

               <div className="grid grid-cols-5 md:grid-cols-6 place-items-center">
                   <p></p>
                   <p>Consultant</p>
                   <p>Fees</p>
                   <p className="hidden md:flex">Date/Time</p>
                   <p>Status</p>
                   <p>Cancel</p>
               </div>



            {/* Data */}

            <div className="flex flex-col gap-8">
                {Appointments?.map((data , index) =>{
                    
                    return(
                        <div key={index} className="py-2 border-2 rounded-full grid grid-cols-5 md:grid-cols-6 text-sm text-gray-500 place-items-center bg-gradient-to-r from-amber-100 to-amber-200">
                            <div>
                                <img src={data?.crewid?.image} alt="" className="w-20 rounded-full "/>
                            </div>
                            <p>{data?.crewid?.firstname} {data?.crewid?.lastname}</p>
                            <p>${data?.crewid?.fees}</p>
                            <p className="hidden md:flex">{data?.slotdate} <br/> {data?.slottime}</p>
                            <p>{data?.iscompleted ? <span className="text-green-500">Completed</span> : <span className="text-red-500">Pending</span>}</p>
                            <div className="flex gap-2">
                                {data?.iscompleted || <button  onClick={()=>handleCancelAppointment(data?._id)} className="flex items-center border-2 rounded-lg px-1">{iscancelling ? <IoPawSharp className="w-5 animate-spin"/> : <><FiTrash  className="w-4 md:text-4xl font-bold"/><span>Cancel</span></>}</button>}
                                {data?.iscompleted && <p className="text-green-500">Done</p>}
                            </div>
                        </div>
                    )
                })}
            </div>

            </div>

        </section>
    )
}