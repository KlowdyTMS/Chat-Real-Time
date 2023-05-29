import { Navigate } from "react-router-dom";
import App from "../App";
import { useAuthentication } from "../store/authentication";

export function PrivateRoute() {
  const { access_token } = useAuthentication();
  return <> {access_token ? <App /> : <Navigate to={"login"} />}</>;
}
