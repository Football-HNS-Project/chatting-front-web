import { Outlet } from "react-router-dom";

import { useAtom } from "jotai";

import { Gnb } from "@components/Gnb";
import { LogoutModal } from "@components/Modal/LogoutModal";
import { WebsocketProvider } from "@components/Websocket/WebsocketProvider";

import { LogoutModalAtom } from "@stores/ModalStore";

export const RootLayout: React.FC = () => {
  const [isVisibleLogoutModal, setIsVisibleLogoutModal] =
    useAtom(LogoutModalAtom);
  return (
    <div>
      <Gnb />
      <main className="mt-[64px]">
        <WebsocketProvider>
          <Outlet />
        </WebsocketProvider>
      </main>

      <LogoutModal
        isOpen={isVisibleLogoutModal}
        setIsOpen={setIsVisibleLogoutModal}
      />
    </div>
  );
};
