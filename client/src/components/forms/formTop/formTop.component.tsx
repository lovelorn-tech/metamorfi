import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./formTop.style.scss";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { IState } from "../../../scripts/models/components/IState.model";

interface Props {
  title: string;
  btnText: string;
  btnIcon?: IconDefinition;
  formMsg?: IState<string>;
}

export default function FormTopComponent({
  title,
  btnText,
  btnIcon,
  formMsg,
}: Props) {
  return (
    <div className="form-top">
      <div className="form-top-info">
        <h2>{title}</h2>
        <Link to={"/"}>
          {btnIcon ? <FontAwesomeIcon icon={btnIcon} /> : false}
          <p>{btnText}</p>
        </Link>
      </div>
      <div className="form-top-msg">
        {formMsg?.valid && <p>{formMsg.value}</p>}
      </div>
    </div>
  );
}
