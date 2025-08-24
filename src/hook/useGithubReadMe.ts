import { buildGithubReadMeUrl } from "#helper/apiUrlBuilder";
import useSWR from "swr";
import { githubReadMeFetcher } from "#api/swrFetcher";

export function useGithubReadMe<T>(url: string | null) {
  const key = url ? buildGithubReadMeUrl(url) : null;

  const { data, error, isValidating } = useSWR<T>(key, githubReadMeFetcher, {
    onError: () => {}, // TODO error handling
  });

  return {
    data,
    error,
    isLoading: isValidating,
  };
}
