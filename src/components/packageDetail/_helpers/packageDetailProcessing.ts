import { INpmDetail } from "#types/model/npmPackage";
import dayjs from "dayjs";
import { IPackageDetailState } from "#components/packageDetail/detail.interface";
import { YYYYMMDD } from "#constants/date";

export function detailProcessing(
  data: INpmDetail,
): Omit<IPackageDetailState, "readMe"> {
  const {
    name,
    homepage,
    repository,
    "dist-tags": distTags,
    time,
  } = data || {};

  return {
    packageName: name,
    latestVersion: distTags.latest,
    lastUpdated: dayjs(time.modified).format(YYYYMMDD),
    repositoryUrl: repository ? repository.url : "",
    homepageUrl: homepage ? homepage : "",
  };
}

export function readMeProcessing(data: string) {
  const readMe = String(data || "");

  return readMe
    .split("\n")
    .filter(
      (line) =>
        !/^\s*(\[[^\]]*?\]\([^)]*?\)\s*)+$/g.test(line.trim()) &&
        !/^\s*(\[[^\]]*?\]\[[^\]]*?\]\s*)+$/g.test(line.trim()),
    )
    .map((line) =>
      line
        .replace(/\[!\[[^\]]*?\]\([^\)]*?\)\]\([^\)]*?\)/g, "")
        .replace(/\[!\[[^\]]*?\]\[[^\]]*?\]\]\[[^\]]*?\]/g, ""),
    )
    .join("\n");
}
