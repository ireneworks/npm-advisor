import * as React from "react";

type InputProps = React.ComponentProps<"input">;

export default function Input({ className, type, ...props }: InputProps) {
  return (
    <input
      type={type}
      className={`file:text-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 border bg-transparent px-3 py-1 shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm
        selection:bg-gray-200 selection:text-gray-900 text-sm flex-1 text-gray-900 rounded-sm focus-visible:ring-gray-100 placeholder:text-sm lg:placeholder:text-base placeholder:text-gray-400 lg:text-base lg:h-13 lg:px-4.5
        focus-visible:border-ring focus-visible:ring-[3px]
        aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive
        ${className}`}
      {...props}
    />
  );
}
