import { useNavigate, useParams } from "react-router-dom"
import { useCallback, useEffect, useState } from "react";
import { useBookappointmentMutation, useGetselectedappointmentQuery } from "../../store/Api/Api";
import toast from "react-hot-toast"
import { Loader } from "../../components/Loader";
export const Appointment = () =>{



    const {id} = useParams();
    const daysweek = [ "sun" , "mon" , "tue" , "wed" , "thr" , "fri" , "sat"];
    const montharr = [ "jan" , "feb" , "mar" , "apr" , "may" , "jun" , "jul" , "aug" , "sep" , "oct" , "nov" , "dec"]


    const [slotindex , setslotindex] = useState(0);
    const [slottime , setslottime] = useState("");
    const [docslot , setdocslot] = useState([]);
    const [details , setDetails] = useState("");
    const [bookedSlots , setBookedSlots] = useState("");



    const {data , isLoading} = useGetselectedappointmentQuery(id);
    const [bookappointment] = useBookappointmentMutation();
    const navigate = useNavigate();




    useEffect(() =>{
      if(data?.success){
        setDetails(data?.data);
        setBookedSlots(data?.data.slots_booked)
      }
    } ,[details , data]);


    



    
    const getavailableslots = useCallback(() =>{
        setdocslot([]);
    
        let today = new Date();
    
        for(let i = 0; i<7; i++){
    
          // setting total dates for the 7 days leter from today.
          let currentdate = new Date(today);
          currentdate.setDate(today.getDate() + i);
    
    
          // setting end time for the doctor in the day.
          let endtime = new Date();
          endtime.setDate(today.getDate() + i);
          endtime.setHours(21,0,0,0);
    
    
          //setting working hours for the doctor for a day.
    
          if(today.getDate() === currentdate.getDate()){
            currentdate.setHours(currentdate.getHours() > 10 ? currentdate.getHours() + 1 : 10);
            currentdate.setMinutes(currentdate.getMinutes() > 30 ? 30 : 0);
          }
          else{
            currentdate.setHours(10);
            currentdate.setMinutes(0);
          }
    
    
          // setting all the working hours for the doctor for all the days
          let finaldata = [];
    
          while(currentdate < endtime){
            let formattedtime = currentdate.toLocaleTimeString([] , {hour:"2-digit" , minute:"2-digit" , hour12:true});
            
            if(details){
                finaldata.push({
                  date: new Date(currentdate),
                  time:formattedtime
                })
            }
    
            // increasing current time by 60 minutes....
            currentdate.setMinutes(currentdate.getMinutes() + 60)
          }
    
          setdocslot((prev) => ([...prev , finaldata]));
    
        }
      } ,[details]);

   


//$ function to handle book appointment page
      const Bookappointment = async() =>{

        const date = docslot[slotindex][0].date;
        let day = date.getDate();
        let month = date.getMonth();
        let year = date.getFullYear();

        const slotdate = day +'-' + montharr[month] + '-' + year;

        try{
           const result = await bookappointment({slotdate , slottime , id:details?._id}).unwrap();
           console.log(result);
           if(result.success){
            toast.success(result.message);
            navigate("/myappointments")
           }
        }
        catch(error){
          toast.error(error.data.message);
        }

      }
      


      useEffect(() =>{
        getavailableslots()
      },[getavailableslots , details])





      const getDateinsimpleformat = (date) =>{
        console.log(date);
        let day = date?.getDate();
        let month = date?.getMonth();
        let year = date?.getFullYear();
        const slotdate = day +'-' + montharr[month] + '-' + year;
        console.log("slotdate :- " , slotdate);
        return slotdate;
      }



      if(isLoading) return <Loader/>

    return data && (
        <section className="mt-8 lg:px-8 px-4">

       {/* Doctor Details */}    

            <div>
                
                <div className="flex gap-8 flex-col lg:flex-row  text-gray-600">

                    <div className="bg-[#c2a79a] rounded-lg w-80">
                        <img src={details.image} alt="" />
                    </div>

                    <div className="flex flex-col justify-between gap-4 max-w-120">
                        <p className="text-black font-bold"><span className="text-black font-bold">Name</span> - {details?.firstname} {details?.lastname}</p>
                        <p><span className="text-neutral-800 font-bold">Speciality</span> - {details?.speciality}</p>
                        <p><span className="text-neutral-800 font-bold">Qualifications</span> - {details?.degree}</p>
                        <p><span className="text-neutral-800 font-bold">Experience</span> - {details?.experience}</p>
                        <p><span className="text-neutral-800 font-bold">Fee</span> - ${details?.fees}</p>
                        <p><span className="text-neutral-800 font-bold">Description</span> - {details?.about}</p>
                    </div>

                </div>

            </div>


            {/* Appointment Section */}

            
        <div className=" sm:pl-4 mt-4 font-medium text-gray-800">
            <p className="text-2xl font-bold">Booking Slots</p>

            <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4 py-4">

                {docslot.length && docslot.map((item , index) =>(
                    <div onClick={()=>setslotindex(index)} key={index} className={`text-center py-6  min-w-16 rounded-full cursor-pointer ${slotindex===index  ? "bg-[#c2a79a] text-white" : "border border-gray-500"} `}>
                        <p className="font-bold">{item[0] && daysweek[item[0].date.getDay()]}</p>
                        <p className="font-bold">{item[0] && item[0].date.getDate()}</p>
                    </div>
                 ))}

            </div>


            <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4 py-4 ">
                {docslot.length && docslot[slotindex].map((item , index) =>(
                  <div key={index} className="flex flex-col items-center justify-center relative">
                <p onClick={()=>setslottime(item.time)} key={index} className={`p-2 ${bookedSlots[getDateinsimpleformat(item && item.date)]?.includes(item?.time) ? " text-xs line-through bg-black/30 font-bold px-6  border border-gray-500 rounded-full pointer-events-none" : `text-xs  font-bold px-6  border border-gray-500 rounded-full cursor-pointer ${item.time === slottime ? "bg-[#c2a79a] text-white" : "border border-gray-500"}`}`}>
                {item.time.toLowerCase()}
                </p>
                <p className={`text-red-500  text-xs `}>{bookedSlots[getDateinsimpleformat(item && item.date)]?.includes(item?.time) ? "booked" : <span className="text-green-500">Available</span>}</p>
                </div>
                ))}
            </div>

            <button onClick={()=>Bookappointment()} className="primary text-white text-sm font-light px-14 py-3 rounded-full my-6 cursor-pointer bg-amber-900">BOOK AN APPOINTMENT</button>
      </div>
            

        </section>
    )
}