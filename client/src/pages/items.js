import React, { Fragment } from "react";
import { useSelector } from "react-redux";

import ItemsView from "../components/items_view";
import Title from "../components/title";

import * as ItemsSelector from "../redux/modules/items/selectors";

function Items() {
  const list = useSelector(ItemsSelector.getList([...Array(8).keys()]));

  return (
    <Fragment>
      <Title name="Items" />
      <ItemsView list={list} />
    </Fragment>
  );
}
export default Items;
