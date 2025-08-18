export interface INpmPackage {
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

export interface INpmSearchResponse {
  objects: INpmPackage[];
  total: number;
  time: string; // ISO date string
}

export interface INpmDetail {
  _id: string;
  _rev: string;
  name: string;
  "dist-tags": DistTags;
  versions: Version;
  time: Time;
  bugs: Bug;
  license: string;
  homepage: string;
  keywords: string[];
  repository: { directory: string; type: string; url: string };
  description: string;
  maintainers: Maintainer[];
  readme: string;
  readmeFilename: string;
  users: User;
}

type Bug = {
  url: string;
};

type Time = {
  [key: string]: string;
};

type User = {
  [key: string]: boolean;
};

interface DistTags {
  beta: string;
  rc: string;
  latest: string;
  canary: string;
  next: string;
  experimental: string;
}

interface Maintainer {
  name: string;
  email: string;
}

interface Version {
  name: string;
  version: string;
  _id: string;
  maintainers: Maintainer[];
  browerify: { transform: string[] };
  bugs: Bug;
  dist: Dist;
  main: string;
  engines: { node: string };
  _npmUser: Maintainer;
  licenses: string;
  repository: {
    url: string;
    type: string;
  };
  exports: Export;
  _npmVersion: string;
  description: string;
  directories: any;
  _nodeVersion: string;
  dependencies: { "loose-envify": string; "object-assing": string };
  _npmOperationalInternal: {
    host: string;
    tmp: string;
  };
  readmeFilename: string;
  _hasShrinkwrap: boolean;
  buildOptions: {
    buildId: string;
    checksum: string;
    packages: string[];
    partial: boolean;
    unstable: boolean;
  };
}

interface Export {
  [key: string]: { default: string; "react-server": string };
}

interface Dist {
  shasum: string;
  tarball: string;
  integrity: string;
  signatures: {
    sig: string;
    keyid: string;
  }[];
}
