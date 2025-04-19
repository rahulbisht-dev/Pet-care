import { Address } from "../modules/Address.js";
import { Cart } from "../modules/Cart.js";
import { Order } from "../modules/Order.js";
import Store from "../modules/Store.js";
import User from "../modules/User.js"


//$ function to get the details of the product
export const getProductDetails = async(req ,res) =>{

    try{
        const {productId} = req.params;
        const product = await Store.findById(productId);
        
        return res.status(200).send({success:true , data:product})
    }
    catch(error){
        console.log(error);
        res.status(501).send({success:false , message:"Internal Server Error , Please Try Again Later."})
    }
}


//$ function to get all the items of the cart
export const getCartItems = async(req , res) =>{

    try{
        const userId = req.userId;
        const cartItems = await Cart.findOne({userId}).populate("products.productId");
        return res.status(200).send({success:true , data:cartItems});
    }
    catch(error){
        console.log(error);
        res.status(501).send({success:false , message:"Internal Server Error , Please Try Again Later."})
    }
}


//$ function to add the Product in the cart
export const addToCart = async(req , res) =>{

    try{
        const userId = req.userId;
        const {productId , quantity} = req.body;

        const cart = await Cart.findOne({userId});

        if(!cart){
            const newcart = new Cart({userId , products:[{productId , quantity:1}]});
            await newcart.save();
            return res.status(200).send({success:true , message:"Successfuly Added to the cart."});
        }
        else{
            const productIndex = cart.products.findIndex((index) => index.productId.toString() === productId);

            if(productIndex > -1){
                return res.status(400).send({success:false , message:"Item is already in your Cart"})
            }
            else{
                cart.products.push({productId , quantity:1})
            }
        }
        await cart.save();
        return res.status(200).send({success:true , message:"Successfuly Added to the cart."});
    }
    catch(error){
        console.log(error);
        res.status(501).send({success:false , message:"Internal Server Error , Please Try Again Later."})  
    }
}


//$ function to remove the product from the cart
export const removeFromCart = async(req , res) =>{

    try{
        const userId = req.userId;
        const {productId} = req.body;

        const cart = await Cart.findOne({userId});

        cart.products = cart?.products?.filter(
            (item) => item.productId.toString() !== productId
        );

        await cart.save();
        return res.status(200).send({success:true , message:"Successfully removed item from the Cart"});

    }
    catch(error){
        console.log(error);
        res.status(501).send({success:false , message:"Internal Server Error , Please Try Again Later."})   
    }
}


//$ function to update the items in the cart
export const updateCartItems = async(req , res) =>{

    try{
        const userId = req.userId;
        const {items , totalAmount} = req.body;

        let cart = await Cart.findOne({userId});

        if(cart){
            cart.products = items;
            cart.totalAmount = totalAmount;
        }


        await cart.save();
        res.status(200).send({success:true , message:"Cart Updated  Successfully"})

    }
    catch(error){
        console.log(error);
        res.status(501).send({success:false , message:"Internal Server Error , Please Try Again Later."})    
    }
}

//$ function to clear cart items
export const clearCart = async(req , res) =>{

    try{
        const userId = req.userId;
        let cart = await Cart.findOne({userId});
        if(cart){
            cart.products = [];
            cart.totalAmount = null;
        }
        await cart.save();
        return res.status(200).send({success:true , message:"Cart Cleared Successfully"});
    }
    catch(error){
        console.log(error);
        res.status(501).send({success:false , message:"Internal Server Error , Please Try Again Later."})           
    }
}


//$function to add an address
export const addAddress = async(req , res) =>{

    try{
        const userId = req.userId;
        const {addressLine1 , addressLine2 , city , pincode , state , phoneNumber} = req.body;
        const newAddress = new Address({user:userId , addressLine1 , addressLine2 , city , pincode , state , phoneNumber});
        await newAddress.save();

        let user = await User.findById(userId);
        if(user){
            user.address = newAddress._id;
        }
        await user.save();

        res.status(200).send({success:true , message:"Address Saved Successfully" , data:newAddress});
    }
    catch(error){
        console.log(error);
        res.status(501).send({success:false , message:"Internal Server Error , Please Try Again Later."})          
    }
}


//$function to update the address
export const updateAddress = async(req , res) =>{

    try{
        const userId = req.userId;
        const {addressLine1 , addressLine2 , city , pincode , state , phoneNumber} = req.body;
        let address = await Address.findOne({user:userId});

        if(address){
            address.addressLine1 = addressLine1;
            address.addressLine2 = addressLine2;
            address.city = city;
            address.pincode = pincode;
            address.state = state;
            address.phoneNumber = phoneNumber;
        }

        await address.save();
        return res.status(200).send({success:true , message:"Address Updated Successfully" , data:address})

    }
    catch(error){
        console.log(error);
        res.status(501).send({success:false , message:"Internal Server Error , Please Try Again Later."})    
    }
}


//$function to get user Address
export const getUserAddress = async(req , res) =>{

    try{
        const userId = req.userId;
        const address = await Address.findOne({user:userId});
        if(!address){
            return res.status(400).send({success:false , message:"Please Add Your Address.."})
        }

        return res.status(200).send({success:true , data:address});
    }
    catch(error){
        console.log(error);
        res.status(501).send({success:false , message:"Internal Server Error , Please Try Again Later."})           
    }
}


//$function to create or update an order.
export const createOrUpdateOrder = async(req , res) =>{

    try{
        const userId = req.userId;
        const {items , totalAmount , shippingId , orderId} = req.body;
        console.log(req.body);

        if(orderId){
            const order = await Order.findById(orderId);
            if(order){
                order.items = items;
                order.totalAmount = totalAmount;
                order.shippingAddress = shippingId;
                await order.save();
                return res.status(200).send({success:true , message:"Your Order Updated Successfully"})
            }
        }

        if(!shippingId){
            return res.status(400).send({success:false , message:"Please Add Your Address"})
        };

        const newOrder = new Order({user:userId , items , totalAmount , shippingAddress:shippingId});
        await newOrder.save();
        return res.send({success:true , message:"Your Order Created Successfully" , data:newOrder});
    }
    catch(error){
        console.log(error);
        res.status(501).send({success:false , message:"Internal Server Error , Please Try Again Later."})          
    }
}

//$ function to get all the orders of the user

export const getUserOrders = async(req , res) =>{

    try{
        const userId = req.userId;
        const orders = await Order.find({user:userId}).populate("items.productId");

        if(!orders){
            return res.status(400).send({success:false , message:"No Orders."})
        }

        return res.status(200).send({success:true , data:orders})
    }
    catch(error){
        console.log(error);
        res.status(501).send({success:false , message:"Internal Server Error , Please Try Again Later."})    
    }
}


//$ function to cancel the orders

export const cancelOrder = async(req , res) =>{

    try{
        const orderId = req.params.orderId;
        const myorder = await Order.findByIdAndDelete(orderId);
        return res.status(200).send({success:true , message:"Order Deleted Successfully"})
    }
    catch(error){
        console.log(error);
        res.status(501).send({success:false , message:"Internal Server Error , Please Try Again Later."})     
    }
}