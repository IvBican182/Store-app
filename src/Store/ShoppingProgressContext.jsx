import { createContext ,useState} from "react";

const ShoppingProgressContext = createContext({
    progress: "",//npr "cart" ili "checkout",
    showCart: ()=> {},
    hideCart: () => {},
    showCheckout: () => {},
    hideCheckout: () => {}

});

export function ShoppingProgressContextProvider({children}) {
    const [shoppingProgress, setShoppingProgress] = useState("");

    function showCart() {
        setShoppingProgress("cart");
    }

    function hideCart() {
        setShoppingProgress("");
    }
    function showCheckout() {
        setShoppingProgress("checkout");
    }
    function hideCheckout() {
        setShoppingProgress("");
    }

    const shoppingProgressContext = {
        progress: shoppingProgress,
        showCart,
        hideCart,
        showCheckout,
        hideCheckout
    }

    return (
        <ShoppingProgressContext.Provider value={shoppingProgressContext}>{children}</ShoppingProgressContext.Provider>
    )
}

export default ShoppingProgressContext;