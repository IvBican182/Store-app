import CartContext from "../Store/CartContext"
import Button from "./UI/Button"
import { useContext } from "react"
import { currencyFormatter } from "../utils/formatter";

//komponenta za izgled svake stavke na shopping listi
export default function Item({shopItem}) {
    const cartCtx = useContext(CartContext);

    function handleAddItemToCart() {
        cartCtx.addItem(shopItem);
    }
    return (
        <li className="shop-item">
            <article>
                <img src={shopItem.image} alt={shopItem.title}/>
                <div>
                    <h3>{shopItem.title}</h3>
                    <p className="shop-item-price">{currencyFormatter.format(shopItem.price)}</p>
                    <p className="shop-item-description">{shopItem.description}</p>
                </div>
                <p className="shop-item-actions">
                    <Button onClick={handleAddItemToCart} textOnly >Add to Cart</Button>
                </p>
            </article>

        </li>
    )
}