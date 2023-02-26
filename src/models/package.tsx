export interface IPackage {
  name: string;
  scope: string;
  version: string;
  description: string;
  keywords: string[];
  date: string;
  links: IRawLinksInfo;
  author: IRawAuthorInfo;
  publisher: IRawPublishserInfo;
  maintainers: IRawMaintainersInfo[];
}

export interface IRawLinksInfo {
  npm: string;
  homePage: string;
  repository: string;
  bugs: string;
}
export interface IRawAuthorInfo {
  name: string;
  email: string;
}
export interface IRawPublishserInfo {
  username: string;
  email: string;
}
export interface IRawMaintainersInfo {
  name: string;
  email: string;
}

export interface IRawPackageInfo {
  name: string;
  scope: string;
  version: string;
  description: string;
  keywords: string[];
  date: string;
  links: IRawLinksInfo;
  author: IRawAuthorInfo;
  publisher: IRawPublishserInfo;
  maintainers: IRawMaintainersInfo[];
}

export interface IRawPackageList {
  packages: IRawPackageInfo[];
  searchStartIndex: number;
  searchEndIndex: number;
  total: number;
}

export interface IRawScoreInfo {
  final: number;
  detail: IRawScoreMetaInfo;
}

export interface IRawScoreMetaInfo {
  quality: number;
  popularity: number;
  maintenance: number;
}

export interface IRawPackage {
  package: IRawPackageInfo;
  score: IRawScoreInfo;
  searchScore: number;
}

export interface IRawObject {
  rawObjects: IRawPackage[];
  total: number;
  time: string;
}

export interface IPackageInfoMini {
  name: string;
  description: string;
  versions: string[];
}
export interface IRawContributorInfo {
  name: string;
  email: string;
}

export interface IPackageVersionInfoMini {
  author: IRawAuthorInfo;
  description: string;
  homepage: string;
  maintainers: IRawMaintainersInfo[];
  bugs: {
    url: string;
  };
}
