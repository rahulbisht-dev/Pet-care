import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/UserSlice";
import orderReducer from "./slice/OrderSlice";
import { Api } from "./Api/Api";
import storage from "redux-persist/lib/storage";
import {persistReducer , persistStore} from "redux-persist"



const persistConfig = {
    key:"root",
    storage,
    blacklist:["step"]
}


const userPersist = persistReducer(persistConfig , userReducer);
const orderPersist = persistReducer(persistConfig , orderReducer);



export const store = configureStore({

    reducer:{
        user:userPersist,
        order:orderPersist,
        [Api.reducerPath]:Api.reducer
    },

    middleware:(getDefaultMiddleware) => 
        getDefaultMiddleware({serializableCheck:false}).concat(Api.middleware),
})


export const persistor = persistStore(store);