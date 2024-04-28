import { useEffect, useRef } from "react"
import { createPortal } from "react-dom"
//pomoću modal komponente ćemo otvarati naše komponente Cart, Checkout.
export default function Modal({children, open, onClose, className=""}) {
    const dialog = useRef();

    useEffect(() => {
        const modal= dialog.current;
        if(open) {
            modal.showModal();
        }
        return ()=> modal.close();
    }, [open])
//u open ćemo proslijeđivati različite stringove iz state progress-a kako bi otvorili pojedinu komponentu (ili zatvorili)


    return  createPortal(
        <dialog ref={dialog} onClose={onClose} className={`modal ${className}`}>
            {children}
        </dialog>
    , document.getElementById("modal"))

}