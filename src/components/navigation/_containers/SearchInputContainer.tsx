import React, { useCallback, useMemo, useRef, useState } from "react";
import { Input } from "#components/shadcn/input";
import { Button } from "#components/shadcn/button";
import { useRouter } from "next/navigation";
import { useDebounce } from "#hooks/useDebounce";
import { useNpm } from "#hooks/useNpm";
import { INpmSearchResponse } from "#types/model/npmPackage";
import { TNpmApi } from "#types/model/api";
import { DETAIL } from "#constants/navigation";
import AutoFillList from "#components/navigation/_components/AutoFillList";

export default function SearchInputContainer() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);

  const { push } = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedQuery = useDebounce(query, 300);
  const searchKey: TNpmApi | null = useMemo(() => {
    return debouncedQuery.length >= 2
      ? { type: "search", query: debouncedQuery, size: 5 }
      : null;
  }, [debouncedQuery]);

  const { data, error } = useNpm<INpmSearchResponse>(searchKey);

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
        if (highlightIndex >= 0) {
          e.preventDefault();
          onSelect(data.objects[highlightIndex].package.name);
        }
      }
    },
    [data, highlightIndex, onSelect],
  );

  return (
    <div className="relative w-full">
      <div className="flex gap-2">
        <Input
          type="text"
          className="flex-1"
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
        <Button type="button" className="cursor-pointer flex-none">
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
