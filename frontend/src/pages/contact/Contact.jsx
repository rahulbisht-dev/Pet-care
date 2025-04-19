/* eslint-disable react/no-unescaped-entities */
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoMdMap } from "react-icons/io";
import { aboutassets } from "../../assets/frontend_assets/About/about";
import { IoPawSharp } from "react-icons/io5";
import  {useForm} from "react-hook-form"
import { useSelector } from "react-redux";
import { useEffect } from "react";
import {useNavigate} from "react-router-dom"

export const Contact  = () =>{


    const {register ,  formState:{errors} , reset } = useForm();
    const user = useSelector((state) => state.user.user);
    const navigate = useNavigate();

    console.log(user);

    useEffect(() =>{
        if(user){
            reset({name:user.firstname + " " + user.lastname , email:user.email})
        }
    },[reset , user])


    //# message sent will be set according to the owner



    return(
        <section className="w-[100vw] overflow-hidden">
        
            {/* top heading strip */}
            <div className="flex items-center justify-around bg-[#c2a79a] md:h-[30vh] lg:h-[50vh] h-[20vh]">
                <div className="relative">
                    <h1 data-aos="fade-up" className="text-5xl lg:text-7xl text-white font-bold text-center leading-tight">Contact PetCare!</h1>
                    <IoPawSharp className="absolute text-4xl md:text-6xl right-0 text-[#e7dfdb] paw-animation1"/>
                    <IoPawSharp className="absolute text-4xl md:text-8xl left-0 text-[#e7dfdb] paw-animation2"/>
                </div>

                <div className="lg:w-[22%] md:w-[30%]  hidden md:block">
                    <img data-aos="zoom-in" src={aboutassets.about_banner} alt="" className="w-full" />
                </div>
            </div>


            {/* contact section */}

            <div className=" flex flex-col lg:flex-row lg:p-16 gap-8  justify-between">

                {/* Contact information */}
                <div className="lg:w-[32%] flex flex-col gap-8 p-4  ">
                    <h1 data-aos="fade-up" className="text-3xl lg:text-5xl font-bold z-10">Get In Touch</h1>
                    <p data-aos="fade-up" className="text-neutral-800">Feel free to stop by during operating hours if you'd like in-person assistance.</p>

                    {/* icons */}
                    <div className="flex flex-col gap-4">
                        <div data-aos="fade-up" className="w-full bg-[#c4bfbd] rounded-2xl items-center gap-8 flex px-4 py-3">
                            <div className=" rounded-full  p-1 ">
                                <FaPhoneAlt className=" text-4xl w-full h-full border rounded-full p-1"/>
                            </div>
                            <div>
                                <p className="font-bold text-neutral-800 ">Phone Number</p>
                                <p className="text-neutral-600">+123 456 7890</p>
                            </div>
                        </div>

                        <div data-aos="fade-up" className="w-full bg-[#c4bfbd] rounded-2xl gap-8 flex px-4 py-3">
                            <div className=" rounded-full  p-1 ">
                              <MdEmail className=" text-4xl w-full h-full border rounded-full p-1" />
                            </div>
                            <div>
                                <p className="font-bold text-neutral-800">Email Address</p>
                                <p  className="text-neutral-600">info@PetCare.com</p>
                            </div>
                        </div>

                        <div data-aos="fade-up" className="w-full bg-[#c4bfbd] rounded-2xl gap-8 flex px-4 py-3">
                            <div className=" rounded-full  p-1 ">
                              <IoMdMap className=" text-4xl w-full h-full border rounded-full p-1"/>
                            </div>

                            <div>
                                <p className="font-bold text-neutral-800">Address</p>
                                <p  className="text-neutral-600">123 Wanderer Street</p>
                            </div>
                        </div>
                    </div>


                </div>

                {/* Map */}

                <div className=" flex-1  rounded-2xl overflow-hidden">
                <iframe data-aos="zoom-in" src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d52240739.20772468!2d78.02808227213394!3d-18.12644009746951!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1740555510534!5m2!1sen!2sin"   allowfullscreen="" loading="lazy" className="w-full lg:h-full h-80 rounded-2xl"></iframe>
                </div>

                {/* Input from user */}

                <form className="lg:w-[32%]   flex flex-col justify-between p-4 gap-4">
                    <input disabled {...register("name")} data-aos="fade-up" type="text" placeholder="Name" className=" py-3 pl-2 rounded-2xl bg-gray-100 text-neutral-600 border-neutral-600" />
                    <input disabled {...register("email")} data-aos="fade-up" type="text" placeholder="Email" className=" py-3 pl-2 rounded-2xl bg-gray-100 text-neutral-600 border-neutral-600"/>
                    <div className="w-full">
                         <textarea {...register("message" , {required:"Please type your message"})} data-aos="fade-up" className=" flex-1 rounded-2xl bg-gray-100 w-full  lg:h-auto border-neutral-600 border-1" rows='8' placeholder="Message"></textarea>
                         <p className="text-red-500 text-sm">{errors?.message?.message}</p> 
                    </div>
                    <button type="submit" className="py-4 bg-[#c2a79a] rounded-full text-white font-bold">Send</button>
                </form>
            </div>

            {/* calling section */}

            <div className="flex lg:px-8 lg:flex-row items-center flex-col-reverse justify-around p-4 gap-8">
                <div className="w-60 lg:w-[40%] relative">
                    <img data-aos="zoom-in" src={aboutassets.contact_dog} alt="" className="z-1"/>
                    <IoPawSharp className="absolute text-4xl top-0 left-0 text-[#e4dcd8] paw-animation1"/>
                    <IoPawSharp className="absolute text-5xl top-0 right-0 text-[#e4dcd8] paw-animation2"/>
                    <IoPawSharp className="absolute text-6xl bottom-0 text-[#e4dcd8]"/>
                    <IoPawSharp className="absolute text-8xl bottom-o right-0 text-[#e4dcd8]"/>
                </div>

                <div className=" lg:p-16 flex flex-col gap-8">
                    <h1 data-aos="fade-up" className="text-4xl lg:text-5xl font-bold">Ready to Experience PetCare Exceptional Care?</h1>
                    <p data-aos="fade-up" className="text-neutral-800">Contact Us Today and Discover a World of Happiness and Health for Your Pet.</p>
                    <div>
                        <button data-aos="zoom-in" className="px-10 py-4 rounded-full bg-[#c2a79a] font-bold text-white hover:scale-104 transition-all duration-200 group flex gap-2 items-center" onClick={()=>navigate("/allappointments")}>Book Now<IoPawSharp className="w-5 h-5 hidden group-hover:flex"/></button>
                    </div>
                </div>
            </div>

        </section>
    )
}