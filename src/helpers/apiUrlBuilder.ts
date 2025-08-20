import { TNpmApi } from "#types/model/api";
import { npmSortValues } from "#constants/npmSort";

export function buildNpmUrl(api: TNpmApi): string {
  switch (api.type) {
    case "search": {
      const sort = api.sort;
      let url = `/-/v1/search?text=${api.query}&size=${api.size ?? 10}&from=0`;

      if (sort && sort !== "relevant") {
        const { quality, popularity, maintenance } = npmSortValues[sort];
        const scoreParam = `quality:${quality},popularity:${popularity},maintenance:${maintenance}`;
        url += `&score=${encodeURIComponent(scoreParam)}`;
      }

      return url;
    }
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

export function buildGithubRepositoryUrl(url?: string): string | null {
  if (!url) return null;

  let cleanUrl = url.trim();

  if (cleanUrl.startsWith("git+")) {
    cleanUrl = cleanUrl.replace(/^git\+/, "");
  }

  if (cleanUrl.startsWith("git@")) {
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
