export const getItems = () => ({ cart }) => {
  return cart.items;
};

export const getCheckoutFailure = () => ({ cart }) => {
  return cart.checkoutFailure;
};
