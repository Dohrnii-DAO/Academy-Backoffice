import React, { useState, useEffect, useMemo } from "react";
import Pagination from "react-bootstrap/Pagination";

const PaginationComponent = ({
  total = 0,
  itemperpage = 0,
  currentpage = 1,
  onpagechange,
}) => {
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (total > 0 && itemperpage > 0)
      setTotalPages(Math.ceil(total / itemperpage));
  }, [total, itemperpage]);

  const paginationItems = useMemo(() => {
    const pages = [];
    for (let i = 1; i <= itemperpage; i++) {
      pages.puch(
        <Pagination.Item
          key={i}
          active={i === currentpage}
          onClick={() => onpagechange(i)}
        >
          {i}
        </Pagination.Item>
      );
    }
    return pages;
  }, [totalPages, currentpage]);

  if (totalPages === 0) return null;
  return (
    <>
      <Pagination>
        <Pagination.Prev
          onClick={() => onpagechange(currentpage - 1)}
          disabled={currentpage === 1}
        />
        {paginationItems}
        <Pagination.Next
          onClick={() => onpagechange(currentpage + 1)}
          disabled={currentpage === totalPages}
        />
      </Pagination>
    </>
  );
};
export default PaginationComponent;
