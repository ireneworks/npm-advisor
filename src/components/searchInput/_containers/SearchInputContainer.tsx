"use client";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Input } from "#components/shadcn/input";
import { Button } from "#components/shadcn/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "#hooks/useDebounce";
import { useNpm } from "#hooks/useNpm";
import { INpmPackage, INpmSearchResponse } from "#types/model/npmPackage";
import { TNpmApi } from "#types/model/api";
import { DETAIL, LIST } from "#constants/navigation";
import AutoFillList from "#components/searchInput/_components/AutoFillList";

export default function SearchInputContainer() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);

  const { push } = useRouter();
  const path = usePathname();
  const searchParam = useSearchParams();

  const searchQuery = useMemo(() => {
    return decodeURIComponent(searchParam.get("q"));
  }, [searchParam]);

  const isSearchListPage = useMemo(() => {
    return path === LIST;
  }, [path]);

  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedQuery = useDebounce(query, 300);
  const searchKey: TNpmApi | null = useMemo(() => {
    return debouncedQuery.length >= 2
      ? { type: "search", query: debouncedQuery, size: 5 }
      : null;
  }, [debouncedQuery]);

  const { data, error } = useNpm<INpmSearchResponse<INpmPackage>>(searchKey);

  const isAutofilled = useMemo(() => {
    return isFocused && query.length >= 2;
  }, [isFocused, query.length]);

  const onSelect = useCallback(
    (packageName: string) => {
      setQuery("");
      setIsFocused(false);
      inputRef.current?.blur();
      void push(DETAIL + "/" + encodeURIComponent(packageName));
    },
    [push],
  );

  const onClickSearch = useCallback(() => {
    void push(LIST + "?q=" + encodeURIComponent(query));
  }, [push, query]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!data || !data.objects.length) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightIndex((prev) =>
          prev < data.objects.length - 1 ? prev + 1 : 0,
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightIndex((prev) =>
          prev > 0 ? prev - 1 : data.objects.length - 1,
        );
      } else if (e.key === "Enter") {
        e.preventDefault();

        if (highlightIndex >= 0) {
          onSelect(data.objects[highlightIndex].package.name);
        } else {
          setIsFocused(false);
          inputRef.current.blur();
          onClickSearch();
        }
      }
    },
    [data, highlightIndex, onClickSearch, onSelect],
  );

  useEffect(() => {
    if (isSearchListPage) {
      setQuery(searchQuery);
    }
  }, [isSearchListPage, searchQuery]);

  return (
    <div className="relative w-full">
      <div className="flex gap-2">
        <Input
          type="text"
          className="selection:bg-gray-200 selection:text-gray-900 text-sm flex-1 text-gray-900 rounded-sm focus-visible:ring-gray-100 placeholder:text-sm lg:placeholder:text-base placeholder:text-gray-400 lg:text-base lg:h-13"
          ref={inputRef}
          placeholder="Enter NPM package"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() =>
            setTimeout(() => {
              setIsFocused(false);
            }, 100)
          }
          onKeyDown={handleKeyDown}
        />
        <Button
          type="button"
          className="bg-indigo-500 hover:bg-indigo-700 rounded-sm cursor-pointer flex-none text-sm lg:text-base lg:h-13 lg:w-30"
          onClick={onClickSearch}
        >
          Search
        </Button>
      </div>
      <AutoFillList
        data={data}
        onSelect={onSelect}
        isVisible={isAutofilled}
        error={error}
        highlightIndex={highlightIndex}
      />
    </div>
  );
}
