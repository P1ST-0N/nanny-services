import css from "./NanniesList.module.css";

function NanniesList({ children }) {
  return <ul className={css.list}>{children}</ul>;
}

export default NanniesList;
