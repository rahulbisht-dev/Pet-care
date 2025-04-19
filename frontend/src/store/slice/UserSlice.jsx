import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user:false,
    address:false,
    loginPopup:false,
    slideMenu:false,
    step:"cart"
}

const Slice = createSlice({
    name:"Slice",
    initialState,

    reducers:{

        toggleLoginPopup:(state)=>{
            state.loginPopup = !state.loginPopup;
        },

        toggleSlideMenu:(state) =>{
            state.slideMenu = !state.slideMenu;
        },

        setUser:(state , action) =>{
            state.user = action.payload;
        },

        setCheckoutStep:(state , action) =>{
            state.step = action.payload;
        },

        setUserAddress:(state , action) =>{
            state.address = action.payload;
        }



    }

})

export const {toggleLoginPopup , toggleSlideMenu , setUser , setCheckoutStep , setUserAddress} = Slice.actions;
export default Slice.reducer;