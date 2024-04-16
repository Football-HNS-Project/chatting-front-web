import { RouterProvider } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { router } from "@routers/Router";

export const App: React.FC = () => {
  const queryClient = new QueryClient({
    defaultOptions: {},
  });

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router()} />
    </QueryClientProvider>
  );
};
