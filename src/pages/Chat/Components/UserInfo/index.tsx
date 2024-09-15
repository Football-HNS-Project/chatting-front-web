import { useNavigate } from "react-router-dom";

import { useCreateRoom } from "@apis/Room/useCreateRoom";
import { useGetUserInfo } from "@apis/User/useGetUserInfo";

import { Spinner } from "@components/Spinner";
import { Button } from "@components/ui";

type UserInfoProps = {
  userId: string;
};

export const UserInfo = ({ userId }: UserInfoProps) => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetUserInfo({ userId });
  const { mutate } = useCreateRoom();

  if (error) throw error;
  if (isLoading) return <Spinner />;

  const handleCreateRoom = () => {
    if (data) {
      mutate(
        { name: data.name, memberIds: [data.id], roomType: "DIRECT" },
        {
          onSuccess: (res) => {
            navigate(`/room/${res.roomId}`);
          },
        }
      );
    }
  };

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      {data?.name}
      <Button onClick={handleCreateRoom}>1:1 채팅방</Button>
    </div>
  );
};
