import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  classNameStyle?: string;
}

export function Button({ children, classNameStyle, ...rest }: ButtonProps) {
  return (
    <button
      className={`h-10 text-sm bg-green-600 rounded hover:bg-green-500 transition-all disabled:cursor-not-allowed disabled:bg-green-500 disabled:opacity-40 ${classNameStyle}`}
      {...rest}
    >
      {children}
    </button>
  );
}
