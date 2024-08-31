import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import authSelectors from "../redux/auth/selectors";

function PrivateRoute({ component: Component, redirectTo = "/" }) {
  const isLogged = useSelector(authSelectors.isLogged);

  return isLogged ? Component : <Navigate to={redirectTo} />;
}

export default PrivateRoute;
