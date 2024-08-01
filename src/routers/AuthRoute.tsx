import { PropsWithChildren } from "react";

import { Navigate } from "react-router-dom";

export const AuthRoute = ({ children }: PropsWithChildren) => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) return <Navigate to="/login" />;

  return children;
};
