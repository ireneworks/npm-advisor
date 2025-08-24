import useSWR from "swr";
import { TNpmApi } from "#types/model/api";
import { buildNpmUrl } from "../helper/apiUrlBuilder";
import { npmFetcher } from "../api/swrFetcher";

// TODO T name change
export function useNpm<T>(api: TNpmApi | null) {
  const key = api ? buildNpmUrl(api) : null;
  const { data, error, isValidating } = useSWR<T>(key, npmFetcher);

  return {
    data,
    error,
    isLoading: isValidating,
  };
}
