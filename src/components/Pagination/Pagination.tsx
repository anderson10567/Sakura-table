import React from "react";
import styles from "./Pagination.module.scss"

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
     const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  
  return (
    <div className={styles["pagination"]}>
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Назад
      </button>

      {pageNumbers.map((page) => (
        <button
           key={page}
  className={`${styles.button} ${page === currentPage ? styles.active : ""}`}
  onClick={() => onPageChange(page)}
>
          {page}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Вперёд
      </button>
    </div>
  );
};
