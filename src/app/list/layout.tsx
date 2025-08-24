"use client";
import React from "react";
import PageLayout from "#component/layouts/PageLayout";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return <PageLayout>{children}</PageLayout>;
}
