"use client";
import React, { useCallback } from "react";
import ScrollToTop from "../../../component/scrollToTop/ScrollToTop";
import SearchInputContainer from "../../../component/searchInput/_containers/SearchInputContainer";
import { useRouter } from "next/navigation";
import { HOME } from "../../../constant/navigation";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const { push } = useRouter();

  const onClickLogo = useCallback(() => {
    void push(HOME);
  }, [push]);

  return (
    <>
      <nav className="sticky top-0 z-1 bg-white">
        <div className="px-4 py-3 items-center shadow-[0_2px_8px_rgba(0,0,0,0.08)] flex gap-1 lg:gap-5 lg:py-5 lg:px-12 ">
          <h1
            className="text-sm leading-3.5 p-0 m-0 cursor-pointer font-black text-indigo-600 lg:text-xl lg:whitespace-nowrap"
            onClick={onClickLogo}
          >
            npm Advisor
          </h1>
          <SearchInputContainer />
        </div>
      </nav>
      <main className={"flex-1"}>
        {children}
        <ScrollToTop />
      </main>
    </>
  );
}
