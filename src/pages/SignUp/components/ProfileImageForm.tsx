import { useFormContext } from "react-hook-form";

import { TSignUpForm } from "@typings/Auth";

export const ProfileImageForm = () => {
  const { register } = useFormContext<TSignUpForm>();

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        {...register("profileImage")}
        className="w-full"
      />
    </div>
  );
};
