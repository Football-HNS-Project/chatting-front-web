import { Button } from "@components/ui";

import { EmailForm } from "./EmailForm";
import { NameForm } from "./NameForm";
import { PhoneNumberForm } from "./PhoneNumberForm";
import { ProfileImageForm } from "./ProfileImageForm";

type StepTwoProps = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  isLoading: boolean;
};

export const StepTwo = ({ setStep, isLoading }: StepTwoProps) => {
  const handlePrevStep = () => {
    setStep(0);
  };

  return (
    <div className="flex w-[350px] flex-col">
      <div className="flex flex-col gap-2">
        <ProfileImageForm />
        <NameForm />
        <EmailForm />
        <PhoneNumberForm />
      </div>
      <div className="mt-5 space-y-2">
        <Button type="button" className="w-full" onClick={handlePrevStep}>
          이전
        </Button>
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "처리 중..." : "회원가입"}
        </Button>
      </div>
    </div>
  );
};
