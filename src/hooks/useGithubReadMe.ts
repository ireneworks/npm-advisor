import { buildGithubReadMeUrl } from "#helpers/urlBuilder";
import useSWR from "swr";
import { githubReadMeFetcher } from "#apis/swrFetcher";

export function useGithubReadMe<T>(url: string | null) {
  const key = url ? buildGithubReadMeUrl(url) : null;

  const { data, error, isValidating } = useSWR<T>(key, githubReadMeFetcher);

  return {
    data,
    error,
    isLoading: isValidating,
  };
}
