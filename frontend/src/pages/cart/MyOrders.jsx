import { CgTrack, CgTrash } from "react-icons/cg";
import { useCancelorderMutation, useGetuserordersQuery } from "../../store/Api/Api";
import {useNavigate} from "react-router-dom"
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Loader } from "../../components/Loader";
import { NoData } from "../../components/noData";
import { assets } from "../../assets/frontend_assets/assets";


export const Myorders = () =>{


    const [orders , setorders] = useState([]);
    const {data , isLoading} = useGetuserordersQuery();
    const [cancelOrder] = useCancelorderMutation();
    const Navigate = useNavigate();

    useEffect(() =>{
        if(data && data?.success){
            setorders(data?.data);
        }
    },[data])

    console.log(orders);

    if(orders.length === 0) return <NoData message={"No Orders"} description={"Looks like you haven’t placed any orders yet"} buttonText="Place Order Now" onClick={()=>Navigate("/shop")} imageUrl={assets.no_items}/>
    if(isLoading) return <Loader/>


    //$ function to handle cancel order
    const canceluserOrder = async(id) =>{
        try{
            const result = await cancelOrder(id).unwrap();
            if(result.success){
                toast.success(result.message);
            }
        }
        catch(error){
            toast.error(error.data.message);
        }
    }

    return(
        <div className="px-8 md:px-16">

            {/* top section */}
            <div className="flex justify-between">
                <div>
                    <h1 className="text-2xl font-bold">My Orders</h1>
                </div>
            </div>

            {/* Orders Section */}
            <div className="flex flex-col gap-8 mt-8 w-full">
                {orders.map((order , index) =>{
                    return(
                        <div key={index} className="w-full flex flex-col gap-8 py-2 bg-amber-100 ">
                            <div className="flex items-center justify-between border-b-2 space-y-4">
                                <h1>Order #{order?._id}</h1>
                                <button className="flex items-center px-2"> <CgTrack className="w-5"/>Track Order</button>
                            </div>

                            <div className="flex flex-col gap-4  w-full">
                                {order.items.map((item , index) =>{
                                    return(
                                        <div key={index} className="w-full flex  justify-around items-center">
                                            <div>
                                                <img src={item.productId.image} alt="" className="w-30"/>
                                            </div>

                                            <div className="flex flex-col justify-between ">
                                                <h1 className="font-bold text-neutral-600">{item.productId.name}</h1>
                                                <p className="text-sm text-neutral-600">{item.productId.brand}</p>
                                                <div>
                                                   <p className="text-sm text-neutral-600">Quantity:{item.quantity}</p> 
                                                   <p className="text-neutral-500">${item.quantity * item.productId.price}</p>
                                                </div>                                               
                                            </div>

                                            <div>
                                                <h1 className="text-neutral-800">Status</h1>
                                                <p className="text-red-500">In - Transit</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>

                            <div className="w-full flex justify-around">
                                <button className="flex items-center bg-red-500 p-2" onClick={()=>canceluserOrder(order._id)}><CgTrash className="w-5 text-white"/>Cancel Order</button>
                                <p className="text-neutral-600">Total <span className="font-bold">${order.totalAmount}</span> </p>
                            </div>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}