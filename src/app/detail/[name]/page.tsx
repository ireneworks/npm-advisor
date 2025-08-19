"use client";
import { useMemo } from "react";
import PageLayout from "#components/layouts/PageLayout";
import PackageDetailContainer from "#components/packageDetail/_containers/PackageDetailContainer";
import { useDetailFetcher } from "#components/packageDetail/_hooks";
import MarkdownRenderer from "#components/packageDetail/_components/MarkdownRenderer";
import { usePackageDetailStore } from "#components/packageDetail/_stores/usePackageDetailStore";
import { Separator } from "#components/shadcn/separator";
import CheckerContainer from "#components/packageDetail/_containers/CheckerContainer";

export default function Page() {
  useDetailFetcher();
  const { readMe } = usePackageDetailStore();

  const isVisible = useMemo(() => {
    return (
      typeof readMe === "string" &&
      readMe.trim() !== "" &&
      readMe.trim() !== "undefined"
    );
  }, [readMe]);

  return (
    <PageLayout>
      <div className="flex-col gap-7 pt-6 pb-24 px-12">
        <PackageDetailContainer />
        <CheckerContainer />
        {isVisible && (
          <>
            <Separator />
            <MarkdownRenderer content={readMe} />
          </>
        )}
      </div>
    </PageLayout>
  );
}
