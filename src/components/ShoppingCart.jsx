import Modal from "./UI/Modal";
import Button from "./UI/Button";
import { useContext } from "react";
import CartContext from "../Store/CartContext";
import ShoppingProgressContext from "../Store/ShoppingProgressContext";
import CartItem from "./CartItem";
import { currencyFormatter } from "../utils/formatter";

export default function ShoppingCart() {
    const cartCtx = useContext(CartContext);
    const shoppingProgressCtx = useContext(ShoppingProgressContext);
    
    const cartTotatPrice = cartCtx.items.reduce((totalPrice, item) => {
        return totalPrice + item.quantity * item.price;
    }, 0)

    function handleOpenCheckout () {
        shoppingProgressCtx.showCheckout();
    }

    function handleHideCart() {
        shoppingProgressCtx.hideCart();
    }

    return (
        <Modal open={shoppingProgressCtx.progress === "cart"}
        onClose={shoppingProgressCtx.progress === "cart" ? handleHideCart : null}>
            <h2>Your Cart</h2>
            <ul>
                {cartCtx.items.map((item) => {
                    return <CartItem 
                    key={item.id} 
                    price={item.price}
                    name={item.name}
                    img={item.image}
                    quantity={item.quantity}
                    onIncrease={() => cartCtx.addItem(item)}
                    onDecrease={() => cartCtx.removeItem(item.id)}/>
                })}
            </ul>
            <p className="total">{currencyFormatter.format(cartTotatPrice)}</p>
            <p className="modal-actions">
                <Button onClick={handleHideCart}>Close</Button>
                {cartCtx.items.length > 0 ? (<Button onClick={handleOpenCheckout}>Go to Checkout</Button>) : <span>Your cart is empty!</span>}
            </p>
        </Modal>
    )
}