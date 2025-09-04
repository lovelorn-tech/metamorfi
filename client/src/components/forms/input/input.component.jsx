import "./input.style.scss";

export function InputComponent(props) {

  function onChange(element ) {
    props.onValueChange({ valid: props.value.valid, value: element.value });
  }

  function isValid() {
    const input = document.getElementById(
      props.id
    );
    if (props.ignoreEmpty && props.value.value === "") {
      props.onValueChange({ valid: true, value: props.value.value });
      input.classList.remove("border-input-err");
      input.classList.add("border-input-ok");
      return;
    }
    if (props.regex) {
      if (props.value.value !== null && props.regex.test(props.value.value)) {
        props.onValueChange({ valid: true, value: props.value.value });
        input.classList.remove("border-input-err");
        input.classList.add("border-input-ok");
      } else {
        props.onValueChange({ valid: false, value: props.value.value });
        input.classList.remove("border-input-ok");
        input.classList.add("border-input-err");
      }
    }
  }

  return (
    <div className="input-container">
      <label htmlFor={props.name} className="form-label">
        {props.label}
      </label>
      {props.type === "textarea" ? (
        <textarea
          rows={props.rows ?? 3}
          className="border-input-ok"
          name={name}
          id={props.id}
          aria-describedby={props.id}
          placeholder={props.placeholder}
          onChange={(e) => onChange(e.target)}
          onKeyUp={isValid}
          onBlur={isValid}
        />
      ) : (
        <input
          type={props.type}
          className="border-input-ok"
          name={name}
          id={props.id}
          aria-describedby={props.id}
          placeholder={props.placeholder}
          onChange={(e) => onChange(e.target)}
          onKeyUp={isValid}
          onBlur={isValid}
        />
      )}
      {props.value.valid === false && (
        <small id={`aria${props.id}`} className="form-text text-muted">
          {props.errMsg}
        </small>
      )}
    </div>
  );
}
