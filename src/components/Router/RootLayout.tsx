import { Outlet } from "react-router-dom";

import { Gnb } from "@components/Gnb/Gnb";

export const RootLayout: React.FC = () => {
  return (
    <div>
      <Gnb />
      <main className="mt-[64px]">
        <Outlet />
      </main>
    </div>
  );
};
