export const get = (ids = []) => ({ items }) => {
  if (items.items == null) return null;
  if (ids.length === 0) return items.items;

  const selected_items = {};
  for (const id of ids) {
    if (items.items[id] == null) continue;
    selected_items[id] = items.items[id];
  }

  return selected_items;
};
