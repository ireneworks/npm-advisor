"use client";
import PageLayout from "#components/layouts/PageLayout";
import PackageSearchListContainer from "#components/packageSearchList/_containers/PackageSearchListContainer";
import { Suspense } from "react";
import { ListSkeletonLoading } from "#components/skeletonLoading/ListSkeletonLoading";

export default function ListPage() {
  return (
    <PageLayout>
      <div className="flex-col pt-4 pb-12 px-4 lg:pt-6 lg;pb-24 lg:px-12">
        <h1 className="text-gray-900 font-bold text-lg mb-4 lg:text-2xl lg:mb-6">
          Result
        </h1>
        <Suspense fallback={<ListSkeletonLoading />}>
          <PackageSearchListContainer />
        </Suspense>
      </div>
    </PageLayout>
  );
}
