import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { toggleLoginPopup } from "../store/slice/UserSlice";

export const Footer = () =>{


    const Navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);


    return(
        <>    
        <section className="bg-[#c2a79a] p-16 pt-50 px-4 flex flex-col md:flex-row gap-8 box ">

            <div className="flex gap-8 flex-col lg:flex-row lg:w-[60%]">
                <div className="lg:flex-1 flex flex-col lg:gap-8 gap-4 w-full">
                    <h1 className="font-extrabold">Quick Links</h1>
                    <div className="flex flex-col gap-2">
                        <p className="text-gray-700 cursor-pointer" onClick={()=>Navigate("/")}>Home</p>
                        <p className="text-gray-700 cursor-pointer" onClick={()=>Navigate("/services")}>Services</p>
                        <p className="text-gray-700 cursor-pointer" onClick={()=>Navigate("/about")}>About Us</p>
                        <p className="text-gray-700 cursor-pointer" onClick={()=>Navigate("/contact")}>Contact Us</p>
                    </div>
                </div>

                <div className="flex flex-col  gap-4 lg:gap-8 lg:flex-1">
                    <h1 className="font-extrabold">Social Media</h1>
                    <div className="flex flex-col gap-2">
                        <p className="text-gray-700">Facebook</p>
                        <p className="text-gray-700">Instagram</p>
                        <p className="text-gray-700">Twitter</p>
                        <p className="text-gray-700">Linkedin</p>
                    </div>
                </div>


                <div className="lg:flex-1 flex flex-col lg:gap-8 gap-4">
                    <h1 className="font-extrabold">Contact Information</h1>
                    <div className="flex flex-col gap-2">
                        <p className="text-gray-700">123 Petcare Avenue,Cityville,USA</p>
                        <p className="text-gray-700">1-800-PET-CARE</p>
                        <p className="text-gray-700">info@petcare.com</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 flex flex-col gap-8 lg:px-12">
                <h1 className="font-extrabold">Join Our Pet Loving Community</h1>
                <p className="text-gray-700">Subscribe to Our Newsletter and Our Updates for Per Tips and Care</p>
                <div className="flex gap-4">
                    <input type="text" placeholder="email" className="bg-white border-gray-600 lg:px-6 lg:py-4 px-4  rounded-full " />
                    <button className="border-2 border-white rounded-full px-4 py-2 lg:px-8 lg:py-3 text-white font-boldhover:bg-white hover:text-black transition-all duration-200 whitespace-nowrap">
                        {user ? "Send" : <span onClick={()=>{Navigate("/"); dispatch(toggleLoginPopup())}}>Sign Up</span>}
                    </button>
                </div>
            </div>



        </section>
        </>
    )
}