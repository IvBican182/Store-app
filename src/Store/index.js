import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartState-slice";
import uiSlice from "./UI-slice";

const store = configureStore({
    reducer: { 
        ui: uiSlice.reducer,
        cart: cartSlice.reducer,
     }
});

export default store;
