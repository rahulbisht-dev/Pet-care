
import { IoPawSharp } from "react-icons/io5";
import { homeservices } from "../../assets/frontend_assets/sevices/services";


const Homeservice = () =>{


    return (
        <>
        {/* svg for waves */}



        <section className="bg-[#ece6e2] lg:px-8 pt-50  lg:pb-20  p-4 flex flex-col items-center gap-8 lg:gap-16 box">

            {/* Heading  */}

            <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-center">Our Pet Care Solutions</h1>
            </div>

            {/* services container */}

            <div className="w-full  flex gap-4  flex-wrap lg:justify-between">
                {homeservices.map((services , index) =>{
                    const service = services.service;
                    const description = services.description;

                    return(
                        <div data-aos="fade-up" key={index} className="flex  items-center lg:w-[32%] p-8 gap-8 w-full rounded-xl bg-white group hover:bg-[#c2a79a] hover:scale-102 transition-all duration-200">
                            <div className="">
                                <IoPawSharp data-aos="zoom-out" className="group-hover:text-white"/>
                            </div>

                            <div className="flex flex-col gap-4">
                                <p data-aos="zoom-out" className="text-xl font-bold text-neutral-900 group-hover:text-white">{service}</p>
                                <p data-aos="zoom-out" className=" group-hover:text-[#f3ede9] text-sm text-gray-600">{description}</p>
                            </div>
                        </div>
                    )
                })}
            </div>

        </section>
        </>
    )
}

export default Homeservice;