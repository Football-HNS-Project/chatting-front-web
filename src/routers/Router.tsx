import { createBrowserRouter } from "react-router-dom";

import { RootLayout } from "@components/RootLayout/RootLayout";

import { ChattingPage } from "@pages/Chatting/ChattingPage";
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
          element: <ChattingPage />,
        },
      ],
    },
  ]);
