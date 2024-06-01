import Modal from "./UI/Modal";
import Button from "./UI/Button";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import CartItem from "./CartItem";
import { currencyFormatter } from "../utils/formatter";
import { uiActions } from "../Store/UI-slice";
import { cartActions } from "../Store/cartState-slice";

export default function ShoppingCart() {
    const cartItems = useSelector(state=> state.cart.items)
    const uiProgress = useSelector(state => state.ui.progress)
    const dispatch = useDispatch();

    
    const cartTotatPrice = cartItems.reduce((totalPrice, item) => {
        return totalPrice + item.quantity * item.price;
    }, 0)

    function handleOpenCheckout () {
        dispatch(uiActions.showCheckout());
    }

    function handleHideCart() {
        dispatch(uiActions.hideCart());
    }

    return (
        <Modal open={uiProgress === "cart"} //otvaramo modal ako je progress === "cart"
        onClose={uiProgress === "cart" ? handleHideCart : null}>
            <h2>Your Cart</h2>
            <ul>
                {cartItems.map((item) => { //prikazujemo array predmete u našoj košarici
                    return <CartItem 
                    key={item.id} 
                    price={item.price}
                    name={item.name}
                    img={item.image}
                    quantity={item.quantity}
                    onIncrease={() => dispatch(cartActions.addItem(item))} //prebacujemo funkcije za dodavanje ili brisanje predmeta
                    onDecrease={() => dispatch(cartActions.removeItem(item.id))}/>
                })}
            </ul>
            <p className="total">{currencyFormatter.format(cartTotatPrice)}</p>
            <p className="modal-actions">
                <Button onClick={handleHideCart}>Close</Button>
                {cartItems.length > 0 ? (<Button onClick={handleOpenCheckout}>Go to Checkout</Button>) : <span>Your cart is empty!</span>}
            </p> {/*ako je state array veći od 0 prikazujemo gumb za checkout, u suprotnom pokazujemo da je košarica prazna*/}
        </Modal>
    )
}