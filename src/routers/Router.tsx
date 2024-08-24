import { Navigate, createBrowserRouter } from "react-router-dom";

import { RootLayout } from "@routers/RootLayout";

import { ChatViewPage } from "@pages/Chat/Components/ChatView";
import { UserViewPage } from "@pages/Chat/Components/UserView";
import { LoginPage } from "@pages/Login";

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
        { index: true, element: <ChatViewPage /> },
        { path: "user", element: <UserViewPage /> },
        { path: "user/:id", element: <UserViewPage /> },
        { path: "room", element: <ChatViewPage /> },
        { path: "room/:id", element: <ChatViewPage /> },
      ],
    },
    { path: "/login", element: <LoginPage /> },
    { path: "*", element: <Navigate to="/" replace /> },
  ]);
