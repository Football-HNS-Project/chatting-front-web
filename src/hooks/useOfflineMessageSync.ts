import { useEffect, useRef, useState } from 'react';
import { useAtomValue } from 'jotai';
import { useQueryClient } from '@tanstack/react-query';

import { instance } from '@apis/AxiosInstance';
import { QUERY_KEYS } from '@apis/QUERY_KEYS';

import { GetMessagesRes } from '@apis/Chat/useGetEnhancedMessages';
import { TChatMessageDetail } from '@typings/Chat';
import { RoomListAtom } from '@stores/RoomStore';

interface OfflineMessage {
  roomId: string;
  lastSyncTimestamp: number;
}

/**
 * 오프라인 상태에서 누락된 메시지를 동기화하는 훅
 * 
 * 네트워크 연결이 복구되었을 때 각 채팅방의 마지막 동기화 시간 이후의 메시지를 가져옵니다.
 */
export const useOfflineMessageSync = () => {
  const queryClient = useQueryClient();
  const rooms = useAtomValue(RoomListAtom);
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const offlineMessages = useRef<Map<string, OfflineMessage>>(new Map());
  const wasOffline = useRef<boolean>(false);

  // 온라인 상태 감지
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      // 오프라인 상태였다가 온라인으로 전환된 경우에만 동기화
      if (wasOffline.current) {
        syncOfflineMessages();
        wasOffline.current = false;
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
      wasOffline.current = true;
      
      // 오프라인 시점에 각 채팅방의 마지막 메시지 ID와 타임스탬프 저장
      rooms.forEach(room => {
        if (room.latestMessage) {
          const timestamp = new Date(room.latestMessage.createdAt).getTime();
          offlineMessages.current.set(room.id, {
            roomId: room.id,
            lastSyncTimestamp: timestamp
          });
        }
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [rooms]);

  // 오프라인 상태에서 누락된 메시지 동기화
  const syncOfflineMessages = async () => {
    if (offlineMessages.current.size === 0) return;

    const syncPromises = Array.from(offlineMessages.current.values()).map(async ({ roomId, lastSyncTimestamp }) => {
      try {
        const response = await instance.get<{ contents: TChatMessageDetail[] }>(`/rooms/${roomId}/messages`, {
          params: {
            fromTime: new Date(lastSyncTimestamp).toISOString(),
            limit: 100
          }
        });

        // 쿼리 캐시 업데이트
        if (response.contents.length > 0) {
          queryClient.setQueryData(
            QUERY_KEYS.CHAT.messages(JSON.stringify({ roomId })),
            (oldData: GetMessagesRes | undefined) => {
              if (!oldData) return oldData;

              // 기존 메시지에 새로운 메시지 추가
              const existingMessageIds = new Set(oldData.contents.map(msg => msg.id));
              const newMessages = response.contents.filter(msg => !existingMessageIds.has(msg.id));
              
              return {
                ...oldData,
                contents: [...oldData.contents, ...newMessages],
              };
            }
          );

          // 읽지 않은 메시지 카운트 업데이트
          queryClient.setQueryData(
            QUERY_KEYS.ROOM.rooms(),
            (oldData: any) => {
              if (!oldData) return oldData;
              return oldData.map((room: any) => 
                room.id === roomId 
                  ? { ...room, unread: (room.unread || 0) + response.contents.length } 
                  : room
              );
            }
          );
        }
      } catch (error) {
        console.error(`Failed to sync offline messages for room ${roomId}:`, error);
      }
    });

    await Promise.all(syncPromises);
    offlineMessages.current.clear();
  };

  return { isOnline };
};
