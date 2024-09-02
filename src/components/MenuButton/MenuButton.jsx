import Icon from "../Icon/Icon";
import css from "./MenuButton.module.css";

function MenuButton({ className = "", ...props }) {
  return (
    <button type="button" className={`${css.button} ${className}`} {...props}>
      <Icon width={24} height={24} name="menu" />
    </button>
  );
}

export default MenuButton;
