"use client";
import PageLayout from "#components/layouts/PageLayout";
import PackageDetailContainer from "#components/packageDetail/_containers/PackageDetailContainer";
import { useDetailFetcher } from "#components/packageDetail/_hooks";
import MarkdownRenderer from "#components/packageDetail/_components/MarkdownRenderer";
import { usePackageDetailStore } from "#components/packageDetail/_stores/usePackageDetailStore";
import { useMemo } from "react";

export default function Page() {
  useDetailFetcher();
  const { packageName, readMe } = usePackageDetailStore();

  const isVisible = useMemo(() => {
    return (
      typeof readMe === "string" &&
      readMe.trim() !== "" &&
      readMe.trim() !== "undefined"
    );
  }, [readMe]);

  return (
    <PageLayout>
      <div className="flex gap-7 pt-6 pb-24 px-12 ">
        <div className="flex-1 min-w-0">
          <div>
            <h2 className="font-black text-4xl pb-2">{packageName}</h2>
          </div>
          <PackageDetailContainer />
          {isVisible && <MarkdownRenderer content={readMe} />}
        </div>
      </div>
    </PageLayout>
  );
}
