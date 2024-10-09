import React, { useRef, useState } from "react";

import { useFormContext } from "react-hook-form";

import { Camera } from "lucide-react";

import { TSignUpForm } from "@typings/Auth";

export const ProfileImageForm: React.FC = () => {
  const { register, setValue } = useFormContext<TSignUpForm>();
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("profileImage", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="mb-6 flex flex-col items-center">
      <div
        className="relative h-52 w-52 cursor-pointer overflow-hidden rounded-full bg-gray-200 shadow-lg"
        onClick={handleClick}
      >
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="h-full w-full border object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Camera className="h-12 w-12 text-gray-400" />
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          ref={(e) => {
            fileInputRef.current = e;
            register("profileImage").ref(e);
          }}
          onChange={handleImageChange}
          className="hidden"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity hover:opacity-100">
          <span className="text-4xl text-white">+</span>
        </div>
      </div>
      <p className="mt-2 text-sm text-gray-600">프로필 이미지 선택</p>
    </div>
  );
};
