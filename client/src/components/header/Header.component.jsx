import "./header.styles.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCartShopping,
  faArrowRightFromBracket,
  faUser,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect } from "react";
import { CartContext } from "../../contexts/cart/cart.context";
import { focusService } from "../../services/focus.service";
import { SessionService } from "../../services/session.service";
import { FocusContext } from "../../contexts/focus/focus.context";
import { SessionContext } from "../../contexts/session/session.context";
import { DropDownService } from "../../services/dropdown.service";

export default function HeaderComponent() {
  const { cart } = useContext(CartContext);
  const { url, setUrl } = useContext(FocusContext);
  const { session, setSession } = useContext(SessionContext);

  useEffect(() => {
    focusService.focusAnchor(url, "header-as");
  }, [url]);

  function logout() {
    SessionService.removeSession();
    setSession();
    window.open("/", "_self");
  }

  return (
    <header className="header">
      <div className="header-left">
        <button>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <Link to={"/"}>MetaMorfi</Link>
      </div>
      <nav className="header-nav">
        <Link className="header-as" onClick={() => setUrl("/")} to={"/"}>
          Inicio
        </Link>
        <Link
          className="header-as"
          onClick={() => setUrl("/products")}
          to={"/products"}
        >
          Productos
        </Link>
      </nav>
      {session ? (
        <div className="header-right">
          <Link
            className="header-as header-cart"
            onClick={() => setUrl("/cart")}
            to={"/cart"}
          >
            <span>
              <FontAwesomeIcon icon={faCartShopping} />
            </span>
            <p className={`${cart?.products.length <= 0 && "display-none"}`}>
              {cart?.products.length}
            </p>
          </Link>
          <button
            onClick={() => DropDownService.setVisible("header-right-dropdown")}
            className="header-profile-container hide-mobile-768"
          >
            <img src="media/avatars/avatar_3.jpg" alt="profile button" />
          </button>
          <ul
            tabIndex={0}
            onBlur={(e) => DropDownService.hide(e, "header-right-dropdown")}
            id="header-right-dropdown"
            className="header-profile-menu"
          >
            <li>
              <Link to={`/channel/`}>
                <FontAwesomeIcon icon={faUser} />
                <p>Perfil</p>
              </Link>
            </li>
            <li>
              <Link to={`/addproduct`}>
                <FontAwesomeIcon icon={faGear} />
                <p>Gestor de productos</p>
              </Link>
            </li>
            <li>
              <button onClick={logout}>
                <FontAwesomeIcon icon={faArrowRightFromBracket} />
                <p>Cerrar sesión</p>
              </button>
            </li>
          </ul>
        </div>
      ) : (
        <div className="header-right-off">
          <Link to={"/auth"}>Iniciar sesión</Link>
        </div>
      )}
    </header>
  );
}
