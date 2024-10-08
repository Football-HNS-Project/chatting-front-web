import { useFormContext } from "react-hook-form";

import { TSignUpForm } from "@typings/Auth";

import { InputField } from "@components/Auth/InputField";

export const EmailForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<TSignUpForm>();

  return (
    <div>
      <InputField
        name="email"
        placeholder="이메일"
        type="email"
        register={register}
        validation={{
          required: "이메일을 입력해주세요.",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "올바른 이메일 형식이 아닙니다.",
          },
        }}
        className="w-full"
      />
      {errors.email && (
        <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
      )}
    </div>
  );
};
