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
      cart.forEach((p) => {
        t += p.price * p.quantity;
        console.log(p)
      })
      setTotal(t.toFixed(2));
    }
    getTotal();
  });

  return (
    <div className="cart-page">
      <div className="ctp-title-bar">
        <h1>Changuito de compras</h1>
      </div>
      <div className="cart-page-content">
        {cart.length > 0 ? (
          cart.map((product, index) => (
            <CartProductComponent key={index} props={product} />
          ))
        ) : (
          <p>El carrito está vacío.</p>
        )}
      </div>
      <footer className="ctp-bottom">
        <p>Total a pagar ${total}</p>
        <button>Pagar</button>
      </footer>
    </div>
  );
}
