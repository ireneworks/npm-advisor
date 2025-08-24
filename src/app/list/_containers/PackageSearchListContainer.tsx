"use client";
import { useRef } from "react";
import InfiniteScroll from "#component/infiniteScroll/InfiniteScroll";
import { usePackageSearchListFetcher } from "../_hooks";
import { usePackageSearchListStore } from "../_stores/usePackageSearchListStore";
import { IPackageSearchListItem } from "../;ist.interface";
import ListItem from "../_components/ListItem";
import { ListSkeletonLoading } from "#component/skeletonLoading/ListSkeletonLoading";
import useSearchQuery from "#hook/useSearchQuery";

export default function PackageSearchListContainer() {
  const { query } = useSearchQuery();

  const debouncedLoadMore = useRef<NodeJS.Timeout | null>(null);

  const { isLoading, setPage } = usePackageSearchListFetcher(query);
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
