import {
  packageSearchListState,
  usePackageSearchListStore,
} from "../_store/usePackageSearchListStore";
import { useNpm } from "#hook/useNpm";
import { REQUEST_SIZE } from "../list.constant";
import { useEffect, useState } from "react";
import { packageSearchListProcessing } from "../_service/packageSearchListProcessing";
import { Nullable } from "#type/utility/nullable";
import { INpmSearchResponse, INpmSearchResult } from "#type/model/npmPackage";

export function usePackageSearchListFetcher(query: Nullable<string>) {
  const [page, setPage] = useState(1);

  const { setSearchList } = usePackageSearchListStore();

  const { data, isLoading } = useNpm<INpmSearchResponse<INpmSearchResult>>({
    type: "search",
    size: page * REQUEST_SIZE,
    query: query,
    offset: 0,
    sort: "relevant",
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
