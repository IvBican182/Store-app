import { currencyFormatter } from "../utils/formatter"
//komponenta za predmet u košarici, dobiva propse iz ShoppingCart komponente
export default function CartItem ({ name, price, quantity, onIncrease, onDecrease, img }) {
    return (
        <li className="cart-item">
            <p>
            {name} - {<img className="cart-img" src={img} alt="picture"/>} - {quantity} * {currencyFormatter.format(price)}
            </p>
            <p className="item-quantity">
                <button className="cart-btn" onClick={onDecrease}>-</button>
                <span>{quantity}</span>
                <button className="cart-btn"onClick={onIncrease}>+</button>
            </p>
        </li>
    )
}