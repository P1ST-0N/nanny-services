import css from "./Layout.module.css";
import { useLocation } from "react-router-dom";

function Layout({ children }) {
  const location = useLocation();
  return (
    <div
      className={`${css.container} ${location.pathname === "/" ? "" : css.app}`}
    >
      {children}
    </div>
  );
}

export default Layout;
