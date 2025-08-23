"use client";
import { Suspense, useMemo } from "react";
import { useParams } from "next/navigation";
import PackageDetailContainer from "#components/packageDetail/_containers/PackageDetailContainer";
import { useDetailFetcher } from "#components/packageDetail/_hooks";
import MarkdownRenderer from "#components/packageDetail/_components/MarkdownRenderer";
import { usePackageDetailStore } from "#components/packageDetail/_stores/usePackageDetailStore";
import CheckerContainer from "#components/packageDetail/_containers/CheckerContainer";
import DetailLayout from "#components/layouts/DetailLayout";
import Divider from "#components/base/Divider";

export default function DetailPage() {
  const { name } = useParams();
  const packageName = useMemo(() => {
    return decodeURIComponent(name as string);
  }, [name]);

  useDetailFetcher(packageName);
  const { readMe } = usePackageDetailStore();

  return (
    <Suspense fallback={<h1>loading</h1>}>
      <div className="flex flex-col pt-6 px-4 pb-15 lg:gap-7 lg:pt-6 lg:pb-24 lg:px-12">
        <DetailLayout>
          {{
            a: <PackageDetailContainer.A />,
            b: <CheckerContainer packageName={packageName} />,
            c: <PackageDetailContainer.B />,
          }}
        </DetailLayout>
        {readMe && (
          <>
            <Divider />
            <MarkdownRenderer content={readMe} />
          </>
        )}
      </div>
    </Suspense>
  );
}
