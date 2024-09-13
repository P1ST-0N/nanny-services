import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import Icon from "../Icon/Icon";

import authSelectors from "../../redux/auth/selectors.js";
import favoritesSelectors from "../../redux/favorites/selectors.js";
import favoritesOperations from "../../redux/favorites/operations.js";
import css from "./NannyItemHeader.module.css";

function NannyItemHeader({ item = {} }) {
  const isLogged = useSelector(authSelectors.isLogged);
  const favorites = useSelector(favoritesSelectors.idList);
  const dispatch = useDispatch();

  const isFavorite = useMemo(
    () => favorites.includes(item.id),
    [favorites, item]
  );

  const handleFavoritesClick = () => {
    if (isLogged) {
      dispatch(
        isFavorite
          ? favoritesOperations.deleteItem(item.id)
          : favoritesOperations.addItem(item)
      );
    } else {
      toast.error("This feature is allowed only for authorized users!");
    }
  };

  return (
    <div className={css.container}>
      <div className={css.headingContainer}>
        <p className={css.position}>Nanny</p>
        <h3 className={css.header}>{item.name}</h3>
      </div>
      <div className={css.infoContainer}>
        <ul className={css.list}>
          <li className={css.listItem}>
            <p className={css.text}>
              <span className={css.map}>
                <Icon name="map-pin" width={16} height={16} />
              </span>
              <span>{item.location}</span>
            </p>
          </li>
          <li className={css.listItem}>
            <p className={css.text}>
              <span className={css.star}>
                <Icon name="star" width={16} height={16} />
              </span>
              <span>{`Rating: ${item.rating}`}</span>
            </p>
          </li>
          <li className={css.listItem}>
            <p className={css.text}>
              <span>Price / 1 hour:</span>
              <span className={css.price}>{`${item.price_per_hour}$`}</span>
            </p>
          </li>
        </ul>
        <button
          type="button"
          className={`${css.button} ${isFavorite ? css.favorite : ""}`}
          onClick={handleFavoritesClick}
        >
          <Icon name="heart" width={26} height={26} />
        </button>
      </div>
    </div>
  );
}

export default NannyItemHeader;
