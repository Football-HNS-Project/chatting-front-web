import { useFormContext } from "react-hook-form";

import { TSignUpForm } from "@typings/Auth";

import { InputField } from "@components/Auth/InputField";

export const PasswordConfirmForm = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<TSignUpForm>();

  const password = watch("password");

  return (
    <div>
      <InputField
        name="confirmPassword"
        placeholder="비밀번호 확인"
        type="password"
        register={register}
        validation={{
          required: "비밀번호 확인을 입력해주세요.",
          validate: (value: string) =>
            value === password || "비밀번호가 일치하지 않습니다.",
        }}
        className="w-full"
      />
      {errors.confirmPassword && (
        <p className="mt-1 text-xs text-red-500">
          {errors.confirmPassword.message}
        </p>
      )}
    </div>
  );
};
