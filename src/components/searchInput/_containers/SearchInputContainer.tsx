"use client";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useDebounce } from "#hooks/useDebounce";
import { useNpm } from "#hooks/useNpm";
import useSearchQuery from "#hooks/useSearchQuery";
import { INpmPackage, INpmSearchResponse } from "#types/model/npmPackage";
import { TNpmApi } from "#types/model/api";
import { DETAIL } from "#constants/navigation";
import AutoFillList from "#components/searchInput/_components/AutoFillList";
import Button from "#components/base/Button";
import Input from "#components/base/Input";

export default function SearchInputContainer() {
  const [isFocused, setIsFocused] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const { query, setQuery, updateUrlSearchQuery } = useSearchQuery();

  const { push } = useRouter();
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
    [push, setQuery],
  );

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
          updateUrlSearchQuery();
        }
      }
    },
    [data, highlightIndex, onSelect, updateUrlSearchQuery],
  );

  return (
    <div className="relative w-full">
      <div className="flex gap-2">
        <Input
          type="text"
          className="selection:bg-gray-200 selection:text-gray-900 text-sm flex-1 text-gray-900 rounded-sm focus-visible:ring-gray-100 placeholder:text-sm lg:placeholder:text-base placeholder:text-gray-400 lg:text-base lg:h-13 lg:px-4.5"
          ref={inputRef}
          placeholder="Enter npm package"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
        />
        <Button
          type="button"
          size={"lg"}
          className="lg:text-base lg:h-13 lg:w-30"
          onClick={updateUrlSearchQuery}
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
