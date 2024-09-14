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

  if (!data) return <div>데이터가 없습니다.</div>;
  if (error) throw error;
  if (isLoading) return <Spinner />;
  //   const { isReady, sendRequest, subscribe, unsubscribe } =
  //     useContext(WebSocketContext);
  //   const navigate = useNavigate();
  //   const setTab = useSetAtom(TabAtom);
  //   const handleCreateChat = () => {
  //     if (isReady) {
  //       sendRequest({
  //         type: "CREATE_ROOM_REQUEST",
  //         data: {
  //           name: userInfo.name,
  //           participants: [user.id, userInfo.id],
  //         },
  //       });
  //       subscribe({
  //         channel: "CREATE_ROOM_RESPONSE",
  //         callbackFn: (data) => {
  //           setTab("room");
  //           navigate(`/chatting/room/${(data as CreateRoomRes["data"]).roomId}`);
  //         },
  //       });
  //     }
  //   };
  //   useEffect(() => {
  //     return () => {
  //       unsubscribe({ channel: "CREATE_ROOM_RESPONSE" });
  //     };
  //   }, [unsubscribe]);

  const handleCreateRoom = () => {
    mutate(
      { name: data.name, memberIds: [data.id], roomType: "DIRECT" },
      {
        onSuccess: (res) => {
          navigate(`/room/${res.roomId}`);
        },
      }
    );
  };

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      {data.name}
      <Button onClick={handleCreateRoom}>1:1 채팅방</Button>
    </div>
  );
};
