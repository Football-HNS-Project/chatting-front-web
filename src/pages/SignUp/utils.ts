export const formatPhoneNumber = (value: string) => {
  const phoneNumber = value.replace(/[^\d]/g, "");
  if (phoneNumber.length <= 3) return phoneNumber;
  if (phoneNumber.length <= 7)
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
  return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(
    3,
    7
  )}-${phoneNumber.slice(7, 11)}`;
};
