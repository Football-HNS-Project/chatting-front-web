import { useState } from "react";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import LOGO from "@assets/chat-logo.png";

import { usePostSignUp } from "@apis/Auth/usePostSignUp";
import { useGetFileUrl } from "@apis/Chat/useGetFileUrl";

import { Button } from "@components/ui";

import { EmailForm } from "./components/EmailForm";
import { NameForm } from "./components/NameForm";
import { PasswordConfirmForm } from "./components/PasswordConfirmForm";
import { PasswordForm } from "./components/PasswordForm";
import { PhoneNumberForm } from "./components/PhoneNumberForm";
import { ProfileImageForm } from "./components/ProfileImageForm";
import { UsernameForm } from "./components/UsernameForm";

type SignUpForm = {
  username: string;
  password: string;
  confirmPassword: string;
  name: string;
  email: string;
  profileImage: FileList;
  phoneNumber: string;
};

export const SignUpPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { mutate: signUpMutate } = usePostSignUp();
  const { mutate: getFileUrlMutate } = useGetFileUrl();

  const methods = useForm<SignUpForm>();
  const {
    handleSubmit,
    formState: { errors },
    setError,
  } = methods;

  const onSubmit: SubmitHandler<SignUpForm> = async (data) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("password", data.password);
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phoneNumber", data.phoneNumber);
      if (data.profileImage[0]) {
        formData.append("profileImage", data.profileImage[0]);
      }

      console.log("Submitting:", formData);
      getFileUrlMutate(
        {
          fileName: data.profileImage[0].name,
          contentType: data.profileImage[0].type,
          fileSize: data.profileImage[0].size,
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
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <div className="mb-3 flex justify-center">
          <img src={LOGO} width={150} height={150} alt="Logo" />
        </div>
        <h2 className="mb-4 text-center text-xl font-bold">회원가입</h2>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <UsernameForm />
            <PasswordForm />
            <PasswordConfirmForm />
            <NameForm />
            <EmailForm />
            <ProfileImageForm />
            <PhoneNumberForm />
            {errors.root && (
              <div className="text-center text-sm text-red-500">
                {errors.root.message}
              </div>
            )}
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "처리 중..." : "회원가입"}
            </Button>
          </form>
        </FormProvider>

        <p className="mt-4 text-center text-sm">
          이미 계정이 있으신가요?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            로그인
          </a>
        </p>
      </div>
    </div>
  );
};
