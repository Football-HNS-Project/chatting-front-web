import { Navigate } from "react-router-dom";

type AuthRouteProps = {
  children: React.ReactNode;
};

export const AuthRoute = ({ children }: AuthRouteProps) => {
  const isAuth = sessionStorage.getItem("accessToken");

  if (isAuth) return <div>{children}</div>;
  return <Navigate to="/login" />;
};
