import React, { Fragment } from "react";

import CartView from "../components/CartView";
import Title from "../components/Title";

function Cart() {
  return (
    <Fragment>
      <Title name="Cart" />
      <CartView />
    </Fragment>
  );
}
export default Cart;
