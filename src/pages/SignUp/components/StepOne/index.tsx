import { useFormContext } from "react-hook-form";

import { TSignUpForm } from "@typings/Auth";

import { Button } from "@components/ui";

import { PasswordConfirmForm } from "./PasswordConfirmForm";
import { PasswordForm } from "./PasswordForm";
import { UsernameForm } from "./UsernameForm";

type StepOneProps = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

export const StepOne = ({ setStep }: StepOneProps) => {
  const { trigger } = useFormContext<TSignUpForm>();

  const handleNextStep = async () => {
    const isValid = await trigger(["username", "password", "confirmPassword"]);
    if (isValid) {
      setStep(1);
    }
  };

  return (
    <div className="flex w-[350px] flex-col gap-2">
      <UsernameForm />
      <PasswordForm />
      <PasswordConfirmForm />
      <Button type="button" onClick={handleNextStep}>
        다음
      </Button>
    </div>
  );
};
