import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  handlePageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  handlePageChange,
}) => {
  return (
    <div className="flex justify-center mt-4">
      {totalPages > 1 && currentPage > 1 && (
        <button
          className="mx-1 px-3 py-1 rounded-full bg-gray-200 text-gray-800"
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <FaArrowLeft />
        </button>
      )}
      {totalPages > 1 &&
        [...Array(totalPages).keys()].map((page) => (
          <button
            key={page}
            className={`mx-1 px-3 py-1 rounded-full ${
              page + 1 === currentPage
                ? "bg-gray-800 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => handlePageChange(page + 1)}
          >
            {page + 1}
          </button>
        ))}
      {currentPage < totalPages && (
        <button
          className="mx-1 px-3 py-1 rounded-full bg-gray-200 text-gray-800"
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <FaArrowRight />
        </button>
      )}
    </div>
  );
};

export default Pagination;
