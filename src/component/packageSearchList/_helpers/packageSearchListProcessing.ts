import { INpmSearchResponse, INpmSearchResult } from "#types/model/npmPackage";
import { IPackageSearchListState } from "../../packageSearchList/packageSearchList.interface";
import { calculateDayFromNow } from "../../../helper/date";

export function packageSearchListProcessing(
  data: INpmSearchResponse<INpmSearchResult>,
): IPackageSearchListState {
  const list = data.objects.map((item) => {
    return {
      packageName: item.package.name,
      description: item.package.description,
      version: item.package.version,
      date: calculateDayFromNow(item.package.date),
      monthlyDownloads: item.downloads.monthly.toLocaleString(),
    };
  });

  return { total: data.total, list };
}
