import dayjs, { Dayjs } from "dayjs";

export const changeDate = (date: Dayjs) => {
  const createdAt = dayjs(date);
  if (createdAt.hour() < 12) {
    return `오전 ${createdAt.hour()}:${String(createdAt.minute()).padStart(
      2,
      "0"
    )}`;
  }
  return `오후 ${createdAt.hour() - 12}:${String(createdAt.minute()).padStart(
    2,
    "0"
  )}`;
};
