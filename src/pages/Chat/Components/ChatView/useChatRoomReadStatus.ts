import { useEffect, useRef } from "react";

import { useCheckRead } from "@apis/Chat/useCheckRead";

import { TChatMessageDetail } from "@typings/Chat";

export const useChatRoomReadStatus = (
  roomId: string,
  messages: TChatMessageDetail[]
) => {
  const { mutate: checkRead } = useCheckRead();
  const prevRoomIdRef = useRef<string | null>(null);

  useEffect(() => {
    // roomId가 비어있거나 이전 roomId와 다를 때 체크
    if (prevRoomIdRef.current !== null && prevRoomIdRef.current !== roomId) {
      // 이전 채팅방에서 나가는 경우
      if (messages.length > 0) {
        const lastMessageId = messages[messages.length - 1].id;
        console.log("나가요", prevRoomIdRef.current);
        checkRead({ roomId: prevRoomIdRef.current, messageId: lastMessageId });
      }
    }
    // 현재 roomId 저장
    prevRoomIdRef.current = roomId ?? null; // roomId가 undefined일 경우 null로 저장
  }, [roomId, messages, checkRead]);
};
