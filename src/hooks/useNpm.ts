import useSWR from "swr";
import { TNpmApi } from "#types/model/api";
import { buildNpmUrl } from "#helpers/apiUrlBuilder";
import { npmFetcher } from "#apis/swrFetcher";

export function useNpm<T>(api: TNpmApi | null) {
  const key = api ? buildNpmUrl(api) : null;
  const { data, error, isValidating } = useSWR<T>(key, npmFetcher);

  return {
    data,
    error,
    isLoading: isValidating,
  };
}
