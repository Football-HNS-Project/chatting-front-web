import { useNavigate } from "react-router-dom";

import { UserInfo } from "./UserInfo";

export const Gnb: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 z-[50] flex h-[64px] w-full items-center justify-between bg-white px-6 shadow-md">
      {/* 로고 */}
      <div
        className="text-gray-50-600 cursor-pointer text-3xl font-bold transition-colors duration-200 hover:text-gray-700"
        onClick={() => navigate("/")}
      >
        CHAT
      </div>

      {/* 유저 정보 */}
      <div className="flex w-36 items-center justify-center">
        <UserInfo />
      </div>
    </div>
  );
};
