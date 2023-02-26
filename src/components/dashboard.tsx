import React, { useEffect, useState } from "react";
import Heading from "./heading";
import PackageList from "./packageList";
import SearchPackage from "./searchPackage";
import { IRawPackageInfo, IRawPackageList } from "../models/package";
import pkgService from "../services/pkgService";
import Pagination from "./pagination";

function Dashboard() {
  const [pkges, setPkges] = useState<IRawPackageInfo[]>([]);
  const [pkgName, setPkgName] = useState("");
  const [searchText, setSearchText] = useState("lodash");
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [startPageIndex, setStartPageIndex] = useState(1);
  const [maxPageLimit, setMaxPageLimit] = useState(10);
  const [itemPerPage, setItemPerPage] = useState(6);
  const [searchIndex, setSearchIndex] = useState(0);
  const [totalItemWithoutFilter, setTotalItemWithoutFilter] = useState(0);
  const maxItemsPerQuery = 250;

  const getPackageList = async () => {
    console.log(
      "getPackageList : ",
      searchIndex,
      pkges.length,
      totalItemWithoutFilter
    );
    const service = pkgService.getPkgServiceInstance();
    const list: IRawPackageList = await service.getPackageListWithInputText(
      searchText,
      maxItemsPerQuery,
      searchIndex
    );
    console.log(
      "before list total & searched pkg length: ",
      list.total,
      list.packages.length
    );
    const pkgesClone = [...pkges, ...list.packages];
    console.log("after pkgesClone length: ", pkgesClone.length);
    setTotalItemWithoutFilter(list.total);
    setPkges(pkgesClone);
    // setLoading(false);
  };
  useEffect(() => {
    // setLoading(true);
    getPackageList();
  }, [searchText, searchIndex]);

  const onSearchTextHandler = (inputText: string) => {
    setSearchText(inputText ? inputText : "");
    setPkges([]);
  };

  const onPaginationHandler = (page: number) => {
    console.log("onPaginationHandler - ", page);
    setCurrentPage(page);
  };

  const onPrevBtnClickHandle = () => {
    setStartPageIndex((prev) => {
      return prev > 1 ? prev - 1 : prev;
    });

    setCurrentPage((prev) => {
      return prev > 1 ? prev - 1 : prev;
    });
  };

  const onNextBtnClickHandle = () => {
    const ReachedbufferLimit = currentPage * itemPerPage + itemPerPage;
    const ReachedPageLimit = Math.ceil(pkges.length / itemPerPage);
    console.log(
      "onNextBtnClickHandle- ",
      ReachedbufferLimit,
      currentPage,
      pkges.length,
      searchIndex,
      totalItemWithoutFilter,
      startPageIndex,
      ReachedPageLimit,
      pkges.length
    );
    if (
      ReachedbufferLimit > pkges.length &&
      totalItemWithoutFilter > searchIndex
    ) {
      setSearchIndex((prev) => prev + maxItemsPerQuery);
      console.log(
        "reached the current buffer limit and search can be done more"
      );
    }
    setStartPageIndex((prev) =>
      totalItemWithoutFilter > searchIndex ||
      startPageIndex + maxPageLimit <= ReachedPageLimit
        ? prev + 1
        : prev
    );
    setCurrentPage((prev) =>
      totalItemWithoutFilter > searchIndex || ReachedbufferLimit <= pkges.length
        ? prev + 1
        : prev
    );
  };

  const getPackageListPerPage = () => {
    const pageStart = (currentPage - 1) * itemPerPage;
    const pageEnd = pageStart + itemPerPage;
    console.log("calling getPackageListPerPage - ", currentPage);
    return pkges.slice(pageStart, pageEnd);
  };

  return (
    <div className="App">
      <Heading title={"NPM Package Search Directory"} />
      <SearchPackage
        onSearchText={onSearchTextHandler}
        searchText={searchText}
      />
      <PackageList pkges={getPackageListPerPage()} />
      <Pagination
        currentPage={currentPage}
        pageSize={itemPerPage}
        maxPages={maxPageLimit}
        totalItems={pkges.length}
        startIndex={startPageIndex}
        onPageSelect={onPaginationHandler}
        onPrevPageSelect={onPrevBtnClickHandle}
        onNextPageSelect={onNextBtnClickHandle}
      />
    </div>
  );
}

export default Dashboard;
