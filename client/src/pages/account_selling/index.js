import React from "react";
import ItemsView from "../../components/items_view";
import Title from "../../components/title";

import "./index.scss";

function AccountSelling() {
  return (
    <React.Fragment>
      <Title name="Selling" />
      <ItemsView />
    </React.Fragment>
  );
}
export default AccountSelling;