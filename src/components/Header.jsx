import { useContext } from "react";
import ShoppingProgressContext from "../Store/ShoppingProgressContext";
import CartContext from "../Store/CartContext";
import logoImage from "../assets/logo.png";

export default function Header() {
    const cartCtx = useContext(CartContext); //uvozimo state-ove, trebaju nam podaci o spremljenim stvarima te funkcija za otvaranje košarice
    const shoppingProgressCtx = useContext(ShoppingProgressContext);

    //zbrajamo item quantity propertije iz state arraya kako bi dobili broj stavki
    const cartTotal = cartCtx.items.reduce((total, item) => {
        return total + item.quantity;

    }, 0)

    function handleOpenCart () {
        shoppingProgressCtx.showCart(); //funkcija iz contexta
    }
    return (
        <header id="header">
            <div className="title">
                <img className ="logo-img" src={logoImage}/>
            </div>
            <nav>
                <button onClick={handleOpenCart} className="cart-btn">Cart({cartTotal})</button> {/*na Cart gumb stavljamo cartTotal*/}
            </nav>
        </header>
    )
}