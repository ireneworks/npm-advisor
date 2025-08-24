import SkeletonBlock from "../skeletonLoading/SkeletonBlock";

export function ListItemSkeleton() {
  return (
    <div className="flex flex-col gap-1.5">
      <SkeletonBlock className="w-40 h-9" />
      <SkeletonBlock className="w-100 h-5" />
      <div className="flex gap-2 mt-2.5">
        <SkeletonBlock className="w-8 h-4.5" />
        <SkeletonBlock className="w-20 h-4.5" />
        <SkeletonBlock className="w-32 h-4.5" />
      </div>
    </div>
  );
}

export function ListSkeletonLoading() {
  return (
    <div className={"flex flex-col gap-8"}>
      {Array.from({ length: 10 }).map((_, index) => (
        <ListItemSkeleton key={index} />
      ))}
    </div>
  );
}
