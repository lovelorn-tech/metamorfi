import "./product.styles.scss";
import { faCartShopping, faReply } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function ProductPage() {
  return (
    <div className="product-page">
        <div className="pp-title-bar">
            <h1>Product Title</h1>
            <Link to={"/"}><FontAwesomeIcon icon={faReply}/><p>Volver</p></Link>
        </div>
        <div className="pp-content">
            <div className="pp-thumbnail-container">
                <img src="/media/thumbnails/product_1.jpg" alt="product name"/>
            </div>
            <div className="pp-info">
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium, dicta!</p>
                <div className="pp-actions">
                    <button><FontAwesomeIcon icon={faCartShopping}/><p>Agregar al carrito</p></button>
                </div>
            </div>
        </div>
    </div>
  )
}
