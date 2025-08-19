import { INpmDetail } from "#types/model/npmPackage";
import dayjs from "dayjs";
import { IPackageDetailState } from "#components/packageDetail/packageDetail.interface";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export function detailProcessing(
  data: INpmDetail,
): Omit<IPackageDetailState, "readMe"> {
  const {
    name,
    license,
    homepage,
    description,
    repository,
    "dist-tags": distTags,
    time,
  } = data || {};

  return {
    packageName: name,
    description: description ?? "",
    license: license ?? "",
    latestVersion: distTags.latest,
    lastUpdated: dayjs(String(time)).fromNow(),
    repositoryUrl: repository ? repository.url.slice(4) : "",
    homepageUrl: homepage ? homepage : "",
  };
}

export function readMeProcessing(data: string) {
  return String(data || "");
}
