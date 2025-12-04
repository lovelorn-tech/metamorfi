import { useState, useRef, useEffect } from "react";
import ProductComponent from "../product/Product.component";
import "./gallery.styles.scss";

export default function GalleryComponent({props}) {  
    const productsXPage = useRef(6);
    const currentPage = useRef(1);
    
    const [pagesCount, setPagesCount] = useState(0);
    const [productsShown, setProductsShown] = useState([]);

    function showProducts() {
        const lastProduct = currentPage.current * productsXPage.current;
        const firstProduct = lastProduct - productsXPage.current;
        setProductsShown(props.slice(firstProduct, lastProduct));
    }

    function onPageSelect(page) {
        currentPage.current = page;
        showProducts();
    }

    useEffect(() => {
        setPagesCount(Math.ceil(props.length / 6));
        setProductsShown(props.slice(0, productsXPage.current));
    }, [props]);

  return (
    <div className="gallery-component">
        <div className="gallery-content">
            {productsShown.length > 0 ? (
                productsShown.map((product, index) => (
                    <ProductComponent props={product} key={index} />
                ))
            ) : (
                <p>
                No se ha encontrado ningún producto. Intente actualziar los filtros
                de búsqueda.
                </p>
            )}
        </div>
        <div className="gallery-controls">
            {
                pagesCount > 0 ? (Array.from(Array(pagesCount)).map((_, index) => (
                    <button key={index} onClick={() => onPageSelect(index + 1)}
                        className={currentPage.current === index + 1 ? "current-btn" : "other-btn"}
                    ><p>{index + 1}</p></button>
                ))) : false
            }
        </div>
    </div>
  )
}
