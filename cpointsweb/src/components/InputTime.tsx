import { InputHTMLAttributes } from "react";
import { UseFormRegister } from "react-hook-form";

interface useFormRegisterProps {
  entryOne: string;
  exitOne: string;
  entryTwo: string;
  exitTwo: string;
  totalHour?: string;
}

interface InputTimeProps extends InputHTMLAttributes<HTMLInputElement> {
  nameInput: "entryOne" | "exitOne" | "entryTwo" | "exitTwo" | "totalHour";
  register: UseFormRegister<useFormRegisterProps>;
}

export function InputTime({ register, nameInput, ...rest }: InputTimeProps) {
  return (
    <input
      {...register(nameInput)}
      type="time"
      className="h-10 w-24 p-1 bg-zinc-900 text-center text-lg focus:outline-none rounded focus:border focus:border-green-500 text-green-500"
      {...rest}
    />
  );
}
