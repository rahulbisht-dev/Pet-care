/* eslint-disable react/no-unescaped-entities */
import { RxCross2 } from "react-icons/rx";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser, setUserAddress, toggleLoginPopup } from "../store/slice/UserSlice";
import { assets } from "../assets/frontend_assets/assets";
import { useGetuserdataQuery, useLoginMutation,useSignupMutation } from "../store/Api/Api";
import toast from "react-hot-toast";
import { RxEyeOpen } from "react-icons/rx";
import { RxEyeClosed } from "react-icons/rx";
import { IoPawSharp } from "react-icons/io5";
import {useForm} from "react-hook-form"
import { useNavigate } from "react-router-dom";




export const AuthPage = () =>{


    const Navigate = useNavigate();
    const [eyeOpen , setEyeOpen] = useState(false);
    const [state , setState] = useState("Sign-up");
    const [authLoading , setAuthLoading] = useState(false);
    const [googleloading , setgoogleLoading] = useState(false);
    const [userData] = useState([]);
    const {data} = useGetuserdataQuery();

    const dispatch = useDispatch();

    const [login] = useLoginMutation();
    const [signup] = useSignupMutation();



    const {register:registerLogin , handleSubmit , formState:{errors:loginError}} = useForm();




    useEffect(() =>{
        if(data && data.success){
            dispatch(setUser(data.data));
            dispatch(setUserAddress(data?.data?.address));
        }
    },[data , dispatch])

    // $ function to handle sign-up or user login ui.
    const handleOnSubmit = async(formData) =>{
        setAuthLoading(true)

        try {
            if(state==="Sign-up"){

                const result = await signup(formData).unwrap();
                if(result.success){
                    dispatch(setUser(result.data));
                    toast.success(result.message);
                    setAuthLoading(false);
                    Navigate("/");
                    dispatch(toggleLoginPopup());
                }
                else{
                    toast.error(result.message);
                    setAuthLoading(false);
                }
            }
            else{
                const result = await login(formData).unwrap();
                if(result?.success){
                    dispatch(setUser(result?.data));
                    dispatch(setUserAddress(result?.data.address));
                    toast.success(result.message);
                    dispatch(toggleLoginPopup());
                    Navigate("/")
                    setAuthLoading(false);
                }
                else{
                    toast.error(result.message);
                    setAuthLoading(false);
                }
            }
        } catch (error) {
            toast.error(error.data.message);
            console.log(error);
        }
        finally{
            setAuthLoading(false);
        }
    }

    console.log(userData);


//$ => function to Login with google.

  const handleGoogleLogin = async() =>{
    setgoogleLoading(true);
    try{
        window.location.href = "https://petcare-l7rt.onrender.com/user/google";
    }
    // eslint-disable-next-line no-unused-vars
    catch(error){
      toast.error("Email and Password is Incorrect");
    }
    finally{
      setgoogleLoading(false);
    }
  }






    

    return(
        <section className="w-[100vw] h-full  lg:px-8   flex items-center justify-center z-1000 fixed">
            <div className="absolute w-[100vw] h-[100vh] bg-black/60 backdrop-blur-sm"></div>

            <div className="flex  w-full  lg:p-16 p-4 md:justify-around items-center justify-center">
                {/* login area */}

                <div className="  flex flex-col gap-4 px-8  md:w-100 rounded-lg bg-[#f5e4dc] relative">
                   <RxCross2 className="absolute top-0 right-0 lg:text-4xl text-4xl cursor-pointer" onClick={()=>dispatch(toggleLoginPopup())}/>

                    <div className="flex flex-col gap-4">
                        <h1 className="text-2xl lg:text-3xl font-bold">{state}</h1>
                        {state=="Sign-up"
                        ?<p className="text-sm">Already have an account ? <span onClick={() => setState("Login")} className="text-blue-700 underline cursor-pointer">Log in</span></p>
                        :<p className="text-sm">Doesn't have an account yet? <span onClick={() => setState("Sign-up")} className="text-blue-700 underline cursor-pointer">Sign up</span></p>
                        }
                    </div>

                    <form className="flex flex-col gap-2 w-full" onSubmit={handleSubmit(handleOnSubmit)}>
                        {state == "Sign-up" ?<>
                        <div>
                            <h1 className="text-sm text-neutral-800">Firstname</h1>
                            <input {...registerLogin("firstname" , {required:"FirstName is required" ,  minLength:{value:2 , message:"FirstName cannot be less then 3 alphabets"} , maxLength:{value:12 , message:"Firstname cannot be more then 12 alphabets"}})} type="text" placeholder="enter your first name" className={`${loginError.firstname ? "border-red-400 active:border-red-400" : "border-neutral-800"} text-sm border-1 w-full p-2`}/>
                            {loginError.firstname && (
                                <p className="text-red-500 text-xs">{loginError.firstname.message}</p>
                            )}
                        </div>

                        <div>
                            <h1 className="text-sm text-neutral-800">Lastname</h1>
                            <input {...registerLogin("lastname" , {required:"Lastname is Required" , minLength:{value:2 , message:"Lastname cannot be less then 3 alphabets"} , maxLength:{value:12 , message:"Lastname cannot be more then 12 alphabets"}})} type="text" placeholder="enter your last name" className={`${loginError.firstname ? "border-red-400 active:border-red-400" : "border-neutral-800"} text-sm border-1 w-full p-2`} />
                            {loginError.lastname && (
                                <p className="text-red-500 text-xs">{loginError.lastname.message}</p>
                            )}
                        </div> </>: ""}

                        <div>
                            <h1 className="text-sm text-neutral-800">Email Address</h1>
                            <input {...registerLogin("email" , {required:"Email is required"})} type="email"  placeholder="enter your email" className={`${loginError.firstname ? "border-red-400 active:border-red-400" : "border-neutral-800"} text-sm border-1 w-full p-2`}/>
                            {loginError.email&& (
                                <p className="text-red-500 text-xs">{loginError.email.message}</p>
                            )}
                        </div>

                        <div>
                            <h1 className="text-sm text-neutral-800">Password</h1>
                            <div className="">
                                <div className="relative">
                                  <input {...registerLogin("password" , {required:"Password is required" , pattern:{value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).+$/ , message:"password must include uppercase, lowercase, number & special character"}})} type={`${eyeOpen ? "text" : "password"}`} placeholder="enter your password" className={`${loginError.firstname ? "border-red-400 active:border-red-400" : "border-neutral-800"} text-sm border-1 w-full p-2 `}/>
                                  {eyeOpen ? <RxEyeOpen className="w-6 h-6 absolute top-1/2 -translate-y-1/2  right-4 text-neutral-800" onClick={()=>setEyeOpen(false)}/>:<RxEyeClosed className="w-6 h-6 absolute  top-1/2 -translate-y-1/2 right-4 text-neutral-800" onClick={()=>setEyeOpen(true)}/>}
                                </div>
                              {loginError.password && (
                                <p className="text-red-500 text-xs break-words w-full">{loginError.password.message}</p>
                              )}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-1">
                               <input type="checkbox" {...registerLogin("agreetoterms" , {required:"please agree to our terms and conditions."})} className="h-5"/>
                               <p className="text-xs text-neutral-700">I agree to the <span className="underline text-blue-500 cursor-pointer" onClick={()=>Navigate("/terms-and-conditions")}>Terms & Conditions</span> and <span className="underline text-blue-500 cursor-pointer" onClick={()=>Navigate("/privacy-policy")}>Privacy Policy</span>.</p>
                            </div>
                            <button className="bg-[#c2a79a] w-full py-2 font-bold ">{authLoading ? <IoPawSharp className="h-4 w-4 mx-auto animate-spin "/> : state}</button>
                        </div>
                    </form>

                    <div className="flex flex-col gap-2">
                            <p className="text-center text-neutral-500 text-sm">---Or---</p>
                            <div className="flex justify-between">
                                <button onClick={handleGoogleLogin}  className="px-4 py-2 border-2 text-neutral-600 w-full text-center text-sm flex items-center justify-center gap-2">
                                    {googleloading
                                    ?<IoPawSharp className="text-xl animate-spin"/>
                                    :
                                    <> 
                                        <img src={assets.google} alt="" className="w-5 h-5"/>
                                        Continue with Google
                                    </>
                                    }
                                </button>
                            </div>
                    </div>


                    <div>

                    </div>
                </div>

            </div>
            

        </section>
    )
}