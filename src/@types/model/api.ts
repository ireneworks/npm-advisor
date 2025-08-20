export type TNpmApi =
  | {
      type: "search";
      query: string;
      size?: number;
      offset?: number;
      sort?: "relevant" | "popular" | "updated";
    }
  | { type: "detail"; name: string };
