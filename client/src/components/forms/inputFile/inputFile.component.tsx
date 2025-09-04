import { Dispatch, SetStateAction, useState } from "react";
import { IState } from "../../../scripts/models/components/IState.model";
import "./inputFile.style.scss";

enum ErrorMsgKey {
  Format,
  MinSize,
  MaxSize,
}

interface Props<T> {
  name: string;
  id: string;
  label: string;
  value: IState<T>;
  onValueChange: Dispatch<SetStateAction<IState<T>>>;
  allowedExt?: string[];
  minSize?: number;
  maxSize?: number;
  ignoreEmpty?: boolean;
}

export default function InputFileComponent({
  name,
  id,
  label,
  value,
  onValueChange,
  allowedExt,
  minSize,
  maxSize,
  ignoreEmpty = false,
}: Props<File>) {
  const errMsgs: { key: ErrorMsgKey; value: string }[] = [
    {
      key: ErrorMsgKey.Format,
      value: `El formato de archivo no es soportado. Solo se soportan [${allowedExt}]`,
    },
    {
      key: ErrorMsgKey.MinSize,
      value: `El tamaño del archivo es muy pequeño. Tamaño mínimo ${(
        minSize! /
        1024 /
        1024
      ).toFixed(2)}MB`,
    },
    {
      key: ErrorMsgKey.MaxSize,
      value: `El tamaño del archivo es muy grande. Tamaño máximo ${(
        maxSize! /
        1024 /
        1024
      ).toFixed(2)}MB`,
    },
  ];
  const [msg, setMsg] = useState<string | undefined>(
    errMsgs.find((x) => x.key == ErrorMsgKey.Format)?.value
  );
  const [labelMsg, setlabelMsg] = useState<string>(label);
  const [avatarURL, setAvatarURL] = useState<string | null>(null);

  function onChange(input: HTMLInputElement) {
    if (!input.files && ignoreEmpty) {
      setValid(null);
      return;
    }
    if (
      allowedExt &&
      allowedExt!.includes(input.files![0].name.split(".").pop()!)
    ) {
      const fileSize: number = input.files![0].size;
      if (minSize && fileSize < minSize) {
        setInvalid(
          null,
          errMsgs.find((x) => x.key == ErrorMsgKey.MinSize)?.value
        );
        return;
      }
      if (maxSize && fileSize > maxSize) {
        setInvalid(
          null,
          errMsgs.find((x) => x.key == ErrorMsgKey.MaxSize)?.value
        );
        return;
      }
      setValid(input.files![0]);
    } else {
      setInvalid(null, errMsgs.find((x) => x.key == ErrorMsgKey.Format)?.value);
    }
  }

  function setValid(file: File | null) {
    const input: HTMLInputElement = document.getElementById(
      id
    )! as HTMLInputElement;
    input.classList.remove("border-input-err");
    input.classList.add("border-input-ok");
    setlabelMsg(file?.name || label);
    if (file) setAvatarURL(URL.createObjectURL(file));
    onValueChange({
      valid: true,
      value: file,
    });
  }

  function setInvalid(file: File | null, errMsg?: string) {
    const input: HTMLInputElement = document.getElementById(
      id
    )! as HTMLInputElement;
    input.classList.remove("border-input-ok");
    input.classList.add("border-input-err");
    setlabelMsg(label);
    setAvatarURL(null);
    onValueChange({
      valid: false,
      value: file,
    });
    if (errMsg) setMsg(errMsg);
  }

  function onClickInputButton() {
    document.getElementById(id)?.click();
  }

  return (
    <div className="input-file-container">
      <button
        type="button"
        onClick={onClickInputButton}
        className="input-file-fake"
      >
        <label htmlFor={name} className="form-label" id={id + "label"}>
          {labelMsg}
        </label>
        {avatarURL && <img id={id + "avatar"} src={avatarURL} alt={""} />}
      </button>
      <input
        type="file"
        className="input-file border-input-ok"
        name={name}
        id={id}
        aria-describedby={id}
        onChange={(e) => onChange(e.target)}
      />
      {value.valid === false && (
        <small id={`aria${id}`} className="form-text text-muted">
          {msg}
        </small>
      )}
    </div>
  );
}
