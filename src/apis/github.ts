import { createRequester } from "#apis/configs/axiosConfig";

export const githubRequester = createRequester(
  "https://raw.githubusercontent.com",
);
