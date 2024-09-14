import { useNavigate } from "react-router-dom";

import { useCreateRoom } from "@apis/Room/useCreateRoom";

import { Button } from "@components/ui";

type UserInfoProps = {
  userId: string;
};

export const UserInfo = ({ userId }: UserInfoProps) => {
  const navigate = useNavigate();
  const { mutate } = useCreateRoom();

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
      { name: userId, memberIds: [userId], roomType: "DIRECT" },
      {
        onSuccess: (res) => {
          navigate(`/room/${res.roomId}`);
        },
      }
    );
  };

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      {userId}
      <Button onClick={handleCreateRoom}>1:1 채팅방</Button>
    </div>
  );
};
