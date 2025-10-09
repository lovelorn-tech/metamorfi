import "./header.styles.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCartShopping
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { CartContext } from "../../contexts/cart/cart.context";

export default function HeaderComponent() {
  const {cart} = useContext(CartContext);
  const [session, _setSession] = useState(true);

  return (
    <header className="header">
      <div className="header-left">
        <button>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <Link to={"/"}>MetaMorfi</Link>
      </div>
      <nav>

      </nav>
      {session ? (
        <div className="header-right">
          <Link to={"/cart"}>
            <span><FontAwesomeIcon icon={faCartShopping} /></span>
            <p>{cart.length}</p>
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
