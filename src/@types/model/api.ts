export type NpmApiType =
  | { type: "search"; query: string; size?: number }
  | { type: "detail"; name: string };
