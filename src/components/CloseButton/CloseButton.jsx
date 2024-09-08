import Icon from "../Icon/Icon";
import css from "./CloseButton.module.css";

function CloseButton({ className = "", ...props }) {
  return (
    <button className={`${css.button} ${className}`} {...props}>
      <Icon width={32} height={32} name="x" />
    </button>
  );
}

export default CloseButton;
