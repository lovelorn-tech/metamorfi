import "./product.styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faInfo } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function ProductComponent({props}) {
  return (
    <div className="product">
        <div className="product-thumbnail-container">
            <img src={props.image} alt="product name"/>
        </div>
        <div className="product-info">
            <h3>{props.title}</h3>
            <p>{props.description}</p>
            <div className="product-actions">
                <button className="product-cart-btn"><FontAwesomeIcon icon={faCartShopping}/><p>Agregar al carrito</p></button>
                <Link to={`/product/${props.id}?uid=${props.UserId}`} className="product-info-btn"><FontAwesomeIcon icon={faInfo}/><p>Saber más</p></Link>
            </div>
        </div>
    </div>
  )
}
