import { INpmDetail } from "#types/model/npmPackage";
import dayjs from "dayjs";
import { IPackageDetailState } from "#components/packageDetail/packageDetail.interface";
import relativeTime from "dayjs/plugin/relativeTime";
import { buildGithubRepositoryUrl } from "#helpers/apiUrlBuilder";
import { calculateDayFromNow } from "#helpers/date";
import { decodeBase64 } from "#components/packageDetail/_helpers/decodeBase64";

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
    lastUpdated: calculateDayFromNow(String(time)), // TODO check type
    repositoryUrl: repository ? buildGithubRepositoryUrl(repository.url) : "",
    homepageUrl: homepage ? homepage : "",
  };
}

export function readMeProcessing(content: string): string {
  return decodeBase64(content);
}
