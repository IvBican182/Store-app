import { createContext ,useState} from "react";

const ShoppingProgressContext = createContext({
    progress: "",//npr "cart" ili "checkout",
    showCart: ()=> {},
    hideCart: () => {},
    showCheckout: () => {},
    hideCheckout: () => {}

});

export function ShoppingProgressContextProvider({children}) { //niže navedene state-ove ćemo postaviti na "open" prop na Modal u komponentama(u returnu komponenti)
    const [shoppingProgress, setShoppingProgress] = useState(""); //te na taj način otvarati te komponente.

    function showCart() {
        setShoppingProgress("cart"); //kad postavimo na "cart" želimo da se otvori Cart komponenta
    }

    function hideCart() {
        setShoppingProgress(""); //zatvaranje Carta
    }
    function showCheckout() {
        setShoppingProgress("checkout"); //otvaranje checkout komponente
    }
    function hideCheckout() {
        setShoppingProgress(""); //zatvara checkout
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