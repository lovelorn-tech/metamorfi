import "./auth.styles.scss";
import { InputComponent } from "../../components/forms/input/input.component";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faWarning } from "@fortawesome/free-solid-svg-icons";
import { SessionService } from "../../services/session.service";

export default function AuthPage() {
  const [msg, setMsg] = useState({
    valid: true,
    value: "Si el usuario no existe, se creará automáticamente.",
  });

  const [username, setUsername] = useState({
    valid: null,
    value: null,
  });
  const [password, setPassword] = useState({
    valid: null,
    value: null,
  });

  function onsubmit(e) {
    e.preventDefault();
    setMsg({ valid: true, value: "Iniciando sesión, espere..." });
    if (!username.valid || !password.valid) {
      setMsg({
        valid: false,
        value:
          "Los datos del formulario no poseen el formato correcto. Revíselos e intente nuevamente.",
      });
      return;
    }
    const user = {
      password: password.value,
      username: username.value,
    };
    const result = SessionService.setSession(user);
    if (!result[0]) {
      setMsg({ valid: result[0], value: result[1] });
      return;
    }
    window.open("/", "_self");
  }

  function onReset() {
    setUsername({ value: username.value, valid: null });
    setPassword({ value: password.value, valid: null });
    setMsg({
      valid: true,
      value: "Si el usuario no existe, se creará automáticamente.",
    });
  }

  return (
    <div className="auth-page">
      <form
        id="auth-form"
        className="auth-form"
        onSubmit={(e) => onsubmit(e)}
        onReset={onReset}
      >
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
          <button className="btnSubmit" type="submit">
            Ingresar
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
  );
}
