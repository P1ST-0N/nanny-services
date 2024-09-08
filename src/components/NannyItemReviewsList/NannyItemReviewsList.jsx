import Icon from "../Icon/Icon";
import css from "./NannyItemReviewsList.module.css";

function NannyItemReviewsList({ list = [] }) {
  return (
    <ul className={css.list}>
      {list.map((rev, i) => (
        <li key={i}>
          <div className={css.heading}>
            <div className={css.revAvatar}>{rev.reviewer.slice(0, 1)}</div>
            <div>
              <p className={css.reviewer}>{rev.reviewer}</p>
              <p className={css.rating}>
                <span className={css.ratingIcon}>
                  <Icon name="star" width={16} height={16} />
                </span>
                <span className={css.ratingValue}>{rev.rating.toFixed(1)}</span>
              </p>
            </div>
          </div>
          <p className={css.comment}>{rev.comment}</p>
        </li>
      ))}
    </ul>
  );
}

export default NannyItemReviewsList;
