import React from "react";
import { Routes, Route } from "react-router-dom";
import App from "../App";
import PackageInfo from "./packageInfo";

export interface INavbarProps {}

function Navbar(props: INavbarProps) {
  return (
    <div>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/:packageName" element={<PackageInfo />} />
        <Route path="*" element={<App />} />
      </Routes>
    </div>
  );
}

export default Navbar;
