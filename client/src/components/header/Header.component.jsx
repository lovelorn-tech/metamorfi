import "./header.styles.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCartShopping
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../contexts/cart/cart.context";
import { focusService } from "../../services/focus.service";

export default function HeaderComponent() {
  const {cart} = useContext(CartContext);
  const [session, _setSession] = useState(true);

  useEffect(() => {
    focusService.focusAnchor(undefined, "header-as")
  }, []);

  return (
    <header className="header">
      <div className="header-left">
        <button>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <Link to={"/"}>MetaMorfi</Link>
      </div>
      <nav className="header-nav">
        <Link className="header-as" onClick={() => focusService.focusAnchor("/", "header-as")} to={"/"}>Inicio</Link>
        <Link className="header-as" onClick={() => focusService.focusAnchor("/products", "header-as")} to={"/products"}>Productos</Link>
      </nav>
      {session ? (
        <div className="header-right">
          <Link className="header-as header-cart" onClick={() => focusService.focusAnchor("/cart", "header-as")} to={"/cart"}>
            <span><FontAwesomeIcon icon={faCartShopping} /></span>
            <p className={`${cart.length <= 0 && 'display-none'}`}>{cart.length}</p>
          </Link>
          <div className="header-profile-container">
            <img src="media/avatars/avatar_3.jpg" alt="profile button" />
          </div>
        </div>
      ) : (
        <div className="header-right-off">
          <Link to={"/auth"}>
            Iniciar sesión
          </Link>
        </div>
      )}
    </header>
  );
}
