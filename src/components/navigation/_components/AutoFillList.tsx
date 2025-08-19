import React from "react";
import { Card, CardContent } from "#components/shadcn/card";
import { INpmPackage, INpmSearchResponse } from "#types/model/npmPackage";
import { Nullable } from "#types/util/nullable";

interface Props {
  data: Nullable<INpmSearchResponse<INpmPackage>>;
  onSelect: (packageName: string) => void;
  error: boolean;
  isVisible: boolean;
  highlightIndex: number;
}

export default function AutoFillList({
  data,
  isVisible,
  onSelect,
  error,
  highlightIndex,
}: Props) {
  if (!isVisible) return null;

  return (
    <Card className="absolute top-full w-full mt-2 p-0 overflow-hidden rounded-md">
      <CardContent className="p-0">
        {error && <p>Please try again.</p>}
        {data ? (
          data.objects.map((item: INpmPackage, index: number) => (
            <div
              key={item.package.name}
              className={`py-2 px-4 cursor-pointer truncate ${
                index === highlightIndex ? "bg-gray-200" : "hover:bg-gray-200"
              }`}
              onMouseDown={() => onSelect(item.package.name)}
            >
              {item.package.name} — {item.package.description}
            </div>
          ))
        ) : (
          <p className="py-2 px-4">· · ·</p>
        )}
        {data && !data.total && <p className="py-2 px-4">No results found.</p>}
      </CardContent>
    </Card>
  );
}
