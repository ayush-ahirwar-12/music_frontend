import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/reducers/authSlice"

const store = configureStore({
    reducer:{
        auth:authSlice,
        
    }
})

export default store;