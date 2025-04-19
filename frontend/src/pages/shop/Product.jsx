import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { IoPawSharp } from "react-icons/io5";
import toast from "react-hot-toast";
import {useAddtocartMutation, useGetproductdetailsQuery} from "../../store/Api/Api";

export const Product = () =>{

    const[product , setproduct] = useState({});
    const [addingToCart , setAddingToCart] = useState(false);
    const {id} = useParams();


    const {data , isLoading} = useGetproductdetailsQuery(id);
    const [addtocart] = useAddtocartMutation();
    const navigate = useNavigate();


    useEffect(() =>{
        if(data && data.success){
            setproduct(data.data);
        }
    },[data])

    console.log(data);



//$ functino to add in the cart

    const addToCart = async() =>{
        setAddingToCart(true)
        try{
            const result = await addtocart({productId:id , quantity:1}).unwrap();
            if(result.success){
             toast.success(result.message);
             navigate("/cart");
             setAddingToCart(false);
            }
        }
        catch(error){
            toast.error(error.data.message);
        }
        finally{
            setAddingToCart(false);
        }
    }




    if(isLoading) return <h1>Loading...</h1>;

    return(
        <section className="mt-16 lg:px-8 px-2">


            <div className="flex flex-col lg:flex-row gap-12 ">

                {/* image section*/}
                <div className="lg:w-100 rounded-lg">
                    <img src={product.image} alt="" className="rounded-lg"/>
                </div>

                {/* details section */}
                <div className="flex-1 flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <p className="text-black">Name : <span className="text-sm text-neutral-600">{product.name}</span></p>
                        <p className="text-black">Category : <span className="text-sm text-neutral-600">{product.category}</span></p>
                        <p className="text-black">Brand : <span className="text-sm text-neutral-600">{product.brand}</span></p>
                        <p className="text-black">Price : <span className="text-sm text-neutral-600"> ${product.price}</span></p>
                    </div>

                    <div className="flex flex-col gap-4">

                        <div className="flex flex-col gap-2">
                            <p className="text-black">Policy :</p>
                            <p className="text-sm text-neutral-600">{product.policy}</p>
                        </div>

                        <div className="flex flex-col gap-1">
                            <p className="text-black">Description :</p>
                            <p className="text-sm text-neutral-600">{product.description}</p>
                        </div>

                        <div>
                            <button onClick={()=>addToCart({productId:product._id , quantity:1})} className="flex items-center gap-2 px-8 py-2 bg-[#c2a79a] text-white rounded-full group hover:scale-103 transition-all duration-200">
                                {addingToCart  ? <IoPawSharp className="text-lg animate-spin text-white"/> 
                                :
                                <>
                                Add to Cart
                                <IoPawSharp className="hidden group-hover:block"/> 
                                </>
                                 }
                            </button>
                        </div>
                        
                    </div>

                </div>



            </div>
        </section>
    )
}