import { openAiFetcher } from "#api/swrFetcher";
import useSWRMutation from "swr/mutation";

export function useOpenAiMutation() {
  const { trigger, data, error, isMutating } = useSWRMutation(
    "/api/openai",
    openAiFetcher,
  );

  return {
    trigger,
    data,
    error,
    isLoading: isMutating,
  };
}
