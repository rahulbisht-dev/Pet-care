import { useState } from "react";
import { useClearcartMutation } from "../store/Api/Api";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPaymentNote } from "../store/slice/OrderSlice";


export const PaymentNote = () =>{


    const [count, setCount] = useState(10);
    const [clearcart] = useClearcartMutation();
    const Navigate = useNavigate();
    const dispatch = useDispatch();
  
  
    useEffect(() => {
      if(count === 0) {
        const handleTime = async () => {
          const result =  await clearcart().unwrap();
          if(result.success){
            Navigate("/myorders");
            dispatch(setPaymentNote());
          } 
        };
        handleTime();
        return;
      }
  
      const interval = setInterval(() => {
        setCount((prev) => prev - 1);
      }, 1000);
  
      return () => clearInterval(interval);
    }, [count , clearcart , Navigate , dispatch]);     


    return (
        <section className="bg-black/60 inset-0 fixed flex justify-center items-center">
            <div className="border-2 w-[300px] md:w-[500px] p-4 bg-amber-200 flex flex-col gap-4">
                <h1 className="text-2xl font-bold">Note :-</h1>
                <p>For security reasons, I have not integrated a payment gateway for myself. However, if you need one, I can set it up for you using your details.</p>

                <div className="mt-2">
                  <p>Redirecting to Orders Page in {count} seconds..</p>
                </div>
            </div>
        </section>
    )
}