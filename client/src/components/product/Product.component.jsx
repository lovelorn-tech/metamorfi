import "./product.styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faInfo } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function ProductComponent() {
  return (
    <div className="product">
        <div className="product-thumbnail-container">
            <img src="media/thumbnails/product_1.jpg" alt="product name"/>
        </div>
        <div className="product-info">
            <h3>Product title</h3>
            <p>Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit.</p>
            <div className="product-actions">
                <button className="product-cart-btn"><FontAwesomeIcon icon={faCartShopping}/><p>Agregar al carrito</p></button>
                <Link to={"/product/1"} className="product-info-btn"><FontAwesomeIcon icon={faInfo}/><p>Saber más</p></Link>
            </div>
        </div>
    </div>
  )
}
