import { homeassets } from "../../assets/frontend_assets/home/assets"
import { IoPawSharp } from "react-icons/io5"
import {useNavigate} from "react-router-dom"


export const Callus = () =>{

    const Navigate = useNavigate();

    return(
        <>
        {/* waves from svg */}

        <section className="lg:px-8 flex flex-col p-4 lg:flex-row gap-8 items-center">

            <div className="flex-1 flex flex-col  justify-around gap-8 items-center">
                <h1 data-aos="zoom-in" className="lg:text-5xl text-3xl font-bold leading-tight">Ready to Give Your Pet the Best Care? Contact Us Today!</h1>
                <div>
                <button  className="bg-[#c2a79a] rounded-full px-10 py-4 font-bold hover:text-white hover:scale-102 transition-all duration-200 group flex items-center gap-2" onClick={()=>Navigate("/allappointments")}>Book Appointment Now<IoPawSharp className="hidden group-hover:flex text-white"/>  </button>
                </div>
            </div>

            <div className="md:flex-1 w-60 flex justify-center relative ">
                <img data-aos="fade-up" src={homeassets.home_dog2} alt="" />
              <IoPawSharp className="absolute text-4xl right-0 text-[#e7dfdb] paw-animation1"/>
              <IoPawSharp className="absolute text-4xl left-0 bottom-0 text-[#e7dfdb] paw-animation2"/>
            </div>

        </section>
        </>
    )
}