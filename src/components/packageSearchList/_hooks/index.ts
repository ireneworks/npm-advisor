import { usePackageSearchListStore } from "#components/packageSearchList/_stores/usePackageSearchListStore";
import { useSearchParams } from "next/navigation";
import { useNpm } from "#hooks/useNpm";
import { INpmSearchResponse, INpmSearchResult } from "#types/model/npmPackage";
import { REQUEST_SIZE } from "#components/packageSearchList/packageSearchList.constant";
import { useEffect, useState } from "react";
import { packageSearchListProcessing } from "#components/packageSearchList/_helpers/packageSearchListProcessing";

export function usePackageSearchListFetcher() {
  const [page, setPage] = useState(1);

  const query = useSearchParams();

  const { setSearchList } = usePackageSearchListStore();

  const { data, isLoading } = useNpm<INpmSearchResponse<INpmSearchResult>>({
    type: "search",
    size: page * REQUEST_SIZE,
    query: query.get("q"),
    offset: 0,
  });

  useEffect(() => {
    if (!isLoading && data) {
      setSearchList(packageSearchListProcessing(data));
    }
  }, [data, isLoading, setSearchList]);

  return { setPage, isLoading };
}
