import axios from "axios";
import {
  IRawMaintainersInfo,
  IRawPackage,
  IRawPackageInfo,
} from "../models/package";
import { IPackageInfoMini, IPackageVersionInfoMini } from "./../models/package";

class PkgService {
  pkgservice = axios.create({
    baseURL: "https://registry.npmjs.org",
  });

  async getPackageListWithInputText(
    input: string,
    size: number = 20,
    from: number = 0
  ) {
    const resource = `/-/v1/search?text=${input}&size=${size}&from=${from}`;
    let Data: IRawPackageInfo[] = [];
    let filteredData: IRawPackage[] = [];
    try {
      const response = await this.pkgservice.get(resource);
      filteredData = response.data.objects.filter((pkg: IRawPackage) => {
        if (pkg.package.name.includes(input)) return pkg;
      });
      Data = filteredData.map((pkg) => pkg.package);
      return Data;
    } catch (err) {
      return Data;
    }
  }

  getPackageInfo = async (packageName: string) => {
    const output: IPackageInfoMini = {
      name: "",
      description: "",
      versions: [],
    };

    const resource = `/${packageName}`;
    try {
      const response = await this.pkgservice.get(resource);
      output.name = response.data.name;
      output.description = response.data.description;
      output.versions = Object.keys(response.data.versions);
      return output;
    } catch (error) {
      return output;
    }
  };

  getPackageVersionInfo = async (packageName: string, version: string) => {
    const output: IPackageVersionInfoMini = {
      author: { name: "", email: "" },
      description: "",
      homepage: "",
      maintainers: [],
      bugs: {
        url: "",
      },
    };

    const resource = `/${packageName}/${version}`;
    try {
      const response = await this.pkgservice.get(resource);
      output.author = { ...response.data.author };
      output.description = response.data.description;
      output.bugs.url = response.data.bugs.url;
      output.homepage = response.data.homepage;
      output.maintainers = response.data.maintainers.map(
        (maintainer: IRawMaintainersInfo) => maintainer
      );
      return output;
    } catch (error) {
      return output;
    }
  };

  static getPkgServiceInstance() {
    return new PkgService();
  }
}
export default PkgService;
