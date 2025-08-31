import "./home.styles.scss";
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ProductComponent from "../../components/product/Product.component";
import { useState } from "react";

export default function HomePage() {
  const [products, _setProducts] = useState([1,2,3,4,5,6,7,8,9]);

  return (
    <div className='home-page'>
      <div className='hp-title-bar'>
        <h1>Productos</h1>
        <button><FontAwesomeIcon icon={faFilter}/><p>Filtrar productos</p></button>
      </div>
      <div className='hp-products-container'>
        { products.map(() => (<ProductComponent/>))}
      </div>
    </div>
  )
}
