import React, { Suspense } from "react";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Npm Advisor",
  description: "Get advice on which NPM packages might fit your environment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Suspense fallback={<p>loading</p>}>{children}</Suspense>
      </body>
    </html>
  );
}
