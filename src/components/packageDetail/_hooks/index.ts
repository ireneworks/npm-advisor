import { useEffect } from "react";
import { useNpm } from "#hooks/useNpm";
import { INpmDetail } from "#types/model/npmPackage";
import { useGithubReadMe } from "#hooks/useGithubReadMe";
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

export function useDetailFetcher(packageName: string) {
  const { data: detail, isLoading: isLoadingNpm } = useNpm<INpmDetail>({
    type: "detail",
    name: packageName as string,
  });
  const {
    data: readMe,
    isLoading: isLoadingGithub,
    error,
  } = useGithubReadMe<IGithubReadMe>(detail?.repository?.url);

  const { setDetail, setReadme } = usePackageDetailStore();

  useEffect(() => {
    if (!isLoadingNpm && !isLoadingGithub) {
      setDetail(detailProcessing(detail));
      if (readMe?.content && !error) {
        setReadme(readMeProcessing(readMe.content));
      }
    }
  }, [
    detail,
    error,
    isLoadingGithub,
    isLoadingNpm,
    readMe,
    setDetail,
    setReadme,
  ]);

  useEffect(() => {
    return () => {
      setDetail(packageDetailState);
    };
  }, [packageName, setDetail]);
}

export function useCheckerFetcher(packageName: string) {
  const { trigger, data, isLoading } = useOpenAiMutation();
  const { setCheckerResult } = usePackageDetailStore();

  useEffect(() => {
    if (!isLoading && data) {
      setCheckerResult(data);
    }
  }, [data, isLoading, setCheckerResult]);

  useEffect(() => {
    return () => {
      setCheckerResult(undefined);
    };
  }, [packageName, setCheckerResult]);

  return { trigger, isLoading };
}
