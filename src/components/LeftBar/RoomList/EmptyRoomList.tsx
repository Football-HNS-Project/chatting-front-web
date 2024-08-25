import { useNavigate } from "react-router-dom";

import { MessageCircle } from "lucide-react";

import { useModal } from "@components/Modal/useModal";

import { CreateRoomModal } from "../CreateRoomModal";

export const EmptyRoomList = () => {
  const { showCustomModal, closeCustomModal } = useModal();
  const navigate = useNavigate();

  return (
    <div className="flex h-full flex-col items-center justify-center space-y-4 p-8 pb-32 text-center">
      <MessageCircle size={64} className="text-gray-400" />
      <h3 className="text-xl font-semibold text-gray-700">채팅방이 없습니다</h3>
      <p className="text-sm text-gray-500">
        새로운 대화를 시작하거나 초대를 기다려주세요.
      </p>
      <button
        className="mt-4 rounded-full bg-blue-500 px-6 py-2 text-sm font-medium text-white transition-colors duration-150 hover:bg-blue-600 focus:outline-none"
        onClick={() => {
          showCustomModal({
            displayComponent: (
              <CreateRoomModal
                closeModal={closeCustomModal}
                navigate={navigate}
              />
            ),
            isBackDrop: true,
          });
        }}
      >
        새 채팅방 만들기
      </button>
    </div>
  );
};
