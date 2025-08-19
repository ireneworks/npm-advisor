import { SquareArrowOutUpRight as LinkIcon } from "lucide-react";
import { usePackageDetailStore } from "#components/packageDetail/_stores/usePackageDetailStore";
import DetailTag from "#components/packageDetail/_components/DetailTag";

export default function PackageDetailContainer() {
  const {
    packageName,
    description,
    license,
    latestVersion,
    lastUpdated,
    homepageUrl,
    repositoryUrl,
  } = usePackageDetailStore();

  return (
    <div>
      <h2 className="font-black text-4xl pb-2">{packageName}</h2>
      <p className="mb-5 text-gray-600">{description}</p>
      <div className="flex flex-wrap justify-between max-tablet:flex-col gap-y-3">
        <div className="flex flex-wrap gap-x-2.5 gap-y-0.5 text-sm">
          {latestVersion && (
            <DetailTag label={"Version"} value={latestVersion} />
          )}
          {lastUpdated && (
            <>
              <p className="text-gray-300">|</p>
              <DetailTag label={"Last updated"} value={lastUpdated} />
            </>
          )}
          {license && (
            <>
              <p className="text-gray-300">|</p>
              <DetailTag label={"License"} value={license} />
            </>
          )}
        </div>
        <div className="flex gap-3 text-sm">
          {repositoryUrl && (
            <a href={repositoryUrl} target="_blank" rel="noopener noreferrer">
              <div className="flex items-center gap-1">
                <LinkIcon className="size-4" />
                Repository
              </div>
            </a>
          )}
          {homepageUrl && (
            <a href={homepageUrl} target="_blank" rel="noopener noreferrer">
              <div className="flex items-center gap-1">
                <LinkIcon className="size-4" />
                Website
              </div>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
