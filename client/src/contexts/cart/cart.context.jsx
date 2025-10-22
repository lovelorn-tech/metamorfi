import { useState } from "react";
import { CartContext } from "./cart.context";
import { CartService } from "../../services/cart.service";

export default function CartContextl({ children }) {
  const [cart, _setCart] = useState(CartService.get());
  const [pay, _setPay] = useState(false);

  function setCart() {
    _setCart(() => CartService.get());
  }

  function setPay(_pay) {
    _setPay(_pay);
  }

  return (
    <CartContext.Provider value={{ cart, setCart, pay, setPay }}>
      {children}
    </CartContext.Provider>
  );
}
