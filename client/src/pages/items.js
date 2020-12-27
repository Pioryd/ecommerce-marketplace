import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ItemsView from "../components/ItemsView";
import Title from "../components/Title";

import * as ItemsSelector from "../redux/modules/items/selectors";
import * as ItemsActions from "../redux/modules/items/actions";

function Items() {
  const dispatch = useDispatch();

  const items = useSelector(ItemsSelector.getItems());

  useEffect(() => {
    dispatch(ItemsActions.getSearch({}));
    return () => dispatch(ItemsActions.clear());
  }, []);

  return (
    <Fragment>
      <Title name="Items" />
      <ItemsView items={items} />
    </Fragment>
  );
}
export default Items;
