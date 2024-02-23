import { Navigate, createBrowserRouter } from "react-router-dom";

import { RootLayout } from "@components/Router/RootLayout";
import { WebsocketProvider } from "@components/Websocket/WebsocketProvider";

import { ChattingPage } from "@pages/Chatting/ChattingPage";
import { ChatView } from "@pages/Chatting/Components/ChatDetail/ChatView";
import { HomePage } from "@pages/Home/HomePage";

export const router = () =>
  createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "/chatting",
          element: (
            <WebsocketProvider>
              <ChattingPage />
            </WebsocketProvider>
          ),
          children: [
            {
              index: true,
              element: <ChatView />,
            },
            {
              path: "room/:id",
              element: <ChatView />,
            },
          ],
        },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/" replace />,
    },
  ]);
