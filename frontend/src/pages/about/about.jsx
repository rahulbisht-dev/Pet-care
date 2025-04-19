import { IoPawSharp } from "react-icons/io5";
import { about_data } from "./about.js";
import { aboutassets } from "../../assets/frontend_assets/About/about.js";
import {useNavigate} from "react-router-dom"

export const About = () =>{

    const Navigate = useNavigate();


    return(
        <section className="overflow-hidden">
            {/* welcome banner */}
            <div className="flex flex-col md:flex-row h-[50vh]  bg-[#c2a79a] lg:px-8 px-4">

                <div className="flex-1 flex items-center justify-center">
                    <h1 data-aos="fade-up" className="text-5xl lg:text-7xl leading-tight font-bold text-center lg:text-start  text-white">Welcome, <br/>Buddies To PetCare!</h1>
                </div>

                <div className="md:w-[40%] relative  hidden md:flex">
                    <img data-aos="zoom-in" src={aboutassets.about_banner} alt="" className=" w-full h-full object-contain "/>
                    <IoPawSharp className="absolute text-6xl  left-0 text-[#e7dfdb] paw-animation2"/>
                    <IoPawSharp className="absolute text-8xl bottom-0 right-0  text-[#e7dfdb] paw-animation1"/>
                    <IoPawSharp className="absolute text-8xl top-1/3 right-0  text-[#e7dfdb] rotate-30"/>
                </div>
            </div>

            {/* about */}
            <div className="flex flex-col  lg:flex-row-reverse mt-16">
                <div className="flex-1 p-8 flex flex-col gap-4  justify-center">
                    <h1 data-aos="fade-up" className="font-bold text-4xl lg:text-5xl leading-tight">Dedicated to the Well-Being of Your Beloved Pets</h1>
                    <p data-aos="zoom-in" className="lg:w-[80%] text-start leading-relaxed text-[16px] text-neutral-600 tracking-wider"> PetCare is more than just a pet care center – we're a family of passionate animal lovers. With years of experience, our team is committed to providing the highest quality care and services to your furry, feathered, or scaled companions. Your pet's happiness and health are our top priorities, and we treat them with the same love and care as if they were our own.</p>
                </div>

                <div className="flex justify-center items-center relative">
                    <img data-aos="zoom-in" src={aboutassets.about_cat2} alt="" className="lg:w-180 w-80" />
                    <IoPawSharp className="absolute text-6xl right-0 text-[#e7dfdb] paw-animation1"/>
                    <IoPawSharp className="absolute text-8xl left-0 text-[#e7dfdb] paw-animation2"/>
                    <IoPawSharp className="absolute text-4xl bottom-10 text-[#e7dfdb] paw-animation2"/>
                </div>
            </div>


            {/* values */}
            <div className="flex flex-col lg:p-16 px-4 py-8 gap-16 bg-[#f0edec] ">
                <div>
                    <h1 data-aos="fade-up" className="text-4xl lg:text-5xl font-bold text-center">Our Values</h1>
                </div>

                <div className="flex gap-16 flex-col lg:flex-row">
                    {/* value1 */}
                    <div className="flex flex-col gap-4 hover:scale-102">
                         <IoPawSharp/>
                        <div className="flex flex-col gap-4 hover:scale-102">
                            <h1 data-aos="fade-up" className="text-3xl font-bold">Compassion</h1>
                            <p data-aos="zoom-out" className="text-sm lg:text-[16px] text-neutral-600 tracking-wider">We approach every pet with empathy and kindness, ensuring their comfort and well-being. Our caring touch extends to all animals, from the tiniest hamster to the largest dog, creating a safe and loving environment where their happiness and health flourish.</p>
                        </div>
                    </div>

                    {/* value2 */}
                    <div className="flex flex-col gap-4 hover:scale-102">
                         <IoPawSharp/>
                        <div className="flex flex-col gap-4">
                            <h1 data-aos="fade-up" className="text-3xl font-bold">Excellence</h1>
                            <p  data-aos="zoom-out" className="text-sm lg:text-[16px] text-neutral-600 tracking-wider">We uphold uncompromising standards in every aspect of our service, from meticulous medical care to unparalleled customer service. Our dedication to excellence is a promise that your pet will receive the best, ensuring their well-being and your peace of mind.</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 hover:scale-102">
                         <IoPawSharp/>
                        <div className="flex flex-col gap-4">
                            <h1 data-aos="fade-up" className="text-3xl font-bold">Trust</h1>
                            <p  data-aos="zoom-out" className="text-sm lg:text-[16px] text-neutral-600 tracking-wider">Your trust is paramount in our relationship. We are committed to maintaining it through unwavering transparency, reliability, and clear communication. Count on us to be your dependable partner in pet care, always putting your pet's best interests first.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* FAMILY PICTURES */}




            {/* ABOUT US DATA */}

            <div className="flex flex-col  lg:p-16 lg:flex-row bg-[#f0edec] gap-8 ">
                <div className="flex-1 flex justify-center items-center">
                    <img  data-aos="zoom-in" src={aboutassets.about_dog1} alt="" />
                </div>

                <div className="flex-1 flex flex-col ">
                    {about_data.map((data , index) =>{
                        return(
                            <div key={index} className="flex flex-row items-start lg:items-center gap-8 lg:p-8 p-4 ">
                                <div className="w-[20%]">
                                    <h1 data-aos="zoom-out" className="lg:text-5xl text-4xl font-bold">{data.numbers}</h1>
                                </div>

                                <div className="flex-1 flex flex-col gap-4">
                                    <h1 data-aos="fade-up" className="lg:text-xl font-bold">{data.title}</h1>
                                    <p data-aos="fade-up" className="text-sm text-neutral-800">{data.description}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>




            {/* BOOK APPOINTMENT */}

            <div className="flex lg:p-16 flex-col-reverse  items-center lg:flex-row p-4">
                <div className="lg:w-[30%] w-80 md:w-100 relative">
                    <img data-aos="zoom-out" src={aboutassets.about_dog3} alt="" />
                    <IoPawSharp className="absolute text-4xl right-0 text-[#e7dfdb] paw-animation1"/>
                    <IoPawSharp className="absolute text-8xl top-0 text-[#e7dfdb] paw-animation2"/>
                    <IoPawSharp className="absolute text-8xl left top-1/2 text-[#e7dfdb]"/>
                </div>

                <div className="flex-1 flex flex-col gap-8 items-start lg:px-12">
                    <h1 data-aos="fade-up" className="lg:text-5xl text-4xl leading-tight font-bold">Ready to Experience Petcare Exceptional Care ?</h1>
                    <p data-aos="fade-up" className="text-neutral-600">Contact Us Today and Discover a World of Happiness and Health for Your Pet</p>
                    <button data-aos="zoom-out" className="px-8 py-4 rounded-full bg-[#c2a79a] hover:text-white hover:sclae-103 transition-all duration-200 flex items-center gap-2 group" onClick={()=>Navigate("/allappointments")}>Book Appointment <IoPawSharp className="h-5 w-5 hidden text-white group-hover:flex"/></button>
                </div>
            </div>

        </section>
    )
}