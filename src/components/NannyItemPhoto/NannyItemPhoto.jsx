import css from "./NannyItemPhoto.module.css";

function NannyItemPhoto({ item = {} }) {
  return (
    <div className={css.container}>
      <div className={css.thumb}>
        <img src={item.avatar_url} alt={`${item.name} photo`} loading="lazy" />
      </div>
      <div className={css.online}></div>
    </div>
  );
}

export default NannyItemPhoto;
