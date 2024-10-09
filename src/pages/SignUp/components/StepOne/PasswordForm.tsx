import { useFormContext } from "react-hook-form";

import { TSignUpForm } from "@typings/Auth";

import { InputField } from "@components/Auth/InputField";

export const PasswordForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<TSignUpForm>();

  return (
    <div>
      <InputField
        name="password"
        placeholder="비밀번호"
        type="password"
        register={register}
        validation={{ required: "비밀번호를 입력해주세요." }}
        className="w-full"
        isPassword
      />
      {errors.password && (
        <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
      )}
    </div>
  );
};
