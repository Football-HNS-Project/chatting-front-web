import { useNavigate } from "react-router-dom";

import { User } from "lucide-react";

import { TUser } from "@typings/User";

type UserItemProps = {
  user: Omit<TUser, "email">;
  isMe?: boolean;
  isCurrent: boolean;
};

export const UserItem = ({ user, isMe = false, isCurrent }: UserItemProps) => {
  const navigate = useNavigate();

  return (
    <li
      className={`flex cursor-pointer transition-colors duration-150 ease-in-out ${
        isCurrent ? "bg-blue-50 hover:bg-blue-100" : "hover:bg-gray-100"
      }`}
      onClick={() => {
        navigate(`/user/${user.id}`);
      }}
    >
      <div className="flex items-center space-x-3 px-4 py-5">
        <div className="flex-shrink-0">
          <User
            className={`h-6 w-6 ${
              isCurrent ? "text-blue-500" : "text-gray-400"
            }`}
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-gray-900">
            {user.name}{" "}
            {isMe && <span className="text-xs text-blue-600">(You)</span>}
          </p>
        </div>
      </div>
    </li>
  );
};
