import { User_Dummy } from "@stores/UserStore";

export const userMapping = (userId: number) => {
  const user = User_Dummy.filter((u) => u.id === userId);
  return user[0].name;
};
