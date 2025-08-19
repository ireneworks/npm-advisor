import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import SearchInputContainer from "#components/navigation/_containers/SearchInputContainer";

export default function Navigation() {
  const { push } = useRouter();

  const onClickLogo = useCallback(() => {
    void push("/");
  }, [push]);

  return (
    <div className="flex gap-5 py-5 px-12 items-center border-b-1">
      <h1
        className="p-0 m-0 cursor-pointer whitespace-nowrap font-black"
        onClick={onClickLogo}
      >
        NPM Advisor
      </h1>
      <SearchInputContainer />
    </div>
  );
}
