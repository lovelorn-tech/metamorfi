import "./header.styles.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCartShopping,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function HeaderComponent() {
  const [session, _setSession] = useState(true);

  return (
    <header className="header">
      <div className="header-left">
        <button>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <Link to={"/"}>MetaMorfi</Link>
      </div>
      <form className="header-form-search">
        <input type="text" placeholder="Buscar producto..." />
        <button type="submit">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </form>
      {session ? (
        <div className="header-right">
          <button>
            <FontAwesomeIcon icon={faCartShopping} />
          </button>
          <div className="header-profile-container">
            <img src="media/avatars/avatar_1.jpg" alt="profile button" />
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
