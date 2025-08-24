import useSWR from "swr";
import { buildNpmUrl } from "../service/apiUrlBuilder";
import { npmFetcher } from "#api/swrFetcher";
import { TNpmApiRequest } from "#type/model/api";

export function useNpm<T>(api: TNpmApiRequest | null) {
  const key = api ? buildNpmUrl(api) : null;
  const { data, error, isValidating } = useSWR<T>(key, npmFetcher);

  return {
    data,
    error,
    isLoading: isValidating,
  };
}
