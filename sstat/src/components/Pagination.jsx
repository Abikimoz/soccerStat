import React from 'react';
import Pagination from 'react-bootstrap/Pagination';
import 'bootstrap/dist/css/bootstrap.min.css';

export const CustomPagination = ({ totalPages, activePage, onPageChange }) => {
  const shownPages = 2;
  let items = [];

  const startPage = Math.max(1, activePage - shownPages);
  const endPage = Math.min(totalPages, activePage + shownPages);

  if (startPage > 1) {
    items.push(
      <Pagination.Item key={1} onClick={() => onPageChange(1)}>
        {1}
      </Pagination.Item>
    );

    if (startPage > 2) {
      items.push(
        <Pagination.Ellipsis 
          key="start-ellipsis" 
          style={{ pointerEvents: 'none', border: 'none', background: 'none', color: 'inherit' }} 
        />
      );
    }
  }

  for (let number = startPage; number <= endPage; number++) {
    items.push(
      <Pagination.Item 
        key={number} 
        active={number === activePage} 
        onClick={() => onPageChange(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      items.push(
        <Pagination.Ellipsis 
          key="end-ellipsis" 
          style={{ pointerEvents: 'none', border: 'none', background: 'none', color: 'inherit' }} 
        />
      );
    }

    items.push(
      <Pagination.Item key={totalPages} onClick={() => onPageChange(totalPages)}>
        {totalPages}
      </Pagination.Item>
    );
  }

  if (activePage > 1) {
    items.unshift(
      <Pagination.Prev key="prev" onClick={() => onPageChange(activePage - 1)} />
    );
  }

  if (activePage < totalPages) {
    items.push(
      <Pagination.Next key="next" onClick={() => onPageChange(activePage + 1)} />
    );
  }

  return (
    <div className="d-flex justify-content-center my-4">
      <Pagination>{items}</Pagination>
    </div>
  );
};
