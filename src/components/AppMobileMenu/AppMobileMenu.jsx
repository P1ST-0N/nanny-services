import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import Icon from "../Icon/Icon";
import Button from "../Button/Button";
import CloseButton from "../CloseButton/CloseButton";

import authSelectors from "../../redux/auth/selectors";
import css from "./AppMobileMenu.module.css";

function AppMobileMenu({ onClose, handleAuthButtonClick, handleLogout }) {
  const isLogged = useSelector(authSelectors.isLogged);
  const user = useSelector(authSelectors.user);

  return (
    <div className={css.right}>
      <nav>
        <ul className={css.linksList}>
          <li>
            <NavLink className={css.link} to="/" onClick={onClose}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className={css.link} to="/nannies" onClick={onClose}>
              Nannies
            </NavLink>
          </li>
          {isLogged && (
            <li>
              <NavLink className={css.link} to="/favorites" onClick={onClose}>
                Favorites
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
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
            <Button className={css.userButton}>
              <span className={css.icon}>
                <Icon width={24} height={24} name="user" />
              </span>
              <span className={css.userName}>{user.displayName || "User"}</span>
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

export default AppMobileMenu;
