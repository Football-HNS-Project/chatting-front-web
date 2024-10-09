import { NavigateFunction } from "react-router-dom";

import { CheckCircle, X } from "lucide-react";

type SignUpCompleteModalProps = {
  closeModal: () => void;
  navigate: NavigateFunction;
};

export const SignUpCompleteModal = ({
  closeModal,
  navigate,
}: SignUpCompleteModalProps) => {
  const handleLogin = () => {
    closeModal();
    navigate("/login");
  };

  return (
    <div className="flex w-[400px] flex-col items-center rounded-lg bg-white p-8 shadow-2xl">
      <button
        onClick={closeModal}
        className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
      >
        <X size={24} />
      </button>

      <CheckCircle className="mb-4 h-16 w-16 text-green-500" />

      <h2 className="mb-4 text-2xl font-bold text-gray-800">회원가입 완료!</h2>

      <p className="mb-6 text-center text-gray-600">
        환영합니다! 회원가입이 성공적으로 완료되었습니다. 이제 다양한 서비스를
        이용하실 수 있습니다.
      </p>

      <div className="flex w-full justify-center space-x-4">
        <button
          onClick={handleLogin}
          className="rounded-md bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-600"
        >
          로그인하기
        </button>
        <button
          onClick={closeModal}
          className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 transition duration-300 hover:bg-gray-100"
        >
          닫기
        </button>
      </div>
    </div>
  );
};
