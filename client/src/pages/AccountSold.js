import React, { Fragment } from "react";

import ItemsView from "../components/ItemsView";
import Title from "../components/Title";

function AccountSold() {
  return (
    <Fragment>
      <Title name="Account - sold" />
      <ItemsView searchType="sold" />
    </Fragment>
  );
}
export default AccountSold;
