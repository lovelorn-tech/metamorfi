import "./cartProduct.styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinus,
  faPlus,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../../contexts/cart/cart.context.js";
import { CartService } from "../../services/cart.service.js";

/*
PRODUCT STRUCTURE

{
  "createdAt": Date,
  "title": string,
  "price": string,
  "description": string,
  "image": string,
  "id": string,
  "UserId": string
},

*/

export default function CartProductComponent({ props }) {
  const { cart, setCart } = useContext(CartContext);
  const [product, setProduct] = useState(cart.products.find(x => x.id === props.id));

  function deleteProduct() {
    const pproduct = {
      id: props.id,
      userId: props.id,
      quantity: product.quantity,
      price: props.price,
      title: props.title,
      description: props.description,
      image: props.image,
    };
    CartService.removeProduct(pproduct);
    setCart();
  }

  function update(value) {
    const pproduct = {
      id: props.id,
      userId: props.id,
      quantity: value === 1 ? product.quantity + 1 : product.quantity > 1 ? product.quantity - 1 : 1,
      price: props.price,
      title: props.title,
      description: props.description,
      image: props.image,
    };
    CartService.updateProduct(pproduct);
    setCart();
    setProduct(pproduct);
  }

  return (
    <div className="cart-product">
      <div className="cart-product-top">
        <div className="cart-product-thumbnail-container">
          <img src={product.image} alt="cart-product name" />
        </div>
        <div className="cart-product-info">
          <span>
            <h3>{product.title}</h3>
            <p>{product.description}</p>
          </span>
          <span>
            <p>Precio individual: ${product.price}</p>
            <p>Precio total producto: ${(product.price * product.quantity).toFixed(2)}</p>
          </span>
        </div>
      </div>
      <div className="cart-product-actions">
        <div className="cart-product-action-quantity">
          <button onClick={() => update(0)}>
            <FontAwesomeIcon icon={faMinus} />
          </button>
          <p>Cantidad: {product.quantity}</p>
          <button onClick={() => update(1)}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
        <button onClick={deleteProduct} className="cart-product-info-btn">
          <FontAwesomeIcon icon={faX} />
          <p>Eliminar</p>
        </button>
      </div>
    </div>
  );
}
