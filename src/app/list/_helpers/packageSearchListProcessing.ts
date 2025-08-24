import { IPackageSearchListState } from "../;ist.interface";
import { calculateDayFromNow } from "../../../service/date";
import { INpmSearchResponse, INpmSearchResult } from "#type/model/npmPackage";

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
