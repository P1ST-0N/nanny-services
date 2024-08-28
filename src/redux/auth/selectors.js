const isLoading = (state) => state.auth.isLoading;
const error = (state) => state.auth.error;
const user = (state) => state.auth.user;
const isLogged = (state) => state.auth.isLogged;
const theme = (state) => state.auth.theme;

export default {
  isLoading,
  error,
  user,
  isLogged,
  theme,
};
