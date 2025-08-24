import { SquareArrowOutUpRight as LinkIcon } from "lucide-react";
import { usePackageDetailStore } from "../../packageDetail/_stores/usePackageDetailStore";
import DetailTag from "../../packageDetail/_components/DetailTag";

function A() {
  const { packageName, description } = usePackageDetailStore();

  return (
    <>
      <h2 className="font-black text-4xl pb-2.5">{packageName}</h2>
      <p className="mb-7 text-gray-600 lg:mb-12">{description}</p>
    </>
  );
}

function B() {
  const { license, latestVersion, lastUpdated, homepageUrl, repositoryUrl } =
    usePackageDetailStore();

  return (
    <>
      {latestVersion && <DetailTag label={"Version"} value={latestVersion} />}
      {lastUpdated && <DetailTag label={"Last updated"} value={lastUpdated} />}
      {license && <DetailTag label={"License"} value={license} />}
      {repositoryUrl && (
        <a href={repositoryUrl} target="_blank" rel="noopener noreferrer">
          <div className="flex items-center gap-2 text-gray-800 mt-4">
            <LinkIcon className="size-4" />
            Repository
          </div>
        </a>
      )}
      {homepageUrl && (
        <a href={homepageUrl} target="_blank" rel="noopener noreferrer">
          <div className="flex items-center gap-2 text-gray-800">
            <LinkIcon className="size-4" />
            Website
          </div>
        </a>
      )}
    </>
  );
}

const PackageDetailContainer = { A, B };

export default PackageDetailContainer;
