import { useParams } from "next/navigation";
import { useNpm } from "#hooks/useNpm";
import { INpmDetail } from "#types/model/npmPackage";
import { useGithubReadMe } from "#hooks/useGithubReadMe";
import { useEffect, useMemo } from "react";
import {
  packageDetailState,
  usePackageDetailStore,
} from "#components/packageDetail/_stores/usePackageDetailStore";
import {
  detailProcessing,
  readMeProcessing,
} from "#components/packageDetail/_helpers/packageDetailProcessing";
import { useOpenAiMutation } from "#hooks/useOpenAiMutation";
import { IGithubReadMe } from "#types/model/github";

export function useDetailFetcher() {
  const { name } = useParams();
  const packageName = useMemo(() => {
    return decodeURIComponent(name as string);
  }, [name]);

  const { data: detail, isLoading: isLoadingNpm } = useNpm<INpmDetail>({
    type: "detail",
    name: packageName as string,
  });
  const { data: readMe, isLoading: isLoadingGithub } =
    useGithubReadMe<IGithubReadMe>(detail?.repository?.url);

  const { setDetail, setReadme } = usePackageDetailStore();

  useEffect(() => {
    const currentPackageName = decodeURIComponent(name as string);

    if (currentPackageName !== packageName) {
      // Reset detail when package name changes
      setDetail(packageDetailState);
    }
  }, [name, packageName, setDetail]);

  useEffect(() => {
    if (!isLoadingNpm && !isLoadingGithub) {
      setDetail(detailProcessing(detail));
      if (readMe?.content) {
        setReadme(readMeProcessing(readMe.content));
      }
    }
  }, [detail, isLoadingGithub, isLoadingNpm, readMe, setDetail, setReadme]);
}

export function useCheckerFetcher() {
  const { name } = useParams();

  const { trigger, data, isLoading } = useOpenAiMutation();
  const { setCheckerResult, packageName } = usePackageDetailStore();

  useEffect(() => {
    const currentPackageName = decodeURIComponent(name as string);

    if (currentPackageName !== packageName) {
      // Reset checker result when package name changes
      setCheckerResult(undefined);
    }
  }, [name, packageName, setCheckerResult]);

  useEffect(() => {
    if (!isLoading && data) {
      setCheckerResult(data);
    }
  }, [data, isLoading, setCheckerResult]);

  return { trigger, isLoading };
}
