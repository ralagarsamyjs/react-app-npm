import _ from "lodash";

export interface IPaginationProps {
  onPageSelect: (page: number) => void;
  onPrevPageSelect: () => void;
  onNextPageSelect: () => void;
  currentPage: number;
  pageSize: number;
  startIndex: number;
  maxPages: number;
  totalItems: number;
}

function Pagination(props: IPaginationProps) {
  const {
    onPageSelect,
    onPrevPageSelect,
    onNextPageSelect,
    currentPage,
    startIndex,
    pageSize,
    maxPages,
    totalItems,
  } = props;

  if (!totalItems) return null;

  const total = currentPage * pageSize;
  console.log("Pagination - ", total, totalItems);

  const pages = _.range(startIndex, startIndex + maxPages);

  const getPrevBtnClasses = () => {
    return currentPage === 1 ? "page-item disabled" : "page-item";
  };

  const getNextBtnClasses = () => {
    return total > totalItems ? "page-item disabled" : "page-item";
  };

  const getClasses = (page: number) => {
    return page === currentPage ? "page-item active" : "page-item";
  };

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination">
        <li
          className={getPrevBtnClasses()}
          onClick={() => {
            onPrevPageSelect();
          }}
        >
          <a className="page-link" href="#">
            Previous
          </a>
        </li>
        {pages.map((page) => {
          return (
            <li
              className={getClasses(page)}
              key={page}
              onClick={() => {
                onPageSelect(page);
              }}
            >
              <a className="page-link" href="#">
                {page}
              </a>
            </li>
          );
        })}
        <li
          className={getNextBtnClasses()}
          onClick={() => {
            onNextPageSelect();
          }}
        >
          <a className="page-link" href="#">
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
}
export default Pagination;
