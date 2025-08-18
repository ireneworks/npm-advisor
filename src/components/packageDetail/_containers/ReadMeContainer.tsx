import MarkdownRenderer from "#components/packageDetail/_components/MarkdownRenderer";
import { usePackageDetailStore } from "#components/packageDetail/_stores/usePackageDetailStore";

export default function ReadMeContainer() {
  const { packageName, readMe } = usePackageDetailStore();

  return (
    <div className="flex-1 min-w-0">
      <div>
        <h2 className="font-black text-4xl pb-2">{packageName}</h2>
      </div>
      {readMe && <MarkdownRenderer content={readMe} />}
    </div>
  );
}
