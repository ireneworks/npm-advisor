import SkeletonBlock from "#components/skeletonLoading/SkeletonBlock";

export function ListItemSkeletonLoading() {
  return (
    <div className="flex flex-col gap-1">
      <SkeletonBlock className="w-40 h-4.5" />
      <SkeletonBlock className="w-100 h-4.5" />
      <div className="flex gap-2">
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
        <ListItemSkeletonLoading key={index} />
      ))}
    </div>
  );
}
