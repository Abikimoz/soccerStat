export const calculatePagination = (totalPages, activePage, shownPages = 2) => {
  const items = [];
  const startPage = Math.max(1, activePage - shownPages);
  const endPage = Math.min(totalPages, activePage + shownPages);

  if (startPage > 1) {
    items.push(1);

    if (startPage > 2) {
      items.push('start-ellipsis');
    }
  }

  for (let number = startPage; number <= endPage; number++) {
    items.push(number);
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      items.push('end-ellipsis');
    }

    items.push(totalPages);
  }

  return items;
};
