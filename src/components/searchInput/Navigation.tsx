import React, { useCallback, useMemo, useRef, useState } from "react";
import { Input } from "#components/ui/input";
import { Button } from "#components/ui/button";
import { useDebounce } from "#hooks/useDebounce";
import { NpmApiType } from "#types/model/api";
import { useNpmSWR } from "#hooks/useNpmSwr";
import { NpmPackage, NpmSearchResponse } from "#types/model/npmPackage";
import { useRouter } from "next/navigation";
import { DETAIL } from "#constants/navigation";
import { Card, CardContent } from "#components/ui/card";

export default function Navigation() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const { push } = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedQuery = useDebounce(query, 300);
  const searchKey: NpmApiType | null = useMemo(() => {
    return debouncedQuery.length >= 2
      ? { type: "search", query: debouncedQuery, size: 5 }
      : null;
  }, [debouncedQuery]);

  const { data, error } = useNpmSWR<NpmSearchResponse>(searchKey);

  const isAutofilled = useMemo(() => {
    return isFocused && query.length >= 2;
  }, [isFocused, query.length]);

  const onClickAutofill = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setQuery("");

      setIsFocused(false);
      inputRef.current?.blur();

      void push(DETAIL);
    },
    [push],
  );

  const onClickLogo = useCallback(() => {
    void push("/");
  }, [push]);

  return (
    <div className="flex p-5 gap-5 items-center">
      <h1
        className="p-0 m-0 cursor-pointer whitespace-nowrap font-bold"
        onClick={onClickLogo}
      >
        NPM Finder
      </h1>
      <div className="relative w-full">
        <div className="flex gap-2 ">
          <Input
            type="text"
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
          <Button type="button">Search</Button>
        </div>
        {isAutofilled && (
          <Card className="absolute top-full w-full mt-2 p-0 overflow-hidden rounded-md">
            <CardContent className="p-0">
              {error && <p>Please try again.</p>}
              {data ? (
                data.objects.map((item: NpmPackage) => (
                  <div
                    key={item.package.name}
                    className="py-2 px-4 hover:bg-gray-200 cursor-pointer truncate"
                    onMouseDown={onClickAutofill}
                  >
                    {item.package.name} — {item.package.description}
                  </div>
                ))
              ) : (
                <p className="py-2 px-4">...</p>
              )}
              {data && !data.total && (
                <p className="py-2 px-4">No results found.</p>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
