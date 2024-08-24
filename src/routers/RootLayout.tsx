import { Outlet } from "react-router-dom";

import { Gnb } from "@components/Gnb";
import { WebsocketProvider } from "@components/Websocket/WebsocketProvider";

export const RootLayout: React.FC = () => {
  return (
    <div>
      <Gnb />
      <main className="mt-[64px]">
        <WebsocketProvider>
          <Outlet />
        </WebsocketProvider>
      </main>
    </div>
  );
};
