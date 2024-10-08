import { FieldValues, Path, UseFormRegister } from "react-hook-form";

type InputFieldProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  placeholder: string;
  type: string;
  register: UseFormRegister<TFieldValues>;
  validation?: Record<string, unknown>;
  className?: string;
};

export const InputField = <TFieldValues extends FieldValues>({
  name,
  placeholder,
  type,
  register,
  validation = {},
  className = "",
}: InputFieldProps<TFieldValues>) => {
  return (
    <input
      className={`h-11 w-72 rounded-3xl bg-gray-200 px-4 py-1 ${className}`}
      placeholder={placeholder}
      type={type}
      {...register(name, validation)}
    />
  );
};
