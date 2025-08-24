import dayjs from "dayjs";
import { IPackageDetailState } from "../detail.interface";
import relativeTime from "dayjs/plugin/relativeTime";
import { buildGithubRepositoryUrl } from "../../../../service/apiUrlBuilder";
import { calculateDayFromNow } from "../../../../service/date";
import { decodeBase64 } from "./decodeBase64";
import { INpmDetail } from "#type/model/npmPackage";

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
