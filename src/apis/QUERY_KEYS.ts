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
    list: () => [...QUERY_KEYS.ROOM.all(), "list"],
  },
} as const;
