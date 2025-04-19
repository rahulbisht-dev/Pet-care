import { IoPawSharp } from "react-icons/io5"
import { banner, services  } from "../../assets/frontend_assets/sevices/services"
import { useNavigate } from "react-router-dom"



export const Services = () =>{


    const Navigate = useNavigate()


    return(
        <section className="flex flex-col">

            {/* TOP BANNER */}
            <div className="h-[20vh] md:h-[30vh] lg:h-[65vh] flex justify-around items-center px-16 bg-[#c2a79a] relative overflow-hidden">

                <div className="relative">
                    <img data-aos="zoom-in" src={banner} alt="" className="hidden lg:flex z-10"/>

                </div>

                <div className="lg:w-[40%]">
                    <h1 data-aos="fade-up" className="text-4xl z-[20000] lg:text-7xl text-center lg:text-end font-bold  text-white leading-tight">Our Pet Care Solutions</h1>
                    <IoPawSharp className="absolute text-5xl top-1/2 left-0  paw-animation2 text-[#f5eae4]"/>
                    <IoPawSharp className="absolute text-6xl top-1 right-0  -rotate-30 paw-animation2 text-[#f5eae4]"/>
                    <IoPawSharp className="absolute text-9xl bottom-0 right-0 -rotate-30 text-[#f5eae4] hidden md:flex"/>
                </div>

            </div>

            {/* services heading */}

            <div className="flex flex-col items-center gap-4 justify-center lg:p-16 p-8 lg:mx-16">
                <div className="text-center">
                    <h1 data-aos="fade-up" className="lg:text-6xl text-4xl font-bold">Our Services</h1>
                </div>
                <p data-aos="fade-up" className="text-center">Book an appointment for professional pet care services—at home or at our center, as per your convenience.</p>
                <div>

                </div>
            </div>


            {/* Service pages */}

            <div  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-10 p-4 justify-items-center lg:mx-16 mx-4">


                {services.map((service , index) =>{
                    return(
                            <div data-aos="fade-up" key={index} className="rounded-2xl flex flex-col items-center bg-[#ece6e2] hover:scale-102 transition-all duration-200 p-2">
                                <div className="w-40 rounded-full">
                                    <img data-aos="zoom-out" src={service.image} alt="" className="rounded-full" />
                                </div>

                                <div data-aos="fade-up" className="text-center flex flex-col gap-4">
                                    <h1 className="text-2xl font-bold mt-4">{service.service}</h1>
                                    <p className="leading-relaxed text-sm text-neutral-800 leading-">{service.description}</p>
                                </div>

                                <div data-aos="zoom-out" className="relative group">
                                    <button className="px-4 py-4 mt-4 flex items-center gap-2 bg-[#c2a79a] hover:text-white rounded-full hover:scale-103 transition-all text-sm" onClick={()=>Navigate("/allappointments")}>Book Appointment <span><IoPawSharp className="hidden group-hover:block text-white"/></span></button>
                                </div>
                            </div>
                    )
                })}
            </div>

        </section>
    )
}