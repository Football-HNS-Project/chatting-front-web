import { useCookies } from "react-cookie";
import { NavigateFunction } from "react-router-dom";

import { usePostLogout } from "@apis/Auth/usePostLogout";
import { instance } from "@apis/AxiosInstance";

type LogoutModalProps = {
  closeModal: () => void;
  navigate: NavigateFunction;
};

export const LogoutModal = ({ closeModal, navigate }: LogoutModalProps) => {
  const { mutate } = usePostLogout();
  const [, , removeCookie] = useCookies(["refreshToken"]);

  const handleLogout = () => {
    mutate(
      {},
      {
        onSuccess: () => {
          localStorage.removeItem("accessToken");
          removeCookie("refreshToken", { path: "/" });
          instance.defaults.headers["Authorization"] = null;
          closeModal();
          navigate("/login");
        },
      }
    );
  };

  return (
    <div className="flex h-[300px] w-[400px] transform flex-col items-center justify-between rounded-lg bg-white p-8 shadow-2xl transition-all duration-300 ease-in-out hover:scale-105">
      <h2 className="mb-4 text-3xl font-bold text-gray-800">로그아웃</h2>

      <div className="flex flex-col items-center gap-2 text-center">
        <p className="text-gray-600">
          로그아웃을 하시면 다시 인증을 하셔야 합니다.
        </p>
        <p className="font-semibold text-gray-600">
          정말 로그아웃을 하시겠습니까?
        </p>
      </div>

      <div className="mt-6 flex w-full gap-4">
        <button
          type="button"
          className="flex-1 rounded-md bg-gray-100 px-6 py-3 text-sm font-medium text-gray-700 transition-colors duration-300 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
          onClick={closeModal}
        >
          취소
        </button>
        <button
          type="button"
          className="flex-1 rounded-md bg-green-500 px-6 py-3 text-sm font-medium text-white transition-colors duration-300 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
          onClick={handleLogout}
        >
          확인
        </button>
      </div>
    </div>
  );
};
