
import Button from "./UI/Button"

import { currencyFormatter } from "../utils/formatter";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../Store/cartState-slice";

//komponenta za izgled svake stavke na shopping listi
export default function Item({shopItem}) {
    const dispatch = useDispatch();

    function handleAddItemToCart() { 
        dispatch(cartActions.addItem(shopItem)); //funkcija iz CartContexta
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