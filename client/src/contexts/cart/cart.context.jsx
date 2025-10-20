import { useState } from "react";
import { CartContext } from "./cart.context";
import { CartService } from "../../services/cart.service";

export default function CartContextl({ children }) {
  const [cart, _setCart] = useState(CartService.get());

  function setCart() {
    _setCart(() => CartService.get());
  }

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
}
