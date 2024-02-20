import { Outlet } from "react-router-dom";

import { useAtom } from "jotai";

import { Gnb } from "@components/Gnb/Gnb";
import { LogoutModal } from "@components/Modal/LogoutModal";

import { LogoutModalAtom } from "@stores/ModalStore";

export const RootLayout: React.FC = () => {
  const [isVisibleLogoutModal, setIsVisibleLogoutModal] =
    useAtom(LogoutModalAtom);
  return (
    <div>
      <Gnb />
      <main className="mt-[64px]">
        <Outlet />
      </main>

      <LogoutModal
        isOpen={isVisibleLogoutModal}
        setIsOpen={setIsVisibleLogoutModal}
      />
    </div>
  );
};
