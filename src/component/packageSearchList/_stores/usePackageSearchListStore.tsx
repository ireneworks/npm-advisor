import { create } from "zustand/react";
import { IPackageSearchListState } from "../../packageSearchList/packageSearchList.interface";

export const packageSearchListState: IPackageSearchListState = {
  total: 0,
  list: [],
};

type SearchListState = typeof packageSearchListState;
type SearchListActions = {
  setSearchList: (data: SearchListState) => void;
};

export const usePackageSearchListStore = create<
  SearchListState & SearchListActions
>((set) => ({
  ...packageSearchListState,
  setSearchList: (data) =>
    set((state) => ({
      ...state,
      ...data,
    })),
}));
