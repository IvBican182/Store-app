import { createContext,useReducer } from "react";
//određujemo objekt za lakši unos u drugim komponentama
const CartContext = createContext({
    items: [],
    addItem: (item) => {},
    removeItem: (id) => {}
})

function cartReducer(state, action) {
    //logika za dodavanje item objekta i update State-a
    if(action.type === "ADD_ITEM") {
        //znamo da moramo dobiti update-an array, stoga možemo prvo definirati našu zadnju verziju arraya
        const updatedItems = [...state.items];
        //prije dodavanja item-a želimo provjeriti postoji li već navedena stavka kako bi joj update-ali quantity property,
        //a ne dodali sasvim novi objekt
        const existingItemIndex = state.items.findIndex((item) => item.id === action.item.id)
        //findIndex će returnati -1 ako ne postoji item
        if(existingItemIndex > -1) {
            //stoga ako postoji spremimo ga u varijablu
            const existingItem = state.items[existingItemIndex]
            //napravimo novi objekt u koji prenosimo sve iz "existingItem", ali i update-amo quantity za +1
            const updatedShopItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1
            }
            updatedItems[existingItemIndex] = updatedShopItem;
            
        }else { //ukoliko nemamo isti objekt već u array-u, dodati ćemo novi objekt (gdje proširujemo novi item te mu dodajemo quantity: 1)
            updatedItems.push({...action.item, quantity: 1})

        }


        console.log(updatedItems);
       
        //vraćamo novi update-ani state
        return {...state, items: updatedItems}
    }

    if (action.type === "CLEAR_CART") {
        return {...state, items:[]}
    }

    if(action.type === "REMOVE_ITEM") {
        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.id);

        const existingItem = state.items[existingCartItemIndex];

        const updatedItems = [...state.items]

        if(existingItem.quantity === 1) {
            updatedItems.splice(existingCartItemIndex, 1)
        }else {
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity - 1
            }
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        return {...state, items: updatedItems}
    }


return state;

}

export function CartContextProvider({children}) {
    const [cart, dispatchCartAction] = useReducer(cartReducer, {items:[]})

    function addItem(item) {
        dispatchCartAction({type: "ADD_ITEM", item});
    }

    function removeItem(id) {
        dispatchCartAction({type: "REMOVE_ITEM", id});

    }

    function clearCart() {
        dispatchCartAction({type: 'CLEAR_CART'})
       }

    const cartContext = {
        items: cart.items,
        addItem,
        removeItem,
        clearCart
    }
    return(
        <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
    )
}

export default CartContext;