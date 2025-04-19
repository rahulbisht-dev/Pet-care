import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLogoutMutation } from "../store/Api/Api";
import { setUser } from "../store/slice/UserSlice";

// eslint-disable-next-line react/prop-types
export const Slidemenu = ({setSlideMenu}) =>{


    const Navigate = useNavigate();
    const dispatch = useDispatch();
    const [logout] = useLogoutMutation();


        //$ function to handle to logout
        const handleLogout = async() =>{
            try{
                const result = await logout().unwrap();
                if(result.success){
                    toast.success(result.message);
                    dispatch(setUser(false));
                }
            }
            catch(error){
                toast.error(error.data.message);
            }
        }


    return(
        <section className={`w-[50vw] h-[100vh] fixed top-0 right-0 backdrop-blur-lg bg-[#e4dedb] z-[300] p-8 transition-transform duration-800 ease-in-out ${setSlideMenu ? "translate-x-0" : "-translate-x-full"}`}>
            <div className=" relative flex items-start justify-center py-16">
            <RxCross2 onClick={()=>setSlideMenu(false)} className="absolute right-0 top-0 text-4xl font-bold"/>

            <div className="flex flex-col md:gap-8 gap-4 justify-center items-center">

                <div>
                    <h1 className="py-1 bg-[#e5dfdd]" onClick={()=>Navigate("/")}>Home</h1>
                </div>

                <div>
                    <h1 className="py-1 bg-[#e4dedb]" onClick={()=>Navigate("/services")}>Services</h1>
                </div>

                <div>
                    <h1 className="py-1 bg-[#e4dedb]"onClick={()=>Navigate("/shop")}>Shop</h1>
                </div>

                <div>
                    <h1 className="py-1 bg-[#e5dfdd]" onClick={()=>Navigate("/myprofile")}>My Profile</h1>
                </div>

                <div>
                    <h1 className="py-1 bg-[#e4dedb]" onClick={()=>Navigate("/myorders")}>My Orders</h1>
                </div>



                <div>
                    <h1 className="py-1 bg-[#e4dedb] whitespace-nowrap" onClick={()=>Navigate("/myappointments")}>My Appointments</h1>
                </div>



                <div>
                    <h1 className="py-1 bg-[#e4dedb]" onClick={()=>Navigate("/contact")}>Contact</h1>
                </div>


                <button onClick={()=>handleLogout()}>
                    <h1 className="px-8  py-1 bg-red-500 rounded-full">LogOut</h1>
                </button>
            </div>


            </div>
        </section>
    )
}