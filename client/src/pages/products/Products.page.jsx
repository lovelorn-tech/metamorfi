import "./products.styles.scss";
import { faFilter, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProductComponent from "../../components/product/Product.component";
import { useEffect, useState } from "react";
import { productService } from "../../services/product.service";

export default function ProductsPage() {
  const [products, _setProducts] = useState([]);
  const [srcValue, setSrcValue] = useState("");

  async function searchProduct(e) {
    e.preventDefault();
    if (srcValue) {
      const _products = await productService.getAll();
      if (_products) {
        _setProducts(() => _products.filter((x) => x.title.includes(srcValue)));
      }
    }
  }

  useEffect(() => {
    const getProducts = async () => {
      const products = await productService.getAll();
      _setProducts(products);
    };

    getProducts();
  }, []);

  return (
    <div className="products-page">
      <div className="hp-title-bar">
        <h1>Productos</h1>
        <button disabled>
          <FontAwesomeIcon icon={faFilter} />
          <p>Filtrar productos</p>
        </button>
        <form onSubmit={(e) => searchProduct(e)} className="header-form-search">
          <input
            type="text"
            placeholder="Buscar producto..."
            onChange={(e) => setSrcValue(e.target.value)}
          />
          <button type="submit">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>
      </div>
      <div className="hp-products-container">
        {products.length > 0 ? (
          products.map((product, index) => (
            <ProductComponent props={product} key={index} />
          ))
        ) : (
          <p>
            No se ha encontrado ningún producto. Intente actualziar los filtros
            de búsqueda.
          </p>
        )}
      </div>
    </div>
  );
}
