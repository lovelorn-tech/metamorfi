import "./product.styles.scss";
import { faCartShopping, faReply } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState, useContext } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { productService } from "../../services/product.service";
import { CartService } from "../../services/cart.service.js";
import { CartContext } from "../../contexts/cart/cart.context.js";
import { SessionContext } from "../../contexts/session/session.context.js";

export default function ProductPage() {
  const { id } = useParams();
  const uid = useSearchParams()[0].get("uid");

  const { session } = useContext(SessionContext);

  const { setCart } = useContext(CartContext);
  const [product, _setProduct] = useState(undefined);

  function add() {
    CartService.addProduct(product);
    setCart();
  }

  useEffect(() => {
    const getProducts = async () => {
      const product = await productService.get(id, uid);
      _setProduct(product);
    };
    getProducts();
  }, [id, uid]);

  return (
    <div className="product-page">
      <div className="pp-title-bar">
        <h1>{product?.title ?? "Producto no encontrado"}</h1>
        <Link to={"/products"}>
          <FontAwesomeIcon icon={faReply} />
          <p>Volver</p>
        </Link>
      </div>
      {product && (
        <div className="pp-content">
          <div className="pp-thumbnail-container">
            <img src={product.image} alt="product name" />
          </div>
          <div className="pp-info">
            <p>{product.description}</p>
            <div className="pp-actions">
              {session ? (
                <button onClick={add}>
                  <FontAwesomeIcon icon={faCartShopping} />
                  <p>Agregar al carrito</p>
                </button>
              ) : (
                <Link to={"/auth"}>
                  <FontAwesomeIcon icon={faCartShopping} />
                  <p>Agregar al carrito</p>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
