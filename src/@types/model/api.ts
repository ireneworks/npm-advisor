export type TNpmApi =
  | { type: "search"; query: string; size?: number }
  | { type: "detail"; name: string };
