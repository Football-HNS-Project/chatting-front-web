import { Navigate, createBrowserRouter } from "react-router-dom";

import { RootLayout } from "@routers/RootLayout";

import { ChatPage } from "@pages/Chat";
import { LoginPage } from "@pages/Login";
import { SignUpPage } from "@pages/SignUp";

import { AuthRoute } from "./AuthRoute";

export const router = () =>
  createBrowserRouter([
    {
      path: "/",
      element: (
        <AuthRoute>
          <RootLayout />
        </AuthRoute>
      ),
      children: [
        { index: true, element: <ChatPage /> },
        {
          path: "user",
          children: [
            { index: true, element: <ChatPage /> },
            { path: ":id", element: <ChatPage /> },
          ],
        },
        {
          path: "room",
          children: [
            { index: true, element: <ChatPage /> },
            { path: ":id", element: <ChatPage /> },
          ],
        },
      ],
    },
    { path: "login", element: <LoginPage /> },
    { path: "sign-up", element: <SignUpPage /> },
    { path: "*", element: <Navigate to="/room" replace /> },
  ]);
