import React, { Fragment } from "react";

import ItemsView from "../components/ItemsView";
import Title from "../components/Title";

function Items() {
  return (
    <Fragment>
      <Title name="Items" />
      <ItemsView searchType="general" />
    </Fragment>
  );
}
export default Items;
