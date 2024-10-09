import { useState } from "react";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import LOGO from "@assets/chat-logo.png";

import { usePostSignUp } from "@apis/Auth/usePostSignUp";
import { useGetFileUrl } from "@apis/Chat/useGetFileUrl";

import { TSignUpForm } from "@typings/Auth";

import { StepOne } from "./components/StepOne";
import { StepTwo } from "./components/StepTwo";

export const SignUpPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { mutate: signUpMutate } = usePostSignUp();
  const { mutate: getFileUrlMutate } = useGetFileUrl();
  const [step, setStep] = useState(0);

  const methods = useForm<TSignUpForm>();
  const { handleSubmit, setError } = methods;

  const onSubmit: SubmitHandler<TSignUpForm> = async (data) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("password", data.password);
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phoneNumber", data.phoneNumber);
      if (data.profileImage) {
        formData.append("profileImage", data.profileImage);
      }

      console.log("Submitting:", formData);
      getFileUrlMutate(
        {
          fileName: data.profileImage.name,
          contentType: data.profileImage.type,
          fileSize: data.profileImage.size,
          metadata: new Map(),
        },
        {
          onSuccess: (res) => {
            signUpMutate(
              {
                username: data.username,
                password: data.password,
                name: data.name,
                email: data.email,
                profileImageUrl: res.preSignedUrl,
                phoneNumber: data.phoneNumber,
              },
              {
                onSuccess: () => {
                  navigate("/login");
                },
              }
            );
          },
        }
      );
    } catch (error) {
      setError("root", {
        type: "manual",
        message: "회원가입에 실패했습니다. 다시 시도해 주세요.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      {step === 0 && (
        <>
          <div className="mb-3 flex justify-center">
            <img src={LOGO} width={200} height={200} alt="Logo" />
          </div>
          <h2 className="mb-4 text-center text-xl font-bold">회원가입</h2>
        </>
      )}
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          {step === 0 ? (
            <StepOne setStep={setStep} />
          ) : (
            <StepTwo setStep={setStep} isLoading={isLoading} />
          )}
        </form>
      </FormProvider>

      <p className="mt-4 text-center text-sm">
        이미 계정이 있으신가요?{" "}
        <a href="/login" className="text-blue-500 hover:underline">
          로그인
        </a>
      </p>
    </div>
  );
};
