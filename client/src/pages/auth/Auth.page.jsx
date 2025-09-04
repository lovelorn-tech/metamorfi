import "./auth.styles.scss";
import { InputComponent } from "../../components/forms/input/input.component";
import { useState } from "react";

export default function AuthPage() {
  const [username, setUsername] = useState({
    valid: null,
    value: null,
  });
  const [password, setPassword] = useState({
    valid: null,
    value: null,
  });

  return (
    <div className="auth-page">
      <form className="auth-form">
        <InputComponent
          type={"text"}
          name={"login-input-username"}
          id={"login-input-username"}
          label={"Usuario"}
          placeholder="Usuario"
          value={username}
          onValueChange={setUsername}
          regex={new RegExp(/^[A-Za-z0-9]{4,16}$/)}
          errMsg={
            "El nombre de usuario no posee el formato correcto. Solo puede tener letras, números y una longitud de 4 a 16 caracteres."
          }
        />

        <InputComponent
          type={"password"}
          name={"login-input-password"}
          id={"login-input-password"}
          label={"Contraseña"}
          placeholder="••••••••••••"
          value={password}
          onValueChange={setPassword}
          regex={
            new RegExp(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,30}$/
            )
          }
          errMsg={
            "La contraseña no posee el formato correcto. Debe tener al menos una letra mayúscula, una minúscula, un número, un caracter especial y entre 12 y 30 caracteres"
          }
        />

        <div className="form-actions">
            <button className="btnSubmit" type="submit">Ingresar</button>
            <button className="btnClear" type="button">Borrar formulario</button>
        </div>
      </form>
    </div>
  );
}
