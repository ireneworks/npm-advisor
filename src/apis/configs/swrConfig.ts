import { CommonResponse } from "#types/util/request";
import { npmRequester } from "#apis/configs/axiosConfig";

export const npmFetcher = async <T>(url: string): Promise<T> => {
  try {
    const res: CommonResponse<T> = await npmRequester.get(url);
    return res.data;
  } catch (error) {
    console.error("Fetcher error:", error);
    throw error;
  }
};
