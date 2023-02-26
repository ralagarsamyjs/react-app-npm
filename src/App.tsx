import React, { useEffect, useState } from "react";
import Heading from "./components/heading";
import PackageList from "./components/packageList";
import SearchPackage from "./components/searchPackage";
import { IRawPackageInfo } from "./models/package";
import pkgService from "./services/pkgService";
import Pagination from "./components/pagination";

function App() {
  const [pkges, setPkges] = useState<IRawPackageInfo[]>([]);
  const [pkgName, setPkgName] = useState("");
  const [searchText, setSearchText] = useState("express");
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [maxPageLimit, setMaxPageLimit] = useState(5);
  // const [minPageLimit, setMinPageLimit] = useState(0);
  const [itemPerPage, setItemPerPage] = useState(10);

  const getPackagelist = async () => {
    const service = pkgService.getPkgServiceInstance();
    const list: IRawPackageInfo[] = await service.getPackageListWithInputText(
      searchText
    );
    setPkges(list);
    setLoading(false);
  };
  useEffect(() => {
    setLoading(true);
    getPackagelist();
  }, [searchText]);

  const onSearchTextHandler = (inputText: string) => {
    if (inputText) {
      setSearchText(inputText);
    } else {
      setSearchText("");
    }
  };

  return (
    <div className="App">
      <Heading title={"NPM Package Search Directory"} />
      <SearchPackage
        onSearchText={onSearchTextHandler}
        searchText={searchText}
      />
      <PackageList pkges={pkges} />
      <Pagination
        currentPage={currentPage}
        maxPageLimit={maxPageLimit}
        totalPages={pkges.length}
      />
    </div>
  );
}

export default App;
