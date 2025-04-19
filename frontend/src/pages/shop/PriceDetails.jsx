import { CgChevronLeft, CgChevronRight, CgCreditCard, CgShield } from "react-icons/cg"


// eslint-disable-next-line react/prop-types
export const PriceDetails = ({items , itemCount ,step , onProceed , onBack , totalAmount}) =>{










    return(
        <div className="shadow-lg mt-4 bg-amber-200 rounded-lg p-4">
            <div>
                <div className="text-xl font-bold ">
                    Price Details
                </div>
            </div> 

            <div className="space-y-4">
                <div className="flex justify-between ">
                    <span className="text-sm text-neutral-800">Price /({itemCount} items)</span>
                </div>

                <div className="flex flex-col gap-1">
                    {items?.map((item , index) =>(
                        <div key={index} className="w-full flex justify-between">
                            <p key={index} className="text-neutral-700 text-sm">{item.productId.name} <span className="text-sm text-neutral-600">({item.quantity})</span></p>
                            <p className="text-sm">${item.productId.price * item.quantity}</p>
                        </div>
                        
                    ))}
                </div>

                <div className="flex justify-between">
                    <span className="text-sm">Delivery Charge</span>
                    <span className="text-green-500 text-sm">Free Delivery</span>
                </div>

                <div className="border-t pt-4 font-medium flex justify-between">
                    <span>Total Amount</span>
                    <span>${totalAmount}</span>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 flex items-center justify-center mt-4"  onClick={onProceed}>
                    {step==="payment" ? (<><CgCreditCard className="h-4 w-5 mr-2"/> Continue to Pay</>) 
                    :<>
                    <CgChevronRight className="h-4 w-4 mr-2"/>
                    {step==="cart" ? "Proceed to checkout" : "Proceed to Payment"}
                    </>}
                </button>

                {step !== "cart" &&(
                    <button  className="w-full flex items-center justify-center bg-gray-100 p-2" onClick={onBack}>
                        <CgChevronLeft className="h-4 w-4 mr-2"/> Go Back
                    </button>
                )
                }

                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CgShield className="h-4 w-4"/>
                    <span>Safe And Secure Payments</span>
                </div>
            </div>
        </div>
    )
}