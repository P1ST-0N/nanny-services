import { createSelector } from "@reduxjs/toolkit";
import filterSelector from "../filter/selectors.js";
import utils from "../../utils";

const isLoading = (state) => state.favorites.isLoading;
const error = (state) => state.favorites.error;
const allNannies = (state) => state.favorites.nannies;

const nannies = createSelector(
  [allNannies, filterSelector.filter],
  (list, filter) => utils.listSelector(list, filter)
);

const idList = createSelector([nannies], (nannies) =>
  nannies.map((item) => item.id)
);

export default {
  isLoading,
  error,
  nannies,
  idList,
};
