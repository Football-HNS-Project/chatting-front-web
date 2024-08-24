import { Navigate, createBrowserRouter } from "react-router-dom";

import { RootLayout } from "@routers/RootLayout";

import { ChatPage } from "@pages/Chat";
import { ChatView } from "@pages/Chat/Components/ChatView/ChatView";
import { UserView } from "@pages/Chat/Components/User/UserView";
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
        { index: true, element: <ChatPage /> },
        { path: "user", element: <UserView /> },
        { path: "user/:id", element: <UserView /> },
        { path: "room", element: <ChatView /> },
        { path: "room/:id", element: <ChatView /> },
      ],
    },
    { path: "/login", element: <LoginPage /> },
    { path: "*", element: <Navigate to="/" replace /> },
  ]);
