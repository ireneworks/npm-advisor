import React from "react";
import { Card, CardContent } from "#components/shadcn/card";
import { INpmPackage, INpmSearchResponse } from "#types/model/npmPackage";
import { Nullable } from "#types/util/nullable";

interface Props {
  data: Nullable<INpmSearchResponse>;
  onSelect: (packageName: string) => void;
  error: boolean;
  isVisible: boolean;
}

export default function AutoFillList({
  data,
  isVisible,
  onSelect,
  error,
}: Props) {
  if (!isVisible) return null;

  return (
    <Card className="absolute top-full w-full mt-2 p-0 overflow-hidden rounded-md">
      <CardContent className="p-0">
        {error && <p>Please try again.</p>}
        {data ? (
          data.objects.map((item: INpmPackage) => (
            <div
              key={item.package.name}
              className="py-2 px-4 hover:bg-gray-200 cursor-pointer truncate"
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
