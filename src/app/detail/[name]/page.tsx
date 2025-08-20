"use client";
import { Suspense, useMemo } from "react";
import { useParams } from "next/navigation";
import PageLayout from "#components/layouts/PageLayout";
import PackageDetailContainer from "#components/packageDetail/_containers/PackageDetailContainer";
import { useDetailFetcher } from "#components/packageDetail/_hooks";
import MarkdownRenderer from "#components/packageDetail/_components/MarkdownRenderer";
import { usePackageDetailStore } from "#components/packageDetail/_stores/usePackageDetailStore";
import { Separator } from "#components/shadcn/separator";
import CheckerContainer from "#components/packageDetail/_containers/CheckerContainer";

export default function DetailPage() {
  const { name } = useParams();
  const packageName = useMemo(() => {
    return decodeURIComponent(name as string);
  }, [name]);

  useDetailFetcher(packageName);
  const { readMe } = usePackageDetailStore();

  return (
    <PageLayout>
      <Suspense fallback={<h1>loading</h1>}>
        <div className="flex-col gap-7 pt-6 pb-24 px-12">
          <PackageDetailContainer />
          <CheckerContainer packageName={packageName} />
          {readMe && (
            <>
              <Separator />
              <MarkdownRenderer content={readMe} />
            </>
          )}
        </div>
      </Suspense>
    </PageLayout>
  );
}
