import React from "react";
import Navigation from "#components/navigation/Navigation";
import ScrollToTop from "#components/scrollToTop/ScrollToTop";

interface Props {
  children: React.ReactNode;
}

export default function PageLayout({ children }: Props) {
  return (
    <>
      <nav className="sticky top-0 z-1 bg-white">
        <Navigation />
      </nav>
      <main>
        {children}
        <ScrollToTop />
      </main>
      <footer className="pt-5 pb-20 px-12 border-t-1">
        <h6 className="text-[12px]">
          <b>NPM Advisor</b> 2025 @ireneworks
        </h6>
      </footer>
    </>
  );
}
