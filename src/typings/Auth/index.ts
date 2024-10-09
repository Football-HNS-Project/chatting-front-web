export type TLoginForm = {
  username: string;
  password: string;
};

export type TSignUpForm = {
  username: string;
  password: string;
  confirmPassword: string;
  name: string;
  email: string;
  profileImage: File | null;
  profileImageUrl: string;
  phoneNumber: string;
};
