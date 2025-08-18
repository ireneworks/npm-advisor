"use client";
import PageLayout from "#components/layouts/PageLayout";
import ReadMeContainer from "#components/packageDetail/_containers/ReadMeContainer";
import PackageDetailContainer from "#components/packageDetail/_containers/PackageDetailContainer";
import { useDetailFetcher } from "#components/packageDetail/_hooks";

export default function Page() {
  useDetailFetcher();

  return (
    <PageLayout>
      <div className="pt-6 pb-24 px-12 flex max-tablet:flex-col gap-7">
        <ReadMeContainer />
        <PackageDetailContainer />
      </div>
    </PageLayout>
  );
}
