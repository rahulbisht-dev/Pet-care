import { NavLink, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { FiShoppingCart } from "react-icons/fi";
import { FaAngleRight, FaList, FaShoppingBag } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { LuLogIn } from "react-icons/lu";
import { LiaClipboard} from "react-icons/lia";
import { MdLogout, MdPolicy } from "react-icons/md";
import { IoPawSharp } from "react-icons/io5";
import { Slidemenu } from "./Slidemenu";
import { useDispatch, useSelector} from "react-redux";
import { setUser, toggleLoginPopup } from "../store/slice/UserSlice";
import { AuthPage } from "./authPage";
import { useLogoutMutation } from "../store/Api/Api";
import { HiDocumentText } from 'react-icons/hi';
import toast from "react-hot-toast";


const Navbar = () =>{

    const user = useSelector((state) => state.user.user);
    const cart = useSelector((state) => state.order.items)
    const LoginPopup = useSelector((state) => state.user.loginPopup);
    const userPlaceHolder = user && user.lastname && user?.firstname?.slice(0 , 1)[0] + user.lastname.slice(0 , 1)[0];
    const dispatch = useDispatch();
    const Navigate = useNavigate();

    const[dropdownMenu , setDropDownMenu] = useState(false);
    const[slideMenu , setSlideMenu] = useState(false);
    const [logout] = useLogoutMutation();
    const dropdownRef = useRef(null);
    


    useEffect(() => {
        const handleClickOutside = (event) => {
          if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target)
          ) {
            setDropDownMenu(false);
          }
        };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      };
     }, []);

    

    //$ function to handle to logout
    const handleLogout = async() =>{
        try{
            const result = await logout().unwrap();
            if(result.success){
                toast.success(result.message);
                dispatch(setUser(false));
                Navigate("/");
            }
        }
        catch(error){
            toast.error(error.data.message);
        }
    }


    //$ setting dropdownMenu Variable

    const DropDownMenuItems = [

        ...(user && user ? [
            {
                href:"/account/profile",
                label:(
                    <div className="w-full flex gap-4  items-center">
                        <div className="rounded-full h-10 w-10  bg-amber-100">
                            {user?.image ? <img src={user?.image} alt="user-profile" className="object-cover rounded-full w-full h-full"/> : userPlaceHolder ? <p className="rounded-full flex items-center justify-center text-xl">{userPlaceHolder}</p> : <CgProfile className="w-5 h-5"/>}
                        </div>

                        <div className="flex flex-col overflow-x-hidden">
                            <p className="text-sm font-bold">{user?.firstname} {user?.lastname}</p>
                            <p className="text-xs text-neutral-600 w-full overflow-x-ellipsis">{user?.email}</p>
                        </div>
                    </div>
                ),
            }
        ]
        :
        [
            {
                label:"Login/Signup",
                icon:<LuLogIn/>,
                onclick:()=>dispatch(toggleLoginPopup())
            }
        ]),

        { 
             label:"My Profile",
             icon:<CgProfile/>,
             href:"/myprofile" 
        },

        {
            label:"My Appointments",
            icon:<LiaClipboard/>,
            href:"/myappointments"
        },

        {
            label:"My Orders",
            icon:<FaShoppingBag/>,
            href:"/myorders"
        },

        {
            label:"Terms and Conditions",
            icon:<HiDocumentText/>,
            href:"terms-and-condition"
        },

        {
            label:"Privacy Policy",
            icon:<MdPolicy/>,
            href:"privacy-policy"
        },

        ...(user && user ? [
            {
                label:"Logout",
                icon:<MdLogout/>,
                onclick :() =>handleLogout()
            },
        ] : [])
    ]



    if(LoginPopup) return <AuthPage/>


    return(
        <section className="px-2 lg:px-8 flex justify-between items-center bg-[#c2a79a]/50 bg-fixed p-2 z-5000 sticky top-0 backdrop-blur-2xl ">

            {slideMenu ? <Slidemenu setSlideMenu={setSlideMenu}/> : <></>}

            {/* Logo */}
            <NavLink className="flex items-center" to="/">
                <img src="logo.png" alt="" className="w-10 md:w-20" />
                <p className="text-2xl font-bold md:text-2xl text-neutral-800">PetCare</p>
            </NavLink>

            {/* Navbar items */}
            <div className="hidden text-sm lg:flex  justify-center gap-8">
                <NavLink to="/" className={({isActive}) => isActive ? "border-b-2 border-white" : ""}>Home</NavLink>
                <NavLink to="/about"className={({isActive}) => isActive ? "border-b-2 border-white" : ""}>About</NavLink>
                <NavLink to="/services"className={({isActive}) => isActive ? "border-b-2 border-white" : ""}>Services</NavLink>
                <NavLink to="/shop"className={({isActive}) => isActive ? "border-b-2 border-white" : ""}>Shop</NavLink>
                <NavLink to="/contact"className={({isActive}) => isActive ? "border-b-2 border-white" : ""}>Contact</NavLink>
            </div>







            <div className=" flex justify-end items-center md:gap-8 gap-4 ">
                
                {user 
                ?
                <div className="text-sm h-10 px-1 bg-[#c2a79a]  rounded-lg hidden md:flex">
                    <button onClick={()=> Navigate("/myappointments")}>My Appointments</button>
                </div>
                :
               <button onClick={() => dispatch(toggleLoginPopup())} className="group bg-[#c2a79a] rounded-2xl md:rounded-full px-2 md:px-6 py-3  text-sm flex gap-2 items-center">SignUp<IoPawSharp className="hidden group-hover:flex text-sm"/></button>
                }


            {/* My Account Section Navbar */}
            <div className="relative hidden lg:flex ">

                <button className="flex items-center gap-2 h-10 px-1 bg-[#c2a79a] rounded-lg active:outline-blue-100" onClick={()=>setDropDownMenu(!dropdownMenu)}>
                    {user?.image ? <img src={user?.image} className="w-10 rounded-full h-10 p-1"/> : userPlaceHolder ? <p className="rounded-full w-10 h-10 items-center flex justify-center bg-amber-100">{userPlaceHolder}</p> : <CgProfile className="text-2xl"/>}
                    <p className="text-sm">My Account</p>
                </button>

                <div ref={dropdownRef} className={`${dropdownMenu ? "flex" : "hidden"} sm:w-[100px] md:w-[100px] lg:w-[250px] absolute flex flex-col top-full right-0 rounded-lg px-2 z-999 bg-white`}>
                    {DropDownMenuItems.map((item, index) =>{
                        return(
                            <div key={index} className="w-full p-2 truncate overflow-ellipsis">
                                {
                                item.onclick 
                                ? <button className="flex justify-between items-center  w-full hover:bg-[#c2a79a] py-2 rounded-xl hover:text-white text-sm " onClick={item.onclick}>
                                    <div className="flex gap-2 items-center">
                                        <span>{item.icon}</span>
                                        <div>{item.label}</div>
                                    </div>
                                    <FaAngleRight className="w-5 h-5"/>
                                  </button>
                                :<NavLink className="flex justify-between  items-center hover:bg-[#c2a79a] py-2 rounded-xl hover:text-white text-sm " to={item.href}>
                                    <div className="flex gap-2 items-center">
                                        <span>{item.icon}</span>
                                        <div className="">{item.label}</div>
                                    </div>
                                    <FaAngleRight className="w-5 h-5"/>
                                 </NavLink>
                                }
                            </div> 
                        )
                    })}
                </div>
            </div>                




                {/* Cart Area */}
                <div className="relative">
                    <FiShoppingCart  className="w-5 h-5" onClick={()=>Navigate("/cart")}/>
                    <div className={`absolute rounded-full -top-3 -right-1 text-sm bg-red-500 w-4 h-4 flex text-white items-center justify-center ${!user || (cart && cart.length === 0) ? "hidden" : "flex"}`}>
                        {user && cart && cart.length}
                    </div>
                </div>


                <FaList onClick={()=>setSlideMenu(true)} className="w-5 h-5 md:w-6 md:h-6 font-bold text-[#c2a79a] lg:hidden"/>

            </div>

        </section>
    )

}

export default Navbar;