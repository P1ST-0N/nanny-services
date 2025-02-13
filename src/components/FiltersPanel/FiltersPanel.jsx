import Select, { components } from "react-select";
import { useDispatch, useSelector } from "react-redux";

import Icon from "../Icon/Icon";
import filterOperations from "../../redux/filter/operations.js";
import authOperations from "../../redux/auth/operations.js";
import authSelectors from "../../redux/auth/selectors.js";
import css from "./FiltersPanel.module.css";
import "./filterSelect.css";

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <Icon name="chevron-down" width={20} height={20} />
    </components.DropdownIndicator>
  );
};

const filterOptions = [
  { value: "asc", label: "A to Z" },
  { value: "desc", label: "Z to A" },
  { value: "less18", label: "Less then 18$" },
  { value: "greater18", label: "Greather than 18$" },
  { value: "popular", label: "Popular" },
  { value: "unpopular", label: "Not popular" },
  { value: "all", label: "Show all" },
];

const themeOptions = [
  { value: "red", label: "Red" },
  { value: "green", label: "Green" },
  { value: "blue", label: "Blue" },
];

function FiltersPanel() {
  const isLogged = useSelector(authSelectors.isLogged);
  const theme = useSelector(authSelectors.theme);
  const dispatch = useDispatch();

  const themeOption = themeOptions.filter(
    (item) => item.value === (theme || "red")
  );

  return (
    <div className={css.container}>
      <div className={css.filtersWrapper}>
        <p className={css.heading}>Filters</p>
        <Select
          defaultValue={filterOptions[filterOptions.length - 1]}
          components={{ DropdownIndicator }}
          onChange={(selected) =>
            dispatch(filterOperations.set(selected.value))
          }
          className="filter-select-container"
          classNamePrefix="filter-select"
          options={filterOptions}
          isSearchable={false}
        />
      </div>
      {isLogged && (
        <div className={css.filtersWrapper}>
          <p className={css.heading}>Theme</p>
          <Select
            defaultValue={themeOption}
            value={themeOption}
            components={{ DropdownIndicator }}
            onChange={(selected) =>
              dispatch(authOperations.updateTheme(selected.value))
            }
            className="filter-select-container"
            classNamePrefix="filter-select"
            options={themeOptions}
            isSearchable={false}
          />
        </div>
      )}
    </div>
  );
}

export default FiltersPanel;
