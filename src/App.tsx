import { RouterProvider } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "jotai";

import { router } from "@routers/Router";

import { ModalProvider } from "@components/Modal/ModalProvider";

import "./firebase";

export const App: React.FC = () => {
  const queryClient = new QueryClient({
    defaultOptions: {},
  });

  return (
    <Provider>
      <QueryClientProvider client={queryClient}>
        <ModalProvider>
          <RouterProvider router={router()} />
        </ModalProvider>
      </QueryClientProvider>
    </Provider>
  );
};
