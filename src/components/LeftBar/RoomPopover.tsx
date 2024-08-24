import { useNavigate } from "react-router-dom";

import { Info, LogOut } from "lucide-react";

import { useModal } from "@components/Modal/useModal";
import { Popover, PopoverContent, PopoverTrigger } from "@components/ui";

import { CheckRoomLeaveModal } from "./CheckRoomLeaveModal";

type RoomPopoverProps = {
  roomId: string;
  onClose: () => void;
  children: React.ReactNode;
};

export const RoomPopover = ({
  roomId,
  onClose,
  children,
}: RoomPopoverProps) => {
  const navigate = useNavigate();
  const { showCustomModal, closeCustomModal } = useModal();

  const handleLeaveRoom = () => {
    showCustomModal({
      displayComponent: (
        <CheckRoomLeaveModal
          roomId={roomId}
          closeModal={closeCustomModal}
          navigate={navigate}
        />
      ),
      isBackDrop: true,
    });
  };

  return (
    <Popover onOpenChange={(open) => !open && onClose()}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        className="w-48 overflow-hidden rounded-lg border border-gray-200 bg-white p-1 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col">
          <button
            className="flex items-center space-x-2 rounded px-3 py-2 text-sm text-gray-700 transition-colors duration-150 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
            onClick={(e) => e.stopPropagation()}
            tabIndex={-1}
          >
            <Info size={16} />
            <span>채팅방 정보</span>
          </button>
          <button
            className="flex items-center space-x-2 rounded px-3 py-2 text-sm text-red-600 transition-colors duration-150 hover:bg-red-50 focus:bg-red-50 focus:outline-none"
            onClick={(e) => {
              e.stopPropagation();
              handleLeaveRoom();
            }}
            tabIndex={-1}
          >
            <LogOut size={16} />
            <span>채팅방 나가기</span>
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
