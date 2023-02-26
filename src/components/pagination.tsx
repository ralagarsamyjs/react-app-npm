import React from "react";

export interface IPaginationProps {
  currentPage: number;
  maxPageLimit: number;
  totalPages: number;
}
const Pagination = (props: IPaginationProps) => {
  const { currentPage, maxPageLimit, totalPages } = props;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return <div></div>;
};
export default Pagination;
