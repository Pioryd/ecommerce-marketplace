import React, { Fragment } from "react";

import ItemsView from "../components/ItemsView";
import Title from "../components/Title";

function AccountBought() {
  return (
    <Fragment>
      <Title name="Account - bought" />
      <ItemsView searchType="bought" options={{ showQuantity: true }} />
    </Fragment>
  );
}
export default AccountBought;
