import React, { useCallback } from "react";
import ScrollToTop from "#components/scrollToTop/ScrollToTop";
import Footer from "#components/footer/Footer";
import SearchInputContainer from "#components/navigation/_containers/SearchInputContainer";
import { useRouter } from "next/navigation";
import { HOME } from "#constants/navigation";

interface Props {
  children: React.ReactNode;
}

export default function PageLayout({ children }: Props) {
  const { push } = useRouter();

  const onClickLogo = useCallback(() => {
    void push(HOME);
  }, [push]);

  return (
    <>
      <nav className="sticky top-0 z-1 bg-white">
        <div className="flex gap-5 py-5 px-12 items-center border-b-1">
          <h1
            className="p-0 m-0 cursor-pointer whitespace-nowrap font-black"
            onClick={onClickLogo}
          >
            NPM Advisor
          </h1>
          <SearchInputContainer />
        </div>
      </nav>
      <main>
        {children}
        <ScrollToTop />
      </main>
      <Footer />
    </>
  );
}
