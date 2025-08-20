"use client";
import { useMemo, useRef } from "react";
import InfiniteScroll from "#components/infiniteScroll/InfiniteScroll";
import { usePackageSearchListFetcher } from "#components/packageSearchList/_hooks";
import { usePackageSearchListStore } from "#components/packageSearchList/_stores/usePackageSearchListStore";
import { IPackageSearchListItem } from "#components/packageSearchList/packageSearchList.interface";
import ListItem from "#components/packageSearchList/_components/ListItem";
import { useSearchParams } from "next/navigation";
import { ListSkeletonLoading } from "#components/skeletonLoading/ListSkeletonLoading";

export default function PackageSearchListContainer() {
  const query = useSearchParams();
  const debouncedLoadMore = useRef<NodeJS.Timeout | null>(null);

  const searchQuery = useMemo(() => {
    return query.get("q");
  }, [query]);

  const { isLoading, setPage } = usePackageSearchListFetcher(searchQuery);
  const { total, list } = usePackageSearchListStore();

  const loadMore = () => {
    if (!isLoading && list && total > list.length) {
      setPage((prev) => prev + 1);
    }
  };
  const handleLoadMore = () => {
    if (debouncedLoadMore.current) clearTimeout(debouncedLoadMore.current);
    debouncedLoadMore.current = setTimeout(() => {
      loadMore();
    }, 300);
  };

  return (
    <div className="flex flex-col gap-3">
      {total > 0 && (
        <InfiniteScroll callback={handleLoadMore} isLoading={isLoading}>
          {list.map((item: IPackageSearchListItem) => (
            <ListItem
              key={item.packageName}
              packageName={item.packageName}
              description={item.description}
              version={item.version}
              date={item.date}
              monthlyDownloads={item.monthlyDownloads}
            />
          ))}
        </InfiniteScroll>
      )}
      {isLoading && <ListSkeletonLoading />}
      {!isLoading && total === 0 && <p>No Results.</p>}
    </div>
  );
}
