import React, { useCallback, useMemo, useRef, useState } from "react";
import { Input } from "#components/ui/input";
import { Button } from "#components/ui/button";
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
      void push(DETAIL + "/" + packageName);
    },
    [push],
  );

  return (
    <div className="relative w-full">
      <div className="flex gap-2">
        <Input
          type="text"
          className="flex-1"
          placeholder="Enter open source package"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() =>
            setTimeout(() => {
              setIsFocused(false);
            }, 100)
          }
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
      />
    </div>
  );
}
