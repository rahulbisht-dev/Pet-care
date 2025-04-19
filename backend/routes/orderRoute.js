import express from "express";
import { addAddress, addToCart, cancelOrder, clearCart, createOrUpdateOrder, getCartItems, getProductDetails, getUserAddress, getUserOrders, removeFromCart, updateAddress, updateCartItems } from "../controllers/orderController.js";
import {validateUser} from "../middlewares/validator.js"


const router = express.Router();

router.route("/getproduct/:productId").get(getProductDetails);
router.route("/getcartitems").get(validateUser , getCartItems);
router.route("/addtocart").post(validateUser , addToCart);
router.route("/removefromcart").post(validateUser , removeFromCart);
router.route("/updatecartitems").post(validateUser , updateCartItems);
router.route("/getuseraddress").get(validateUser , getUserAddress);
router.route("/adduseraddress").post(validateUser , addAddress);
router.route("/updateuseraddress").post(validateUser , updateAddress);
router.route("/createorupdateorder").post(validateUser , createOrUpdateOrder);
router.route("/clearCart").post(validateUser , clearCart);
router.route("/getuserorders").get(validateUser , getUserOrders);
router.route("/cancelorder/:orderId").post(validateUser , cancelOrder);

export default router;