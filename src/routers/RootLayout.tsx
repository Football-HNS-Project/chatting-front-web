import { Outlet } from "react-router-dom";

import { Gnb } from "@components/Gnb";
import { LeftBar } from "@components/LeftBar";
import { WebsocketProvider } from "@components/Websocket/WebsocketProvider";

export const RootLayout: React.FC = () => {
  return (
    <WebsocketProvider>
      <div className="flex min-h-screen flex-col">
        <Gnb />
        <div className="flex flex-1 pt-[64px]">
          <LeftBar />
          <main className="flex-1 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </WebsocketProvider>
  );
};
