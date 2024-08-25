import { useParams } from "react-router-dom";

import { useGetUsers } from "@apis/User/useGetUsers";

import { TUser } from "@typings/User";

import { QueryWrapper } from "@components/QueryWrapper";

import { UserItem } from "./UserItem";

type UserListProps = {
  myInfo: TUser;
};

export const UserList = ({ myInfo }: UserListProps) => {
  const query = useGetUsers();
  const { id } = useParams<{ id: string }>();

  return (
    <QueryWrapper query={query}>
      {(data) => (
        <ul className="absolute flex h-full w-full flex-col divide-y divide-gray-200 overflow-auto">
          <UserItem user={myInfo} isMe={true} isCurrent={myInfo.id === id} />
          {data
            .filter((user) => user.id !== myInfo.id)
            .map((user) => (
              <UserItem key={user.id} user={user} isCurrent={user.id === id} />
            ))}
        </ul>
      )}
    </QueryWrapper>
  );
};
