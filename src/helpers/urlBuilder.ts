import { TNpmApi } from "#types/model/api";

export function buildNpmUrl(api: TNpmApi): string {
  switch (api.type) {
    case "search":
      return `/-/v1/search?text=${api.query}&size=${api.size ?? 5}`;
    case "detail":
      return `/${api.name}`;
    default:
      throw new Error("Unknown API type");
  }
}

export function buildGithubReadMeUrl(
  repo: string,
  branch: string = "main",
): string {
  if (repo.startsWith("git+")) {
    repo = repo.slice(4);
  }

  if (repo.startsWith("git@")) {
    repo = repo.replace("git@", "https://");
    repo = repo.replace(":", "/");
  }

  if (repo.endsWith(".git")) {
    repo = repo.slice(0, -4);
  }

  if (repo.includes("github.com")) {
    const [, owner, name] =
      repo.match(/github\.com[:/](.+?)\/(.+?)(?:$|\/)/) || [];
    if (owner && name) {
      return `/${owner}/${name}/${branch}/README.md`;
    }
  }

  throw new Error(`Unsupported repo format: ${repo}`);
}
