export default function SkeletonBlock({ className }: { className: string }) {
  return (
    <div
      className={`relative overflow-hidden bg-gray-200 rounded ${className}`}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, rgba(156,163,175,0) 0%, rgba(156,163,175,0.6) 50%, rgba(156,163,175,0) 100%)",
          backgroundSize: "200% 100%",
          animation: "skeleton 3s infinite linear",
        }}
      />
    </div>
  );
}
