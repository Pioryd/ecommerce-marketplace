import React, { Fragment } from "react";
import { useSelector } from "react-redux";

import ItemsView from "../components/ItemsView";
import Title from "../components/Title";

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
