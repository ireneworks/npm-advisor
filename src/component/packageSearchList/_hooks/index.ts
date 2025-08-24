import {
  packageSearchListState,
  usePackageSearchListStore,
} from "../../packageSearchList/_stores/usePackageSearchListStore";
import { useNpm } from "../../../hook/useNpm";
import { INpmSearchResponse, INpmSearchResult } from "#types/model/npmPackage";
import { REQUEST_SIZE } from "../../packageSearchList/packageSearchList.constant";
import { useEffect, useState } from "react";
import { packageSearchListProcessing } from "../../packageSearchList/_helpers/packageSearchListProcessing";
import { Nullable } from "#types/util/nullable";

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
