export interface IPackageDetailState {
  packageName: string;
  description: string;
  license?: string;
  readMe?: string;
  latestVersion: string;
  lastUpdated: string;
  repositoryUrl?: string;
  homepageUrl?: string;
  checkerResult?: ICheckerResponse;
}

export interface ICheckerResponse {
  result: boolean;
  description: string[];
  suggestVersion: string[];
  otherSuggestion: string[];
  sampleCode: string;
  pros: string[];
  cons: string[];
}
