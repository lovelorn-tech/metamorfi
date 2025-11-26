import "./AddProduct.styles.scss";
import { useContext, useState } from "react";
import {SessionContext} from "../../contexts/session/session.context";
import { productService } from "../../services/product.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faWarning } from "@fortawesome/free-solid-svg-icons";
import { Navigate } from "react-router-dom";
import { InputComponent } from "../../components/forms/input/input.component";

export default function AddProductPage() {
  const {session} = useContext(SessionContext);
  
  const [msg, setMsg] = useState({
    valid: true,
    value: "Llene el formulario para crear un nuevo producto.",
  });

  const [title, setTitle] = useState({
    valid: null,
    value: null,
  });
  const [description, setDescription] = useState({
    valid: null,
    value: null,
  });
  const [price, setPrice] = useState({
    valid: null,
    value: null,
  });

  function onsubmit(e) {
    e.preventDefault();
    setMsg({ valid: true, value: "Creando producto, espere..." });
    if (!title.valid || !description.valid) {
      setMsg({
        valid: false,
        value:
          "Los datos del formulario no poseen el formato correcto. Revíselos e intente nuevamente.",
      });
      return;
    }
    const product = {
      uid: 1,
      title: title.value,
      description: description.value,
      price: price.value
    }
    const result = productService.create(product);
    if (!result[0]) {
      setMsg({ valid: result[0], value: result[1] });
      return;
    }
    window.open("/", "_self");
  }

  function onReset() {
    setTitle({ value: title.value, valid: null });
    setDescription({ value: description.value, valid: null });
    setMsg({
      valid: true,
      value: "Llene el formulario para crear un nuevo producto.",
    });
  }

  if (!session) {
    return <Navigate to={"/"}/>
  }

  return (
    <div className="addproduct-page">
          <form
            id="auth-form"
            className="auth-form"
            onSubmit={(e) => onsubmit(e)}
            onReset={onReset}
          >
            <InputComponent
              type={"text"}
              name={"create-product-input-title"}
              id={"create-product-input-title"}
              label={"Título del producto"}
              placeholder="Título"
              value={title}
              onValueChange={setTitle}
              regex={new RegExp(/^[A-Za-z0-9\s]{3,30}$/)}
              errMsg={
                "El título del producto no posee el formato correcto. Solo puede tener letras, números, espacios y una longitud de 3 a 30 caracteres."
              }
            />
    
            <InputComponent
              type={"text"}
              name={"create-product-input-description"}
              id={"create-product-input-description"}
              label={"Descripción del producto"}
              placeholder="Mi producto es..."
              value={description}
              onValueChange={setDescription}
              regex={new RegExp(/^[A-Za-z0-9\s]{5,300}$/)}
              errMsg={
                "La descripción no posee el formato correcto. Solo puede tener letras, números, espacios y una longitud de 5 a 300 caracteres."
              }
            />

            <InputComponent
              type={"text"}
              name={"create-product-input-price"}
              id={"create-product-input-price"}
              label={"Precio del producto"}
              placeholder="0"
              value={price}
              onValueChange={setPrice}
              regex={new RegExp(/^(\d{1,}(?:[.]*\d{3})*(?:[,]*\d+)*)$/)}
              errMsg={
                "El precio no posee el formato correcto. Solo puede tener números, comas para decimales y puntos para unidades de mil"
              }
            />
    
            <div className="form-actions">
              <button className="btnSubmit" type="submit">
                Crear
              </button>
              <button
                className="btnClear"
                type="button"
                onClick={() => {
                  document.getElementById("auth-form").reset();
                }}
              >
                Borrar formulario
              </button>
            </div>
    
            <p className="form-text-info">
              <FontAwesomeIcon icon={msg.valid ? faInfoCircle : faWarning} />
              <span>{msg.value}</span>
            </p>
          </form>
        </div>
  )
}
