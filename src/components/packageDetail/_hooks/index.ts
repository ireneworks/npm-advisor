import { useParams } from "next/navigation";
import { useNpm } from "#hooks/useNpm";
import { INpmDetail } from "#types/model/npmPackage";
import { useGithubReadMe } from "#hooks/useGithubReadMe";
import { useEffect, useMemo } from "react";
import { usePackageDetailStore } from "#components/packageDetail/_stores/usePackageDetailStore";
import {
  detailProcessing,
  readMeProcessing,
} from "#components/packageDetail/_helpers/packageDetailProcessing";

export function useDetailFetcher() {
  const { name } = useParams();
  const packageName = useMemo(() => {
    return decodeURIComponent(name as string);
  }, [name]);

  const { data: detail, isLoading: isLoadingNpm } = useNpm<INpmDetail>({
    type: "detail",
    name: packageName as string,
  });
  const { data: readMe, isLoading: isLoadingGithub } = useGithubReadMe(
    detail ? detail.repository?.url : null,
  );

  const { setDetail, setReadme } = usePackageDetailStore();

  useEffect(() => {
    if (!isLoadingNpm && !isLoadingGithub) {
      setDetail(detailProcessing(detail));
      setReadme(readMeProcessing(String(readMe)));
    }
  }, [detail, isLoadingGithub, isLoadingNpm, readMe, setDetail, setReadme]);
}
