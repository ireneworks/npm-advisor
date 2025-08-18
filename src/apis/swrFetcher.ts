import { CommonResponse } from "#types/util/request";
import { npmRequester } from "#apis/npm";
import { githubRequester } from "#apis/github";

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
