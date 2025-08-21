import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { LIST } from "#constants/navigation";

export default function useSearchQuery() {
  const [query, setQuery] = useState("");

  const { push } = useRouter();
  const currentPath = usePathname();
  const searchParam = useSearchParams();

  const updateUrlSearchQuery = useCallback(() => {
    void push(LIST + "?q=" + encodeURIComponent(query));
  }, [push, query]);

  useEffect(() => {
    const newQuery =
      currentPath === LIST ? decodeURIComponent(searchParam.get("q")) : "";

    setQuery(newQuery);
  }, [currentPath, searchParam]);

  return { query, setQuery, updateUrlSearchQuery };
}
