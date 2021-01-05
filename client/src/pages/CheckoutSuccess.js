import React, { Fragment } from "react";

import { Group, Info, ButtonLink } from "../components/Layout/Controls";
import Title from "../components/Title";

export default function CheckoutSuccess(props) {
  return (
    <Fragment>
      <Title name="Checkout - success" />
      <Group>
        <Info style={{ textAlign: "center" }}>
          The transaction was successful
        </Info>
        <ButtonLink to="/">Go back to shopping</ButtonLink>
      </Group>{" "}
    </Fragment>
  );
}
