import React from 'react';
import Pagination from 'react-bootstrap/Pagination';
import 'bootstrap/dist/css/bootstrap.min.css';

export const CustomPagination = ({ totalPages, activePage, onPageChange }) => {
  const shownPages = 4; // количество страниц, отображаемых в пагинации в обе стороны от текущей страницы

  let items = [];

  // Расчет начальной и конечной страниц для отображения
  let startPage = Math.max(1, activePage - shownPages);
  let endPage = Math.min(totalPages, activePage + shownPages);

  // Добавление кнопки для перехода на первую страницу
  items.push(
    <Pagination.First key="first" onClick={() => onPageChange(1)} />
  );

  // Добавление кнопок для промежуточных страниц
  for (let number = startPage; number <= endPage; number++) {
    items.push(
      <Pagination.Item key={number} active={number === activePage} onClick={() => onPageChange(number)}>
        {number}
      </Pagination.Item>
    );
  }

  // Добавление кнопки для перехода на последнюю страницу
  items.push(
    <Pagination.Last key="last" onClick={() => onPageChange(totalPages)} />
  );

  return (
    <div className="d-flex justify-content-center my-4">
      <Pagination>{items}</Pagination>
    </div>
  );
};
