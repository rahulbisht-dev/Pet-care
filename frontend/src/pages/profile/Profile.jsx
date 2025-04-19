import toast from "react-hot-toast"
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { IoPawSharp } from "react-icons/io5";
import { useGetuserdataQuery, useUpdateuserMutation } from "../../store/Api/Api";
import { assets } from "../../assets/frontend_assets/assets";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slice/UserSlice";
import { Loader } from "../../components/Loader";

export const Profile = () =>{


    const[isedit , setisedit] = useState(false);
    const {register , handleSubmit , formState:{errors} , reset} = useForm();
    const [userData , setUserData] = useState({});
    const {data, isLoading} = useGetuserdataQuery();
    const [updateProfile] = useUpdateuserMutation();
    const [updating , setupdating] = useState(false);
    const [imagefile , setImageFile] = useState(null);
    const dispatch = useDispatch();


    useEffect(() =>{
        if(data && data?.success){
            setUserData(data?.data);
            console.log(data);
            reset({
                firstname:data.data.firstname,
                lastname:data.data.lastname,
                email:data.data.email,
                dob:data.data.dob,
                gender:data.data.gender,
                addressLine1:data.data?.address?.addressLine1,
                addressLine2:data.data?.address?.addressLine2,
                state:data.data?.address?.state,
                city:data.data?.address?.city,
                pincode:data.data?.address?.pincode,
                phoneNumber:data.data?.address?.phoneNumber
            });
        }
    } ,[data , reset ])

      

    //$ function to  handle form submit
    const handleformsubmit = async(data) =>{
        setupdating(true);
        console.log(data);

        const formdata = new FormData();

        for(const key in data) {
            formdata.append(key, data[key]);
          }


          if (imagefile) {
            formdata.append("image", imagefile);
          }

          for (let [key, value] of formdata.entries()) {
            console.log(`${key}: ${value}`);
        }

        try{
            if(!isedit){
                const result = await updateProfile(formdata).unwrap(); 
                console.log(result);
                if(result.success){
                    toast.success(result.message);
                    setupdating(false);
                    dispatch(setUser(result.data))
                }
            }
        }
        catch(error){
            toast.error(error.data.message);
        }
        finally{
            setupdating(false);
        }
    }

   

    if(isLoading) return <Loader/>


    return userData && (
        <section className="lg:px-8 mt-8 px-2">
            <form className="flex flex-col gap-8" onSubmit={handleSubmit(handleformsubmit)}>

                {/* profile image */}
                <div className="flex gap-2 items-center  bg-[#e9e6e4] rounded-2xl ">

                    <div className="h-20 w-20 md:w-30 md:h-30 border-2 rounded-full relative">
                        {isedit
                        ?
                        <label htmlFor="inputimage" className="w-full h-full flex  items-center justify-center mr-8">
                            <img src={ imagefile ? URL.createObjectURL(imagefile) : userData?.image ? userData.image : assets.userprofile} alt="" className="w-full h-full absolute z-0 rounded-full "/>
                            <img src={assets.photoicon} alt="" className="w-[50%] absolute z-0 rounded-full mx-auto opacity-60"/>
                            <input type="file" accept="/*image" className="hidden" onChange={(e) => setImageFile(e.target.files[0])} id="inputimage"/>
                        </label>
                       
                        :<img src={userData?.image ? userData.image : assets.userprofile} className="w-full h-full rounded-full object-cover"/>
                        }
                    </div>

                    <div>
                        <p className="text-lg font-bold">{userData.firstname} {userData.lastname}</p>
                        <p className="text-gray-600">{userData.email}</p>
                    </div>
                </div>


                


                <div className="flex gap-8 flex-col md:flex-row">


                    {/* personal information */}
                    <div className="flex-1">
                        <div>
                            <h1 className="text-lg font-bold">Personal Information</h1>
                        </div>

                        <div className="grid grid-cols-[1fr_2fr] gap-4  bg-[#e9e6e4] rounded-2xl p-4 w-full">
                            <div className="flex flex-col lg:px-8">
                                <label htmlFor="firstname"  className="text-gray-600">Firstname</label>
                                {isedit 
                                ?<div>
                                    <input type="text" {...register("firstname" , {required:"Firstname is required"} )}  placeholder="Enter First Name" id="firstname" className="py-2  border-1 border-[#c2a79a] rounded-lg text-sm "/>
                                    <p className="text-red-500 text-sm">{errors?.details?.firstname?.message}</p>
                                </div>
                                :<p>{userData.firstname}</p>}
                            </div>

                            <div  className="flex flex-col lg:px-8 ">
                                <label htmlFor="lastname" className="text-gray-600">Lastname</label>
                                {isedit 
                                ?<div>
                                    <input type="text" {...register("lastname" , {required:"Lastname is required"} )} placeholder="Enter Last Name" id="lastname" className="py-2  border-1 border-[#c2a79a] rounded-lg text-sm "/>
                                    <p className="text-red-500 text-sm">{errors?.details?.lastname?.message}</p>
                                </div>
                                :<p>{userData.lastname}</p>}
                            </div>

                            <div  className="flex flex-col lg:px-8">
                            <label htmlFor="email" className="text-gray-600">Email</label>
                                {isedit 
                                ?<div>
                                    <input type="text" {...register("email" , {required:"Email is required"} )} placeholder="Enter Your Email" id="email" className="py-2  border-1 border-[#c2a79a] rounded-lg text-sm "/>
                                    <p className="text-red-500 text-sm">{errors?.email?.message}</p> 
                                </div>
                                :<p>{userData.email}</p>}
                            </div>

                            <div  className="flex flex-col lg:px-8">
                            <label htmlFor="dob" className="text-gray-600">DOB</label>
                                {isedit 
                                ?<div>
                                    <input type="date" {...register("dob" , {required:"Dob is required"})} placeholder="Enter Your DOB" id="dob" className="py-2  border-1 border-[#c2a79a] rounded-lg text-sm "/>
                                    <p className="text-red-500 text-sm">{errors?.dob?.message}</p>                               
                                </div>
                                :<p>{userData.dob}</p>}
                            </div>

                            <div  className="flex flex-col lg:px-8">
                            <label htmlFor="gender" className="text-gray-600">Gender</label>
                                {isedit 
                                ?<div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                    <input type="radio" {...register("gender" , {required:"gender is required"})} value="Male" placeholder="Enter Your Gender" id="gender" className="py-2  border-1 border-[#c2a79a] rounded-lg text-sm "/>Male
                                    <input type="radio" {...register("gender" , {required:"gender is required"})} value="Female" placeholder="Enter Your Gender" id="gender" className="py-2  border-1 border-[#c2a79a] rounded-lg text-sm "/>Female
                                    <input type="radio" {...register("gender" , {required:"gender is required"})} value="Other" placeholder="Enter Your Gender" id="gender" className="py-2  border-1 border-[#c2a79a] rounded-lg text-sm "/>Other
                                </div>
                                <p className="text-red-500 text-sm">{errors?.gender?.message}</p>
                                </div>
                                :<p>{userData.gender}</p>}
                            </div>


                        </div>
                    </div>

                 

                 {/* Address */}

                    <div className="flex-1 ">

                        <div>
                            <h1 className="text-lg font-bold">Address</h1>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2  gap-4  p-4 bg-[#e9e6e4] rounded-2xl">
                            <div className="flex flex-col lg:px-8">
                            <label className="text-gray-600">Address Line 1</label>
                                {isedit 
                                ?<div>
                                    <input type="text" {...register("addressLine1" , {required:"Address Line 1 is required"} )} placeholder="Enter Your Address Line 1" className="py-2  border-1 border-[#c2a79a] rounded-lg text-sm "/>
                                    <p className="text-red-500 text-sm">{errors?.address?.addressLine1?.message}</p>
                                </div>
                                :<p>{userData?.address?.addressLine1}</p>}
                            </div>

                            <div className="flex flex-col lg:px-8">
                            <label className="text-gray-600">Address Line 2</label>
                                {isedit 
                                ?<div>
                                    <input type="text" {...register("addressLine2" , {required:"Address Line 2 is required"} )} placeholder="Enter Your Address Line 2" className="py-2  border-1 border-[#c2a79a] rounded-lg text-sm "/>
                                    <p className="text-red-500 text-sm">{errors?.address?.addressLine2?.message}</p>
                                </div>
                                :<p>{userData?.address?.addressLine2}</p>}
                            </div>

                            <div className="flex flex-col lg:px-8">
                            <label className="text-gray-600">City</label>
                                {isedit 
                                ?<div>
                                    <input type="text" {...register("city" , {required:"City is required"} )} placeholder="Enter Your City" className="py-2  border-1 border-[#c2a79a] rounded-lg text-sm "/>
                                    <p className="text-red-500 text-sm">{errors?.address?.city?.message}</p>
                                </div>
                                :<p>{userData?.address?.city}</p>}
                            </div>

                            <div className="flex flex-col lg:px-8">
                            <label className="text-gray-600">Pincode</label>
                                {isedit 
                                ?<div>
                                    <input type="text" {...register("pincode" , {required:"Pincode is required"} )} placeholder="Enter Your Pincode" className="py-2  border-1 border-[#c2a79a] rounded-lg text-sm "/>
                                    <p className="text-red-500 text-sm">{errors?.address?.pincode?.message}</p>
                                </div>
                                :<p>{userData?.address?.pincode}</p>}
                            </div>

                            <div className="flex flex-col lg:px-8">
                            <label className="text-gray-600">State</label>
                                {isedit 
                                ?<div>
                                    <input type="text" {...register("state" , {required:"State is required"} )} placeholder="Enter Your State" className="py-2  border-1 border-[#c2a79a] rounded-lg text-sm "/>
                                    <p className="text-red-500 text-sm">{errors?.address?.state?.message}</p>
                                </div>
                                :<p>{userData?.address?.state}</p>}
                            </div>

                            <div className="flex flex-col lg:px-8">
                               <label className="text-gray-600">Phone Number</label>
                                {isedit 
                                ?<div>
                                    <input type="text" {...register("phoneNumber" , {required:"Phone Number is required"} )} placeholder="Enter Your Phone Number" className="py-2  border-1 border-[#c2a79a] rounded-lg text-sm "/>
                                    <p className="text-red-500 text-sm">{errors?.address?.phoneNumber?.message}</p>
                                </div>
                                :<p>{userData?.address?.phoneNumber}</p>}
                            </div>
                        </div>

                    </div>


                </div> 

                 {/* edit button  */}
                 <div>
                    <button type="submit" onClick={()=>{if( Object.keys(errors).length === 0)setisedit(!isedit)}} className="px-10 py-2 border-2 rounded-full font-bold text-white bg-[#c2a79a] hover:scale-102 transition-all duration-200">
                        {updating ? <IoPawSharp className="w-4 h-4 animate-spin"/> : isedit ? "SAVE" : "EDIT"}
                    </button>
                 </div>

            </form>   
        </section>
    )
}