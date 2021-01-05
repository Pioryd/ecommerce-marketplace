import React, { useEffect, useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Group, Info, ButtonLink } from "../components/Layout/Controls";
import Title from "../components/Title";

import * as CartActions from "../redux/modules/cart/actions";
import * as CartSelector from "../redux/modules/cart/selectors";

export default function CheckoutFailure(props) {
  const dispatch = useDispatch();
  const checkoutFailure = useSelector(CartSelector.getCheckoutFailure());

  const [message] = useState(checkoutFailure);

  useEffect(() => dispatch(CartActions.setCheckoutFailure("")), []);

  return (
    <Fragment>
      <Title name="Checkout - failure" />
      <Group>
        <Info style={{ textAlign: "center" }}>
          Error - the transaction has failed
        </Info>
        {message != null && message !== "" && (
          <Info style={{ textAlign: "center" }}>{message}</Info>
        )}

        <ButtonLink to="/cart">Go back to cart</ButtonLink>
      </Group>
    </Fragment>
  );
}
