import Header from "./components/Header";
import ShopList from "./components/ShopList";
import ShoppingCart from "./components/ShoppingCart";
import Checkout from "./components/Checkout";
import { Fragment } from "react";

function App() {
  

  return (
    <>
    <Fragment>
      <Header />
      <ShopList />
      <ShoppingCart />
      <Checkout />
    </Fragment>
    </>
  )
}

export default App;
