import { useEffect } from "react";
import { useNpm } from "#hook/useNpm";
import { useGithubReadMe } from "#hook/useGithubReadMe";
import {
  packageDetailState,
  usePackageDetailStore,
} from "../_store/usePackageDetailStore";
import {
  detailProcessing,
  readMeProcessing,
} from "../_service/packageDetailProcessing";
import { useOpenAiMutation } from "#hook/useOpenAiMutation";
import { INpmDetail } from "#type/model/npmPackage";
import { IGithubReadMe } from "#type/model/github";

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
