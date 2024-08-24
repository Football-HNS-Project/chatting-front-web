import { useNavigate, useParams } from "react-router-dom";

import { User } from "lucide-react";

import { useGetUsers } from "@apis/User/useGetUsers";

import { TUser } from "@typings/User";

import { QueryWrapper } from "@components/QueryWrapper";

type UserListProps = {
  myInfo: TUser;
};

const UserItem = ({
  user,
  isMe = false,
  isCurrent,
}: {
  user: Omit<TUser, "email">;
  isMe?: boolean;
  isCurrent: boolean;
}) => {
  const navigate = useNavigate();

  return (
    <li
      className={`cursor-pointer transition-colors duration-150 ease-in-out ${
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

export const UserList = ({ myInfo }: UserListProps) => {
  const query = useGetUsers();
  const { id } = useParams<{ id: string }>();

  return (
    <QueryWrapper query={query}>
      {(data) => (
        // TODO : 스크롤 적용
        <div className="h-full overflow-y-auto bg-gray-50">
          <ul className="divide-y divide-gray-200">
            <UserItem user={myInfo} isMe={true} isCurrent={myInfo.id === id} />
            {data
              .filter((user) => user.id !== myInfo.id)
              .map((user) => (
                <UserItem
                  key={user.id}
                  user={user}
                  isCurrent={user.id === id}
                />
              ))}
          </ul>
        </div>
      )}
    </QueryWrapper>
  );
};
