import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    progress: ""
}

const uiSlice = createSlice({
    name: "ui",
    initialState: initialState,
    reducers: {
        showCart(state) {
            state.progress = state.progress = "cart";
        },
        hideCart(state) {
            state.progress = state.progress = "";
        },
        showCheckout(state) {
            state.progress = state.progress = "checkout";
        },
        hideCheckout(state) {
            state.progress = state.progress = "";
        }
    }
})

export const uiActions = uiSlice.actions;

export default uiSlice;