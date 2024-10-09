import { useFormContext } from "react-hook-form";

import { TSignUpForm } from "@typings/Auth";

import { InputField } from "@components/Auth/InputField";
import { Button } from "@components/ui";

export const UsernameForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<TSignUpForm>();

  return (
    <div>
      <div className="flex items-center gap-3">
        <InputField
          name="username"
          placeholder="Id"
          type="text"
          register={register}
          validation={{ required: "아이디를 입력해주세요." }}
          className="w-full"
        />
        <Button type="button">중복 검사</Button>
      </div>

      {errors.username && (
        <p className="mt-1 text-xs text-red-500">{errors.username.message}</p>
      )}
    </div>
  );
};
