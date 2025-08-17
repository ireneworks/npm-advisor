import React from "react";
import Navigation from "#components/searchInput/Navigation";

interface Props {
  children: React.ReactNode;
}

export default function PageLayout({ children }: Props) {
  return (
    <>
      <nav>
        <Navigation />
      </nav>
      <main>{children}</main>
      <footer>
        <h6 className="accent-gray-300">NPM Finder 2025 @ireneworks</h6>
      </footer>
    </>
  );
}
