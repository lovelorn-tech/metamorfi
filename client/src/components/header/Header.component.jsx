import "./header.styles.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect } from "react";
import { CartContext } from "../../contexts/cart/cart.context";
import { focusService } from "../../services/focus.service";
import { FocusContext } from "../../contexts/focus/focus.context";
import { SessionContext } from "../../contexts/session/session.context";

export default function HeaderComponent() {
  const { cart } = useContext(CartContext);
  const { url, setUrl } = useContext(FocusContext);
  const {session} = useContext(SessionContext);

  useEffect(() => {
    focusService.focusAnchor(url, "header-as");
  }, [url]);

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
            <p className={`${cart.length <= 0 && "display-none"}`}>
              {cart.length}
            </p>
          </Link>
          <div className="header-profile-container">
            <img src="media/avatars/avatar_3.jpg" alt="profile button" />
          </div>
        </div>
      ) : (
        <div className="header-right-off">
          <Link to={"/auth"}>Iniciar sesión</Link>
        </div>
      )}
    </header>
  );
}
