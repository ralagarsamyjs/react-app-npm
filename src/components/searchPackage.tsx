import React from "react";

interface ISearchPackageProps {
  searchText: string;
  onSearchText: (inputText: string) => void;
}

function SearchPackage(props: ISearchPackageProps) {
  const { searchText, onSearchText } = props;
  return (
    <div className="input-group">
      <input
        className="form-control border-end-0 border rounded-pill mb-4"
        type="search"
        value={searchText}
        id="search-input"
        placeholder="search"
        onChange={(e) => onSearchText(e.target.value)}
      ></input>
      <span className="input-group-append">
        <i className="fa fa-search"></i>
      </span>
    </div>
  );
}

export default SearchPackage;
