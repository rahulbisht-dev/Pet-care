
import { useEffect, useState } from "react";
import { IoPawSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useAllappointmentsQuery} from "../../store/Api/Api";
import { Loader } from "../../components/Loader";
import { NoData } from "../../components/noData";
import { assets } from "../../assets/frontend_assets/assets";

export const Allappointments = () =>{


  const Navigate = useNavigate();

  const [filter , setfilter] = useState("");
  const [appointments , setAppointments] = useState([]);

  const {data , isLoading} = useAllappointmentsQuery();




  useEffect(() =>{
    if(data?.success){
      setAppointments(data.data)
    }
  } ,[data]);


  //$ Variable to store Filtered Data.....

  const filteredData = appointments && appointments.filter((data) =>{
    if(filter === ""){
      return data;
    }
    else{
      return data.speciality === filter;
    }
  });





   if(isLoading) return <Loader/>
   if(!data) return <NoData message={"No Appointments Available"} description={"Oops! No Appointments  available at the moment. Stay tuned for updates!"} buttonText="Go To Home Page" onClick={()=>Navigate("/")} imageUrl={assets.no_data}/>


   return (
    <section className="min-h-screen px-4 mt-8">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* LEFT SECTION - Sidebar always first, stacked on small screens */}
        <div className="w-full lg:w-[20%]">
          <div className="sticky top-0 h-fit flex flex-col gap-4 bg-white z-10">
            <h1 className="text-xl font-bold">Filter By Services</h1>
  
            <ul className="text-[#515152] flex flex-col gap-4 text-xs">
              {[
                { label: "All Appointments", value: "" },
                "Veterinary Doctor",
                "Pet Trainer",
                "Pet Boarder",
                "Dog Walker",
                "Pet Groomer",
                "Pet Sitter",
              ].map((item, i) => {
                const label = typeof item === "string" ? item : item.label;
                const value = typeof item === "string" ? item : item.value;
  
                return (
                  <div
                    key={i}
                    onClick={() => setfilter(value)}
                    className={`flex items-center gap-3 py-3.5 px-3 cursor-pointer hover:bg-[#e7dfdb] border ${
                      filter === value
                        ? "bg-[#e7dfdb] border-r-4 border-[#c2a79a]"
                        : ""
                    }`}
                  >
                    <p>{label}</p>
                  </div>
                );
              })}
            </ul>
          </div>
        </div>
  
        {/* RIGHT SECTION - Services */}
        <div className="w-full lg:w-[80%]">
          <div className="flex justify-around flex-wrap gap-8">
            {data && filteredData.length !== 0 ? (
              filteredData.map((service, index) => (
                <div
                  key={index}
                  className="w-full sm:w-[45%] md:w-[30%] flex flex-col gap-4 shadow-lg group rounded-lg"
                >
                  <div className="bg-[#e7dfdb]">
                    <img
                      src={service.image}
                      alt=""
                      className="group-hover:scale-103 transition-transform duration-300 w-full h-auto object-cover"
                    />
                  </div>
  
                  <div className="flex flex-col gap-3 px-2">
                    <p className="text-lg font-bold">
                      {service.firstname} {service.lastname}
                    </p>
                    <p className="text-gray-500">{service.speciality}</p>
                    {service.available ? (
                      <p className="text-green-800">Available</p>
                    ) : (
                      <p className="text-red-800">Not Available</p>
                    )}
                  </div>
  
                  <div className="mx-auto group">
                    <button
                      className="rounded-full flex items-center gap-1 group px-8 py-2 bg-[#c2a79a]"
                      onClick={() =>
                        Navigate(`/allappointments/${service._id}`)
                      }
                    >
                      Book <IoPawSharp className="hidden group-hover:block" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <NoData
                message={"No Services Available"}
                description={
                  "Sorry! Not available at the moment. Check back with us soon!"
                }
                imageUrl={assets.no_data}
                buttonText="Back To Home Page"
                onClick={() => Navigate("/")}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
  
}