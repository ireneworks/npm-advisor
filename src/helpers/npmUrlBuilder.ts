import { NpmApiType } from "#types/model/api";

export function buildNpmUrl(api: NpmApiType): string {
  switch (api.type) {
    case "search":
      return `/-/v1/search?text=${api.query}&size=${api.size ?? 5}`;
    case "detail":
      return `/${api.name}`;
    default:
      throw new Error("Unknown API type");
  }
}
