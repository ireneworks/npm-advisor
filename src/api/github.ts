import { createRequester } from "./config/axiosConfig";

export const githubRequester = createRequester("https://api.github.com/repos");
