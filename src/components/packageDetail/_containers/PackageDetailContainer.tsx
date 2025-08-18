import { Github, House } from "lucide-react";
import { Button } from "#components/ui/button";
import { usePackageDetailStore } from "#components/packageDetail/_stores/usePackageDetailStore";

export default function PackageDetailContainer() {
  const { latestVersion, lastUpdated, homepageUrl, repositoryUrl } =
    usePackageDetailStore();

  return (
    <div className="w-1/4 flex-shrink-0">
      {latestVersion && (
        <p>
          <b>Latest version</b> {latestVersion}
        </p>
      )}
      {lastUpdated && (
        <p>
          <b>Last updated</b> {lastUpdated}
        </p>
      )}
      {repositoryUrl && (
        <a href={repositoryUrl} target="_blank" rel="noopener noreferrer">
          <div className="flex pr-2">
            <Github />
            Repository
          </div>
        </a>
      )}
      {homepageUrl && (
        <a href={homepageUrl} target="_blank" rel="noopener noreferrer">
          <div className="flex pr-2">
            <House />
            Website
          </div>
        </a>
      )}
      <Button className="cursor-pointer">Check my environment</Button>
    </div>
  );
}
