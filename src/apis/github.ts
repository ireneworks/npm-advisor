import { createRequester } from "#apis/configs/axiosConfig";

export const githubRequester = createRequester("https://api.github.com/repos");
