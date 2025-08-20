import { TNpmApi } from "#types/model/api";

export function buildNpmUrl(api: TNpmApi): string {
  switch (api.type) {
    case "search":
      return `/-/v1/search?text=${api.query}&size=${api.size ?? 5}&from=${0}`;
    case "detail":
      return `/${api.name}`;
    default:
      throw new Error("Unknown API type");
  }
}

export function buildGithubReadMeUrl(url: string): string {
  let match = url.match(/github\.com\/([^/]+)\/([^/]+?)(\.git)?$/);
  if (match) {
    const [, owner, repo] = match;
    return `${owner}/${repo}/readme`;
  }

  match = url.match(/git@github\.com:([^/]+)\/([^/]+?)(\.git)?$/);
  if (match) {
    const [, owner, repo] = match;
    return `${owner}/${repo}/readme`;
  }

  return null;
}

export function buildRepositoryUrl(url?: string): string | null {
  if (!url) return null;

  let cleanUrl = url.trim();

  if (cleanUrl.startsWith("git+")) {
    cleanUrl = cleanUrl.replace(/^git\+/, "");
  }

  if (cleanUrl.startsWith("git@")) {
    // git@github.com:user/repo.git → github.com/user/repo.git
    cleanUrl = cleanUrl.replace("git@", "").replace(":", "/");
    cleanUrl = `https://${cleanUrl}`;
  }

  cleanUrl = cleanUrl.replace(/\.git$/, "");

  if (cleanUrl.startsWith("ssh://")) {
    cleanUrl = cleanUrl.replace(/^ssh:\/\//, "https://");
  }

  if (!cleanUrl.startsWith("http")) {
    cleanUrl = `https://${cleanUrl}`;
  }

  return cleanUrl;
}
