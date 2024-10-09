import { useFormContext } from "react-hook-form";

import { TSignUpForm } from "@typings/Auth";

import { InputField } from "@components/Auth/InputField";

export const NameForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<TSignUpForm>();

  return (
    <div>
      <InputField
        name="name"
        placeholder="이름"
        type="text"
        register={register}
        validation={{ required: "이름을 입력해주세요." }}
        className="w-full"
      />
      {errors.name && (
        <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
      )}
    </div>
  );
};
