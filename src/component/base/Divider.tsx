import * as React from "react";

interface Props {
  variant?: "vertical" | "horizontal";
}
type DividerProps = Props & React.ComponentProps<"div">;

export default function Divider({
  className,
  variant = "horizontal",
}: DividerProps) {
  return (
    <div
      className={`bg-gray-200 shrink-0 ${variant ? "w-full h-[1px]" : "h-full w-[1px]"} ${className}`}
    />
  );
}
