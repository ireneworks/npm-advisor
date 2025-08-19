export interface IPackageSearchListItem {
  packageName: string;
  description: string;
  version: string;
  date: string;
  monthlyDownloads: string;
}

export interface IPackageSearchListState {
  total: number;
  list: IPackageSearchListItem[];
}
