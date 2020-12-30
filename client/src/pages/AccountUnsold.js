import React, { Fragment } from "react";

import ItemsView from "../components/ItemsView";
import Title from "../components/Title";

function AccountUnsold() {
  return (
    <Fragment>
      <Title name="Account - unsold" />
      <ItemsView searchType="unsold" />
    </Fragment>
  );
}
export default AccountUnsold;
