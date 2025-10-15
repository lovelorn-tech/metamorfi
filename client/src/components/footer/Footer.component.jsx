import "./footer.styles.scss";
import { Link } from "react-router-dom";
import {
  faHome,
  faBox,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect } from "react";
import { CartContext } from "../../contexts/cart/cart.context";
import { focusService } from "../../services/focus.service";
import { FocusContext } from "../../contexts/focus/focus.context";

export default function FooterComponent() {
  const { cart } = useContext(CartContext);
  const { url, setUrl } = useContext(FocusContext);

  useEffect(() => {
    focusService.focusAnchor(url, "footer-as");
  }, [url]);

  return (
    <footer className="footer">
      <Link
        to="/"
        className="footer-as"
        onClick={() => setUrl("/")}
      >
        <FontAwesomeIcon icon={faHome} />
        <p>Inicio</p>
      </Link>
      <Link
        to="/products"
        className="footer-as"
        onClick={() => setUrl("/products")}
      >
        <FontAwesomeIcon icon={faBox} />
        <p>Productos</p>
      </Link>
      <Link
        to="/cart"
        className="footer-as"
        onClick={() => setUrl("/cart")}
      >
        <div className="ft-cart-info">
          <FontAwesomeIcon icon={faCartShopping} />
          <p className={`${cart.length <= 0 && "display-none"}`}>
            {cart.length}
          </p>
        </div>
        <p>Carrito</p>
      </Link>
      <Link
        to="/profile"
        className="footer-as"
        onClick={() => setUrl("/profile")}
      >
        <FontAwesomeIcon icon={faHome} />
        <p>Perfil</p>
      </Link>
    </footer>
  );
}
