export type TNpmApi =
  | { type: "search"; query: string; size?: number; offset?: number }
  | { type: "detail"; name: string };
