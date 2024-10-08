import { Controller, useFormContext } from "react-hook-form";

import { TSignUpForm } from "@typings/Auth";

import { formatPhoneNumber } from "../utils";

export const PhoneNumberForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<TSignUpForm>();

  return (
    <div>
      <Controller
        name="phoneNumber"
        control={control}
        rules={{
          required: "전화번호를 입력해주세요.",
          pattern: {
            value: /^\d{3}-\d{4}-\d{4}$/,
            message: "올바른 전화번호 형식이 아닙니다.",
          },
        }}
        render={({ field: { onChange, value } }) => (
          <input
            type="tel"
            placeholder="전화번호 (xxx-xxxx-xxxx)"
            value={value || ""}
            onChange={(e) => onChange(formatPhoneNumber(e.target.value))}
            className="h-11 w-full rounded-3xl bg-gray-200 px-4 py-1"
          />
        )}
      />
      {errors.phoneNumber && (
        <p className="mt-1 text-xs text-red-500">
          {errors.phoneNumber.message}
        </p>
      )}
    </div>
  );
};
