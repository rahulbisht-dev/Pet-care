import { IoPawSharp } from "react-icons/io5";
import { homeassets } from "../../assets/frontend_assets/home/assets";
import {useNavigate} from "react-router-dom"

const Landing = () => {


  const Navigate  = useNavigate();


  return (
    <section className="flex pt-8 lg:pt-24 ">

      {/* left cat image */}
      <div className="w-[20%]  flex flex-col justify-around lg:justify-end ">
        <IoPawSharp className="text-4xl lg:hidden text-[#c2a79a]"/>
        <div className="relative">
          <img data-aos="zoom-in" src={homeassets.home_cat1} alt="" className="object-cover w-full"/>
          <IoPawSharp className="hidden lg:flex text-5xl absolute right-0 top-1/2 paw-animation1 text-[#c2a79a]"/>
          <IoPawSharp className="hidden lg:flex text-5xl absolute right-5 bottom-10 paw-animation2 text-[#c2a79a]"/>
        </div>
      </div>



      {/* middle contant */}
      <div className="flex-1 lg:pt-16 flex flex-col gap-8 justify-between  lg:gap-16 items-justify">
        <h1 data-aos="fade-up" className="text-3xl  lg:text-6xl  font-bold leading text-center leading-tight">A Paw-some Place for Your Pet’s Well-being</h1>

        <p data-aos="fade-up" className=" text-center text-neutral-700 lg:text-[18px] hyphens-auto text-sm ">Your trusted partner in pet care, providing personalized services to enhance the health, happiness, and well-being of your beloved pets</p>
        <div className="text-center">
          <button onClick={()=>Navigate("/allappointments")} data-aos="zoom-in" className="px-12 py-4 bg-[#c2a79a] rounded-full font-bold text-white mx-auto flex gap-2 items-center group hover:scale-103 duration-200 transition-all">Book Now <IoPawSharp className="hidden group-hover:flex text-sm text-white"/></button>
        </div>

        <div className="text-start w-full">
          <IoPawSharp className="text-4xl lg:hidden text-[#c2a79a]"/>
        </div>
      </div>



      {/* right dog image */}

      <div className="w-[20%]  flex flex-col justify-around lg:justify-start">
        <div className="relative">
          <img data-aos="zoom-in" src={homeassets.home_dog1} alt="" className="object-cover w-full" />
          <IoPawSharp className="hidden lg:flex text-5xl absolute left-0 top-2/3 paw-animation1 text-[#c2a79a]"/>
          <IoPawSharp className="hidden lg:flex text-5xl absolute left-10  paw-animation2 text-[#c2a79a]"/>
        </div>
        <IoPawSharp className="text-4xl lg:hidden text-[#c2a79a]"/>

      </div>


    </section>
  )
}

export default Landing