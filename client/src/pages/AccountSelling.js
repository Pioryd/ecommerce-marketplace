import React, { Fragment } from "react";

import ItemsView from "../components/ItemsView";
import Title from "../components/Title";

function AccountSelling() {
  return (
    <Fragment>
      <Title name="Account - selling" />
      <ItemsView searchType="selling" options={{ allowClose: true }} />
    </Fragment>
  );
}
export default AccountSelling;
