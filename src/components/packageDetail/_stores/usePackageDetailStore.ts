import { create } from "zustand/react";
import { IPackageDetailState } from "#components/packageDetail/detail.interface";

const packageDetailState: IPackageDetailState = {
  packageName: "",
  readMe: "",
  latestVersion: "",
  lastUpdated: "",
  repositoryUrl: "",
  homepageUrl: "",
};

type DetailState = typeof packageDetailState;
type DetailActions = {
  setDetail: (data: DetailState) => void;
  setReadme: (readMe: string) => void;
};

export const usePackageDetailStore = create<DetailState & DetailActions>(
  (set) => ({
    ...packageDetailState,
    setDetail: (detail) =>
      set((state) => ({
        ...state,
        ...detail,
      })),
    setReadme: (readMe) =>
      set((state) => ({
        ...state,
        readMe,
      })),
  }),
);
