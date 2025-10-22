import "./payment.styles.scss";
import { Link, Navigate } from "react-router-dom";
import { SessionContext } from "../../contexts/session/session.context";
import { CartContext } from "../../contexts/cart/cart.context";
import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faHome } from "@fortawesome/free-solid-svg-icons";
import { CartService } from "../../services/cart.service";

export default function PaymentPage() {
  const { session } = useContext(SessionContext);
  const { setCart, setPay, pay } = useContext(CartContext);
  const [products, _setProducts] = useState(CartService.get().products);

  useEffect(() => {
    CartService.clear();
    setCart();
  }, []);

  if (!session || !pay) {
    return <Navigate to={"/"} />;
  }

  window.onbeforeunload = function () {
    setPay(false);
  };

  return (
    <div className="payment-page">
      <div className="pyp-title-bar">
        <h1>Detalle del pago</h1>
      </div>
      <ul className="products-container">
        {products.map((product) => (
          <li key={product.id}>
            <p>{product.title} (X{product.quantity}) = <span>${product.price * product.quantity}</span></p>
          </li>
        ))}
      </ul>
      <div className="payment-actions">
        <button disabled className="btn-download">
          <FontAwesomeIcon icon={faDownload} />
          <p>Descargar factura</p>
        </button>
        <Link to="/" className="btn-home">
          <FontAwesomeIcon icon={faHome} />
          <p>Regresar a inicio</p>
        </Link>
      </div>
    </div>
  );
}
