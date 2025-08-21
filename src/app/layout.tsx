import React, { Suspense } from "react";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Npm Advisor",
  description: "Get advice on which NPM packages might fit your environment.",
  openGraph: {
    title: "Npm Advisor",
    description: "Get advice on which NPM packages might fit your environment.",
    url: "https://npm-advisor.vercel.app/",
    siteName: "Npm Advisor",
    images: [{ url: "https://example.com/og.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased font-[-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif]`}
      >
        <div className="flex flex-col min-h-screen">
          <Suspense fallback={<p>loading</p>}>{children}</Suspense>
          <footer className="bg-gray-50 px-4 pt-4 pb-12 text-gray-500 text-[12px] lg:pt-5 lg:pb-20 lg:px-12">
            <h6>
              <b>NPM Advisor</b> 2025 @ireneworks
            </h6>
            <p>hello@ireneworks.com</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
