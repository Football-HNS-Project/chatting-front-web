import {
  ChangeUserEvent,
  CreateMessageEvent,
  CreateNoticeEvent,
  CreateRoomEvent,
  FocusRoomEvent,
  UnFocusRoomEvent,
  UpdateReadReceiptEvent,
  UpdateRoomEvent,
} from "./WebsocketMessage.type";

export type TSocketMessage =
  | CreateMessageEvent
  | CreateRoomEvent
  | UpdateRoomEvent
  | CreateNoticeEvent
  | FocusRoomEvent
  | UnFocusRoomEvent
  | ChangeUserEvent
  | UpdateReadReceiptEvent;

export type TChannel = TSocketMessage["type"];

export type CallbackProps = TSocketMessage["data"];

export type subscribeProps = {
  channel: TChannel;
  callbackFn: (props: CallbackProps) => void;
};

export type unsubscribeProps = subscribeProps;

export type SendRequestProps = {
  type: string;
  data?: CallbackProps;
};

// WebSocket 연결 상태를 추적하기 위한 상태 유형
export type WebSocketConnectionState = 
  | "DISCONNECTED"     // 연결 해제 상태
  | "CONNECTING"       // 연결 중
  | "CONNECTED"        // 연결됨
  | "RECONNECTING"     // 재연결 중
  | "CONNECTION_ERROR" // 연결 오류
  | "AUTH_ERROR"       // 인증 오류
  | "NETWORK_OFFLINE"  // 네트워크 오프라인
  | "REFRESHING_TOKEN" // 토큰 재발급 중
  | "MAX_RETRIES_EXCEEDED" // 최대 재시도 횟수 초과
  | "CLOSED";          // 정상적으로 닫힘
