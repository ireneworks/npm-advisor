import { CommonResponse } from "#types/util/request";
import { npmRequester } from "#apis/npm";
import { githubRequester } from "#apis/github";
import { openAiRequester } from "#apis/openai";

export const npmFetcher = async <T>(url: string): Promise<T> => {
  try {
    const res: CommonResponse<T> = await npmRequester.get(url);
    return res.data;
  } catch (error) {
    console.error("Fetcher error:", error);
    throw error;
  }
};

export const githubReadMeFetcher = async <T>(url: string): Promise<T> => {
  try {
    const res: CommonResponse<T> = await githubRequester.get(url);
    return res.data;
  } catch (error) {
    console.error("Fetcher error:", error);
    throw error;
  }
};

export async function openAiFetcher(
  _key: string,
  { arg }: { arg: { prompt: string } },
) {
  const res = await openAiRequester.post("", arg);
  return res.data;
}
