import { Navigate, RouteProps } from "react-router-dom";

type AuthRouteProps = RouteProps & {
  children: React.ReactNode;
};

export const AuthRoute = ({ children }: AuthRouteProps) => {
  const isAuth = sessionStorage.getItem("accessToken");
  if (isAuth) return <div>{children}</div>;
  return <Navigate to="/login" />;
};
