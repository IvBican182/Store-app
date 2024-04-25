import Header from "./components/Header";
import ShopList from "./components/ShopList";
import ShoppingCart from "./components/ShoppingCart";
import { CartContextProvider } from "./Store/CartContext";
import { ShoppingProgressContextProvider } from "./Store/ShoppingProgressContext";
import Checkout from "./components/Checkout";

function App() {
  

  return (
    <>
    <ShoppingProgressContextProvider>
    <CartContextProvider>
      <Header />
      <ShopList />
      <ShoppingCart />
      <Checkout />
    </CartContextProvider>
    </ShoppingProgressContextProvider>
    </>
  )
}

export default App;
