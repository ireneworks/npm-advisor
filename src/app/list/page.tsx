"use client";
import PageLayout from "#components/layouts/PageLayout";
import PackageSearchListContainer from "#components/packageSearchList/_containers/PackageSearchListContainer";
import { Suspense } from "react";
import { ListSkeletonLoading } from "#components/skeletonLoading/ListSkeletonLoading";

export default function ListPage() {
  return (
    <PageLayout>
      <div className="flex-col gap-7 pt-6 pb-24 px-12">
        <h1 className="font-black text-2xl mb-6">Result</h1>
        <Suspense fallback={<ListSkeletonLoading />}>
          <PackageSearchListContainer />
        </Suspense>
      </div>
    </PageLayout>
  );
}
