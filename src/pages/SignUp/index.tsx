import { useState } from "react";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import LOGO from "@assets/chat-logo.png";

import { usePostSignUp } from "@apis/Auth/usePostSignUp";
import { useGetFileUrl } from "@apis/Chat/useGetFileUrl";

import { Button } from "@components/ui";

import { InputField } from "@pages/Login/components/Inputfield";

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

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
    control,
  } = useForm<SignUpForm>();

  const password = watch("password");
  const { mutate: getFileUrlMutate } = useGetFileUrl();

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

  const formatPhoneNumber = (value: string) => {
    const phoneNumber = value.replace(/[^\d]/g, "");
    if (phoneNumber.length <= 3) return phoneNumber;
    if (phoneNumber.length <= 7)
      return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(
      3,
      7
    )}-${phoneNumber.slice(7, 11)}`;
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <div className="mb-6 flex justify-center">
          <img src={LOGO} width={150} height={150} alt="Logo" />
        </div>
        <h2 className="mb-6 text-center text-2xl font-bold">회원가입</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <InputField
              name="username"
              placeholder="아이디"
              type="text"
              register={register}
              validation={{ required: "아이디를 입력해주세요." }}
              className="w-full"
            />
            {errors.username && (
              <p className="mt-1 text-xs text-red-500">
                {errors.username.message}
              </p>
            )}
          </div>
          <div>
            <InputField
              name="password"
              placeholder="비밀번호"
              type="password"
              register={register}
              validation={{ required: "비밀번호를 입력해주세요." }}
              className="w-full"
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>
          <div>
            <InputField
              name="confirmPassword"
              placeholder="비밀번호 확인"
              type="password"
              register={register}
              validation={{
                required: "비밀번호 확인을 입력해주세요.",
                validate: (value: string) =>
                  value === password || "비밀번호가 일치하지 않습니다.",
              }}
              className="w-full"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
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
              <p className="mt-1 text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <input
              type="file"
              accept="image/*"
              {...register("profileImage", {
                required: "프로필 이미지를 선택해주세요.",
              })}
              className="w-full"
            />
            {errors.profileImage && (
              <p className="mt-1 text-xs text-red-500">
                {errors.profileImage.message}
              </p>
            )}
          </div>
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
          {errors.root && (
            <div className="text-center text-sm text-red-500">
              {errors.root.message}
            </div>
          )}
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "처리 중..." : "회원가입"}
          </Button>
        </form>
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
