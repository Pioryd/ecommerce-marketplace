export const get = () => ({ items }) => {
  return items;
};

export const getItems = () => ({ items }) => {
  return items.items;
};

export const getItem = (id) => ({ items }) => {
  if (id == null) return null;
  if (items.items == null) return null;
  if (items.items[id] == null) return null;

  return items.items[id];
};

export const getPagination = () => ({ items }) => {
  const { totalItems, currentPage, totalPages } = items;
  return { totalItems, currentPage, totalPages };
};
