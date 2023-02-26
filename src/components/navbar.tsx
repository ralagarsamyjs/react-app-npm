import React from "react";
import { Routes, Route } from "react-router-dom";
import PackageInfo from "./packageInfo";
import Dashboard from "./dashboard";

export interface INavbarProps {}

function Navbar(props: INavbarProps) {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/:packageName" element={<PackageInfo />} />
        <Route path="*" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default Navbar;
