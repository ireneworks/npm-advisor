import {
  packageSearchListState,
  usePackageSearchListStore,
} from "#components/packageSearchList/_stores/usePackageSearchListStore";
import { useNpm } from "#hooks/useNpm";
import { INpmSearchResponse, INpmSearchResult } from "#types/model/npmPackage";
import { REQUEST_SIZE } from "#components/packageSearchList/packageSearchList.constant";
import { useEffect, useState } from "react";
import { packageSearchListProcessing } from "#components/packageSearchList/_helpers/packageSearchListProcessing";
import { Nullable } from "#types/util/nullable";

export function usePackageSearchListFetcher(query: Nullable<string>) {
  const [page, setPage] = useState(1);

  const { setSearchList } = usePackageSearchListStore();

  const { data, isLoading } = useNpm<INpmSearchResponse<INpmSearchResult>>({
    type: "search",
    size: page * REQUEST_SIZE,
    query: query,
    offset: 0,
  });

  useEffect(() => {
    if (!isLoading && data) {
      setSearchList(packageSearchListProcessing(data));
    }
  }, [data, isLoading, setSearchList]);

  useEffect(() => {
    return () => {
      setSearchList(packageSearchListState);
    };
  }, [setSearchList]);

  return { setPage, isLoading };
}
