export const getDetails = () => ({ items }) => items.details;

export const getList = (ids = []) => ({ items }) => {
  let list = {};

  for (const id of ids) {
    if (items.list[id] == null) continue;
    list[id] = items.list[id];
  }

  return list;
};
