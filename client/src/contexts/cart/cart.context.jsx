import { useState } from "react";
import { CartContext } from "./cart.context";

export default function CartContextl({children}) {
  const [cart, _setCart] = useState(JSON.parse(localStorage.getItem("products")) ?? []);

  function addProduct(product) {
    const prod = cart.find(x => x.id === product.id);
    if (!prod) {
      localStorage.removeItem("products");
      const newP = [...cart, product];
      localStorage.setItem("products", JSON.stringify(newP));
      _setCart(JSON.parse(localStorage.getItem("products"))); 
    }
  }

  function removeProduct(product) {
    localStorage.removeItem("products");
    const newP = cart.filter(p => p.id !== product.id);
    localStorage.setItem("products", JSON.stringify(newP));
    _setCart(JSON.parse(localStorage.getItem("products")));
  }

  function updateProduct(product) {
    localStorage.removeItem("products");
    const newP = cart.map((p) => {
      if (p.id === product.id) {
        p.quantity = product.quantity;
      }
      return p;
    })
    localStorage.setItem("products", JSON.stringify(newP));
    _setCart(JSON.parse(localStorage.getItem("products")));
  }

  function clearCart() {
    localStorage.removeItem("products");
    _setCart([]);
  }
  
  return (
    <CartContext.Provider value={{ cart, addProduct, removeProduct, updateProduct, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}
