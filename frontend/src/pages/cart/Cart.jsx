import { CgChevronRight, CgCreditCard,CgShoppingCart } from "react-icons/cg";
import {  FaMapPin } from "react-icons/fa";
import { useCreateorupdateorderMutation, useGetcartitemsQuery, useGetuseraddressQuery, useRemovefromcartMutation, useUpdatecartitemsMutation } from "../../store/Api/Api";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Cartitems } from "./Cartitems";
import toast from "react-hot-toast"
import {PriceDetails} from "../shop/PriceDetails"
import { setItems, setPaymentNote,  setUserOrders, toggleAddressPopup } from "../../store/slice/OrderSlice";
import { setCheckoutStep, setUserAddress, toggleLoginPopup } from "../../store/slice/UserSlice";
import { AddressPopup } from "./AddressPopup";
import { PaymentNote } from "../../components/paymentNote";
import { Loader } from "../../components/Loader";
import { NoData } from "../../components/noData";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/frontend_assets/assets";
import { RxCross2 } from "react-icons/rx";


export const Cart = () =>{


  const user = useSelector((state) => state.user.user);
  const cart = useSelector((state) => state.order.items);
  const orders = useSelector((state) => state.order.orders);
  const step = useSelector((state) => state.user.step);
  const note = useSelector((state) => state.order.Note);
  const isAddressPopup = useSelector((state) => state.order.addressPopUp)
  const {data , isLoading} = useGetcartitemsQuery();
  const [removefromcart] = useRemovefromcartMutation();
  const [updateCart] = useUpdatecartitemsMutation();
  const [createorupdateorder] = useCreateorupdateorderMutation();
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const [Address , setAddress] = useState(false);
  const [isEditAddress , setIsEditAddress] = useState(false);
  const {data:AddressData} = useGetuseraddressQuery();



  useEffect(() =>{
    if(data && data.success){
      dispatch(setItems(data?.data?.products || []));
      console.log(data);
    }
  },[data , dispatch]);


  useEffect(() =>{
    if(AddressData && AddressData.success){
      dispatch(setUserAddress(AddressData.data));
      setAddress(AddressData.data);
    }
  } ,[dispatch , AddressData])

  
//$ function to handle remove items from the cart
  const handleRemoveItems = async(productId) =>{
    try{
      const result = await removefromcart({productId}).unwrap();
      if(result.success){
        toast.success(result.message);
      }
    }
    catch(error){
      toast.error(error.data.message);
    }
  }
      

// $ calculating the total amount of the items.
  const Amount = cart?.reduce((acc, item) => {
    return acc + item.productId.price * item.quantity;
  }, 0);


     

//$ function to handle proceed
const onProceed = async() =>{
  
  try{

    if(step==="cart"){
      const result = await updateCart({items:cart , totalAmount:Amount}).unwrap();
      if(result.success){
        toast.success(result.message);
        dispatch(setCheckoutStep("address"));
      }
    }

    else if(step==="address"){
      if(!Address){
        dispatch(toggleAddressPopup());
      }
      else{
        dispatch(setCheckoutStep("payment"))
      }
    }
    else{
      const result = await createorupdateorder({items:cart , totalAmount:Amount , shippingId:Address._id , orderId:orders ? orders._id : null}).unwrap();
      if(result.success){
        toast.success(result.message);
        dispatch(setUserOrders(result.data));
        dispatch(setPaymentNote());
        dispatch(setCheckoutStep("cart"))
      }
    }
  }
  catch(error){
    toast.error(error.data.message);
  }
}


//$ function to get back
const onBack = () =>{
  if(step==="payment"){
    dispatch(setCheckoutStep("address"));
  }
  else if(step==="address"){
    dispatch(setCheckoutStep("cart"))
  }
  else{
    dispatch(setCheckoutStep("cart"))
  }
}





if(!user) return <NoData  message="Invailed User" description="Please Login To Access Your Cart" onClick={()=>{Navigate("/"); dispatch(toggleLoginPopup())}} buttonText="Login" imageUrl={assets.no_data}/>

  if(cart?.length === 0) return <NoData message="Your Cart Is Empty" 
       description="Looks like you haven’t added anything yet. Start shopping and give your cart some love! 💖" 
       onClick={()=>Navigate("/shop")} buttonText="Start Shopping" imageUrl={assets.no_items}/>

  if(isLoading) return <Loader/>



    return (
        <>
        {note ? <PaymentNote/> : ""}
        <div className="min-h-screen bg-white">
          <div className="bg-gray-100 py-4 px-6 mb-8">
            <div className="container mx-auto flex gap-2 items-center">
              <CgShoppingCart className="h-6 w-6 mr-2 text-gray-600"/>
              <span className="text-lg font-semibold text-gray-800">
                {cart?.length} {cart?.length === 1 ? "item" : "items"} {" "}
              </span>
            </div>
          </div>

          <div className="container mx-auto px-4 max-w-6xl">
            <div className="mb-8">
              <div className="flex items-center gap-2">
                <div className={`rounded-full gap-2 p-3 flex items-center ${step==="cart" ? 'bg-blue-600 text-white-200' : "bg-gray-200 text-gray-600"}`}>
                  <CgShoppingCart className="h-6 w-6"/>
                  <div>
                    <span className="font-medium hidden md:inline">
                      Cart
                    </span>
                  </div>
                  <CgChevronRight className="h-5 w-5 text-gray-400"/>
                </div>

                <div className={`rounded-full p-3 flex gap-2 items-center ${step==="address" ? 'bg-blue-600 text-white-200' : "bg-gray-200 text-gray-600"}`}>
                  <FaMapPin className="h-6 w-6"/>
                  <div>
                    <span className="font-medium hidden md:inline">
                      Address
                    </span>
                  </div>
                  <CgChevronRight className="h-5 w-5 text-gray-400"/>
                </div>

                <div className={`rounded-full p-3 flex gap-2 items-center ${step==="payment" ? 'bg-blue-600 text-white-200' : "bg-gray-200 text-gray-600"}`}>
                  <CgCreditCard className="h-6 w-6"/>
                  <div>
                    <span className="font-medium hidden md:inline">
                      Payment
                    </span>
                  </div>
                </div>
      
              </div>


              <div className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <div className="shadow-lg mt-4">
                    <div>
                      <div className="text-2xl font-bold">Order Summary</div>
                      <div className="text-md text-gray-600">Review Your Items</div>
                    </div>

                    <div>
                      <Cartitems handleRemove={handleRemoveItems} Cartitems={cart} />
                    </div>
                  </div>
                </div>

                <div>
                  <PriceDetails step={step} items={cart} itemCount={cart?.length} onProceed={onProceed} totalAmount={Amount} onBack={onBack}/>

                  {Address && (step==="address" || step==="payment")? (
                    <div className="mt-6 mb-6 shadow-lg bg-amber-200 rounded-lg p-4">
                      <div>
                        <div className="text-xl font-bold mb-2">Delivery Address</div>
                      </div>

                      <div>
                        <div className="space-y-1">
                          <p>{Address?.addressLine1}</p>
                          {Address?.addressLine2 && (<p>{Address?.addressLine2}</p>)}
                          <p>{Address?.city} , {Address.state} {" "} {Address?.pincode}</p>
                          <p>Phone : {Address?.phoneNumber}</p>
                        </div>
                        <button className="mt-4 flex items-center rounded-lg bg-blue-400 p-2" onClick={() =>{setIsEditAddress(true); dispatch(toggleAddressPopup())}}>
                          <FaMapPin className="h-4 w-4 mr-2"/> Edit Address
                        </button>
                      </div>
                    </div>
                  ):""}
                </div>
              </div>

              <div className={`${isAddressPopup ? "flex" : "hidden"}  fixed inset-0  bg-black/80 p-4 text-white justify-center items-center  transition-opacity duration-300 z-[200]`}>
                   <div className="w-[400px] md:w-[600px] relative bg-white flex">
                       <RxCross2 className="absolute text-2xl top-4 right-4 z-10 text-black" onClick={()=>dispatch(toggleAddressPopup())}/>
                       <div className="p-8 w-full flex flex-col gap-4 bg-white/20">
                          <h1 className="text-center text-black text-2xl font-bold">{isEditAddress ? "Edit Your Address" : "Add Your Address"}</h1>
                          <AddressPopup  isEdit={isEditAddress}/>
                       </div>
                   </div>
              </div>


            </div>
          </div>
        </div>
        </>
      )
}
