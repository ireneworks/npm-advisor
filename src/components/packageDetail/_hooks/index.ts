import { useParams } from "next/navigation";
import { useNpmSWR } from "#hooks/useNpmSwr";
import { INpmDetail } from "#types/model/npmPackage";
import { useGithubReadMeSWR } from "#hooks/useGithubReadMeSWR";
import { useEffect } from "react";
import { usePackageDetailStore } from "#components/packageDetail/_stores/usePackageDetailStore";
import {
  detailProcessing,
  readMeProcessing,
} from "#components/packageDetail/_helpers/detailProcessing";

export function useDetailFetcher() {
  const { name: packageName } = useParams();

  const { data: detail, isLoading: isLoadingNpm } = useNpmSWR<INpmDetail>({
    type: "detail",
    name: packageName as string,
  });
  const { data: readMe, isLoading: isLoadingGithub } = useGithubReadMeSWR(
    detail ? detail.repository.url : null,
  );

  const { setDetail, setReadme } = usePackageDetailStore();

  useEffect(() => {
    if (!isLoadingNpm && !isLoadingGithub) {
      setDetail(detailProcessing(detail));
      setReadme(readMeProcessing(String(readMe)));
    }
  }, [detail, isLoadingGithub, isLoadingNpm, readMe, setDetail, setReadme]);
}
