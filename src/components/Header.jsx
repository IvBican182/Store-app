import { useContext } from "react";
import ShoppingProgressContext from "../Store/ShoppingProgressContext";
import CartContext from "../Store/CartContext";
import logoImage from "../assets/logo.png";

export default function Header() {
    const cartCtx = useContext(CartContext);
    const shoppingProgressCtx = useContext(ShoppingProgressContext);

    const cartTotal = cartCtx.items.reduce((total, item) => {
        return total + item.quantity;

    }, 0)

    function handleOpenCart () {
        shoppingProgressCtx.showCart();
    }
    return (
        <header id="header">
            <div className="title">
                <img className ="logo-img" src={logoImage}/>
            </div>
            <nav>
                <button onClick={handleOpenCart} className="cart-btn">Cart({cartTotal})</button>
            </nav>
        </header>
    )
}