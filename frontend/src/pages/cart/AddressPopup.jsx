import { useForm } from "react-hook-form";
import { useDispatch} from "react-redux";
import { useAdduseraddressMutation, useUpdateuseraddressMutation } from "../../store/Api/Api";
import toast from "react-hot-toast";
import { toggleAddressPopup } from "../../store/slice/OrderSlice";
import { setUserAddress } from "../../store/slice/UserSlice";




// eslint-disable-next-line react/prop-types, no-unused-vars
export const AddressPopup = ({isEdit}) =>{



  const dispatch = useDispatch();
  const [addAddress] = useAdduseraddressMutation();
  const [updateAddress] = useUpdateuseraddressMutation();
  const { register, handleSubmit, formState: { errors } } = useForm();



  const addressHandler = async(data) =>{

    try{
      if(!isEdit){
        const result = await addAddress(data).unwrap();
        if(result.success){
          toast.success(result.message);
          dispatch(toggleAddressPopup());
          dispatch(setUserAddress(result?.data))
        }
      }
      else{
        const result = await updateAddress(data).unwrap();
        if(result.success){
          toast.success(result.message);
          dispatch(toggleAddressPopup());
          dispatch(setUserAddress(result?.data));
        }
      }
    }
    catch(error){
      toast.error(error?.data?.message)
    }
  }



    return(
        <div className="mx-auto p-6  rounded-lg text-black">

             <form onSubmit={handleSubmit(addressHandler)} className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <h1 className="mb-1 text-sm font-bold ">Phone Number</h1>
                  <input {...register("phoneNumber" , {required:"Phone Number is Required" , maxLength:{value:10 , message:"Phone Number Should Not More then 10 digits"} , minLength:"Phone Number Should Not Be Less than 10 digits"})} className="w-full p-2 border rounded text-sm" placeholder="Phone Number"/>
                  <p className="text-red-500 text-sm">{errors.phoneNumber?.message}</p>
                </div>

                <div className="">
                  <label className="mb-1 text-sm font-bold">Address Line 1</label>
                  <input {...register("addressLine1" , {required:"Address Line 1 is Required"})} className="w-full p-2 border rounded text-sm" placeholder="Address Line 1"/>
                  <p className="text-red-500 text-sm">{errors.addressLine1?.message}</p>
                </div>

                <div className="">
                  <label className="mb-1 text-sm font-bold">Address Line 2</label>
                  <input {...register("addressLine2" , {required:"Address Line 2 is Required"})} className="w-full p-2 border rounded text-sm" placeholder="Address Line 2"/>
                  <p className="text-red-500 text-sm">{errors.addressLine2?.message}</p>
                </div>

                <div className="">
                  <label className="mb-1 text-sm font-bold">City</label>
                  <input {...register("city" , {required:"City is Required"})} className="w-full p-2 border rounded text-sm" placeholder="City"/>
                  <p className="text-red-500 text-sm">{errors.city?.message}</p>
                </div>

                <div className="">
                  <label className="mb-1 text-sm font-bold">State</label>
                  <input {...register("state" , {required:"State is Required"})} className="w-full p-2 border rounded text-sm" placeholder="State"/>
                  <p className="text-red-500 text-sm">{errors.state?.message}</p>
                </div>

                <div className="">
                  <label className="block mb-1 text-sm font-bold">Pincode</label>
                  <input {...register("pincode" , {required:"Pincode is Required"})} className="w-full p-2 border rounded text-sm" placeholder="Pincode"/>
                  <p className="text-red-500 text-sm">{errors.pincode?.message}</p>
                </div>

                <div className="col-span-2 text-center mt-4">
                <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded shadow">{isEdit ? "Save" : "Edit"}</button>
                </div>
             </form>
        </div>

    )
}