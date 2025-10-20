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
import { SessionContext } from "../../contexts/session/session.context";

export default function FooterComponent() {
  const { session } = useContext(SessionContext);

  const { cart } = useContext(CartContext);
  const { url, setUrl } = useContext(FocusContext);

  useEffect(() => {
    focusService.focusAnchor(url, "footer-as");
  }, [url]);

  return (
    <footer className="footer">
      <Link to="/" className="footer-as" onClick={() => setUrl("/")}>
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
      <Link to={session ? "/cart" : "/auth"} className="footer-as" onClick={() => setUrl("/cart")}>
        <div className="ft-cart-info">
          <FontAwesomeIcon icon={faCartShopping} />
          <p
            className={`${
              (!cart.products || cart?.products?.length <= 0) && "display-none"
            }`}
          >
            {cart?.products?.length}
          </p>
        </div>
        <p>Carrito</p>
      </Link>
      <Link
        to={session ? "/profile" : "/auth"}
        className="footer-as"
        onClick={() => setUrl("/profile")}
      >
        <FontAwesomeIcon icon={faHome} />
        <p>Perfil</p>
      </Link>
    </footer>
  );
}
