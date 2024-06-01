import logoImage from "../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../Store/UI-slice";

export default function Header() {
    const cartItems = useSelector(state => state.cart.items)
    const dispatch = useDispatch();

    //zbrajamo item quantity propertije iz state arraya kako bi dobili broj stavki
    const cartTotal = cartItems.reduce((total, item) => {
        return total + item.quantity;

    }, 0)

    function handleOpenCart () {
        dispatch(uiActions.showCart()); //funkcija iz contexta
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