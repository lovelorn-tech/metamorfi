import { Dispatch, SetStateAction } from "react";
import { IState } from "../../../scripts/models/components/IState.model";
import "./inputSelect.style.scss";
import { IOption } from "../../../scripts/models/auth/IOption.model";

interface Props<T> {
  name: string;
  id: string;
  label: string;
  value: IState<T>;
  onValueChange: Dispatch<SetStateAction<IState<T>>>;
  options: IOption[];
  defaultOption: IOption;
  ignoreEmpty?: boolean;
}

export default function InputSelectComponent({
  name,
  id,
  label,
  value,
  onValueChange,
  options,
  defaultOption,
  ignoreEmpty = false,
}: Props<string>) {
  function onChange(element: HTMLSelectElement) {
    if (element.value === "-1") {
      setInvalid();
      return;
    }
    setValid(element.value);
  }

  function setValid(value: string | null = null) {
    const input: HTMLInputElement = document.getElementById(
      id
    )! as HTMLInputElement;
    input.classList.remove("border-input-err");
    input.classList.add("border-input-ok");
    onValueChange({
      valid: true,
      value: value,
    });
  }

  function setInvalid(value: string | null = null) {
    const input: HTMLInputElement = document.getElementById(
      id
    )! as HTMLInputElement;
    input.classList.remove("border-input-ok");
    input.classList.add("border-input-err");
    onValueChange({
      valid: false,
      value: value,
    });
  }

  return (
    <div className="input-container">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select
        name={name}
        id={id}
        className="border-input-ok"
        onChange={(e) => onChange(e.target)}
      >
        <option value={"-1"}>{defaultOption.text}</option>
        {options.map((option: IOption, index: number) => (
          <option value={option.value} key={index}>
            {option.text}
          </option>
        ))}
      </select>
      {!ignoreEmpty && value.valid === false && (
        <small id={`aria${id}`} className="form-text text-muted">
          {"Debe seleccionar una opción válida."}
        </small>
      )}
    </div>
  );
}
