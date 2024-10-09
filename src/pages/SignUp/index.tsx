import React, { useState } from "react";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import LOGO from "@assets/chat-logo.png";

import { usePostSignUp } from "@apis/Auth/usePostSignUp";
import { useGetFileUrl } from "@apis/Chat/useGetFileUrl";

import { TSignUpForm } from "@typings/Auth";

import { useModal } from "@components/Modal/useModal";

import { SignUpCompleteModal } from "./components/SignUpCompleteModal";
import { SignUpErrorModal } from "./components/SignUpErrorModal";
import { StepOne } from "./components/StepOne";
import { StepTwo } from "./components/StepTwo";

export const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(0);
  const { mutate: signUpMutate } = usePostSignUp();
  const { mutateAsync: getFileUrlMutate } = useGetFileUrl();
  const { showCustomModal, closeCustomModal } = useModal();

  const methods = useForm<TSignUpForm>({
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
      name: "",
      email: "",
      profileImage: null,
      profileImageUrl: "",
      phoneNumber: "010",
    },
  });

  const showErrorModal = () => {
    showCustomModal({
      displayComponent: <SignUpErrorModal closeModal={closeCustomModal} />,
      isBackDrop: false,
    });
  };

  const handleFileUpload = async (file: File) => {
    try {
      const res = await getFileUrlMutate({
        fileName: file.name,
        fileSize: file.size,
        contentType: file.type,
        metadata: new Map(),
      });
      methods.setValue("profileImageUrl", res.preSignedUrl);
    } catch (err) {
      console.error(err);
      showErrorModal();
    }
  };

  const onSubmit: SubmitHandler<TSignUpForm> = async (data) => {
    setIsLoading(true);
    if (data.profileImage) {
      await handleFileUpload(data.profileImage);
    }

    signUpMutate(
      {
        username: data.username,
        password: data.password,
        name: data.name,
        email: data.email,
        profileImageUrl: data.profileImageUrl,
        phoneNumber: data.phoneNumber,
      },
      {
        onSuccess: () => {
          setIsLoading(false);
          showCustomModal({
            displayComponent: (
              <SignUpCompleteModal
                closeModal={closeCustomModal}
                navigate={navigate}
              />
            ),
            isBackDrop: false,
          });
        },
        onError: () => {
          setIsLoading(false);
          showErrorModal();
        },
      }
    );
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
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col"
        >
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
