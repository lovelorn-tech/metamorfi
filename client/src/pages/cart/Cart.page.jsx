import { useContext, useEffect, useState } from "react";
import "./cart.styles.scss";
import { CartContext } from "../../contexts/cart/cart.context.js";
import CartProductComponent from "../../components/cartProduct/CartProduct.component.jsx";

export default function CartPage() {
  const { cart } = useContext(CartContext);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    function getTotal() {
      let t = 0;
      cart.products.forEach((p) => {
        t += p.price * p.quantity;
      })
      setTotal(t.toFixed(2));
      console.log(cart.products)
    }
    getTotal();
  }, [cart.products]);

  return (
    <div className="cart-page">
      <div className="ctp-title-bar">
        <h1>Changuito de compras</h1>
      </div>
      <div className="cart-page-content">
        {cart.products.length > 0 ? (
          cart.products.map((product, index) => (
            <CartProductComponent key={index} props={product} />
          ))
        ) : (
          <p>El carrito está vacío.</p>
        )}
      </div>
      <footer className="ctp-bottom">
        <p>Total a pagar ${total}</p>
        <button disabled={cart.products.length <= 0}>Pagar</button>
      </footer>
    </div>
  );
}
