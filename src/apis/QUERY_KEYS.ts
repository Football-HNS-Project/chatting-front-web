export const QUERY_KEYS = {
  ALL: ["chat-frontend"],
  AUTH: {
    all: () => ["auth"],
    login: () => [...QUERY_KEYS.AUTH.all(), "login"],
    logout: () => [...QUERY_KEYS.AUTH.all(), "logout"],
  },
} as const;
