import { Github, House } from "lucide-react";
import { Button } from "#components/shadcn/button";
import { usePackageDetailStore } from "#components/packageDetail/_stores/usePackageDetailStore";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { CHECKER } from "#constants/navigation";

export default function PackageDetailContainer() {
  const { push } = useRouter();

  const {
    packageName,
    latestVersion,
    lastUpdated,
    homepageUrl,
    repositoryUrl,
  } = usePackageDetailStore();

  const handleCheckEnvironment = useCallback(() => {
    push(CHECKER + `?package=${packageName}`);
  }, [packageName, push]);

  return (
    <div className="w-1/4 flex-shrink-0">
      {latestVersion && (
        <p>
          <b>Version</b> {latestVersion}
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
      <Button className="cursor-pointer" onClick={handleCheckEnvironment}>
        Check my environment
      </Button>
    </div>
  );
}
