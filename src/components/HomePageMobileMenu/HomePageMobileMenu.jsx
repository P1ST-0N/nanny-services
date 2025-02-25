import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Button from "../Button/Button";
import CloseButton from "../CloseButton/CloseButton";

import authSelectors from "../../redux/auth/selectors";
import css from "./HomePageMobileMenu.module.css";

function HomePageMobileMenu({ onClose, handleAuthButtonClick, handleLogout }) {
  const isLogged = useSelector(authSelectors.isLogged);

  return (
    <div className={css.right}>
      <ul className={css.linksList}>
        <li>
          <Link
            className={`${css.link} ${css.activeLink}`}
            to="/"
            onClick={onClose}
          >
            Home
          </Link>
        </li>
        <li>
          <Link className={css.link} to="/nannies" onClick={onClose}>
            Nannies
          </Link>
        </li>
      </ul>
      <ul className={css.buttonsList}>
        {!isLogged && (
          <li>
            <Button
              className={css.button}
              filled={true}
              onClick={() => handleAuthButtonClick(true)}
            >
              Log In
            </Button>
          </li>
        )}
        {!isLogged && (
          <li>
            <Button
              className={css.button}
              filled={true}
              onClick={() => handleAuthButtonClick(false)}
            >
              Registration
            </Button>
          </li>
        )}
        {isLogged && (
          <li>
            <Button className={css.button} filled={true} onClick={handleLogout}>
              Log out
            </Button>
          </li>
        )}
      </ul>
      <CloseButton className={css.closeButton} onClick={onClose} />
    </div>
  );
}

export default HomePageMobileMenu;
