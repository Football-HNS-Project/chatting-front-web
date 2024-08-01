import { UseFormRegister } from "react-hook-form";

import { TLoginForm } from "@typings/Login";

type InputFieldProps = {
  name: keyof TLoginForm;
  placeholder: string;
  type: string;
  register: UseFormRegister<TLoginForm>;
  validation: object;
};

export const InputField = ({
  name,
  placeholder,
  type,
  register,
  validation,
}: InputFieldProps) => {
  return (
    <input
      className="h-11 w-72 rounded-3xl bg-gray-200 px-4 py-1"
      placeholder={placeholder}
      type={type}
      {...register(name, validation)}
    />
  );
};
