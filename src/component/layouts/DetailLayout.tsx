import React from "react";

interface Props {
  children: { a: React.ReactNode; b: React.ReactNode; c: React.ReactNode };
}

export default function DetailLayout({ children: { a, b, c } }: Props) {
  return (
    <div className={"flex flex-col gap-8 lg:flex-row lg:justify-between"}>
      <div className={"flex flex-col flex-[0_0_80%]"}>
        {a}
        {b}
      </div>
      <div className="flex flex-col gap-1 lg:gap-2 text-sm lg:basis-1/5 lg:self-start">
        {c}
      </div>
    </div>
  );
}
