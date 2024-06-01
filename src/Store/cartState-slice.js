import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: []
}

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        addItem(state,action) {
            const newItem = action.payload;
            const updatedItems = [...state.items];
            const existingItemIndex = state.items.findIndex((item) => item.id === newItem.id)
            //state.totalQuantity ++;

            if(existingItemIndex > -1) {
                //stoga ako postoji spremimo ga u varijablu
                const existingItem = state.items[existingItemIndex]
                //napravimo novi objekt u koji prenosimo sve iz "existingItem", ali i update-amo quantity za +1
                const updatedShopItem = {
                    ...existingItem,
                    quantity: existingItem.quantity + 1
                }
                updatedItems[existingItemIndex] = updatedShopItem;
                
            }else { //ukoliko nemamo isti objekt već u array-u, dodati ćemo novi objekt (gdje proširujemo novi predmet te mu dodajemo quantity: 1)
                updatedItems.push({...newItem, quantity: 1})
    
            }
           
            //vraćamo novi update-ani state array
            return {...state, items: updatedItems}
        },
        removeItem(state, action) {
            const id = action.payload;
            const updatedItems = state.items;
            const existingItem = state.items.find((item) => item.id === id);
            const existingCartItemIndex = state.items.findIndex((item) => item.id === id);

            if(existingItem.quantity === 1) {
              updatedItems.splice(existingCartItemIndex, 1);
                
            }else {
                existingItem.quantity--;
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
            }
            
        },
        clearCart(state) {
            return {...state, items:[]}

        }

        }
    }
);

export const cartActions = cartSlice.actions;
export default cartSlice;