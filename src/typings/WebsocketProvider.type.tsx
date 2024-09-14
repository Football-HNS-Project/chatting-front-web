import {
  CreateMessageEvent,
  CreateRoomEvent,
  UpdateRoomEvent,
} from "./WebsocketMessage.type";

export type TSocketMessage =
  | CreateMessageEvent
  | CreateRoomEvent
  | UpdateRoomEvent;

export type TChannel = TSocketMessage["type"];

export type CallbackProps = TSocketMessage["data"];

export type subscribeProps = {
  channel: TChannel;
  callbackFn: (props: CallbackProps) => void;
};

export type unsubscribeProps = Omit<subscribeProps, "callbackFn">;

export type SendRequestProps = {
  type: string;
};
