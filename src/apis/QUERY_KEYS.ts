export const QUERY_KEYS = {
  ALL: ["chat-frontend"],
  AUTH: {
    all: () => ["auth"],
    login: () => [...QUERY_KEYS.AUTH.all(), "login"],
    logout: () => [...QUERY_KEYS.AUTH.all(), "logout"],
  },
  USER: {
    all: () => ["user"],
    myInfo: () => [...QUERY_KEYS.USER.all(), "my_info"],
    list: () => [...QUERY_KEYS.USER.all(), "list"],
  },
  ROOM: {
    all: () => ["room"],
    detail: (params: string) => [...QUERY_KEYS.ROOM.all(), "detail", params],
    roomMemberList: (params: string) => [
      ...QUERY_KEYS.USER.all(),
      "room_member_list",
      params,
    ],
    invitableUserList: (params: string) => [
      ...QUERY_KEYS.USER.all(),
      "invitable_user_list",
      params,
    ],
    list: () => [...QUERY_KEYS.ROOM.all(), "list"],
    create: () => [...QUERY_KEYS.ROOM.all(), "create"],
    leave: () => [...QUERY_KEYS.ROOM.all(), "leave"],
    invite: () => [...QUERY_KEYS.ROOM.all(), "invite"],
  },
} as const;
