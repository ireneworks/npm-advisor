import useSWR from "swr";
import { buildNpmUrl } from "#helper/apiUrlBuilder";
import { npmFetcher } from "#api/swrFetcher";
import { TNpmApiRequest } from "#type/model/api";

// TODO T name change
export function useNpm<T>(api: TNpmApiRequest | null) {
  const key = api ? buildNpmUrl(api) : null;
  const { data, error, isValidating } = useSWR<T>(key, npmFetcher);

  return {
    data,
    error,
    isLoading: isValidating,
  };
}
