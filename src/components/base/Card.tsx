import * as React from "react";

type CardProps = React.ComponentProps<"div">;

export default function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={`rounded-sm border border-gray-200 ${className}`}
      {...props}
    />
  );
}
