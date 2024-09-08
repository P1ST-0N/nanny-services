import css from "./NannyItemButton.module.css";

function NannyItemButton({ children, ...props }) {
  return (
    <button className={css.button} type="button" {...props}>
      {children}
    </button>
  );
}

export default NannyItemButton;
