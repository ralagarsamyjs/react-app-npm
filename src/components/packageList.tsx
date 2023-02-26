import React from "react";
import { IPackage } from "../models/package";
import { useNavigate } from "react-router-dom";

interface PackageListProps {
  pkges: IPackage[];
}

function PackageList({ pkges }: PackageListProps) {
  const navigate = useNavigate();

  const onPackageInfoHandler = (pkgname: string) => {
    if (pkgname) {
      let path = `/${pkgname}`;
      navigate(path);
    }
  };

  return (
    <div>
      {pkges.length !== 0 && (
        <React.Fragment>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Author</th>
                <th scope="col">Latest Version</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {pkges.map((pkg: IPackage) => {
                return (
                  <tr key={pkg.name}>
                    <td>{pkg.name}</td>
                    <td>{pkg.author?.name}</td>
                    <td>{pkg.version}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          onPackageInfoHandler(pkg.name);
                        }}
                      >
                        Info
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </React.Fragment>
      )}
    </div>
  );
}

export default PackageList;
