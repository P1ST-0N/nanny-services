import icons from "../../icons/sprite.svg";

function Icon({ width = 0, height = 0, name = "" }) {
  return (
    <svg width={width} height={height}>
      <use href={`${icons}#${name}`}></use>
    </svg>
  );
}

export default Icon;
