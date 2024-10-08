import { useFormContext } from "react-hook-form";

import { TSignUpForm } from "@typings/Auth";

import { InputField } from "@components/Auth/InputField";

export const UsernameForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<TSignUpForm>();

  return (
    <div>
      <InputField
        name="username"
        placeholder="아이디"
        type="text"
        register={register}
        validation={{ required: "아이디를 입력해주세요." }}
        className="w-full"
      />
      {errors.username && (
        <p className="mt-1 text-xs text-red-500">{errors.username.message}</p>
      )}
    </div>
  );
};
