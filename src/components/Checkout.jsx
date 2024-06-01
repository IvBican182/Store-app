import { useDispatch, useSelector } from "react-redux";
import Input from "./UI/Input";
import Button from "./UI/Button";
import Modal from "./UI/Modal";
import useHttp from "../hooks/useHttp";
import { currencyFormatter } from "../utils/formatter";
import { uiActions } from "../Store/UI-slice";
import { cartActions } from "../Store/cartState-slice";

//određujemo config za slanje podataka.
const requestConfig = {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    }
}

export default function checkout() {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);
    const uiProgress = useSelector(state => state.ui.progress)

    //primamo vrijednosti iz useHttp hooka
    const {
        data,
        sendRequest,
        clearData
    } = useHttp('https://fakestoreapi.com/carts', requestConfig)


    //određujemo totalnu vrijednost košarice
    const cartTotal = cartItems.reduce((totalItemPrice, item) => {
        return totalItemPrice + item.quantity * item.price;
    }, 0)
    //funkcija za sakrivanje Checkout modal-a
    function handleClose () {
        dispatch(uiActions.hideCheckout());
    }
    //funkcija koja zatvara checkout , ali i čisti našu košaricu te postavlja items Array na initialValue (prazan array)
    function handleFinish () {
        dispatch(uiActions.hideCheckout());
        dispatch(cartActions.clearCart());
        clearData();
        

    }

    let actions = (
        <><Button onClick={handleClose} type="button" textOnly>Close</Button>
        <Button>Submit order</Button>
        </>)

    //submit za našu formu
    function handleSubmit (event){
        event.preventDefault();

        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());

        console.log(customerData);
        //šaljemo request
        sendRequest(JSON.stringify({
            order: {
                items: cartItems,
            }
        }));



    }
    //ukoliko pošaljemo request i imamo nekakav data , otvori Success Modal
    if(data) {
        return ( <Modal
            open={uiProgress === "checkout"}onClose={handleClose}> 
            <h2>Thank you for your purchase !</h2>
            <p className="modal-actions">
                <Button onClick={handleFinish}>Okay</Button>
            </p>
            </Modal>)

    }

   

    return (
        <Modal open={uiProgress === "checkout"} //ukoliko je progress === "checkout" otvori Checkout Modal
        onClose={handleFinish}>
            <form onSubmit={handleSubmit}>
                <h2>Checkout:</h2>
                <p>Total amount: {currencyFormatter.format(cartTotal)}</p>
                <Input label="Full Name" type="text" id="name"/>
                <Input label="E-Mail Adress" type="email" id="email"/>
                <Input label="Street" type="text" id="street"/>
                <div className="control-row">
                    <Input label="Postal Code" type="text" id="postal-code"/>
                    <Input label="City" type="text" id="city" />
                </div>
                <p className="modal-actions">
                    {actions}
                </p>
            </form>

        </Modal>
    )
}