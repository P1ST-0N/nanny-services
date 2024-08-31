import { createSelector } from "@reduxjs/toolkit";
import filterSelector from "../filter/selectors.js";
import utils from "../../utils";

const isLoading = (state) => state.services.isLoading;
const error = (state) => state.services.error;
const allNannies = (state) => state.services.nannies;
const lastId = (state) => state.services.lastId;
const isEnd = (state) => state.services.isEnd;

const nannies = createSelector(
  [allNannies, filterSelector.filter],
  (list, filter) => utils.listSelector(list, filter)
);

export default {
  isLoading,
  error,
  nannies,
  lastId,
  isEnd,
};
