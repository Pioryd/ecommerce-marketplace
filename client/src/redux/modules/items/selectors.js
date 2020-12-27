export const get = () => ({ items }) => {
  return items;
};

export const getItems = (ids = []) => ({ items }) => {
  if (items.items == null) return null;
  if (ids.length === 0) return items.items;

  const selected_items = {};
  for (const id of ids) {
    if (items.items[id] == null) continue;
    selected_items[id] = items.items[id];
  }

  return selected_items;
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
