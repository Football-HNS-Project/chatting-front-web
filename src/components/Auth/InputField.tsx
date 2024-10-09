import { useState } from "react";

import { FieldValues, Path, UseFormRegister } from "react-hook-form";

import { Eye, EyeOff } from "lucide-react";

type InputFieldProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  placeholder: string;
  type: string;
  register: UseFormRegister<TFieldValues>;
  validation?: Record<string, unknown>;
  className?: string;
  isPassword?: boolean;
};

export const InputField = <TFieldValues extends FieldValues>({
  name,
  placeholder,
  type,
  register,
  validation = {},
  className = "",
  isPassword = false,
}: InputFieldProps<TFieldValues>) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <input
        className={`h-11 w-full rounded-xl bg-gray-200 px-4 ${className} ${
          isPassword ? "pr-10" : ""
        }`}
        placeholder={placeholder}
        type={isPassword ? (showPassword ? "text" : "password") : type}
        {...register(name, validation)}
      />
      {isPassword && (
        <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5 text-gray-500" />
          ) : (
            <Eye className="h-5 w-5 text-gray-500" />
          )}
        </button>
      )}
    </div>
  );
};
