import { useState } from "react";

import dayjs from "dayjs";
import { EllipsisVertical } from "lucide-react";

import { TRoom } from "@typings/Room";

import { RoomPopover } from "./RoomPopover";
import { UnreadCountBadge } from "./UnreadCountBadge";

type RoomItemProps = {
  room: TRoom;
  isActive: boolean;
  onRoomClick: (roomId: string) => void;
};

const formatDate = (date: string | undefined): string => {
  if (!date) return "";
  const messageDate = dayjs(date);
  const today = dayjs().startOf("day");

  if (messageDate.isSame(today, "day")) {
    return messageDate.format("A h:mm");
  }
  return messageDate.format("YYYY-MM-DD");
};

export const RoomItem = ({ room, isActive, onRoomClick }: RoomItemProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const formattedDate = formatDate(room.latestMessage?.createdAt);

  return (
    <li
      onClick={() => onRoomClick(room.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        if (!showPopover) setShowPopover(false);
      }}
      className={`relative flex h-20 cursor-pointer items-center gap-4 rounded-xl p-4 transition-colors duration-200 ${
        isActive ? "bg-blue-50" : "bg-white hover:bg-gray-50"
      }`}
    >
      <img
        width={48}
        src="/src/assets/chat-logo.png"
        alt={`${room.name} icon`}
      />
      <div className="flex-grow overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="max-w-[130px] truncate text-sm font-semibold text-gray-800">
              {room.name}
            </span>
            <span className="text-xs text-gray-600">
              {room.memberIds.length}
            </span>
          </div>
          {!isHovered && formattedDate && (
            <span className="text-xs text-gray-400">{formattedDate}</span>
          )}
        </div>
        <div className="mt-1 flex items-center justify-between">
          <p className="truncate text-sm text-gray-600">
            {room.latestMessage?.plainText || "No messages yet"}
          </p>
          {room.unread > 0 && !isHovered && (
            <UnreadCountBadge unread={room.unread} />
          )}
        </div>
      </div>

      {(isHovered || showPopover) && (
        <RoomPopover roomId={room.id} onClose={() => setShowPopover(false)}>
          <button
            className="flex h-8 w-8 items-center justify-center rounded-full text-gray-600 transition-colors duration-200 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <EllipsisVertical size={18} />
          </button>
        </RoomPopover>
      )}
    </li>
  );
};
