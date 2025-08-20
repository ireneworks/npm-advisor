import { create } from "zustand/react";
import { IPackageDetailState } from "#components/packageDetail/packageDetail.interface";

export const packageDetailState: IPackageDetailState = {
  packageName: "",
  description: "",
  license: "",
  readMe: "",
  latestVersion: "",
  lastUpdated: "",
  repositoryUrl: "",
  homepageUrl: "",
  checkerResult: undefined,
};

type DetailState = typeof packageDetailState;
type DetailActions = {
  setDetail: (data: DetailState) => void;
  setReadme: (readMe: string) => void;
  setCheckerResult: (
    checkerResult: IPackageDetailState["checkerResult"],
  ) => void;
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
    setCheckerResult: (checkerResult) =>
      set((state) => ({
        ...state,
        checkerResult,
      })),
  }),
);
