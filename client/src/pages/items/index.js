import React from "react";
import ItemsView from "../../components/items_view";
import Title from "../../components/title";

import "./index.scss";

function Items() {
  return (
    <React.Fragment>
      <Title name="Items" />
      <ItemsView />
    </React.Fragment>
  );
}
export default Items;
