export interface NpmPackage {
  downloads: {
    monthly: number;
    weekly: number;
  };
  dependents: string;
  updated: string; // ISO date string
  searchScore: number;
  package: {
    name: string;
    keywords: string[];
    version: string;
    description: string;
    sanitized_name: string;
    maintainers: {
      email: string;
      username: string;
    }[];
    date: string; // ISO date string
    links: {
      repository?: string;
      bugs?: string;
      npm: string;
    };
  };
  score: {
    final: number;
    detail: {
      popularity: number;
      quality: number;
      maintenance: number;
    };
  };
  flags: {
    insecure: number;
  };
}

export interface NpmSearchResponse {
  objects: NpmPackage[];
  total: number;
  time: string; // ISO date string
}
