import { useContext, useEffect, useState } from "react";
import { Link, Navigate,  useNavigate } from "react-router-dom";
import "./cart.styles.scss";
import { CartContext } from "../../contexts/cart/cart.context.js";
import CartProductComponent from "../../components/cartProduct/CartProduct.component.jsx";
import { faReply } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CartService } from "../../services/cart.service.js";
import { SessionContext } from "../../contexts/session/session.context.js";


export default function CartPage() {
  const navigate = useNavigate();
  const {session} = useContext(SessionContext);

  const { cart, setCart, setPay } = useContext(CartContext);
  const [total, setTotal] = useState(0);

  function clearCart() {
    CartService.clear();
    setCart();
  }

  function pay() {
    setPay(true);
    navigate("/payment");
  }

  useEffect(() => {
    function getTotal() {
      let t = 0;
      cart.products.forEach((p) => {
        t += p.price * p.quantity;
      });
      setTotal(t.toFixed(2));
    }
    getTotal();
  }, [cart.products]);

  if (!session) {
    return <Navigate to={"/auth"}/>
  }

  return (
    <div className="cart-page">
      <div className="ctp-title-bar">
        <h1>Changuito de compras</h1>
        <Link to={"/"}>
          <FontAwesomeIcon icon={faReply} />
          <p>Volver a Inicio</p>
        </Link>
      </div>
      <div className="cart-page-content">
        {cart.products.length > 0 ? (
          cart.products.map((product) => (
            <CartProductComponent key={product.id} props={product} />
          ))
        ) : (
          <p>El carrito está vacío.</p>
        )}
      </div>
      <footer className="ctp-bottom">
        <button className="btn-clear" onClick={clearCart} disabled={cart.products.length <= 0}>Vaciar carrito</button>
        <p>Total a pagar ${total}</p>
        <button className="btn-pay" onClick={pay} disabled={cart.products.length <= 0}>Pagar</button>
      </footer>
    </div>
  );
}
