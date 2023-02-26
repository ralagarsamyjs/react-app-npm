import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import pkgService from "../services/pkgService";
import { IPackageInfoMini, IPackageVersionInfoMini } from "./../models/package";
import Select from "react-select";

import { useNavigate } from "react-router-dom";

export interface IPackageInfoProps {}

export interface IPackageDistTags {
  latest: string;
  next: string;
}

export interface IPackageMeta {
  name: string;
}

export interface IPackageVersions {
  version: string;
  meta: IPackageMeta[];
}

export interface IPackageInfo {
  _id: string;
  _rev: string;
  name: string;
  description: string;
  distTags: IPackageDistTags;
  versions: IPackageVersions[];
}
export interface IDataOptions {
  label: string;
  value: number;
}
type OptionType = { label: string; value: number };

function PackageInfo(props: IPackageInfoProps) {
  const [pkgInfo, setPkginfo] = useState<IPackageInfoMini>();
  const [pkgVersionInfo, setPkgVersionInfo] =
    useState<IPackageVersionInfoMini>();
  const [options, setOptions] = useState<OptionType[]>([]);
  const [selectedValue, setSelectedOption] = useState<OptionType>(options[0]);

  const params = useParams();
  const navigate = useNavigate();
  const packagename = params.packageName || "";

  const getPackageInfo = async () => {
    const service = pkgService.getPkgServiceInstance();
    const packageInfo: IPackageInfoMini = await service.getPackageInfo(
      packagename
    );
    const dataOptions: OptionType[] = packageInfo.versions.map(
      (version, index) => ({
        label: version,
        value: index,
      })
    );
    setOptions(dataOptions);
    setPkginfo(packageInfo);
  };

  const getPackageVersionInfo = async () => {
    const service = pkgService.getPkgServiceInstance();
    const packageVersionInfo: IPackageVersionInfoMini =
      await service.getPackageVersionInfo(packagename, selectedValue.label);
    if (packageVersionInfo) setPkgVersionInfo(packageVersionInfo);
  };

  useEffect(() => {
    if (selectedValue) getPackageVersionInfo();
  }, [selectedValue]);

  useEffect(() => {
    if (packagename) getPackageInfo();
  }, []);

  const OnVersionChangeHandler = (option: OptionType) => {
    setSelectedOption(option);
  };

  const onBackBtnHanlder = () => {
    navigate(-1);
  };

  const renderPackageVersionInfo = () => {
    if (selectedValue) {
      return (
        <React.Fragment>
          <section className="author-info">
            <h4>Author </h4>
            <ul>
              <li>Name: {pkgVersionInfo?.author?.name}</li>
              <li>Email: {pkgVersionInfo?.author?.email}</li>
            </ul>
          </section>
          <section className="maintainer-info">
            <h4>Maintainers </h4>
            {pkgVersionInfo?.maintainers.map((maintainer) => {
              return (
                <ul key={maintainer.name}>
                  <li>Name: {maintainer.name}</li>
                  <li>Email: {maintainer.email}</li>
                </ul>
              );
            })}
          </section>
          <section className="meta-info">
            <h4>Description </h4>
            <p>{pkgVersionInfo?.description}</p>
            <h6>Home Page:</h6>
            <a href={pkgVersionInfo?.homepage} target="_blank">
              {pkgVersionInfo?.homepage}
            </a>
            <h6>Bugs:</h6>
            <a href={pkgVersionInfo?.bugs.url} target="_blank">
              {pkgVersionInfo?.bugs.url}
            </a>
          </section>
        </React.Fragment>
      );
    } else {
      return null;
    }
  };

  return (
    <div>
      <h2>
        {pkgInfo?.name}
        <button
          className="btn btn-primary float-end"
          onClick={onBackBtnHanlder}
        >
          Back
        </button>
      </h2>
      <p>{pkgInfo?.description}</p>
      <div className="dropdown">
        <div className="label">
          <label>Select version</label>
        </div>
        <Select
          placeholder="Select"
          options={options}
          value={selectedValue}
          isClearable
          onChange={(option) => OnVersionChangeHandler(option as OptionType)}
        />
      </div>
      <div>{renderPackageVersionInfo()}</div>
    </div>
  );
}

export default PackageInfo;
