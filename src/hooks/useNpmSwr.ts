import useSWR from "swr";
import { NpmApiType } from "#types/model/api";
import { buildNpmUrl } from "#helpers/npmUrlBuilder";
import { npmFetcher } from "#apis/configs/swrConfig";

export function useNpmSWR<T>(api: NpmApiType | null) {
  const key = api ? buildNpmUrl(api) : null;

  const { data, error, isValidating } = useSWR<T>(key, npmFetcher);

  return {
    data,
    error,
    isLoading: isValidating,
  };
}
