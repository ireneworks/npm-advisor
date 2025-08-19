import React from "react";
import Navigation from "#components/navigation/Navigation";
import ScrollToTop from "#components/scrollToTop/ScrollToTop";
import Footer from "#components/footer/Footer";

interface Props {
  children: React.ReactNode;
}

export default function PageLayout({ children }: Props) {
  return (
    <>
      <nav className="sticky z-1 bg-white">
        <Navigation />
      </nav>
      <main>
        {children}
        <ScrollToTop />
      </main>
      <Footer />
    </>
  );
}
