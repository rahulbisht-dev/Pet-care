/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { CgTrash } from "react-icons/cg"
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setItemQuantity } from "../../store/slice/OrderSlice";


// eslint-disable-next-line react/prop-types
export const Cartitems = ({handleRemove}) =>{

    const items = useSelector((state) => state.order.items);
    const dispatch = useDispatch();
    const step = useSelector((state) => state.user.step);


    const setStocks = (total) => {
        const options = [];
      
        for (let i = 1; i <= total; i++) {
          options.push(<option key={i} value={i} className="text-sm text-center">{i}</option>);
        }
      
        return options;
      };


      const handleOnChange = (payload) =>{
        dispatch(setItemQuantity(payload));
      }

      


    return items && (
        <div className="pr-4">
            {items && items?.map((item) =>(
                <div key={item._id} className="flex flex-col md:items-center md:flex-row gap-4 py-4 border-b last:border-0">
                    <div className="">
                    <img src={item.productId.image} alt="item image"  className="object-contain w-40 md:48 rounded-xl"/>
                    
                    </div>

                    <div className="flex-1">
                        <h3 className="font-medium text-sm text-gray-600">Product : {item.productId.name}</h3>

                        <div className="mt-1 font-medium">
                            <span className="text-gray-500 mr-2">
                            Price : ${item.productId.price}
                            </span>
                        </div>

                        <div className="flex items-center  mt-1">
                            <p className="text-sm text-gray-500">Quantity :</p>
                            <div className="flex items-center">
                                {step === "cart" 
                                ? <select id="quantity" className="border-none text-gray-600" onChange={(e) => handleOnChange({productId:item.productId._id , quantity:e.target.value})}>
                                    {setStocks(item?.productId?.stock).map((item) =>(item))}
                                  </select>
                                : <p>{item?.quantity}</p>}
                            </div>
                        </div>

                        <div className={`${step==="cart" ? "flex" : "hidden"} mt-2 flex gap-2`}>
                            <button className="w-[100px] md:w-[200px] flex items-center" onClick={() => handleRemove(item.productId._id)}>
                                <CgTrash className="w-4 h-4 mr-1"/>
                                <span>Remove</span>
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}