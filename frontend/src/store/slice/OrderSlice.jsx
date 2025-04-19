import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    items:[],
    addressPopUp:false,
    orders:[],
    Note:false
}

const Slice = createSlice({
    name:"orderSlice",
    initialState,
    reducers:{

        setItems:(state , action) =>{
            state.items = action.payload;

        },

        setItemQuantity:(state , action) =>{
            const {productId , quantity} = action.payload;
            state.items?.map((item) =>{
                if(item?.productId?._id === productId){
                    item.quantity = quantity
                }
            })
        },

        toggleAddressPopup:(state) =>{
            state.addressPopUp = !state.addressPopUp;
        },


        setUserOrders:(state ,action)=>{
            state.orders = action.payload;
        },

        setPaymentNote:(state) =>{
            state.Note = !state.Note;
        }


    }
})

export const {setItems , setItemQuantity , toggleAddressPopup ,  setUserOrders , setPaymentNote} = Slice.actions;
export default Slice.reducer;