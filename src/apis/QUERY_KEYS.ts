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
  },
} as const;
